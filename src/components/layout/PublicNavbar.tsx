import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  UserCheck,
  Globe,
  ChevronDown,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { Role } from '../../types';

export const PublicNavbar: React.FC = () => {
  const { currentUser, role, switchRole } = useAuth();
  const { openCopilot, selectedLanguage, setSelectedLanguage } = useCopilot();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'About College', path: '/about' },
    { label: 'Departments', path: '/departments' },
    { label: 'Academic Courses', path: '/courses' },
    { label: 'Open Learning', path: '/public-learning' },
  ];

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  const roles: { role: Role; label: string; name: string; dept: string }[] = [
    { role: 'STUDENT', label: 'Student Persona', name: 'Vignesh R.', dept: '3rd Year CSE' },
    { role: 'FACULTY', label: 'Faculty Persona', name: 'Dr. M. Deepa', dept: 'AP / CSE' },
    { role: 'HOD', label: 'HOD Persona', name: 'Dr. S. Karthik', dept: 'HOD CSE' },
    { role: 'ADMIN', label: 'Admin Persona', name: 'Er. K. Anand', dept: 'Admin Office' },
  ];

  const getDashboardPath = () => {
    switch (role) {
      case 'STUDENT':
        return '/student';
      case 'FACULTY':
        return '/faculty';
      case 'HOD':
        return '/hod';
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return '/admin';
      default:
        return '/student';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#173B2F]/95 backdrop-blur-xl border-b border-[#C49A55]/30 shadow-2xl py-0'
          : 'bg-[#173B2F]/85 backdrop-blur-md border-b border-white/10 py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          
          {/* Logo & College Identity with Official Attached NSCET Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-11 sm:h-12 px-2.5 py-1 rounded-xl bg-white shadow-md border border-[#C49A55]/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/assets/nscet-college-logo.jpg"
                alt="Nadar Saraswathi College of Engineering & Technology Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">CAMPUS</span>
                <span className="text-xl font-black text-[#6FA9C9]">IQ</span>
                <span className="hidden sm:inline-block text-[9px] font-mono font-bold bg-[#C49A55]/20 text-[#C49A55] px-1.5 py-0.5 rounded border border-[#C49A55]/30">
                  NSCET
                </span>
              </div>
              <span className="text-[10px] text-[#A2B6AC] tracking-wider uppercase font-semibold line-clamp-1">
                Engineering Excellence for Empowerment
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-2xl border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C49A55] to-[#D97736] text-white shadow-md font-bold'
                      : 'text-[#DCE7E1] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions & Persona Switcher */}
          <div className="hidden lg:flex items-center gap-2.5">
            
            {/* Multilingual Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/30 hover:bg-white/10 text-xs font-semibold text-white/90 border border-white/15 transition-all cursor-pointer shadow-inner"
              >
                <Globe className="w-3.5 h-3.5 text-[#6FA9C9]" />
                <span>{languages.find((l) => l.code === selectedLanguage)?.native}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 py-1.5 bg-[#101815] border border-white/20 rounded-2xl shadow-2xl z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-gray-400">
                    Language / மொழி
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLanguage(l.code as 'en' | 'ta' | 'hi');
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 cursor-pointer ${
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

            {/* Ask CampusIQ AI Pill */}
            <button
              onClick={() => openCopilot('What courses and syllabus modules are offered at NSCET?')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6E7F45] to-[#285443] text-white border border-white/20 hover:brightness-110 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49A55] animate-pulse" />
              <span>Ask AI</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 border border-white/15 text-xs text-white hover:border-white/30 transition-all cursor-pointer shadow-inner">
                <UserCheck className="w-3.5 h-3.5 text-[#C49A55]" />
                <span className="font-semibold text-white/90">
                  <strong className="text-[#6FA9C9]">{role}</strong>
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              <div className="absolute right-0 mt-2 w-56 p-2 bg-[#101815] border border-white/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-black text-[#C49A55] tracking-wider border-b border-white/10 mb-1">
                  1-Click Role Switcher
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => switchRole(r.role)}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                      role === r.role ? 'bg-[#173B2F] text-white font-bold border border-[#6FA9C9]/40' : 'text-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white leading-tight">{r.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{r.name} • {r.dept}</div>
                    </div>
                    {role === r.role && <CheckCircle2 className="w-4 h-4 text-[#C49A55] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Access Button */}
            <Link
              to={getDashboardPath()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#C49A55] to-[#D97736] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <span>{currentUser ? `${role} Portal` : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openCopilot()}
              className="p-2 rounded-xl bg-white/10 text-[#C49A55] border border-white/10 shadow-sm"
              title="Open AI Copilot"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white border border-white/10 shadow-sm"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101815]/95 backdrop-blur-2xl border-b border-white/15 px-4 pt-2 pb-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                  location.pathname === link.path
                    ? 'bg-[#173B2F] text-white font-bold border border-[#C49A55]/40'
                    : 'text-[#DCE7E1] hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Selector in Mobile */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setSelectedLanguage(l.code as 'en' | 'ta' | 'hi')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                  selectedLanguage === l.code
                    ? 'bg-[#C49A55] text-white font-bold shadow'
                    : 'text-gray-400'
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>

          {/* Persona Switcher Grid */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="text-[10px] uppercase font-bold text-[#C49A55] px-1">
              Select Demo Persona
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    switchRole(r.role);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-xs text-left border transition-all ${
                    role === r.role
                      ? 'bg-[#173B2F] border-[#6FA9C9] text-white font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-300'
                  }`}
                >
                  <div className="font-bold">{r.label}</div>
                  <div className="text-[10px] text-gray-400">{r.name}</div>
                </button>
              ))}
            </div>

            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] text-white font-black text-xs uppercase tracking-wider shadow-lg mt-2"
            >
              <span>Launch {role} Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

