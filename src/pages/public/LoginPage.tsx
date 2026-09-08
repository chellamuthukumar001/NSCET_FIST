import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, switchRole } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [email, setEmail] = useState('vignesh.cs22@nscet.org');
  const [password, setPassword] = useState('password123');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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
        setAuthError('Google sign-in was cancelled.');
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
    switchRole(roleVal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);

    if (selectedRole === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/landing');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 pt-24 pb-12 overflow-hidden">
      
      {/* Background Campus Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/campus/nscet-entrance-gate.jpg"
          alt="NSCET Entrance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#101815]/80 backdrop-blur-sm" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl dark-glass p-6 sm:p-8 border border-white/20 shadow-2xl text-white">
        
        {/* Logo Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 p-1 bg-gradient-to-tr from-[#C49A55] to-[#6FA9C9] shadow-xl overflow-hidden border border-white/30">
            <img
              src="/assets/campusiq-logo.png"
              alt="CampusIQ Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1">
            <span>CAMPUS</span>
            <span className="text-[#6FA9C9]">IQ</span>
          </h2>
          <p className="text-xs text-[#C49A55] font-semibold uppercase tracking-wider mt-0.5">
            Institutional Single Sign-On
          </p>
          <p className="text-[11px] text-[#A2B6AC] mt-1">
            Nadar Saraswathi College of Engineering & Technology
          </p>
        </div>

        {/* 2 Exclusive Logins: Student & Admin */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-300 px-1 font-semibold uppercase tracking-wider">
            <span>Choose Login Portal</span>
            <span className="text-[#C49A55] text-[10px]">Select Role</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleRoleSelect('STUDENT', 'vignesh.cs22@nscet.org')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'STUDENT'
                  ? 'bg-[#173B2F] border-[#6FA9C9] text-white shadow-lg ring-1 ring-[#6FA9C9]/50'
                  : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${selectedRole === 'STUDENT' ? 'bg-[#C49A55] text-white' : 'bg-white/10 text-gray-400'}`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#C49A55]">Student</span>
              </div>
              <div>
                <div className="text-xs font-bold text-white truncate">Vignesh R.</div>
                <div className="text-[10px] text-gray-300 truncate">3rd Year CSE</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('ADMIN', 'admin@nscet.org')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'ADMIN'
                  ? 'bg-[#173B2F] border-[#6FA9C9] text-white shadow-lg ring-1 ring-[#6FA9C9]/50'
                  : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${selectedRole === 'ADMIN' ? 'bg-[#C49A55] text-white' : 'bg-white/10 text-gray-400'}`}>
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#C49A55]">Admin</span>
              </div>
              <div>
                <div className="text-xs font-bold text-white truncate">Er. K. Anand</div>
                <div className="text-[10px] text-gray-300 truncate">Admin Office</div>
              </div>
            </button>
          </div>
        </div>

        {/* Google Authentication for Student Login */}
        <div className="mb-5 space-y-2">
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
            <span>{isGoogleLoading ? 'Connecting to Google...' : 'Sign in with Google (Student Login)'}</span>
          </button>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs text-center leading-tight">
              {authError}
            </div>
          )}

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-white/15 w-full"></div>
            <span className="bg-[#101815] px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider whitespace-nowrap">
              or continue with password
            </span>
            <div className="border-t border-white/15 w-full"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              {selectedRole === 'STUDENT' ? 'Student Roll Number / Email' : 'Admin Institutional Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:border-[#6FA9C9] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Campus Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:border-[#6FA9C9] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mt-2"
          >
            <span>Sign In to {selectedRole === 'STUDENT' ? 'Student Portal' : 'Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Institutional OAuth2 / SSO Protected</span>
        </div>

      </div>

    </div>
  );
};

