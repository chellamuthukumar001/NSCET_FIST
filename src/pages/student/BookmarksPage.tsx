import React, { useState } from 'react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Bookmark } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const [videos, setVideos] = useState(MOCK_VIDEOS.filter((v) => v.isBookmarked));

  const handleToggleBookmark = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  return (
    <div className="space-y-6 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Personal Archive
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Bookmarked Lectures
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Saved lecture sessions for quick revision and exam preparation.
        </p>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onToggleBookmark={handleToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark className="w-8 h-8" />}
          title="You haven't saved any lectures yet."
          description="Click the bookmark icon on any lecture card to save it here for fast revision."
          actionText="Explore Learning Hub"
          actionLink="/student/videos"
        />
      )}
    </div>
  );
};

