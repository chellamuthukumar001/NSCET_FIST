import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLocalStoredVideos, fetchAllVideos } from '../../lib/videoStore';
import { VideoCard } from '../../components/video/VideoCard';
import { Video as VideoType } from '../../types';
import {
  Search,
  Video,
  ShieldCheck,
  ChevronRight,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchVal, setSearchVal] = useState('');
  const [videos, setVideos] = useState<VideoType[]>(getLocalStoredVideos());

  useEffect(() => {
    fetchAllVideos().then((loaded) => {
      setVideos(loaded);
    });

    const handleUpdate = () => {
      setVideos(getLocalStoredVideos());
    };
    window.addEventListener('campusiq_videos_updated', handleUpdate);
    return () => window.removeEventListener('campusiq_videos_updated', handleUpdate);
  }, []);

  // Filtered Videos
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      if (!searchVal.trim()) return true;
      const q = searchVal.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.subjectTitle.toLowerCase().includes(q) ||
        v.facultyName.toLowerCase().includes(q) ||
        v.departmentCode.toLowerCase().includes(q)
      );
    });
  }, [videos, searchVal]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Official Institutional Header - Clean Admin Information */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#20493B] to-[#101815] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Learning Portal • Semester {currentUser?.semester || 5}</span>
            </div>
            
            {/* Quick Upload action on mobile/desktop header */}
            <Link
              to="/admin/videos"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C49A55] hover:bg-[#b08744] text-white text-xs font-bold shadow-md transition"
            >
              <Upload className="w-3 h-3" />
              <span>Upload Video</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Department Video Lectures
          </h1>

          <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
            Welcome, <strong>{currentUser?.name || 'Vignesh R.'}</strong>. Access your manually uploaded lecture videos and academic materials here.
          </p>

          {/* Search */}
          <div className="pt-2 max-w-xl">
            <div className="relative flex items-center rounded-2xl bg-black/35 border border-white/20 p-1.5 focus-within:border-[#C49A55] transition-all">
              <Search className="w-4 h-4 text-white/60 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search lectures..."
                className="w-full py-1.5 bg-transparent text-white placeholder-white/50 text-xs focus:outline-none"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal('')}
                  className="px-2.5 py-1 text-[11px] text-gray-300 hover:text-white cursor-pointer mr-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: CURATED VIDEO LECTURES                                         */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Uploaded Video Lectures</span>
            </span>
            <h2 className="text-lg font-bold text-[#17201C]">
              Recent Uploads
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/admin/videos"
              className="px-3 py-1.5 rounded-xl bg-[#173B2F] hover:bg-[#102a21] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Upload className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Upload Video</span>
            </Link>
            <Link
              to="/student/videos"
              className="text-xs font-semibold text-[#173B2F] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} showProgress={false} />
          ))}
        </div>
      </div>

    </div>
  );
};
