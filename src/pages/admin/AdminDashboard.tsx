import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Video,
  FileCheck,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
          <span>Academic Administration & Learning Hub Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Institutional Academic Control Center
        </h1>
        <p className="text-xs sm:text-sm text-[#DCE7E1] mt-1">
          Nadar Saraswathi College of Engineering & Technology • 10 Anna University Modular Courses, YouTube Video Masterclasses & Bilingual Academic RAG Intelligence.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Users className="w-5 h-5 text-[#173B2F] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">1,840</div>
          <div className="text-xs text-gray-500">Active Students & Faculty</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <BookOpen className="w-5 h-5 text-[#C49A55] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">10 Courses</div>
          <div className="text-xs text-gray-500">Modular AU Curriculum</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Video className="w-5 h-5 text-[#6FA9C9] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">1,250+</div>
          <div className="text-xs text-gray-500">Indexed Video Masterclasses</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Award className="w-5 h-5 text-emerald-600 mb-1" />
          <div className="text-2xl font-black text-[#17201C]">428</div>
          <div className="text-xs text-gray-500">Certificates Issued</div>
        </div>
      </div>

      {/* Control Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/student/courses"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17201C] group-hover:text-[#173B2F] transition-colors">Curriculum Management</h3>
          <p className="text-xs text-gray-600">
            Inspect 10 Anna University Regulation 2021 modules across CSE, ECE, Mechanical, Civil & AI departments.
          </p>
          <div className="text-xs font-bold text-[#173B2F] flex items-center gap-1 pt-1">
            <span>Explore Course Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/admin/videos"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#C49A55]/10 text-[#C49A55] flex items-center justify-center font-bold">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17201C] group-hover:text-[#C49A55] transition-colors">Video Learning Hub</h3>
          <p className="text-xs text-gray-600">
            Synchronize YouTube engineering masterclasses, manage topic tags, and curate academic playlists.
          </p>
          <div className="text-xs font-bold text-[#C49A55] flex items-center gap-1 pt-1">
            <span>Manage Video Sync</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/admin/knowledge"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17201C] group-hover:text-blue-600 transition-colors">Knowledge Base & Syllabi</h3>
          <p className="text-xs text-gray-600">
            Upload institutional circulars, regulate bilingual RAG visibility, and maintain engineering syllabi.
          </p>
          <div className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-1">
            <span>Manage Academic Knowledge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* User Management Banner */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#17201C]">Learners & Faculty Directory</h4>
            <p className="text-xs text-gray-500">Manage student enrollment, faculty assignments, and department course privileges.</p>
          </div>
        </div>
        <Link
          to="/admin/users"
          className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider transition-all shadow shrink-0"
        >
          Manage Users
        </Link>
      </div>

    </div>
  );
};
