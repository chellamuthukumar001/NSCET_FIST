import React from 'react';
import { TrendingUp, Users, BookOpen, CheckCircle } from 'lucide-react';

export const HodAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Department Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          CSE Academic Performance & Syllabus Coverage
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Curriculum delivery status across all B.E. Computer Science batches (2022-2026, 2023-2027, 2024-2028).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase">3rd Year (Sem 5)</div>
          <div className="text-3xl font-black text-[#17201C] mt-2">78%</div>
          <div className="text-xs text-emerald-600 mt-1">Syllabus Complete on Schedule</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase">2nd Year (Sem 3)</div>
          <div className="text-3xl font-black text-[#17201C] mt-2">82%</div>
          <div className="text-xs text-emerald-600 mt-1">Syllabus Complete on Schedule</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase">4th Year (Sem 7)</div>
          <div className="text-3xl font-black text-[#17201C] mt-2">91%</div>
          <div className="text-xs text-emerald-600 mt-1">Project Phase 1 Initiated</div>
        </div>
      </div>
    </div>
  );
};

