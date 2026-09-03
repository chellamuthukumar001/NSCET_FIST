import React from 'react';
import { MOCK_FEEDBACK } from '../../lib/mockDatabase';
import { Star, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export const HodFeedbackPage: React.FC = () => {
  const cseFeedbacks = MOCK_FEEDBACK.filter(
    (f) => !f.departmentId || f.departmentId === 'dept_cse'
  );

  return (
    <div className="space-y-6 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Student Voice Stream
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          CSE Anonymized Feedback Stream
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Uncensored student feedback sanitized for PII with cryptographic one-way hashes.
        </p>
      </div>

      <div className="space-y-4">
        {cseFeedbacks.map((fb) => (
          <div key={fb.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
                  {fb.category}
                </span>
                <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {fb.anonymousToken}
                </span>
              </div>
              <div className="flex items-center text-amber-500">
                {[...Array(fb.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#17201C] leading-relaxed">"{fb.text}"</p>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Status: <strong className="text-emerald-700">{fb.status}</strong></span>
              <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

