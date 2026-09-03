import React from 'react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import { History, RotateCcw } from 'lucide-react';

export const WatchHistoryPage: React.FC = () => {
  const watchedVideos = MOCK_VIDEOS.filter((v) => v.userProgressSeconds);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            Playback Activity
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Watch History
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Resume previously watched video lectures exactly where you left off.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchedVideos.map((video) => (
          <VideoCard key={video.id} video={video} showProgress={true} />
        ))}
      </div>
    </div>
  );
};

