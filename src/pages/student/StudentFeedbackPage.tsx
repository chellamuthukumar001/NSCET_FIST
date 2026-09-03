import React, { useState } from 'react';
import { MOCK_FEEDBACK } from '../../lib/mockDatabase';
import { FeedbackModal } from '../../components/feedback/FeedbackModal';
import { Feedback } from '../../types';
import {
  ShieldCheck,
  Lock,
  Plus,
  MessageSquareHeart,
  Star,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const StudentFeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');

  const handleNewFeedback = (entry: Feedback) => {
    setFeedbacks([entry, ...feedbacks]);
  };

  const filtered = feedbacks.filter(
    (f) => filterCategory === 'ALL' || f.category === filterCategory
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Anonymity Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Cryptographically Shielded Student Voice</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight mt-0.5">
            Student Anonymous Feedback
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Your identity is protected. Feedback is analyzed without exposing your name or roll number.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C49A55]" />
          <span>Share Confidential Feedback</span>
        </button>
      </div>

      {/* Trust & PII Shield Guarantee Box */}
      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              CampusIQ Anonymous Architecture Guarantee
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
              The AI/RAG system and college administrators receive only one-way cryptographic tokens. Personal phone numbers, roll numbers (e.g. 9210...), and student names are automatically sanitized before submission.
            </p>
          </div>
        </div>

        <div className="text-xs text-emerald-900 font-mono bg-white/70 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
          Status: PII Shield Active
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 text-xs">
        {['ALL', 'Laboratories', 'Academics', 'Infrastructure', 'Transport', 'Placements'].map(
          (c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer shrink-0 ${
                filterCategory === c
                  ? 'bg-[#173B2F] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {c === 'ALL' ? 'All Feedback' : c}
            </button>
          )
        )}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filtered.map((fb) => (
          <div
            key={fb.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
                  {fb.category}
                </span>
                {fb.subcategory && (
                  <span className="text-xs text-gray-500 font-medium">
                    • {fb.subcategory}
                  </span>
                )}
                <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {fb.anonymousToken}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    fb.status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : fb.status === 'Contains PII'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {fb.status}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#17201C] leading-relaxed">
              "{fb.text}"
            </p>

            {fb.piiDetected && fb.piiFlags && (
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  PII Alert: Redacted ({fb.piiFlags.join(', ')}). Student identity protected.
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Department: {fb.departmentName || 'General Campus'}</span>
              <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleNewFeedback}
      />

    </div>
  );
};

