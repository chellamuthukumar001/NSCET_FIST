import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  GraduationCap,
  CheckCircle,
  Save,
  RefreshCw,
  BadgeCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, role, updateUserProfile } = useAuth();

  // State bound strictly to Google account details
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state when currentUser updates
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAvatarUrl(currentUser.avatarUrl || '');
    }
  }, [currentUser]);

  const getInitials = (nameStr: string) => {
    if (!nameStr) return 'ST';
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return nameStr.substring(0, 2).toUpperCase();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (updateUserProfile) {
        await updateUserProfile({
          name: fullName.trim() || currentUser?.name,
        });
      }
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1E4D3E] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Nadar Saraswathi College of Engineering & Technology</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Student Profile
          </h1>

          <p className="text-xs sm:text-sm text-[#DCE7E1]">
            Verified credentials synchronized directly from your Google Account.
          </p>
        </div>
      </div>

      {/* 2. Google Details Profile Card */}
      <div className="rounded-3xl bg-[#122A22] text-white p-6 sm:p-8 border border-[#C49A55]/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          {/* Google Profile Photo / Initials */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#C49A55] shadow-xl bg-black/40 flex items-center justify-center shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName || 'Student'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}
            {!avatarUrl && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#173B2F] via-[#20493B] to-[#C49A55]/30 text-[#C49A55] font-black text-2xl">
                <span>{getInitials(fullName || currentUser?.name || currentUser?.email || 'Student')}</span>
                <span className="text-[9px] uppercase tracking-widest text-emerald-300 font-mono mt-0.5">NSCET</span>
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#122A22]" title="Google Account Active" />
          </div>

          {/* Core Google Account Info */}
          <div className="space-y-2.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {fullName || currentUser?.name || 'Student User'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C49A55] text-black text-[10px] font-black uppercase tracking-wider">
                {role}
              </span>
            </div>

            {/* Google Email with Verified Badge */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-300">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold font-mono">{email || currentUser?.email}</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-sans">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Google Account</span>
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] text-gray-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/30 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>Google Single Sign-On</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/30 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>NSCET Student Portal Access</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Edit Name & Account Details Form */}
      <form onSubmit={handleSaveProfile} className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-gray-900">
            Edit Profile Details
          </h3>
          <p className="text-xs text-gray-500">
            Your profile details are retrieved from your Google Account. You can update your display name below.
          </p>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile name updated successfully!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>Full Name (from Google):</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all text-sm"
            />
          </div>

          {/* Email Address (Read-only Google Email) */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>Google Account Email:</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <BadgeCheck className="w-3 h-3" /> Managed by Google
              </span>
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-3 rounded-xl bg-gray-100 border border-gray-200 font-semibold text-gray-600 cursor-not-allowed text-sm font-mono"
            />
            <span className="text-[10px] text-gray-400 block pt-0.5">
              This email is authenticated via Google SSO and cannot be modified here.
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#C49A55]" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#C49A55]" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
};
