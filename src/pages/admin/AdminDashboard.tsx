import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Users,
  MessageSquareCheck,
  Video,
  FileCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider mb-2">
          <span>Campus Administration & Moderation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Institutional Control Center
        </h1>
        <p className="text-xs sm:text-sm text-[#DCE7E1] mt-1">
          Nadar Saraswathi College of Engineering & Technology • Real-time AI RAG orchestration, PII moderation & closed-loop remediation.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Users className="w-5 h-5 text-[#173B2F] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">1,840</div>
          <div className="text-xs text-gray-500">Active Students & Faculty</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <MessageSquareCheck className="w-5 h-5 text-[#C49A55] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">3 Pending</div>
          <div className="text-xs text-gray-500">Feedback in Moderation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <FileCheck className="w-5 h-5 text-emerald-600 mb-1" />
          <div className="text-2xl font-black text-[#17201C]">12 Issues</div>
          <div className="text-xs text-gray-500">Closed-Loop Resolved</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Video className="w-5 h-5 text-[#6FA9C9] mb-1" />
          <div className="text-2xl font-black text-[#17201C]">48 Videos</div>
          <div className="text-xs text-gray-500">Indexed for RAG</div>
        </div>
      </div>

      {/* Control Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/admin/moderation"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17201C]">PII & Content Moderation</h3>
          <p className="text-xs text-gray-600">
            Review scrubbed student feedback, verify toxicity scores, and release to HOD stream.
          </p>
          <div className="text-xs font-bold text-[#173B2F] flex items-center gap-1">
            <span>Open Moderation Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/admin/closed-loop"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17201C]">Closed-Loop Action Tracker</h3>
          <p className="text-xs text-gray-600">
            Manage remediation lifecycle from investigation to resolution broadcast.
          </p>
          <div className="text-xs font-bold text-[#C49A55] flex items-center gap-1">
            <span>Track Institutional Issues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/admin/knowledge"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17201C]">Knowledge Base & Circulars</h3>
          <p className="text-xs text-gray-600">
            Upload institutional circulars, regulate RAG visibility roles, and maintain syllabi.
          </p>
          <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
            <span>Manage RAG Documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

    </div>
  );
};

