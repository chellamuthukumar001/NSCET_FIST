import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HodDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { openCopilot } = useCopilot();

  const satisfactionPillars = [
    { title: 'Academic Curriculum', score: 88, status: 'Strong' },
    { title: 'Faculty Instruction', score: 86, status: 'Strong' },
    { title: 'Laboratory Infrastructure', score: 72, status: 'Action In Progress' },
    { title: 'Campus Wi-Fi & Facilities', score: 68, status: 'Emerging Issue' },
    { title: 'Training & Placements', score: 92, status: 'Excellent' },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* HOD Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider mb-2">
          <span>Head of Department Dashboard • Computer Science & Engineering</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {currentUser?.name || 'Dr. S. Karthik'}
        </h1>
        <p className="text-xs sm:text-sm text-[#DCE7E1] mt-1">
          Real-time institutional intelligence across 420 students, 24 faculty members, and Anna University syllabus compliance.
        </p>
      </div>

      {/* Emerging Issue Alert Banner */}
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Emerging Issue: Lab 2 Memory & Wi-Fi Latency
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
              4 reports logged this week regarding system freezing during heavy Android Studio compilation in Lab 2.
            </p>
          </div>
        </div>

        <Link
          to="/admin/closed-loop"
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider shrink-0 shadow"
        >
          View Action Ticket
        </Link>
      </div>

      {/* Department Satisfaction Pillars (Section 25 of Master Prompt) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              Student Experience Indices
            </span>
            <h3 className="text-lg font-bold text-[#17201C]">
              Department Health Across 5 Core Pillars
            </h3>
          </div>
          <span className="text-sm font-black text-[#173B2F] bg-[#173B2F]/10 px-3 py-1 rounded-xl">
            Overall CSE Index: 84%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {satisfactionPillars.map((p, idx) => (
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
          to="/hod/feedback"
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <div className="text-sm font-bold text-[#17201C]">Department Feedback</div>
            <div className="text-xs text-gray-500">28 Anonymized Submissions</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#173B2F]" />
        </Link>

        <Link
          to="/hod/reports"
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <div className="text-sm font-bold text-[#17201C]">AI Health Report</div>
            <div className="text-xs text-gray-500">1-Click Executive Summary</div>
          </div>
          <FileText className="w-4 h-4 text-[#C49A55]" />
        </Link>

        <Link
          to="/hod/analytics"
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <div className="text-sm font-bold text-[#17201C]">Course Completion</div>
            <div className="text-xs text-gray-500">Semester 3, 5, 7 Syllabi</div>
          </div>
          <TrendingUp className="w-4 h-4 text-[#6FA9C9]" />
        </Link>
      </div>

    </div>
  );
};

