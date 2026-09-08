import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Video, Users, TrendingUp, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacultyDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8 pb-16">
      {/* Faculty Hero */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B2F] to-[#285443] text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider mb-2">
          <span>Faculty Portal • Computer Science & Engineering</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Welcome back, {currentUser?.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#DCE7E1] mt-1">
          Monitor student lecture engagement, manage syllabus transcripts, and generate AI revision drills.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <BookOpen className="w-5 h-5 text-[#173B2F] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">2 Courses</div>
          <div className="text-xs text-gray-500">Assigned This Semester</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Video className="w-5 h-5 text-[#C49A55] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">18 Lectures</div>
          <div className="text-xs text-gray-500">Synced to YouTube Hub</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Users className="w-5 h-5 text-[#6FA9C9] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">124 Students</div>
          <div className="text-xs text-gray-500">Active Learners</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <TrendingUp className="w-5 h-5 text-emerald-600 mb-1" />
          <div className="text-2xl font-black text-[#17201C]">91%</div>
          <div className="text-xs text-gray-500">Engagement Index</div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17201C]">Curriculum & Lecture Content</h3>
              <p className="text-xs text-gray-500">
                Manage Anna University syllabus coverage, upload video masterclasses, and review unit materials.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/faculty/courses"
              className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs text-[#17201C] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Review Assigned Semester Syllabi</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>

            <Link
              to="/faculty/content"
              className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs text-[#17201C] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#173B2F]" />
                <span className="font-semibold">Sync Video Lectures & Transcripts</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Assigned Courses */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#17201C]">Assigned Courses (2026-27)</h3>
            <Link to="/faculty/courses" className="text-xs text-[#173B2F] font-bold hover:underline">
              Manage All
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#17201C]">CS3451 - Operating Systems</div>
                <div className="text-[11px] text-gray-500">Sem 4 • B.E. CSE • 62 Students</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Unit 3 in Progress
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#17201C]">CS3351 - Database Management Systems</div>
                <div className="text-[11px] text-gray-500">Sem 5 • B.E. CSE • 62 Students</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-[10px] font-bold">
                Unit 4 in Progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

