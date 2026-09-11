import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError(null);
    try {
      const user = await loginWithGoogle();
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
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

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password.trim()) {
      setAuthError('Please enter both your institutional email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await login(cleanEmail, password.trim());
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch {
      setAuthError('Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 selection:bg-[#C49A55]/30">
      
      {/* 1. CINEMATIC FULL-PAGE COLLEGE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/campus/nscet-entrance-gate.jpg"
          alt="Nadar Saraswathi College of Engineering & Technology"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        {/* Dark Emerald & Obsidian Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07110C]/90 via-[#0B1812]/80 to-[#050B08]/95 backdrop-blur-[2px]" />
      </div>

      {/* 2. CENTERED CLEAN LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl bg-[#0E1B15]/95 backdrop-blur-2xl p-6 sm:p-8 border border-white/20 shadow-2xl shadow-black/80 text-white space-y-6">
          
          {/* Card Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border-2 border-[#C49A55]/50 mx-auto flex items-center justify-center">
              <img
                src="/assets/nscet-college-logo.jpg"
                alt="NSCET Crest"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C49A55]/20 border border-[#C49A55]/40 text-[10px] font-bold text-[#C49A55] uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Anna University Reg 2021</span>
              </div>
              <h1 className="text-lg font-black text-white leading-tight">
                Nadar Saraswathi College of Engineering & Technology
              </h1>
              <p className="text-xs text-[#A2B6AC] font-medium">
                CampusIQ Academic Portal
              </p>
            </div>
          </div>

          {/* Primary Action: Google Single Sign-On */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full h-12 px-4 rounded-2xl bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-white/40 disabled:opacity-60 group select-none"
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
              <span>
                {isGoogleLoading ? 'Connecting to Google...' : 'Sign in with Google'}
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 w-full"></div>
              <span className="bg-[#0E1B15] px-2.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider whitespace-nowrap">
                or sign in with email
              </span>
              <div className="border-t border-white/10 w-full"></div>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Alert */}
            {authError && (
              <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@gmail.com or student@nscet.org"
                  required
                  className="w-full pl-10 pr-4 h-12 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C49A55] focus:ring-2 focus:ring-[#C49A55]/40 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyDown}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 h-12 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C49A55] focus:ring-2 focus:ring-[#C49A55]/40 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-gray-400 hover:text-white p-2.5 cursor-pointer transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {capsLockActive && (
                <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Caps Lock is ON</span>
                </div>
              )}
            </div>

            {/* Remember */}
            <div className="flex items-center text-xs text-gray-300 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-black/40 border-white/20 text-[#C49A55] focus:ring-0 cursor-pointer accent-[#C49A55]"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 px-6 rounded-2xl bg-gradient-to-r from-[#C49A55] via-[#D97736] to-[#C49A55] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] border border-white/20 mt-2 disabled:opacity-60 select-none"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Clean Footer */}
          <div className="text-center text-[10px] text-gray-500 pt-1">
            &copy; 2026 Nadar Saraswathi College of Engineering & Technology
          </div>

        </div>
      </div>

    </div>
  );
};

