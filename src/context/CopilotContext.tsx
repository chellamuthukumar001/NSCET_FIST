import React, { createContext, useContext, useState } from 'react';
import { ChatMessage, ConfidenceScore, SourceCitation } from '../types';
import { hybridRetrieveAndAnswer } from '../lib/hybridSearch';
import { generateGroqAnswer } from '../lib/groqClient';
import { voiceService } from '../lib/voiceAssistant';
import { useAuth } from './AuthContext';

interface CopilotContextType {
  messages: ChatMessage[];
  isStreaming: boolean;
  isOpen: boolean;
  selectedLanguage: 'en' | 'ta';
  setSelectedLanguage: (lang: 'en' | 'ta') => void;
  openCopilot: (initialQuery?: string) => void;
  closeCopilot: () => void;
  toggleCopilot: () => void;
  sendMessage: (text: string) => Promise<void>;
  speakMessage: (text: string) => void;
  stopSpeaking: () => void;
  clearHistory: () => void;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export const CopilotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ta'>('en');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: 'Hello! I am **CampusIQ**, the official intelligent copilot for Nadar Saraswathi College of Engineering & Technology. How can I assist your learning or campus experience today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: 'HIGH',
      followUpQuestions: [
        'What is the attendance requirement?',
        'Show me DBMS Unit 3 lectures',
        'What are students saying about the computer lab?',
        'How do I apply for a bonafide certificate?'
      ]
    }
  ]);

  const openCopilot = (initialQuery?: string) => {
    setIsOpen(true);
    if (initialQuery) {
      sendMessage(initialQuery);
    }
  };

  const closeCopilot = () => {
    setIsOpen(false);
    voiceService.stopSpeaking();
  };

  const toggleCopilot = () => {
    setIsOpen(prev => !prev);
    voiceService.stopSpeaking();
  };

  const speakMessage = (text: string) => {
    voiceService.speak(text, selectedLanguage);
  };

  const stopSpeaking = () => {
    voiceService.stopSpeaking();
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'msg_welcome_reset',
        sender: 'assistant',
        content: 'CampusIQ conversation history cleared. Ask anything regarding syllabus, video lectures, regulations, or campus facilities.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const sendMessage = async (queryText: string) => {
    if (!queryText.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: selectedLanguage,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    // Call Hybrid RAG retrieval engine
    const ragResult = hybridRetrieveAndAnswer(queryText, role);

    // Create placeholder assistant message
    const botMsgId = 'bot_' + Date.now();
    const initialBotMessage: ChatMessage = {
      id: botMsgId,
      sender: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: ragResult.citations,
      confidence: ragResult.confidence,
      followUpQuestions: ragResult.followUpQuestions,
      isStreaming: true,
      language: ragResult.detectedLanguage,
    };

    setMessages(prev => [...prev, initialBotMessage]);

    let fullText = ragResult.answer;
    try {
      // High-speed Groq LLM inference with institutional grounded context
      const groqAnswer = await generateGroqAnswer({
        query: queryText,
        role,
        language: selectedLanguage,
        contextDocs: ragResult.retrievedDocs,
      });

      if (groqAnswer && groqAnswer.trim().length > 0) {
        fullText = groqAnswer;
      }
    } catch (err) {
      console.warn('Groq LLM call fell back to local institutional retrieval:', err);
    }

    // Stream out chunks for smooth reading
    let currentIdx = 0;
    const chunkSize = 8;

    const streamInterval = setInterval(() => {
      currentIdx += chunkSize;
      const slice = fullText.slice(0, currentIdx);

      setMessages(prev =>
        prev.map(m =>
          m.id === botMsgId
            ? { ...m, content: slice, isStreaming: currentIdx < fullText.length }
            : m
        )
      );

      if (currentIdx >= fullText.length) {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 18);
  };

  return (
    <CopilotContext.Provider
      value={{
        messages,
        isStreaming,
        isOpen,
        selectedLanguage,
        setSelectedLanguage,
        openCopilot,
        closeCopilot,
        toggleCopilot,
        sendMessage,
        speakMessage,
        stopSpeaking,
        clearHistory,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};

export const useCopilot = () => {
  const context = useContext(CopilotContext);
  if (!context) {
    throw new Error('useCopilot must be used within a CopilotProvider');
  }
  return context;
};
