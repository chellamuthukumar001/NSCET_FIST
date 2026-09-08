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
  HelpCircle,
  ArrowLeft,
  KeyRound
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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogle('STUDENT');
      navigate('/landing');
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
        navigate('/landing');
      }
    } catch (err: any) {
      setAuthError('Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 pt-24 pb-16 overflow-hidden bg-[#0A120E] selection:bg-[#C49A55]/30">
      
      {/* Background Campus Photograph with Ambient Depth Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/campus/nscet-entrance-gate.jpg"
          alt="NSCET Entrance Gate"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A120E]/95 via-[#0D1813]/90 to-[#0A120E]" />
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#173B2F]/50 blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#C49A55]/20 blur-[130px] pointer-events-none" />
      </div>

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-lg">
        
        {/* Back Link to Campus Home */}
        <div className="mb-4 flex items-center justify-between px-2">
          <Link
            to="/landing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Campus Home</span>
          </Link>
          <span className="text-[11px] font-mono text-[#C49A55] uppercase tracking-wider">
            Reg 2021 &bull; Anna University
          </span>
        </div>

        {/* Enhanced Glassmorphic Card */}
        <div className="rounded-3xl bg-[#111C17]/85 backdrop-blur-2xl p-6 sm:p-9 border border-white/15 shadow-2xl shadow-black/80 text-white space-y-6">
          
          {/* Header & Official College Identity */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <div className="w-18 h-18 rounded-2xl mx-auto p-1.5 bg-gradient-to-tr from-[#C49A55] via-[#173B2F] to-[#6FA9C9] shadow-xl overflow-hidden border border-white/30 flex items-center justify-center">
                <img
                  src="/assets/nscet-college-logo.jpg"
                  alt="NSCET Logo"
                  className="w-full h-full object-contain rounded-xl bg-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#111C17] flex items-center justify-center text-white" title="SSO Active">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-2xl font-black text-white tracking-tight">CAMPUS</span>
                <span className="text-2xl font-black text-[#6FA9C9]">IQ</span>
                <span className="text-[10px] font-mono font-bold bg-[#C49A55]/20 text-[#C49A55] px-2 py-0.5 rounded border border-[#C49A55]/30">
                  SSO
                </span>
              </div>
              <h1 className="text-xs font-bold uppercase tracking-wider text-[#C49A55] mt-0.5">
                Nadar Saraswathi College of Engineering & Technology
              </h1>
              <p className="text-[11px] text-[#A2B6AC] mt-0.5">
                Accredited by AICTE, New Delhi &bull; Affiliated to Anna University, Chennai
              </p>
            </div>
          </div>

          {/* Interactive Portal Switcher: Student vs Admin */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-gray-300 px-1 font-semibold uppercase tracking-wider">
              <span>Select Access Portal</span>
              <span className="text-[#C49A55] text-[10px]">1-Click Demo Accounts</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Student Portal Card */}
              <button
                type="button"
                onClick={() => handleRoleSelect('STUDENT', 'vignesh.cs22@nscet.org')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'STUDENT'
                    ? 'bg-gradient-to-br from-[#173B2F] to-[#0E261E] border-[#6FA9C9] text-white shadow-lg ring-1 ring-[#6FA9C9]/50 scale-[1.02]'
                    : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${selectedRole === 'STUDENT' ? 'bg-[#C49A55] text-white shadow' : 'bg-white/10 text-gray-400'}`}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  {selectedRole === 'STUDENT' && (
                    <span className="w-2 h-2 rounded-full bg-[#6FA9C9] animate-ping" />
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#C49A55]">Student Portal</div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">Vignesh R.</div>
                  <div className="text-[10px] text-gray-300 truncate">3rd Year CSE &bull; Roll 921022</div>
                </div>
              </button>

              {/* Admin Portal Card */}
              <button
                type="button"
                onClick={() => handleRoleSelect('ADMIN', 'admin@nscet.org')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'ADMIN'
                    ? 'bg-gradient-to-br from-[#173B2F] to-[#0E261E] border-[#6FA9C9] text-white shadow-lg ring-1 ring-[#6FA9C9]/50 scale-[1.02]'
                    : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${selectedRole === 'ADMIN' ? 'bg-[#C49A55] text-white shadow' : 'bg-white/10 text-gray-400'}`}>
                    <Shield className="w-4 h-4" />
                  </div>
                  {selectedRole === 'ADMIN' && (
                    <span className="w-2 h-2 rounded-full bg-[#6FA9C9] animate-ping" />
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#C49A55]">Admin Portal</div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">Er. K. Anand</div>
                  <div className="text-[10px] text-gray-300 truncate">Office of Academic Affairs</div>
                </div>
              </button>
            </div>
          </div>

          {/* Google SSO Button (Student Login) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-white/40 disabled:opacity-60"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
              <span>{isGoogleLoading ? 'Connecting to Google SSO...' : 'Sign in with Google (Student SSO)'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-white/10 w-full"></div>
              <span className="bg-[#111C17] px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider whitespace-nowrap">
                or institutional password
              </span>
              <div className="border-t border-white/10 w-full"></div>
            </div>
          </div>

          {/* Form Credentials */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Message Banner */}
            {authError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300">
                Institutional Email / Roll Number
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@nscet.org"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#C49A55] focus:ring-1 focus:ring-[#C49A55]/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo accounts have pre-filled password: password123')}
                  className="text-[11px] text-[#C49A55] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#C49A55] focus:ring-1 focus:ring-[#C49A55]/50 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-white p-1 cursor-pointer transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-black/40 border-white/20 text-[#C49A55] focus:ring-0 cursor-pointer accent-[#C49A55]"
                />
                <span>Remember this workstation</span>
              </label>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C49A55] via-[#D97736] to-[#C49A55] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] border border-white/20 mt-2 disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Authenticating...' : `Sign In to ${selectedRole} Portal`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Institutional Trust Badges */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>CampusIQ Multi-Tenant RBAC</span>
            </span>
            <span>Anna University Reg 2021</span>
            <span>NSCET IT Cell</span>
          </div>

        </div>

      </div>
    </div>
  );
};
