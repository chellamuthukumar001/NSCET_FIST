import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../types';
import { Clock, Eye, Bookmark, Play, CheckCircle } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onToggleBookmark?: (videoId: string) => void;
  onOpenRevisionKit?: (video: Video) => void;
  showProgress?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onToggleBookmark,
  onOpenRevisionKit,
  showProgress = true,
}) => {
  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = video.userProgressSeconds
    ? Math.min(100, Math.round((video.userProgressSeconds / video.durationSeconds) * 100))
    : 0;

  return (
    <div className="group relative rounded-2xl overflow-hidden glass-panel glass-card-hover border border-white/40 flex flex-col bg-white shadow-sm hover:shadow-md transition-all">
      {/* Thumbnail Container */}
      <Link to={`/student/videos/${video.id}`} className="relative block aspect-video w-full overflow-hidden bg-black/10">
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
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#C49A55]" />
          <span>{formatDuration(video.durationSeconds)}</span>
        </div>

        {/* Subject & Unit Pill */}
        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#173B2F]/90 backdrop-blur-sm text-white text-[10px] font-bold border border-white/20 flex items-center gap-1.5 shadow-sm">
          <span>{video.subjectCode}</span>
          <span className="w-1 h-1 rounded-full bg-[#6FA9C9]"></span>
          <span>Unit {video.unitNumber}</span>
        </div>

        {/* Completed Badge */}
        {video.isCompleted && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-semibold flex items-center gap-1 shadow">
            <CheckCircle className="w-3 h-3" />
            <span>Completed</span>
          </div>
        )}
      </Link>

      {/* Progress Bar */}
      {showProgress && progressPercent > 0 && !video.isCompleted && (
        <div className="w-full bg-gray-200 h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#173B2F] to-[#C49A55]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category Pill */}
        {video.category && (
          <div className="mb-1.5">
            <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-[#173B2F] border border-emerald-200/80">
              {video.category}
            </span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link
            to={`/student/videos/${video.id}`}
            className="text-xs font-bold text-[#17201C] group-hover:text-[#173B2F] transition-colors line-clamp-2 leading-snug"
          >
            {video.title}
          </Link>
          {onToggleBookmark && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleBookmark(video.id);
              }}
              title={video.isBookmarked ? 'Remove Bookmark' : 'Bookmark Lecture'}
              className="text-gray-400 hover:text-[#C49A55] p-1 cursor-pointer shrink-0"
            >
              <Bookmark
                className={`w-4 h-4 ${video.isBookmarked ? 'fill-[#C49A55] text-[#C49A55]' : ''}`}
              />
            </button>
          )}
        </div>

        <div className="text-[11px] text-[#66736C] mb-2 flex items-center justify-between">
          <span className="truncate">{video.facultyName}</span>
          <span className="font-semibold text-gray-400 text-[10px] uppercase shrink-0">{video.departmentCode}</span>
        </div>

        {/* Quick action buttons row */}
        <div className="my-2 pt-2 border-t border-gray-100 flex items-center gap-1.5">
          {onOpenRevisionKit && (
            <button
              onClick={() => onOpenRevisionKit(video)}
              className="flex-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#173B2F]/10 to-[#C49A55]/10 hover:from-[#173B2F] hover:to-[#285443] text-[#173B2F] hover:text-white text-[11px] font-bold border border-[#173B2F]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer group/btn"
              title="Generate Anna University 2-Mark & 16-Mark Revision Q&A"
            >
              <span className="text-[#C49A55] group-hover/btn:text-white">✨</span>
              <span>AI Exam Kit</span>
            </button>
          )}

          <Link
            to={`/student/videos/${video.id}`}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span>Watch</span>
          </Link>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#66736C]">
          <div className="flex items-center gap-1 font-mono">
            <Eye className="w-3 h-3 text-gray-400" />
            <span>{video.viewCount.toLocaleString()} views</span>
          </div>
          <span className="text-[10px] font-bold text-[#173B2F] bg-[#173B2F]/10 px-2 py-0.5 rounded-full">
            Sem {video.semester} • Unit {video.unitNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

