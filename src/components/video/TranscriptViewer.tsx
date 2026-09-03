import React, { useState } from 'react';
import { TranscriptChunk } from '../../types';
import { Search, Play, Clock, Sparkles } from 'lucide-react';

interface TranscriptViewerProps {
  transcript?: TranscriptChunk[];
  currentTimeSeconds?: number;
  onSeek: (seconds: number) => void;
  onAskCopilotAboutChunk?: (chunkText: string, timestampStr: string) => void;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  transcript,
  currentTimeSeconds = 0,
  onSeek,
  onAskCopilotAboutChunk,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  if (!transcript || transcript.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-gray-500 glass-panel rounded-2xl">
        Official transcript synchronization pending for this lecture.
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const filtered = transcript.filter((c) =>
    c.text.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full rounded-2xl glass-panel border border-white/40 overflow-hidden">
      {/* Transcript Header & Search */}
      <div className="p-3 border-b border-gray-200/60 bg-white/60 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-[#173B2F] uppercase tracking-wider">
            Lecture Transcript & Jump Points
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#173B2F]/10 text-[#173B2F] font-mono">
            {transcript.length} sections
          </span>
        </div>

        <div className="flex items-center gap-2">
          {searchFilter && (
            <span className="text-[10px] text-gray-500 font-semibold">
              {filtered.length} {filtered.length === 1 ? 'match' : 'matches'}
            </span>
          )}
          <div className="relative w-44">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-2 py-1 text-[11px] rounded-lg bg-white/80 border border-gray-200 focus:border-[#173B2F] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Transcript Timeline Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[380px]">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-400">
            No transcript segments match "{searchFilter}".
          </div>
        ) : (
          filtered.map((chunk) => {
            const isActive =
              currentTimeSeconds >= chunk.startTime && currentTimeSeconds <= chunk.endTime;
            const timeStr = `${formatTime(chunk.startTime)} - ${formatTime(chunk.endTime)}`;

            return (
              <div
                key={chunk.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isActive
                    ? 'bg-[#173B2F]/10 border-[#173B2F]/40 shadow-sm ring-1 ring-[#173B2F]/20'
                    : 'bg-white/40 hover:bg-white/80 border-gray-200/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <button
                    onClick={() => onSeek(chunk.startTime)}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#173B2F] text-white hover:bg-[#285443] text-[10px] font-mono transition-colors cursor-pointer"
                  >
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>{timeStr}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {onAskCopilotAboutChunk && (
                      <button
                        onClick={() => onAskCopilotAboutChunk(chunk.text, timeStr)}
                        className="inline-flex items-center gap-1 text-[10px] text-[#C49A55] hover:text-[#D97736] font-semibold cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Ask AI</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-[12px] text-[#17201C] leading-relaxed">{chunk.text}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

