import React from 'react';
import { SourceCitation as SourceCitationType } from '../../types';
import { BookOpen, Video, Users, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SourceCitationProps {
  citations: SourceCitationType[];
  className?: string;
}

export const SourceCitationList: React.FC<SourceCitationProps> = ({ citations, className = '' }) => {
  if (!citations || citations.length === 0) return null;

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'OFFICIAL':
        return <BookOpen className="w-3.5 h-3.5 text-[#C49A55]" />;
      case 'LEARNING':
        return <Video className="w-3.5 h-3.5 text-[#6FA9C9]" />;
      case 'STUDENT_VOICE':
        return <Users className="w-3.5 h-3.5 text-[#6E7F45]" />;
      default:
        return <ExternalLink className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  return (
    <div className={`mt-3 pt-3 border-t border-white/10 space-y-2 ${className}`}>
      <div className="text-[11px] uppercase tracking-wider text-[#A2B6AC] font-semibold flex items-center gap-1.5">
        <span>Verified Sources & Evidence ({citations.length})</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {citations.map((c) => (
          <div
            key={c.id}
            className="flex flex-col p-2.5 rounded-lg bg-black/25 border border-white/10 text-xs hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
              <span className="flex items-center gap-1.5 font-medium text-white/90 truncate">
                {getSourceIcon(c.sourceType)}
                <span className="truncate">{c.title}</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono">
                {c.sourceType}
              </span>
            </div>

            <p className="text-[11px] text-gray-300 line-clamp-2 italic mb-1.5">
              "{c.snippet}"
            </p>

            <div className="flex items-center justify-between text-[10px] text-[#A2B6AC] mt-auto">
              <span className="text-gray-400">{c.reference}</span>
              {c.timestamp && c.videoId && (
                <Link
                  to={`/student/videos/${c.videoId}?t=${c.videoTimestampSeconds || 0}`}
                  className="inline-flex items-center gap-1 text-[#6FA9C9] hover:underline font-mono"
                >
                  <Clock className="w-3 h-3" />
                  <span>{c.timestamp}</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

