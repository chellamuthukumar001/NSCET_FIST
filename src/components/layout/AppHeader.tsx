import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  GraduationCap,
  User,
  Shield
} from 'lucide-react';
import { Role } from '../../types';
import { VoiceQueryModal } from '../copilot/VoiceQueryModal';

export const AppHeader: React.FC = () => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { openCopilot, selectedLanguage, setSelectedLanguage } = useCopilot();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const location = useLocation();

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
    { role: 'STUDENT', label: 'Student Portal', name: 'Vignesh R. (3rd Yr CSE)' },
    { role: 'ADMIN', label: 'Admin Portal', name: 'Er. K. Anand (Admin Office)' },
  ];

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  const getDashboardRoot = () => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN': return '/admin';
      case 'STUDENT':
      default: return '/student';
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/student') return 'Dashboard';
    if (path.includes('/student/courses')) return '10 Course Modules';
    if (path.includes('/student/videos')) return 'YouTube Video Hub';
    if (path.includes('/student/certificates')) return 'Certificates';
    if (path.includes('/student/quiz')) return 'AI Practice Quiz';
    if (path.includes('/student/progress')) return 'Progress Analytics';
    if (path.includes('/student/assistant')) return 'CampusIQ Copilot';
    if (path.includes('/admin')) return 'Academic Control';
    if (path.includes('/faculty')) return 'Faculty Workspace';
    if (path.includes('/hod')) return 'Department Leadership';
    return 'Workspace';
  };

  return (
    <header className="sticky top-0 z-20 bg-[#0B1511]/92 backdrop-blur-2xl border-b border-white/10 text-white transition-all shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Left: Mobile Logo & Desktop Breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Mobile Brand Logo */}
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
          <div className="hidden lg:flex items-center gap-3">
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
              <span className="text-[#C49A55] font-bold">/</span>
              <span className="text-xs font-semibold text-[#DCE7E1]">
                {getPageTitle()}
              </span>
            </Link>

            {/* Quick Copilot Command Palette Pill */}
            <div className="flex items-center gap-1.5 bg-black/40 hover:bg-black/55 border border-white/15 focus-within:border-[#C49A55] focus-within:ring-1 focus-within:ring-[#C49A55]/40 rounded-xl px-3 py-1.5 transition-all shadow-inner w-72">
              <Search className="w-3.5 h-3.5 text-[#C49A55] shrink-0" />
              <button
                onClick={() => openCopilot()}
                className="flex-1 text-left text-[11px] text-white/70 hover:text-white truncate cursor-pointer"
              >
                Ask Copilot or search lectures...
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

        {/* Right: Actions, Language Switcher, Notifications & Persona */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/30 hover:bg-white/10 text-xs font-medium border border-white/10 transition-colors cursor-pointer shadow-inner"
            >
              <Globe className="w-3.5 h-3.5 text-[#6FA9C9]" />
              <span className="hidden sm:inline">
                {languages.find((l) => l.code === selectedLanguage)?.native}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 py-1 bg-[#101815] border border-white/20 rounded-2xl shadow-2xl z-50 animate-fadeIn">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLanguage(l.code as 'en' | 'ta');
                      setLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-white/10 cursor-pointer ${
                      selectedLanguage === l.code ? 'text-[#C49A55] font-bold' : 'text-gray-300'
                    }`}
                  >
                    <span>{l.native}</span>
                    {selectedLanguage === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A55]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl bg-black/30 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer shadow-inner"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C49A55] text-white text-[9px] font-black flex items-center justify-center shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#101E17] border border-white/20 rounded-3xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-black/30">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#C49A55]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Academic Alerts
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllAsRead()}
                      className="text-[10px] text-[#C49A55] hover:underline font-semibold cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-400">
                      No new academic notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3 text-xs hover:bg-white/5 transition-colors cursor-pointer ${
                          !n.read ? 'bg-white/5 border-l-2 border-[#C49A55]' : ''
                        }`}
                      >
                        <div className="font-semibold text-white leading-tight">{n.title}</div>
                        <div className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">{n.message}</div>
                        <div className="text-[9px] text-[#A2B6AC] mt-1 font-mono">{n.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-white/10 bg-black/20 text-center">
                  <Link
                    to="/student/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="text-[11px] text-[#C49A55] hover:underline font-semibold"
                  >
                    View All Notifications &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Copilot Quick Launch Trigger */}
          <button
            onClick={() => openCopilot()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>Copilot</span>
          </button>

          {/* User Persona Capsule Trigger */}
          <div className="relative">
            <button
              onClick={() => setPersonaOpen(!personaOpen)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-black/30 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer shadow-inner"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/10 border border-[#C49A55]/50 shrink-0">
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 m-1.5 text-[#C49A55]" />
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-white truncate max-w-[100px]">
                {currentUser?.name?.split(' ')[0] || 'User'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {personaOpen && (
              <div className="absolute right-0 mt-2 w-56 py-2 bg-[#101E17] border border-white/20 rounded-2xl shadow-2xl z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-white/10">
                  <div className="text-xs font-bold text-white truncate">{currentUser?.name}</div>
                  <div className="text-[10px] text-[#A2B6AC] truncate">{currentUser?.email}</div>
                  <div className="text-[9px] font-mono text-[#C49A55] uppercase mt-0.5">{role} Portal</div>
                </div>

                <div className="py-1">
                  <div className="px-3 py-1 text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                    Quick Role Switch
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setPersonaOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-white/10 cursor-pointer ${
                        role === r.role ? 'text-[#C49A55] font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span>{r.label}</span>
                      {role === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A55]" />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-1">
                  <Link
                    to="/student/profile"
                    onClick={() => setPersonaOpen(false)}
                    className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#C49A55]" />
                    <span>Profile & Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setPersonaOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Voice Query Modal Component */}
      <VoiceQueryModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onSubmitQuery={(text) => {
          setVoiceOpen(false);
          openCopilot(text);
        }}
        selectedLanguage={selectedLanguage as 'en' | 'ta'}
        onSelectLanguage={(lang) => setSelectedLanguage(lang)}
      />
    </header>
  );
};
