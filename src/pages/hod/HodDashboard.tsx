import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Video
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HodDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const curriculumProgression = [
    { title: 'Database Management Systems', score: 88, status: 'Strong Mastery' },
    { title: 'Operating Systems & Concurrency', score: 86, status: 'On Track' },
    { title: 'Theory of Computation & Automata', score: 79, status: 'Active Support' },
    { title: 'Computer Networks & Security', score: 92, status: 'Exceptional' },
    { title: 'Full-Stack Web & Cloud Computing', score: 90, status: 'Exceptional' },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* HOD Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
          <span>Head of Department Dashboard • Computer Science & Engineering</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {currentUser?.name || 'Dr. S. Karthik'}
        </h1>
        <p className="text-xs sm:text-sm text-[#DCE7E1] mt-1">
          Real-time academic mastery intelligence across 420 students, 24 faculty members, and Anna University syllabus progression.
        </p>
      </div>

      {/* Curriculum Milestone Banner */}
      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#173B2F] text-white flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#173B2F]">
              Anna University Regulation 2021: Semester 3, 5 & 7 Progression
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
              Modular completion rate is currently at 86%. 10 courses with video masterclasses and knowledge assessments active.
            </p>
          </div>
        </div>

        <Link
          to="/student/courses"
          className="px-4 py-2 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider shrink-0 shadow"
        >
          View Modules
        </Link>
      </div>

      {/* Department Academic Mastery Across Core Modules */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              Curriculum Performance Indices
            </span>
            <h3 className="text-lg font-bold text-[#17201C]">
              Department Mastery Across 5 Core Engineering Domains
            </h3>
          </div>
          <span className="text-sm font-black text-[#173B2F] bg-[#173B2F]/10 px-3 py-1 rounded-xl">
            Overall CSE Index: 87%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculumProgression.map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#17201C]">{p.title}</span>
                <span className="text-[#173B2F] font-mono">{p.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    p.score >= 85 ? 'bg-emerald-500' : p.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${p.score}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500 font-semibold">{p.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Quick Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/student/courses"
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-sm font-bold text-[#17201C] group-hover:text-[#173B2F]">10 Course Modules</div>
            <div className="text-xs text-gray-500">Anna University Curriculum</div>
          </div>
          <BookOpen className="w-4 h-4 text-[#173B2F]" />
        </Link>

        <Link
          to="/student/videos"
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-sm font-bold text-[#17201C] group-hover:text-[#C49A55]">Video Masterclasses</div>
            <div className="text-xs text-gray-500">YouTube Synchronized Hub</div>
          </div>
          <Video className="w-4 h-4 text-[#C49A55]" />
        </Link>

        <Link
          to="/hod/analytics"
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-sm font-bold text-[#17201C] group-hover:text-[#6FA9C9]">Learning Analytics</div>
            <div className="text-xs text-gray-500">Semester Progression & Reports</div>
          </div>
          <TrendingUp className="w-4 h-4 text-[#6FA9C9]" />
        </Link>
      </div>

    </div>
  );
};
