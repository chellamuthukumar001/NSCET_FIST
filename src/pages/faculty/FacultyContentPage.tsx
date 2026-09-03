import React, { useState } from 'react';
import { Video, Sparkles, CheckCircle2, Upload, ArrowRight } from 'lucide-react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';

export const FacultyContentPage: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [subject, setSubject] = useState('CS3351 DBMS');
  const [unit, setUnit] = useState(3);
  const [synced, setSynced] = useState(false);

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;
    setSynced(true);
    setTimeout(() => setSynced(false), 4000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Lecture Content Pipeline
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          YouTube Sync & Transcript Chunking
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Input YouTube lecture links to extract transcripts, generate timestamp intervals, and index into CampusIQ RAG.
        </p>
      </div>

      {/* Sync Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#17201C] flex items-center gap-2">
          <Video className="w-5 h-5 text-rose-600" />
          <span>Synchronize New Video Lecture</span>
        </h3>

        <form onSubmit={handleSync} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              YouTube Video URL or ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. https://www.youtube.com/watch?v=kBdlM6hNDAE"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#17201C] focus:border-[#173B2F] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Subject Mapping
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#17201C]"
              >
                <option value="CS3351 DBMS">CS3351 - Database Management Systems</option>
                <option value="CS3451 OS">CS3451 - Operating Systems</option>
                <option value="AI3401 AI">AI3401 - Deep Learning Architectures</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Syllabus Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#17201C]"
              >
                {[1, 2, 3, 4, 5].map((u) => (
                  <option key={u} value={u}>
                    Unit {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {synced && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                YouTube lecture transcript extracted (5 timestamp chunks). Vector embeddings indexed into CampusIQ RAG.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Extract Transcript & Index for Students
          </button>
        </form>
      </div>
    </div>
  );
};

