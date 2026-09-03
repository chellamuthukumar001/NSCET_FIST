import React from 'react';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const AdminAuditPage: React.FC = () => {
  const auditEntries = [
    { action: 'PII_SCRUBBED_AND_HASHED', user: 'anon_b8e217d4a19c', detail: 'Sanitized 10-digit mobile number and student name', time: '10 mins ago', status: 'SUCCESS' },
    { action: 'CLOSED_LOOP_ADVANCED', user: 'Er. K. Anand (Admin)', detail: 'Advanced ticket #ISSUE-2026-089 to "Resolved"', time: '42 mins ago', status: 'SUCCESS' },
    { action: 'RAG_CHUNK_INDEXED', user: 'Dr. M. Deepa (Faculty)', detail: 'Extracted 5 timestamp segments for CS3451 Unit 2', time: '2 hours ago', status: 'SUCCESS' },
    { action: 'FEEDBACK_APPROVED', user: 'Er. K. Anand (Admin)', detail: 'Released CSE Laboratory feedback to HOD analytics', time: '5 hours ago', status: 'SUCCESS' },
    { action: 'KNOWLEDGE_UPLOADED', user: 'Principal Office', detail: 'Anna University Reg 2021 Circular indexed into vector table', time: '1 day ago', status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Compliance & Security Trail
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Cryptographic Institutional Audit Log
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Tamper-evident logs of administrative actions, PII scrubbing events, and closed-loop state transitions.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Action Type</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Details</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {auditEntries.map((e, idx) => (
              <tr key={idx} className="hover:bg-gray-50/80">
                <td className="p-4 font-mono font-bold text-[#173B2F]">{e.action}</td>
                <td className="p-4 text-[#17201C] font-semibold">{e.user}</td>
                <td className="p-4 text-gray-600">{e.detail}</td>
                <td className="p-4 text-gray-400 font-mono text-[11px]">{e.time}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{e.status}</span>
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

