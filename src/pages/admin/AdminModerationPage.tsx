import React, { useState } from 'react';
import { MOCK_FEEDBACK } from '../../lib/mockDatabase';
import { Feedback } from '../../types';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Star, Lock } from 'lucide-react';

export const AdminModerationPage: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(MOCK_FEEDBACK);

  const handleApprove = (id: string) => {
    setFeedbackList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'Approved' } : f))
    );
  };

  const handleReject = (id: string) => {
    setFeedbackList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'Rejected' } : f))
    );
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Trust & Safety Layer
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Feedback Moderation & PII Redaction Queue
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Audit incoming student submissions for scrubbed personal identifiers, toxicity score compliance, and institutional relevance.
        </p>
      </div>

      <div className="space-y-4">
        {feedbackList.map((fb) => (
          <div
            key={fb.id}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
                  {fb.category}
                </span>
                <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  Token: {fb.anonymousToken}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    fb.status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : fb.status === 'Contains PII'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {fb.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApprove(fb.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>

                <button
                  onClick={() => handleReject(fb.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#17201C] leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
              "{fb.text}"
            </p>

            {fb.piiDetected && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>PII Shield Warning:</strong> Student attempted to submit personal contact info ({fb.piiFlags?.join(', ')}). Automatically scrubbed and replaced with anonymous tokens before storage.
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
              <span>Department: {fb.departmentName || 'General Institutional'}</span>
              <span>Logged: {new Date(fb.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

