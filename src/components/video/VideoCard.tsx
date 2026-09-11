import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../types';
import { Clock, Play, FileText } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onToggleBookmark?: (videoId: string) => void;
  onOpenRevisionKit?: (video: Video) => void;
  showProgress?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatDuration = (totalSeconds?: number) => {
    if (!totalSeconds || isNaN(totalSeconds) || totalSeconds <= 0) {
      return '04:00';
    }
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-gray-200/90 flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-200">
      {/* Thumbnail Container */}
      <Link
        to={`/student/videos/${video.id}`}
        className="relative block aspect-video w-full overflow-hidden bg-black/10"
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Dark subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#173B2F]/90 text-white flex items-center justify-center shadow-lg border border-white/20 transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono flex items-center gap-1 font-bold">
          <Clock className="w-3 h-3 text-[#C49A55]" />
          <span>{formatDuration(video.durationSeconds)}</span>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/student/videos/${video.id}`}
          className="text-sm font-bold text-[#17201C] group-hover:text-[#173B2F] transition-colors line-clamp-2 leading-snug"
        >
          {video.title}
        </Link>

        <div className="text-xs text-[#66736C] flex items-center justify-between gap-2 mt-2">
          <span className="truncate">
            Presented by: <strong className="text-[#17201C] font-semibold">{video.facultyName}</strong>
          </span>
          <span className="font-bold text-[#173B2F] text-[10px] bg-[#173B2F]/10 px-2 py-0.5 rounded-full shrink-0">
            {video.departmentCode}
          </span>
        </div>

        {/* Clean Action Row */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          {video.studyMaterialUrl ? (
            <a
              href={video.studyMaterialUrl}
              target="_blank"
              rel="noreferrer"
              download
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Study Material</span>
            </a>
          ) : (
            <span className="text-[10px] text-gray-400 font-medium">NSCET Portal</span>
          )}

          <Link
            to={`/student/videos/${video.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Watch</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

