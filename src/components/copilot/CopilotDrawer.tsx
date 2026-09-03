import React, { useState, useRef, useEffect } from 'react';
import { useCopilot } from '../../context/CopilotContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Send,
  Sparkles,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Mic,
  ShieldCheck,
  Globe,
  Info,
  ThumbsUp,
  ThumbsDown,
  Download,
  Code2,
  GraduationCap,
  Building2,
  FileText,
  HelpCircle,
  Play
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { SourceCitationList } from '../common/SourceCitation';
import { VoiceQueryModal } from './VoiceQueryModal';

export const CopilotDrawer: React.FC = () => {
  const {
    isOpen,
    closeCopilot,
    messages,
    isStreaming,
    sendMessage,
    speakMessage,
    stopSpeaking,
    clearHistory,
    selectedLanguage,
    setSelectedLanguage
  } = useCopilot();
  const { role } = useAuth();

  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [activeFocusMode, setActiveFocusMode] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, 'like' | 'dislike'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim() && !isStreaming) {
      let q = inputVal.trim();
      if (activeFocusMode === 'exam') {
        q = `[Anna University Exam Format: 2-Mark & 16-Mark Pattern] ${q}`;
      } else if (activeFocusMode === 'code') {
        q = `[Algorithm & Code Implementation with Complexity] ${q}`;
      } else if (activeFocusMode === 'campus') {
        q = `[NSCET Theni Campus & Facilities] ${q}`;
      }
      setInputVal('');
      sendMessage(q);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReaction = (msgId: string, type: 'like' | 'dislike') => {
    setReactions((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? undefined as any : type,
    }));
  };

  const handleExportChat = () => {
    const chatText = messages
      .map((m) => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([chatText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campusiq_chat_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCopilot}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#101815] border-l border-white/15 shadow-2xl flex flex-col text-white transition-transform duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#173B2F]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C49A55] shadow-md shrink-0">
              <img
                src="/assets/nscet-college-logo.jpg"
                alt="NSCET"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-1">
                  <span>CAMPUS</span>
                  <span className="text-[#6FA9C9]">IQ</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C49A55]/20 text-[#C49A55] font-mono font-bold">
                    GROQ LPU RAG
                  </span>
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-[#A2B6AC] truncate max-w-xs">
                NSCET Theni • Anna University Reg. 2021 Copilot
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex bg-black/30 rounded-lg p-0.5 border border-white/10">
              {(['en', 'ta', 'hi'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLanguage(l)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                    selectedLanguage === l
                      ? 'bg-[#6E7F45] text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {l === 'en' ? 'EN' : l === 'ta' ? 'தமிழ்' : 'HI'}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportChat}
              title="Download Chat Transcript"
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={clearHistory}
              title="Clear Conversation"
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={closeCopilot}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Focus Mode Filter Pills */}
        <div className="px-4 py-2 bg-[#173B2F]/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-gray-400 font-semibold shrink-0">Focus:</span>
          
          <button
            onClick={() => setActiveFocusMode(activeFocusMode === 'exam' ? null : 'exam')}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              activeFocusMode === 'exam'
                ? 'bg-[#C49A55] text-white border-[#C49A55] font-bold shadow'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <GraduationCap className="w-3 h-3" />
            <span>2M & 16M Exam Prep</span>
          </button>

          <button
            onClick={() => setActiveFocusMode(activeFocusMode === 'code' ? null : 'code')}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              activeFocusMode === 'code'
                ? 'bg-[#6FA9C9] text-white border-[#6FA9C9] font-bold shadow'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>Code & Algorithms</span>
          </button>

          <button
            onClick={() => setActiveFocusMode(activeFocusMode === 'campus' ? null : 'campus')}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              activeFocusMode === 'campus'
                ? 'bg-[#6E7F45] text-white border-[#6E7F45] font-bold shadow'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Campus & Labs</span>
          </button>

          {activeFocusMode && (
            <button
              onClick={() => setActiveFocusMode(null)}
              className="text-[10px] text-gray-400 hover:text-white underline ml-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#173B2F] to-[#285443] text-white border border-[#6E7F45]/50 shadow-md'
                    : 'dark-glass border border-white/15 text-white/90 shadow-lg'
                }`}
              >
                {/* Assistant Message Header */}
                {msg.sender === 'assistant' && (
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold text-[#C49A55]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CampusIQ Grounded Synthesis</span>
                    </div>
                    {msg.confidence && <ConfidenceBadge confidence={msg.confidence} />}
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed">
                  {msg.content || (msg.isStreaming ? 'Synthesizing with Groq LPU inference...' : '')}
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-[#6FA9C9] animate-pulse" />
                  )}
                </div>

                {/* Source Citations with Exact Timestamps */}
                {msg.citations && <SourceCitationList citations={msg.citations} />}

                {/* Message Footer Controls */}
                {msg.sender === 'assistant' && !msg.isStreaming && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
                    <span className="font-mono text-gray-500">{msg.timestamp}</span>

                    <div className="flex items-center gap-2">
                      {/* Thumbs up / down reactions */}
                      <button
                        onClick={() => handleReaction(msg.id, 'like')}
                        title="Helpful Answer"
                        className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                          reactions[msg.id] === 'like' ? 'text-emerald-400' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleReaction(msg.id, 'dislike')}
                        title="Not Accurate"
                        className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                          reactions[msg.id] === 'dislike' ? 'text-rose-400' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>

                      {/* Listen read-aloud */}
                      <button
                        onClick={() => speakMessage(msg.content)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer ml-1"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#6FA9C9]" />
                        <span>Listen</span>
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Quick Quiz Shortcut */}
                      <button
                        onClick={() =>
                          sendMessage(
                            `Generate a 3-question Anna University practice quiz on the topic discussed above: "${msg.content.slice(0, 100)}..."`
                          )
                        }
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer font-semibold ml-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Quiz Me</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up question suggestion pills */}
              {msg.followUpQuestions && msg.followUpQuestions.length > 0 && !isStreaming && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[92%]">
                  {msg.followUpQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-white/15 text-[#C49A55] border border-white/10 transition-colors text-left cursor-pointer"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-[#101815]/95">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                activeFocusMode === 'exam'
                  ? 'Ask for Anna University 2-Mark or 16-Mark question breakdowns...'
                  : activeFocusMode === 'code'
                  ? 'Enter algorithm problem or code to trace & optimize...'
                  : selectedLanguage === 'ta'
                  ? 'கல்லூரி பாடத்திட்டம் அல்லது வளாக விவரங்களை கேளுங்கள்...'
                  : selectedLanguage === 'hi'
                  ? 'अपने कॉलेज और पाठ्यक्रम के बारे में कुछ भी पूछें...'
                  : 'Ask anything about lectures, exam syllabi, or NSCET facilities...'
              }
              disabled={isStreaming}
              className="w-full py-3.5 pl-4 pr-24 rounded-2xl bg-black/40 border border-white/15 focus:border-[#6FA9C9] focus:outline-none text-xs text-white placeholder-gray-500 shadow-inner"
            />

            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                title="Voice Query (Speech-to-Text)"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#C49A55] transition-colors cursor-pointer"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!inputVal.trim() || isStreaming}
                className="p-2 rounded-xl bg-[#C49A55] hover:bg-[#D97736] disabled:opacity-40 text-white transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
            <span>Powered by Groq LPU Inference • NSCET Knowledge Grounded</span>
            <span>Zero Hallucination Strict Guardrail</span>
          </div>
        </div>

      </div>

      {/* Voice Assistant Modal */}
      <VoiceQueryModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onSubmitQuery={(text) => sendMessage(text)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </>
  );
};


