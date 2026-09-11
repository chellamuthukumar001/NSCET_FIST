import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLocalStoredVideos, fetchAllVideos } from '../../lib/videoStore';
import {
  Video,
  Upload,
  ArrowRight,
  Sparkles,
  Database,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [videos, setVideos] = useState(getLocalStoredVideos());

  useEffect(() => {
    fetchAllVideos().then(setVideos);
    const handleUpdate = () => setVideos(getLocalStoredVideos());
    window.addEventListener('campusiq_videos_updated', handleUpdate);
    return () => window.removeEventListener('campusiq_videos_updated', handleUpdate);
  }, []);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
          <span>Video Lecture Administration Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Department Video Management
        </h1>
        <p className="text-xs sm:text-sm text-[#DCE7E1] mt-1 max-w-2xl leading-relaxed">
          Upload department video lectures with presenter details, thumbnails, and study materials. All uploads are synchronized permanently with the MySQL database and display on student dashboards.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-3">
          <Link
            to="/admin/videos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C49A55] hover:bg-[#b08744] text-white text-xs font-bold shadow-lg transition active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Lecture</span>
          </Link>
          <Link
            to="/student"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
          >
            <Eye className="w-4 h-4 text-[#C49A55]" />
            <span>View Student Dashboard</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Stored Videos</div>
            <div className="text-3xl font-black text-[#17201C] mt-1">{videos.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Live on Student Portal</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Database Storage</div>
            <div className="text-2xl font-black text-[#17201C] mt-1">MySQL</div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>campusiq_db Connected</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#C49A55]/15 text-[#C49A55] flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Target Department</div>
            <div className="text-2xl font-black text-[#17201C] mt-1">CSE & Engineering</div>
            <div className="text-[11px] text-gray-500 mt-0.5">NSCET Theni District</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/videos"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#C49A55]/15 text-[#C49A55] flex items-center justify-center font-bold">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#17201C] group-hover:text-[#C49A55] transition-colors">
            Upload & Manage Video Catalog
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Upload MP4 video lectures, set title, faculty presenter name, department, academic year, custom thumbnails, and attach optional study material PDFs.
          </p>
          <div className="text-xs font-bold text-[#C49A55] flex items-center gap-1 pt-1">
            <span>Open Video Upload Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/student"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#17201C] group-hover:text-[#173B2F] transition-colors">
            Preview Student Experience
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Switch directly to the student dashboard view to verify lecture playback, search filters, chapter navigation, and study material downloads.
          </p>
          <div className="text-xs font-bold text-[#173B2F] flex items-center gap-1 pt-1">
            <span>View Live Student Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

    </div>
  );
};
