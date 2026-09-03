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
  Maximize2,
  Minimize2,
  Minus,
  MessageSquare,
  Zap,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { SourceCitationList } from '../common/SourceCitation';
import { VoiceQueryModal } from './VoiceQueryModal';

export const CopilotDrawer: React.FC = () => {
  const {
    isOpen,
    openCopilot,
    closeCopilot,
    toggleCopilot,
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
  
  // Floating Window Controls
  const [isExpanded, setIsExpanded] = useState(false); // Toggle between standard float & wide study workstation
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING ACTION LAUNCHER BUTTON (Visible when chatbot is closed)       */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3">
          
          {/* Welcoming Interactive Speech Bubble Callout */}
          {showTooltip && (
            <div
              onClick={() => openCopilot()}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#173B2F] border border-[#C49A55]/40 text-white shadow-2xl shadow-emerald-950/40 cursor-pointer hover:scale-105 transition-all animate-bounce"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>Ask CampusIQ Copilot</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-[#C49A55] text-black font-mono font-bold">
                    GROQ
                  </span>
                </div>
                <span className="text-[10px] text-[#A2B6AC] block">Anna Univ. Reg 2021 & Campus AI</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-gray-400 hover:text-white ml-1 text-xs"
              >
                ×
              </button>
            </div>
          )}

          {/* Floating Circle Button */}
          <button
            onClick={toggleCopilot}
            aria-label="Open CampusIQ AI Copilot"
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#122A22] via-[#173B2F] to-[#285443] border-2 border-[#C49A55] text-white shadow-2xl shadow-emerald-950/60 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            {/* Live pulsing outer aura ring */}
            <span className="absolute inset-0 rounded-full bg-[#C49A55]/20 animate-ping pointer-events-none" />

            {/* CampusIQ / NSCET Crest */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 shadow-sm">
              <img
                src="/assets/nscet-college-logo.jpg"
                alt="NSCET"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Pulsing Green Online Badge */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#122A22] items-center justify-center text-[7px] font-bold text-white">
                ⚡
              </span>
            </span>

            {/* Sparkles Micro-Icon */}
            <div className="absolute -bottom-1 -left-1 p-1 rounded-full bg-[#C49A55] text-black shadow">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING CHATBOT WIDGET WINDOW (Active Floating Format)                */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-in-out flex flex-col ${
            isExpanded
              ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[680px] md:w-[740px] h-[calc(100vh-5rem)] max-h-[850px]'
              : 'bottom-20 sm:bottom-6 right-3 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[460px] md:w-[490px] h-[620px] max-h-[82vh]'
          } rounded-3xl bg-[#101815]/95 backdrop-blur-2xl border-2 border-[#C49A55]/40 shadow-2xl text-white overflow-hidden ring-1 ring-white/10`}
        >
          {/* Header Bar */}
          <div className="p-3.5 sm:p-4 border-b border-white/10 bg-gradient-to-r from-[#173B2F] via-[#1C483A] to-[#122A22] flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C49A55] shadow shrink-0">
                <img
                  src="/assets/nscet-college-logo.jpg"
                  alt="NSCET"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-1">
                    <span>CAMPUS</span>
                    <span className="text-[#6FA9C9]">IQ</span>
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#C49A55]/20 text-[#C49A55] font-mono font-bold border border-[#C49A55]/30">
                    GROQ LPU
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-[#A2B6AC] truncate max-w-[200px] sm:max-w-xs">
                  Anna Univ. Reg 2021 • AI Copilot
                </p>
              </div>
            </div>

            {/* Window Controls: Language + Transcript + Minimize + Expand + Close */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              
              {/* Language Selector */}
              <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/10">
                {(['en', 'ta', 'hi'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLanguage(l)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                      selectedLanguage === l
                        ? 'bg-[#6E7F45] text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'ta' ? 'தமிழ்' : 'HI'}
                  </button>
                ))}
              </div>

              {/* Download Transcript */}
              <button
                onClick={handleExportChat}
                title="Download Chat Transcript (.md)"
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              {/* Clear History */}
              <button
                onClick={clearHistory}
                title="Reset Conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Minimize to Launcher */}
              <button
                onClick={closeCopilot}
                title="Minimize Floating Chatbot"
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Expand / Restore Window Size */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore Normal Window' : 'Expand to Study Workstation'}
                className="hidden sm:block p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={closeCopilot}
                title="Close"
                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Focus Mode Quick Filter Ribbon */}
          <div className="px-3.5 py-1.5 bg-[#173B2F]/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px] scrollbar-none shrink-0">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] shrink-0">Mode:</span>
            
            <button
              onClick={() => setActiveFocusMode(activeFocusMode === 'exam' ? null : 'exam')}
              className={`px-2.5 py-0.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
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
              className={`px-2.5 py-0.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
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
              className={`px-2.5 py-0.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
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
                className="text-[9px] text-gray-400 hover:text-white underline ml-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#173B2F] to-[#285443] text-white border border-[#6E7F45]/50 shadow-md'
                      : 'bg-[#15231D]/90 border border-white/15 text-white/95 shadow-lg'
                  }`}
                >
                  {/* Assistant Header */}
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-white/10 text-[10px]">
                      <div className="flex items-center gap-1.5 font-bold text-[#C49A55]">
                        <Sparkles className="w-3 h-3" />
                        <span>CampusIQ Grounded Synthesis</span>
                      </div>
                      {msg.confidence && <ConfidenceBadge confidence={msg.confidence} />}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed">
                    {msg.content || (msg.isStreaming ? 'Synthesizing response with Groq LPU...' : '')}
                    {msg.isStreaming && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#6FA9C9] animate-pulse" />
                    )}
                  </div>

                  {/* Citations */}
                  {msg.citations && <SourceCitationList citations={msg.citations} />}

                  {/* Message Action Controls */}
                  {msg.sender === 'assistant' && !msg.isStreaming && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
                      <span className="font-mono text-[9px] text-gray-500">{msg.timestamp}</span>

                      <div className="flex items-center gap-1.5">
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
                          title="Needs Improvement"
                          className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                            reactions[msg.id] === 'dislike' ? 'text-rose-400' : 'text-gray-400'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => speakMessage(msg.content)}
                          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer ml-1"
                          title="Listen with Speech Synthesis"
                        >
                          <Volume2 className="w-3 h-3 text-[#6FA9C9]" />
                          <span>Listen</span>
                        </button>

                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            sendMessage(
                              `Generate a 3-question Anna University practice quiz on the topic discussed above: "${msg.content.slice(0, 100)}..."`
                            )
                          }
                          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer font-semibold ml-1 text-[9px]"
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Quiz Me</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Follow-up Question Suggestions */}
                {msg.followUpQuestions && msg.followUpQuestions.length > 0 && !isStreaming && (
                  <div className="mt-2 flex flex-wrap gap-1 max-w-[92%] sm:max-w-[88%]">
                    {msg.followUpQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(q)}
                        className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 hover:bg-white/15 text-[#C49A55] border border-white/10 transition-colors text-left cursor-pointer"
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

          {/* Input Footer */}
          <div className="p-3 sm:p-3.5 border-t border-white/10 bg-[#101815]/95 shrink-0">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  activeFocusMode === 'exam'
                    ? 'Ask for 2-Mark or 16-Mark Anna Univ. question answers...'
                    : activeFocusMode === 'code'
                    ? 'Enter algorithm problem or code to trace & optimize...'
                    : selectedLanguage === 'ta'
                    ? 'பாடத்திட்டம் அல்லது வளாக விவரங்களை கேளுங்கள்...'
                    : selectedLanguage === 'hi'
                    ? 'अपने पाठ्यक्रम या कॉलेज के बारे में पूछें...'
                    : 'Ask anything about lectures, exam syllabi, or campus...'
                }
                disabled={isStreaming}
                className="w-full py-3 pl-3.5 pr-20 rounded-2xl bg-black/40 border border-white/15 focus:border-[#6FA9C9] focus:outline-none text-xs text-white placeholder-gray-500 shadow-inner"
              />

              <div className="absolute right-1.5 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setVoiceModalOpen(true)}
                  title="Voice Input (Speech-to-Text)"
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-[#C49A55] transition-colors cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isStreaming}
                  className="p-2 rounded-xl bg-[#C49A55] hover:bg-[#D97736] disabled:opacity-40 text-white transition-all shadow cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[9px] text-gray-500 px-1">
              <span>Grounded on NSCET & Anna Univ. Reg 2021</span>
              <span>⚡ Groq LPU Inference</span>
            </div>
          </div>

        </div>
      )}

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



