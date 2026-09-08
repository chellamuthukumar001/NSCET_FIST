import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [email, setEmail] = useState('vignesh.cs22@nscet.org');
  const [password, setPassword] = useState('password123');

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
      navigate('/student');
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

