import React from 'react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { Video, Plus, Eye, Clock } from 'lucide-react';

export const AdminVideosPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            YouTube Repository Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Curated College Video Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Synchronized video lectures across all engineering departments and semesters.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Lecture Title</th>
              <th className="p-4">Department & Unit</th>
              <th className="p-4">Faculty</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Transcript Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_VIDEOS.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50/80">
                <td className="p-4 font-semibold text-[#17201C]">{v.title}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-[#173B2F]/10 text-[#173B2F] font-bold text-[10px]">
                    {v.departmentCode} • U{v.unitNumber}
                  </span>
                </td>
                <td className="p-4 font-mono text-gray-500">
                  {Math.floor(v.durationSeconds / 60)}:{(v.durationSeconds % 60).toString().padStart(2, '0')}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    ✓ Indexed ({v.transcript?.length || 0} chunks)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

