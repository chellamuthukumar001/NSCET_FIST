import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

export const FacultyAnalyticsPage: React.FC = () => {
  const topics = [
    { name: 'Relational Normalization (BCNF vs 3NF)', difficulty: 78, status: 'High Difficulty' },
    { name: 'ER to Relational Schema Mapping', difficulty: 32, status: 'Well Understood' },
    { name: 'Two-Phase Locking (2PL) Concurrency', difficulty: 64, status: 'Moderate Difficulty' },
    { name: 'SQL Subqueries & Join Optimization', difficulty: 45, status: 'Well Understood' },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Student Performance Radar
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Concept Difficulty & Engagement Heatmap
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Aggregated analytics identifying conceptual stumbling blocks without exposing individual student identities.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-[#17201C]">CS3351 DBMS - Concept Struggle Index</h3>

        <div className="space-y-4">
          {topics.map((t, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#17201C]">{t.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    t.difficulty > 65
                      ? 'bg-rose-100 text-rose-800'
                      : t.difficulty > 40
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {t.status} ({t.difficulty}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    t.difficulty > 65 ? 'bg-rose-500' : t.difficulty > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${t.difficulty}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

