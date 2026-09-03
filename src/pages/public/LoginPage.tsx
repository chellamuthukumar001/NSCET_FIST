import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Lock, Mail, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchRole, allDemoUsers } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('vignesh.cs22@nscet.org');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');

  const handleDemoPersonaClick = (roleVal: Role, userEmail: string) => {
    setSelectedRole(roleVal);
    setEmail(userEmail);
    switchRole(roleVal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);

    switch (selectedRole) {
      case 'STUDENT':
        navigate('/student');
        break;
      case 'FACULTY':
        navigate('/faculty');
        break;
      case 'HOD':
        navigate('/hod');
        break;
      case 'ADMIN':
      case 'SUPER_ADMIN':
        navigate('/admin');
        break;
      default:
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

        {/* 1-Click Persona Selector for seamless review */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-300 px-1 font-semibold uppercase tracking-wider">
            <span>Instant Demo Personas</span>
            <span className="text-[#C49A55] text-[10px]">Tap to Switch</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {allDemoUsers.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleDemoPersonaClick(u.role, u.email)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === u.role
                    ? 'bg-[#173B2F] border-[#6FA9C9] text-white shadow-md'
                    : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="text-xs font-bold truncate">{u.name}</div>
                <div className="text-[10px] text-[#C49A55] font-semibold uppercase">
                  {u.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Institutional Email / Roll Number
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
            <span>Sign In as {selectedRole}</span>
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

