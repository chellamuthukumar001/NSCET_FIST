import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Video,
  Award,
  HelpCircle,
  KeyRound,
  X,
  UserCheck
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, switchRole } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [email, setEmail] = useState('vignesh.cs22@nscet.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'ta'>('en');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogle('STUDENT');
      navigate('/student');
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Google sign-in popup was closed before completion.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setAuthError('Domain not authorized yet in Firebase Auth console.');
      } else {
        setAuthError(err.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleRoleSelect = (roleVal: 'STUDENT' | 'ADMIN', userEmail: string) => {
    setSelectedRole(roleVal);
    setEmail(userEmail);
    setPassword('password123');
    setAuthError(null);
    switchRole(roleVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both your institutional email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      login(email.trim(), selectedRole);
      if (selectedRole === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (err: any) {
      setAuthError('Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-x-hidden selection:bg-[#C49A55]/30">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC FULL-PAGE COLLEGE BACKGROUND WITH BALANCED OVERLAY            */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/campus/nscet-entrance-gate.jpg"
          alt="Nadar Saraswathi College of Engineering & Technology"
          className="w-full h-full object-cover object-center transform scale-100 sm:scale-105 transition-transform duration-1000"
        />
        {/* Balanced Vignette & Translucent Overlay: college gate clearly visible behind the glass card */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07110C]/82 via-[#0B1812]/72 to-[#050B08]/90 backdrop-blur-[1.5px]" />
        
        {/* Ambient Gradient Glow Accents */}
        <div className="absolute top-1/4 -left-10 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-[#173B2F]/40 blur-[100px] sm:blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-72 sm:w-[450px] h-72 sm:h-[450px] rounded-full bg-[#C49A55]/20 blur-[100px] sm:blur-[130px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. RESPONSIVE CONTAINER & TOP FLOATING BAR                                */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Top Floating Navigation & Status Bar */}
        <div className="w-full mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 px-1">
          <Link
            to="/landing"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white bg-black/50 hover:bg-black/70 px-3.5 sm:px-4 py-2 rounded-full backdrop-blur-xl border border-white/20 transition-all shadow-lg hover:border-[#C49A55]/60 group cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C49A55] group-hover:-translate-x-0.5 transition-transform" />
            <span>Campus Home</span>
          </Link>

          {/* Institutional Status & Language Switcher Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 text-[11px] text-emerald-400 font-mono shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="hidden xs:inline">SSO Online</span>
              <span className="xs:hidden">Live</span>
            </div>

            <div className="inline-flex items-center rounded-full bg-black/50 backdrop-blur-xl border border-white/20 p-0.5 shadow-md">
              <button
                type="button"
                onClick={() => setActiveLang('en')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeLang === 'en'
                    ? 'bg-[#C49A55] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('ta')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeLang === 'ta'
                    ? 'bg-[#C49A55] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MOBILE-OPTIMIZED COMPACT HERO HEADER (VISIBLE ON MOBILE ONLY)          */}
        {/* ========================================================================= */}
        <div className="lg:hidden text-center mb-5 w-full max-w-md space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-[#C49A55] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Anna University Regulation 2021</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            Nadar Saraswathi College of Engineering & Technology
          </h1>
          <p className="text-xs text-gray-300">
            CampusIQ Academic Operating System &bull; Secure SSO Gateway
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 4. DUAL-COLUMN DESKTOP / SINGLE-COLUMN MOBILE AUTH SHOWCASE               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: DESKTOP BRANDING & ACADEMIC SHOWCASE (HIDDEN ON MOBILE) */}
          {/* ===================================================================== */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-8 xl:p-10 rounded-3xl bg-gradient-to-br from-[#111E18]/85 via-[#0D1813]/75 to-[#08100C]/85 backdrop-blur-2xl border border-white/20 shadow-2xl text-white relative overflow-hidden h-full min-h-[560px]">
            
            {/* Background Decorative Crest Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#C49A55]/10 blur-3xl pointer-events-none" />
            
            {/* Top Brand Header */}
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-xl border border-[#C49A55]/40 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/nscet-college-logo.jpg"
                    alt="NSCET Crest"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C49A55]/20 border border-[#C49A55]/40 text-[10px] font-bold text-[#C49A55] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Academic Operating System 2.0</span>
                  </div>
                  <h2 className="text-base font-black text-white leading-tight">
                    Nadar Saraswathi College of Engineering & Technology
                  </h2>
                  <p className="text-[11px] text-[#A2B6AC]">
                    Theni, Tamil Nadu &bull; Anna University Reg 2021 &bull; AICTE Approved
                  </p>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h2 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight">
                  One Unified Portal for <br />
                  <span className="bg-gradient-to-r from-[#C49A55] via-[#E2C285] to-[#6FA9C9] bg-clip-text text-transparent">
                    Academic Excellence.
                  </span>
                </h2>
                <p className="text-xs xl:text-sm text-gray-300 leading-relaxed font-normal">
                  Welcome to the official CampusIQ learning gateway. Access 10 Anna University course modules, synchronized YouTube video masterclasses, conceptual practice quizzes, and verified course credentials.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C49A55]/40 transition-colors">
                  <BookOpen className="w-4 h-4 text-[#C49A55] mb-1" />
                  <div className="text-xs font-bold text-white">10 AU Modules</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">CSE, ECE, Mech, Civil & AI</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#6FA9C9]/40 transition-colors">
                  <Video className="w-4 h-4 text-[#6FA9C9] mb-1" />
                  <div className="text-xs font-bold text-white">YouTube Hub</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">Synced transcripts</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
                  <Award className="w-4 h-4 text-emerald-400 mb-1" />
                  <div className="text-xs font-bold text-white">Certificates</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">Verifiable credentials</div>
                </div>
              </div>
            </div>

            {/* Bottom Institutional Quote & Security Badge */}
            <div className="pt-6 border-t border-white/10 mt-6 relative z-10 space-y-3">
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-gray-300 leading-relaxed italic flex items-start gap-2.5">
                <span className="text-2xl text-[#C49A55] font-serif leading-none shrink-0">&ldquo;</span>
                <p>
                  CampusIQ unites our faculty-recorded video lectures and Anna University syllabi into a single interactive learning workspace for every engineering student.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5 text-[#DCE7E1]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Enterprise Security</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="inline-flex items-center gap-1 text-[#C49A55] hover:text-white transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>IT Help Desk</span>
                </button>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: MODERN GLASS AUTHENTICATION CARD (PRIMARY ON MOBILE)    */}
          {/* ===================================================================== */}
          <div className="w-full max-w-md mx-auto lg:max-w-none lg:col-span-6 flex flex-col justify-center">
            <div className="rounded-3xl bg-[#0E1B15]/92 backdrop-blur-3xl p-5 sm:p-8 border border-white/20 shadow-2xl shadow-black/80 text-white space-y-5">
              
              {/* Card Header with Compact College Crest */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-md border border-[#C49A55]/40 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/nscet-college-logo.jpg"
                      alt="NSCET Crest"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-black text-white tracking-tight">CAMPUS</span>
                      <span className="text-lg font-black text-[#6FA9C9]">IQ</span>
                      <span className="text-[9px] font-mono font-bold bg-[#C49A55]/20 text-[#C49A55] px-1.5 py-0.5 rounded border border-[#C49A55]/30">
                        SSO
                      </span>
                    </div>
                    <div className="text-[11px] text-[#A2B6AC] truncate">
                      Single Sign-On Portal
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono font-semibold text-[#C49A55] uppercase block">
                    Reg 2021
                  </span>
                  <span className="text-[10px] text-gray-400">Anna Univ</span>
                </div>
              </div>

              {/* 1. MODERN SLIDING SEGMENTED PORTAL SWITCHER */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-gray-300 px-1 font-semibold uppercase tracking-wider">
                  <span>Select Portal</span>
                  <span className="text-[#C49A55] text-[10px] font-medium">1-Click Role</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10">
                  {/* Student Portal Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('STUDENT', 'vignesh.cs22@nscet.org')}
                    className={`py-2 px-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between min-h-[44px] active:scale-95 ${
                      selectedRole === 'STUDENT'
                        ? 'bg-gradient-to-r from-[#173B2F] to-[#285443] border border-[#6FA9C9]/60 text-white shadow-lg ring-1 ring-[#6FA9C9]/40'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${selectedRole === 'STUDENT' ? 'bg-[#C49A55] text-white shadow' : 'bg-white/10 text-gray-400'}`}>
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold leading-tight">Student</div>
                        <div className="text-[10px] text-gray-300 leading-tight truncate">Vignesh R.</div>
                      </div>
                    </div>
                    {selectedRole === 'STUDENT' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-1" />
                    )}
                  </button>

                  {/* Admin / Faculty Portal Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('ADMIN', 'admin@nscet.org')}
                    className={`py-2 px-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between min-h-[44px] active:scale-95 ${
                      selectedRole === 'ADMIN'
                        ? 'bg-gradient-to-r from-[#173B2F] to-[#285443] border border-[#6FA9C9]/60 text-white shadow-lg ring-1 ring-[#6FA9C9]/40'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${selectedRole === 'ADMIN' ? 'bg-[#C49A55] text-white shadow' : 'bg-white/10 text-gray-400'}`}>
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold leading-tight">Admin</div>
                        <div className="text-[10px] text-gray-300 leading-tight truncate">Er. Anand</div>
                      </div>
                    </div>
                    {selectedRole === 'ADMIN' && (
                      <span className="w-2 h-2 rounded-full bg-[#6FA9C9] animate-pulse shrink-0 ml-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* 2. GOOGLE SSO BUTTON (STUDENT DOMINANT UX) */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-12 px-4 rounded-2xl bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer border border-white/40 disabled:opacity-60 group select-none"
                >
                  <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="truncate">
                    {isGoogleLoading ? 'Connecting to Google...' : 'Sign in with Google (Student SSO)'}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-2.5">
                  <div className="border-t border-white/10 w-full"></div>
                  <span className="bg-[#0E1B15] px-2.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider whitespace-nowrap">
                    or institutional password
                  </span>
                  <div className="border-t border-white/10 w-full"></div>
                </div>
              </div>

              {/* 3. CREDENTIALS FORM */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Error Alert */}
                {authError && (
                  <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5 animate-shake">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Email Field - 16px base font on mobile prevents iOS Safari auto-zoom */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-0.5">
                    <label className="block text-xs font-semibold text-gray-300">
                      Institutional Email / ID
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">@nscet.org</span>
                  </div>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vignesh.cs22@nscet.org"
                      required
                      className="w-full pl-10 pr-4 h-12 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-base sm:text-xs focus:outline-none focus:border-[#C49A55] focus:ring-2 focus:ring-[#C49A55]/40 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field with Caps Lock Detector */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-0.5">
                    <label className="block text-xs font-semibold text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo accounts have pre-filled password: password123')}
                      className="text-[11px] text-[#C49A55] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onKeyUp={handleKeyDown}
                      placeholder="Enter password"
                      required
                      className="w-full pl-10 pr-12 h-12 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-base sm:text-xs focus:outline-none focus:border-[#C49A55] focus:ring-2 focus:ring-[#C49A55]/40 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 text-gray-400 hover:text-white p-2.5 cursor-pointer transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Caps Lock Alert Banner */}
                  {capsLockActive && (
                    <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Caps Lock is ON</span>
                    </div>
                  )}
                </div>

                {/* Remember Me & Security Status */}
                <div className="flex items-center justify-between pt-0.5 px-0.5">
                  <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-black/40 border-white/20 text-[#C49A55] focus:ring-0 cursor-pointer accent-[#C49A55]"
                    />
                    <span>Remember workstation</span>
                  </label>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SSL Active</span>
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 px-6 rounded-2xl bg-gradient-to-r from-[#C49A55] via-[#D97736] to-[#C49A55] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.98] border border-white/20 mt-1 disabled:opacity-60 select-none"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isSubmitting ? 'Authenticating...' : `Sign In as ${selectedRole}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 4. ONE-CLICK DEMO AUTO-FILL CHIPS */}
              <div className="pt-1">
                <div className="text-[11px] text-gray-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
                  <span>Quick 1-Tap Demo Logins:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('STUDENT', 'vignesh.cs22@nscet.org')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white text-[11px] font-semibold border border-white/10 hover:border-[#C49A55]/50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <GraduationCap className="w-4 h-4 text-[#C49A55] shrink-0" />
                    <div className="truncate text-left">
                      <div className="text-white truncate">Vignesh R.</div>
                      <div className="text-[9px] text-gray-400 truncate">Student &bull; CSE</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('ADMIN', 'admin@nscet.org')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white text-[11px] font-semibold border border-white/10 hover:border-[#6FA9C9]/50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Shield className="w-4 h-4 text-[#6FA9C9] shrink-0" />
                    <div className="truncate text-left">
                      <div className="text-white truncate">Er. K. Anand</div>
                      <div className="text-[9px] text-gray-400 truncate">Admin &bull; Office</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Institutional Footer Accreditations */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>RBAC Protected</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-gray-400 hover:text-[#C49A55] transition-colors cursor-pointer"
                >
                  IT Helpdesk
                </button>
                <span>NSCET &bull; 2026</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. IT HELP MODAL POPUP                                                    */}
      {/* ========================================================================= */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-[#111E18] border border-white/20 text-white shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#C49A55]/20 text-[#C49A55] flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            
            <h4 className="text-lg font-bold text-white">NSCET Institutional IT Support</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              If you have forgotten your password or require Google SSO account binding, please reach out to the campus IT Cell:
            </p>
            
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-2 text-gray-300 font-mono">
              <div><strong>Location:</strong> CSE Block, 2nd Floor, Lab 1</div>
              <div><strong>Email:</strong> itcell@nscet.org</div>
              <div><strong>Helpdesk Ext:</strong> 204 / 205 (9 AM - 5 PM)</div>
            </div>
            
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full h-11 rounded-xl bg-[#C49A55] hover:bg-[#D97736] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
