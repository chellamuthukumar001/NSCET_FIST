import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Sparkles,
  Bell,
  Globe,
  Mic,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Search,
  Command,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { Role } from '../../types';
import { VoiceQueryModal } from '../copilot/VoiceQueryModal';

export const AppHeader: React.FC = () => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { openCopilot, selectedLanguage, setSelectedLanguage, sendMessage } = useCopilot();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut to open AI Copilot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCopilot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openCopilot]);

  const roles: { role: Role; label: string; name: string }[] = [
    { role: 'STUDENT', label: 'Student Persona', name: 'Vignesh R. (3rd Yr CSE)' },
    { role: 'FACULTY', label: 'Faculty Persona', name: 'Dr. M. Deepa (AP / CSE)' },
    { role: 'HOD', label: 'HOD Persona', name: 'Dr. S. Karthik (HOD CSE)' },
    { role: 'ADMIN', label: 'Admin Persona', name: 'Er. K. Anand (Admin Office)' },
  ];

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  const getDashboardRoot = () => {
    switch (role) {
      case 'STUDENT': return '/student';
      case 'FACULTY': return '/faculty';
      case 'HOD': return '/hod';
      case 'ADMIN':
      case 'SUPER_ADMIN': return '/admin';
      default: return '/student';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-[#173B2F]/95 backdrop-blur-xl border-b border-[#C49A55]/20 text-white transition-all shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Mobile Brand Logo & Desktop Contextual Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Mobile Brand Logo with Official Attached NSCET Emblem */}
          <Link to="/" className="flex lg:hidden items-center gap-2">
            <div className="h-9 px-2 py-0.5 rounded-lg bg-white shadow-sm border border-[#C49A55]/50 flex items-center shrink-0">
              <img
                src="/assets/nscet-college-logo.jpg"
                alt="NSCET Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight flex items-center gap-1">
                <span>CAMPUS</span>
                <span className="text-[#6FA9C9]">IQ</span>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#C49A55] font-semibold -mt-0.5">
                {role} PORTAL
              </span>
            </div>
          </Link>

          {/* Desktop Contextual Breadcrumb & Quick AI Search Bar */}
          <div className="hidden lg:flex items-center gap-3.5">
            <Link
              to={getDashboardRoot()}
              className="flex items-center gap-2 text-xs hover:opacity-90 transition-opacity"
            >
              <GraduationCap className="w-4 h-4 text-[#C49A55]" />
              <span className="text-white/70 font-medium">NSCET Theni</span>
              <span className="text-[#C49A55] font-bold">/</span>
              <span className="font-bold text-white tracking-wide uppercase text-[11px] bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10 shadow-inner">
                {role} Portal
              </span>
            </Link>

            {/* Quick Copilot Search Input Pill */}
            <div className="flex items-center gap-1 bg-black/30 hover:bg-black/45 border border-white/15 focus-within:border-[#C49A55] rounded-xl px-3 py-1.5 transition-all shadow-inner w-72">
              <Search className="w-3.5 h-3.5 text-[#C49A55] shrink-0" />
              <button
                onClick={() => openCopilot()}
                className="flex-1 text-left text-[11px] text-white/70 hover:text-white truncate cursor-pointer"
              >
                Ask CampusIQ Copilot...
              </button>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[9px] font-mono text-white/50 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                <span>⌘K</span>
              </kbd>
              <button
                onClick={() => setVoiceOpen(true)}
                className="p-1 rounded-md text-[#C49A55] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Voice Assistant (Mic)"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Actions, Languages, Copilot & Persona */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/25 hover:bg-white/10 text-xs font-medium border border-white/10 transition-colors cursor-pointer shadow-inner"
            >
              <Globe className="w-3.5 h-3.5 text-[#6FA9C9]" />
              <span className="hidden sm:inline">
                {languages.find((l) => l.code === selectedLanguage)?.native}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 py-1 bg-[#101815] border border-white/20 rounded-2xl shadow-2xl z-50 animate-fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLanguage(l.code as 'en' | 'ta');
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 cursor-pointer ${
                      selectedLanguage === l.code ? 'text-[#6FA9C9] font-bold bg-white/5' : 'text-gray-300'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] text-[#C49A55]">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ask CampusIQ AI Trigger Button */}
          <button
            onClick={() => openCopilot()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#6E7F45] to-[#285443] hover:from-[#7B8F4F] hover:to-[#316853] text-white text-xs font-bold shadow-md border border-white/15 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C49A55] animate-pulse" />
            <span className="hidden md:inline">Ask Copilot</span>
          </button>

          {/* Notifications Bell with Category Badges */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl bg-black/25 hover:bg-white/10 text-white/90 border border-white/10 transition-colors cursor-pointer shadow-inner"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 py-2 bg-[#101815] border border-white/20 rounded-2xl shadow-2xl z-50 animate-fade-in">
                <div className="px-4 py-2 flex items-center justify-between border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
                    Institutional Notices ({unreadCount} new)
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-[#6FA9C9] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-500">
                      No notifications at this time.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3 text-xs transition-colors cursor-pointer ${
                          n.read ? 'opacity-60 hover:opacity-90' : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white">{n.title}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-gray-300 line-clamp-2">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Persona Switcher Quick Pill */}
          <div className="relative">
            <button
              onClick={() => setPersonaOpen(!personaOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 border border-white/15 text-xs text-white transition-all cursor-pointer shadow-inner"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 border border-[#C49A55]/70 shrink-0">
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <UserCheck className="w-4 h-4 m-1 text-[#C49A55]" />
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                  {currentUser?.name}
                </span>
                <span className="text-[9px] text-[#A2B6AC] uppercase font-semibold">{role}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {personaOpen && (
              <div className="absolute right-0 mt-2 w-64 p-2 bg-[#101815] border border-white/20 rounded-2xl shadow-2xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#C49A55] uppercase tracking-wider border-b border-white/10 mb-1">
                  1-Click Role Switcher
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setPersonaOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                      role === r.role ? 'bg-[#173B2F] text-white font-bold border border-[#6FA9C9]/40 shadow-sm' : 'text-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white">{r.label}</div>
                      <div className="text-[10px] text-gray-400">{r.name}</div>
                    </div>
                    {role === r.role && <CheckCircle2 className="w-4 h-4 text-[#C49A55] shrink-0" />}
                  </button>
                ))}
                <div className="border-t border-white/10 mt-1.5 pt-1.5">
                  <Link
                    to="/"
                    onClick={() => setPersonaOpen(false)}
                    className="w-full px-3 py-2 text-xs text-gray-300 hover:bg-white/10 rounded-xl flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C49A55]" />
                    <span>Public Homepage</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Voice Query Modal Integration */}
      <VoiceQueryModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onSubmitQuery={(q) => sendMessage(q)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </header>
  );
};

