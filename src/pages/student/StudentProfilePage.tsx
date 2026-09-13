import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  CheckCircle,
  Save,
  RefreshCw,
  BadgeCheck,
  Lock,
  Calendar,
  Layers,
  Sparkles,
  Camera,
  Bus,
  Home
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, role, updateUserProfile } = useAuth();

  // Form State bound to authenticated user
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [studentId, setStudentId] = useState(currentUser?.studentId || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [departmentName, setDepartmentName] = useState(currentUser?.departmentName || 'Computer Science & Engineering');
  const [program, setProgram] = useState(currentUser?.program || 'B.E. Computer Science & Engineering');
  const [semester, setSemester] = useState(currentUser?.semester || 5);
  const [batch, setBatch] = useState(currentUser?.batch || '2022-2026');
  const [studentType, setStudentType] = useState<'Day Scholar' | 'Hostel'>((currentUser?.studentType as any) || 'Day Scholar');
  const [busRoute, setBusRoute] = useState(currentUser?.busRoute || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state when currentUser updates (e.g., on login or backend fetch)
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setStudentId(currentUser.studentId || '');
      setPhone(currentUser.phone || '');
      setDepartmentName(currentUser.departmentName || 'Computer Science & Engineering');
      setProgram(currentUser.program || 'B.E. Computer Science & Engineering');
      setSemester(currentUser.semester || 5);
      setBatch(currentUser.batch || '2022-2026');
      setStudentType((currentUser.studentType as any) || 'Day Scholar');
      setBusRoute(currentUser.busRoute || '');
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
          studentId: studentId.trim() || undefined,
          phone: phone.trim() || undefined,
          departmentName,
          program: program.trim() || undefined,
          semester: Number(semester) || 5,
          batch: batch.trim() || undefined,
          studentType,
          busRoute: studentType === 'Day Scholar' ? busRoute.trim() : undefined,
          avatarUrl: avatarUrl.trim() || undefined,
        });
      }
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1E4D3E] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Nadar Saraswathi College of Engineering & Technology</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Student Profile
          </h1>

          <p className="text-xs sm:text-sm text-[#DCE7E1]">
            View and manage your student account, official identity, and contact preferences.
          </p>
        </div>
      </div>

      {/* 2. Authentic Student Profile Card (Name & Email) */}
      <div className="rounded-3xl bg-[#122A22] text-white p-6 sm:p-8 border border-[#C49A55]/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          {/* Avatar Photo / Initials */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#C49A55] shadow-xl bg-black/40 flex items-center justify-center shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName || 'Student'}
                className="w-full h-full object-cover"
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
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#122A22]" title="Active Student" />
          </div>

          {/* Core Identity Details */}
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {fullName || currentUser?.name || 'Student User'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C49A55] text-black text-[10px] font-black uppercase tracking-wider">
                {role}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-300">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{email || currentUser?.email}</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <BadgeCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>

            {/* Program & Department */}
            <p className="text-xs text-gray-300 font-medium pt-1">
              {program} • {departmentName}
            </p>

            {/* Quick Metadata Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-[11px] border-t border-white/10 mt-3">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Register No.</span>
                <span className="font-mono font-bold text-white text-xs">
                  {studentId || <span className="text-amber-400 italic text-[10px]">Not set</span>}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Semester / Batch</span>
                <span className="font-bold text-white text-xs">
                  Sem {semester} • {batch}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Mobile Phone</span>
                <span className="font-bold text-white text-xs">
                  {phone || <span className="text-gray-400 text-[10px]">Not set</span>}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Editable Profile Form */}
      <form onSubmit={handleSaveProfile} className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Edit Profile Details
            </h3>
            <p className="text-xs text-gray-500">
              Update your personal credentials and academic registry details. Changes save directly to the system.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile successfully updated and synchronized!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>Full Name:</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter student name"
              required
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            />
          </div>

          {/* Email Address (Read-only verified) */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>Account Email:</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" /> Login Identifier
              </span>
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-2.5 rounded-xl bg-gray-100 border border-gray-200 font-semibold text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Anna University Register Number */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
              <span>Register Number / Roll No:</span>
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 921022104001"
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white font-mono transition-all"
            />
          </div>

          {/* Mobile Phone Number */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-500" />
              <span>Mobile Phone Number:</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            />
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <span>Department:</span>
            </label>
            <select
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science (AI&DS)</option>
              <option value="Electronics & Communication Engineering">Electronics & Communication Engineering (ECE)</option>
              <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering (EEE)</option>
              <option value="Mechanical Engineering">Mechanical Engineering (MECH)</option>
              <option value="Civil Engineering">Civil Engineering (CIVIL)</option>
            </select>
          </div>

          {/* Degree Program */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gray-500" />
              <span>Degree Program:</span>
            </label>
            <input
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              placeholder="e.g. B.E. Computer Science & Engineering"
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            />
          </div>

          {/* Current Semester */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Semester:</span>
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          {/* Batch */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Batch:</span>
            </label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="e.g. 2022-2026"
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            />
          </div>

          {/* Residence Mode */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-gray-500" />
              <span>Residence Mode:</span>
            </label>
            <select
              value={studentType}
              onChange={(e: any) => setStudentType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            >
              <option value="Day Scholar">Day Scholar (College Bus Transit)</option>
              <option value="Hostel">Hostel Resident (Campus Block)</option>
            </select>
          </div>

          {/* Bus Route (if Day Scholar) */}
          {studentType === 'Day Scholar' && (
            <div className="space-y-1.5">
              <label className="font-bold text-gray-700 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-gray-500" />
                <span>Bus Transit Route:</span>
              </label>
              <input
                type="text"
                value={busRoute}
                onChange={(e) => setBusRoute(e.target.value)}
                placeholder="e.g. Route 4: Cumbum - Theni - NSCET"
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
              />
            </div>
          )}

          {/* Avatar URL */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-bold text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-gray-500" />
                <span>Profile Photo URL:</span>
              </span>
              {currentUser?.avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl(currentUser.avatarUrl || '')}
                  className="text-[10px] text-[#C49A55] hover:underline font-semibold cursor-pointer"
                >
                  Reset to Google Account Photo
                </button>
              )}
            </label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white transition-all"
            />
            <span className="text-[10px] text-gray-400">
              Synced from your Google account. You can also paste an image URL or leave blank.
            </span>
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
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
                <span>Save Profile Details</span>
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
};
