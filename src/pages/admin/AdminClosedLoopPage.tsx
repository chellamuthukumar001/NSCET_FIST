import React, { useState } from 'react';
import { MOCK_CLOSED_LOOP_ISSUES } from '../../lib/mockDatabase';
import { ClosedLoopIssue } from '../../types';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Send,
  Building
} from 'lucide-react';

export const AdminClosedLoopPage: React.FC = () => {
  const [issues, setIssues] = useState<ClosedLoopIssue[]>(MOCK_CLOSED_LOOP_ISSUES);
  const [selectedIssueId, setSelectedIssueId] = useState<string>(issues[0]?.id || '');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const activeIssue = issues.find((i) => i.id === selectedIssueId) || issues[0];

  const handleAdvanceStatus = (issueId: string) => {
    const stages: ClosedLoopIssue['status'][] = [
      'Identified',
      'Acknowledged',
      'Investigating',
      'Action Planned',
      'In Progress',
      'Resolved',
      'Closed'
    ];

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          const currentIndex = stages.indexOf(item.status);
          const nextIndex = Math.min(stages.length - 1, currentIndex + 1);
          return { ...item, status: stages[nextIndex] };
        }
        return item;
      })
    );
  };

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const stages = [
    'Identified',
    'Acknowledged',
    'Investigating',
    'Action Planned',
    'In Progress',
    'Resolved',
    'Closed'
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Institutional Remediation Workflow
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Closed-Loop Action Tracker
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Transforming anonymous student feedback into tangible institutional upgrades with full visibility.
        </p>
      </div>

      {/* Grid: Issues List on Left, Active Resolution Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Issue Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Active Institutional Issues ({issues.length})
          </div>

          {issues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => setSelectedIssueId(issue.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedIssueId === issue.id
                  ? 'bg-[#173B2F] text-white border-[#173B2F] shadow-md'
                  : 'bg-white text-[#17201C] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    selectedIssueId === issue.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#173B2F]/10 text-[#173B2F]'
                  }`}
                >
                  {issue.departmentName}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    issue.status === 'Resolved' || issue.status === 'Closed'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {issue.status}
                </span>
              </div>

              <h4 className="text-sm font-bold leading-snug">{issue.title}</h4>
              <p
                className={`text-xs mt-1 line-clamp-2 ${
                  selectedIssueId === issue.id ? 'text-[#DCE7E1]' : 'text-gray-500'
                }`}
              >
                {issue.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Detailed 7-Stage Tracker */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C49A55]">
                  Issue Reference: {activeIssue.id}
                </span>
                <h3 className="text-xl font-black text-[#17201C] mt-0.5">
                  {activeIssue.title}
                </h3>
              </div>

              <button
                onClick={() => handleAdvanceStatus(activeIssue.id)}
                className="px-4 py-2 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
              >
                <span>Advance Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 7-Stage Pipeline Visualizer */}
            <div className="space-y-3 p-4 rounded-2xl bg-gray-50/80 border border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-500">
                  7-Stage Closed-Loop Progression:
                </span>
                <span className="font-black text-[#173B2F] bg-[#173B2F]/10 px-2.5 py-0.5 rounded-full text-[11px]">
                  Stage {stages.indexOf(activeIssue.status) + 1} of 7: {activeIssue.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#C49A55] transition-all duration-500"
                  style={{
                    width: `${((stages.indexOf(activeIssue.status) + 1) / stages.length) * 100}%`,
                  }}
                />
              </div>

              {/* Step Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
                {stages.map((stg, idx) => {
                  const stageIndex = stages.indexOf(activeIssue.status);
                  const isDone = idx <= stageIndex;
                  const isCurrent = idx === stageIndex;

                  return (
                    <div
                      key={stg}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-[#173B2F] text-white ring-2 ring-[#C49A55] shadow-sm'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-white text-gray-400 border border-gray-200'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent
                            ? 'bg-[#C49A55] text-white'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{stg}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Problem & Action Taken */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-gray-500 uppercase text-[10px]">
                  Original Student Feedback Problem
                </span>
                <p className="text-[#17201C] leading-relaxed">
                  {activeIssue.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-800 uppercase text-[10px]">
                  Institutional Remediation Action
                </span>
                <p className="text-emerald-950 leading-relaxed font-medium">
                  {activeIssue.actionTaken || 'Remediation plan approved by Principal Administration.'}
                </p>
              </div>
            </div>

            {/* Public Resolution Notice Box */}
            {activeIssue.publicResolutionNotice && (
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-800">
                  Broadcasted Student Resolution Notice
                </div>
                <p className="text-emerald-950 leading-relaxed">
                  "{activeIssue.publicResolutionNotice}"
                </p>
              </div>
            )}

            {/* Broadcast to Campus Button */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                Assigned Authority: <strong>{activeIssue.assignedPerson}</strong>
              </span>

              <button
                onClick={handleBroadcast}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{broadcastSent ? 'Notice Dispatched!' : 'Broadcast Resolution Notice'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

