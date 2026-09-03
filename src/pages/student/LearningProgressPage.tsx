import React from 'react';
import { TrendingUp, Clock, Award, BookOpen, CheckCircle, BarChart3 } from 'lucide-react';

export const LearningProgressPage: React.FC = () => {
  const subjectProgress = [
    { code: 'CS3351', title: 'Database Management Systems', progress: 75, grade: 'A+' },
    { code: 'CS3451', title: 'Operating Systems', progress: 60, grade: 'A' },
    { code: 'AI3401', title: 'Deep Learning Architectures', progress: 85, grade: 'O' },
    { code: 'CS3301', title: 'Data Structures & Algorithms', progress: 50, grade: 'B+' },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Academic Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Learning Analytics & Mastery
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Track syllabus coverage, hours watched, and self-assessment scores across semester courses.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Watched Hours
            </span>
            <Clock className="w-5 h-5 text-[#C49A55]" />
          </div>
          <div className="text-3xl font-black text-[#17201C]">32.5h</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">↑ +4.2h this week</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Quiz Average Score
            </span>
            <Award className="w-5 h-5 text-[#173B2F]" />
          </div>
          <div className="text-3xl font-black text-[#17201C]">88%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Top 10% in Department</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Aggregate Attendance
            </span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-[#17201C]">82%</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">✓ Eligible for End-Sem Exam (&gt;75%)</div>
        </div>
      </div>

      {/* Subject-Wise Progress Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-[#17201C]">Course Syllabus Completion</h3>
        <div className="space-y-5">
          {subjectProgress.map((sub) => (
            <div key={sub.code} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#17201C]">
                  {sub.code} - {sub.title}
                </span>
                <span className="text-[#173B2F] font-mono">{sub.progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#173B2F] to-[#C49A55]"
                  style={{ width: `${sub.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Study Activity & Exam Clearance Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Bar Chart */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#17201C]">Weekly Lecture Engagement</h3>
              <p className="text-[11px] text-gray-500">Hours spent watching videos over the last 7 days</p>
            </div>
            <span className="text-xs font-bold text-[#C49A55] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Total: 32.5h
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-4 items-end h-40">
            {[
              { day: 'Mon', hours: 4.5, pct: 65 },
              { day: 'Tue', hours: 6.0, pct: 85 },
              { day: 'Wed', hours: 5.2, pct: 75 },
              { day: 'Thu', hours: 7.0, pct: 100 },
              { day: 'Fri', hours: 4.8, pct: 70 },
              { day: 'Sat', hours: 3.0, pct: 45 },
              { day: 'Sun', hours: 2.0, pct: 30 },
            ].map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono text-gray-400 font-semibold">{d.hours}h</span>
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden h-24 flex items-end">
                  <div
                    className="w-full rounded-xl bg-gradient-to-t from-[#173B2F] to-[#6E7F45] transition-all hover:brightness-110"
                    style={{ height: `${d.pct}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-600">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Anna University Exam Eligibility Certificate Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#173B2F] to-[#101815] text-white shadow-xl space-y-4 border border-white/15 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>Official Anna University Clearance</span>
            </div>
            <h4 className="text-lg font-bold text-white">End-Semester Exam Hall Ticket</h4>
            <p className="text-xs text-[#DCE7E1] leading-relaxed">
              Your aggregate verified attendance of <strong>82%</strong> meets the Anna University Regulation 2021 threshold (&gt;75%). No medical condonation required.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-[11px] space-y-1 font-mono">
            <div className="flex justify-between text-gray-300">
              <span>Candidate:</span>
              <strong className="text-white">Vignesh R.</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Register No:</span>
              <strong className="text-[#C49A55]">921022104042</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Status:</span>
              <strong className="text-emerald-400">HALL TICKET CLEARED</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

