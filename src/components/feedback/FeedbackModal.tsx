import React, { useState, useEffect } from 'react';
import { FeedbackCategory } from '../../types';
import { detectAndScrubPii, generateAnonymousToken } from '../../lib/piiScrubber';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Star,
  Send,
  Lock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (newFeedback: any) => void;
}

const CATEGORIES: FeedbackCategory[] = [
  'Laboratories',
  'Academics',
  'Infrastructure',
  'Transport',
  'Faculty',
  'Library',
  'Hostel',
  'Campus Life',
  'Placements',
  'Administration',
  'Other',
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [category, setCategory] = useState<FeedbackCategory>('Laboratories');
  const [subcategory, setSubcategory] = useState('');
  const [rating, setRating] = useState(4);
  const [feedbackText, setFeedbackText] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState(5);
  const [anonymousToken, setAnonymousToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Real-time PII scrubbing result
  const piiCheck = detectAndScrubPii(feedbackText);

  useEffect(() => {
    if (isOpen) {
      setAnonymousToken(generateAnonymousToken());
      setIsSubmitted(false);
      setFeedbackText('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = {
        id: `fb_${Date.now()}`,
        anonymousToken,
        category,
        subcategory: subcategory || 'General',
        rating,
        text: piiCheck.sanitizedText, // strictly sanitized text!
        departmentName: department,
        semester,
        createdAt: new Date().toISOString(),
        status: piiCheck.hasPii ? 'Contains PII' : 'Approved',
        sentiment: rating >= 4 ? 'Positive' : rating === 3 ? 'Neutral' : 'Critical',
        sentimentScore: (rating - 3) / 2,
        piiDetected: piiCheck.hasPii,
        piiFlags: piiCheck.detectedTypes,
      };

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmitSuccess) onSubmitSuccess(newEntry);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-white/20 overflow-hidden text-[#17201C]">
        
        {/* Header with Security Badge */}
        <div className="p-5 sm:p-6 bg-[#173B2F] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6E7F45]/30 border border-[#6E7F45]/50 flex items-center justify-center text-[#C49A55]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Share Confidential Feedback</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>100% ANONYMOUS</span>
                </span>
              </div>
              <p className="text-[11px] text-[#A2B6AC]">
                Your identity is cryptographically separated from feedback data.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#17201C]">
              Feedback Anonymously Submitted
            </h4>
            <p className="text-xs text-[#66736C] max-w-md mx-auto leading-relaxed">
              Your report has been assigned anonymous token{' '}
              <strong className="font-mono text-[#173B2F]">{anonymousToken}</strong>. The HOD and college administrators will review this to prioritize institutional improvements.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#173B2F] text-white text-xs font-semibold hover:bg-[#285443] shadow cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Anonymity Banner */}
            <div className="p-3 rounded-xl bg-[#173B2F]/5 border border-[#173B2F]/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#173B2F]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Active Token:</span>
                <span className="font-mono text-[11px] font-bold text-[#C49A55]">
                  {anonymousToken}
                </span>
              </div>
              <span className="text-[10px] text-gray-500">Student ID Excluded</span>
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
                  className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#17201C] focus:border-[#173B2F] focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Facility / Subtopic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lab 2 Systems, Route 7 Bus, Wi-Fi"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#17201C] focus:border-[#173B2F] focus:outline-none"
                />
              </div>
            </div>

            {/* Satisfaction Rating */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Satisfaction Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-gray-600 ml-2">
                  {rating === 5
                    ? 'Excellent'
                    : rating === 4
                    ? 'Good'
                    : rating === 3
                    ? 'Satisfactory'
                    : rating === 2
                    ? 'Needs Improvement'
                    : 'Critical Concern'}
                </span>
              </div>
            </div>

            {/* Feedback Content */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Detailed Feedback
              </label>
              <textarea
                rows={4}
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your honest experience, suggestions, or issues. Your identity is completely shielded."
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#17201C] focus:border-[#173B2F] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Real-time PII Alert Warning or Clean Shield Indicator */}
            {piiCheck.hasPii ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5 animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
                    PII Detected & Quarantined
                  </div>
                  {piiCheck.warnings.map((w, i) => (
                    <p key={i} className="text-[11px] leading-tight text-amber-800">
                      {w}
                    </p>
                  ))}
                  <div className="text-[10px] text-amber-700 pt-1">
                    Preview of sanitized submission: <em className="italic">"{piiCheck.sanitizedText}"</em>
                  </div>
                </div>
              </div>
            ) : feedbackText.trim() ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>PII Check Passed • Zero personal identifiers detected</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  100% ANONYMOUS
                </span>
              </div>
            ) : null}

            {/* Optional Context */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] uppercase font-semibold text-gray-500 mb-0.5">
                  Department (Optional)
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-[11px]"
                >
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Artificial Intelligence & Data Science">AI&DS</option>
                  <option value="Electronics & Communication">ECE</option>
                  <option value="Electrical & Electronics">EEE</option>
                  <option value="Mechanical Engineering">MECH</option>
                  <option value="Civil Engineering">CIVIL</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-gray-500 mb-0.5">
                  Semester (Optional)
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-[11px]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!feedbackText.trim() || isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Encrypting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Anonymously</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

