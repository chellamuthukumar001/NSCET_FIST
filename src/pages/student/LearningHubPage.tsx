import React, { useState } from 'react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import { ExamRevisionModal } from '../../components/video/ExamRevisionModal';
import { Video } from '../../types';
import { Search, GraduationCap, Video as VideoIcon } from 'lucide-react';

export const LearningHubPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [search, setSearch] = useState('');
  const [revisionModalVideo, setRevisionModalVideo] = useState<Video | null>(null);

  const handleToggleBookmark = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, isBookmarked: !v.isBookmarked } : v))
    );
  };

  const filtered = videos.filter((v) => {
    if (!search.trim()) return true;
    const queryLower = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(queryLower) ||
      v.subjectTitle.toLowerCase().includes(queryLower) ||
      v.facultyName.toLowerCase().includes(queryLower) ||
      v.topic.toLowerCase().includes(queryLower)
    );
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1C483A] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Learning Hub</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Manually Uploaded Video Lectures
            </h1>

            <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
              Explore the repository of your exclusively uploaded course videos.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lectures by title, topic, subject code, or faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:border-[#173B2F] focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Grid Cards View */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onToggleBookmark={handleToggleBookmark}
              onOpenRevisionKit={(v) => setRevisionModalVideo(v)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl space-y-3 bg-white border border-gray-200">
          <VideoIcon className="w-10 h-10 mx-auto text-gray-400" />
          <h3 className="text-base font-bold text-[#17201C]">No matching video lectures found</h3>
          <p className="text-xs text-[#66736C]">
            Try clearing your search terms.
          </p>
          <button
            onClick={() => setSearch('')}
            className="px-4 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-semibold cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* AI Exam Revision Modal */}
      {revisionModalVideo && (
        <ExamRevisionModal
          video={revisionModalVideo}
          isOpen={Boolean(revisionModalVideo)}
          onClose={() => setRevisionModalVideo(null)}
        />
      )}

    </div>
  );
};

