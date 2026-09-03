import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, ShieldCheck, Mail, BookOpen, GraduationCap, Award, Bell } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, role } = useAuth();

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Institutional Identity
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Student Academic Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Verified enrollment credentials under Nadar Saraswathi College of Engineering & Technology.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-100 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#173B2F] shadow-md shrink-0">
            {currentUser?.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 m-5 text-[#173B2F]" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-[#17201C]">{currentUser?.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#173B2F] text-white text-[10px] font-bold uppercase">
                {role}
              </span>
            </div>
            <p className="text-xs text-gray-500">{currentUser?.email}</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Identity Verified • Anna University Registered</span>
            </div>
          </div>
        </div>

        {/* Academic Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">
              Roll / Register Number
            </span>
            <span className="font-mono font-bold text-[#17201C] text-sm">
              {currentUser?.studentId || '921022104042'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">
              Academic Degree Program
            </span>
            <span className="font-semibold text-[#17201C]">
              {currentUser?.program || 'B.E. Computer Science & Engineering'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">
              Current Semester & Batch
            </span>
            <span className="font-semibold text-[#17201C]">
              Semester {currentUser?.semester || 5} • Batch {currentUser?.batch || '2022 - 2026'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">
              Department
            </span>
            <span className="font-semibold text-[#17201C]">
              {currentUser?.departmentName}
            </span>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Notification & Sync Preferences</span>
          </h4>

          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#173B2F]" />
              <span>Receive instant alert when anonymous feedback issue is resolved</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#173B2F]" />
              <span>Notify when new unit video lecture is uploaded for CS3351</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#173B2F]" />
              <span>Receive campus placement drive announcements</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

