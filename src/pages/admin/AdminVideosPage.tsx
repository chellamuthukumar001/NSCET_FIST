import React, { useState, useEffect } from 'react';
import {
  fetchAllVideos,
  getLocalStoredVideos,
  uploadAndPersistVideo,
  fileToDataUrl
} from '../../lib/videoStore';
import { Video, Plus, Upload, X, Trash2 } from 'lucide-react';
import { Video as VideoType } from '../../types';

export const AdminVideosPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState<VideoType[]>(getLocalStoredVideos());
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [topicName, setTopicName] = useState('');
  const [presentedBy, setPresentedBy] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [studyMaterial, setStudyMaterial] = useState<File | null>(null);

  // Load videos on mount and sync with backend
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile || !topicName || !presentedBy || !department || !year) {
      alert("Please fill all compulsory fields.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('videoFile', videoFile);
      formData.append('thumbnailFile', thumbnailFile);
      if (studyMaterial) {
        formData.append('studyMaterialFile', studyMaterial);
      }
      formData.append('topicName', topicName);
      formData.append('presentedBy', presentedBy);
      formData.append('department', department);
      formData.append('year', year);

      let thumbnailDataUrl: string | undefined;
      try {
        thumbnailDataUrl = await fileToDataUrl(thumbnailFile);
      } catch (err) {
        console.warn('Thumbnail base64 conversion skipped:', err);
      }

      await uploadAndPersistVideo(formData, {
        topicName,
        presentedBy,
        department,
        year,
        thumbnailDataUrl,
        videoDataUrl: URL.createObjectURL(videoFile),
      });

      // Update state immediately
      setVideos(getLocalStoredVideos());
      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      console.error('Upload error:', err);
      alert('Upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setTopicName('');
    setPresentedBy('');
    setDepartment('');
    setYear('');
    setVideoFile(null);
    setThumbnailFile(null);
    setStudyMaterial(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 sm:pb-16">
      
      {/* Header with Mobile-Optimized Full-Width Action */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" />
            <span>Video Repository Management</span>
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Curated College Video Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Manage, upload and synchronize manual video lectures with optional study materials.
          </p>
        </div>

        {/* Big Mobile-First Upload Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 bg-gradient-to-r from-[#173B2F] to-[#285443] hover:from-[#112a21] hover:to-[#173b2f] text-white rounded-2xl sm:rounded-xl font-bold text-sm sm:text-xs shadow-lg shadow-emerald-950/20 transition cursor-pointer active:scale-95 shrink-0"
        >
          <Upload className="w-4 h-4 text-[#C49A55]" />
          <span>Upload New Video</span>
        </button>
      </div>

      {/* Mobile Card List (Visible on Phone Screens) */}
      <div className="block sm:hidden space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 px-1">
          <span>Uploaded Videos ({videos.length})</span>
        </div>
        {videos.map((v) => (
          <div
            key={v.id}
            className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3"
          >
            <div className="flex gap-3">
              <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-900 shrink-0">
                <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate">{v.title}</h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">{v.facultyName}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#173B2F]/10 text-[#173B2F] font-bold text-[10px]">
                    {v.departmentCode} • {v.academicYear}
                  </span>
                  {v.studyMaterialUrl ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Study Material Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-bold text-[10px]">
                      No Material
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop & Tablet Table (Hidden on Mobile) */}
      <div className="hidden sm:block overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Lecture Title</th>
              <th className="p-4">Department & Year</th>
              <th className="p-4">Faculty</th>
              <th className="p-4">Study Material</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {videos.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50/80">
                <td className="p-4 font-semibold text-[#17201C]">{v.title}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-[#173B2F]/10 text-[#173B2F] font-bold text-[10px]">
                    {v.departmentCode} • {v.academicYear}
                  </span>
                </td>
                <td className="p-4 font-mono text-gray-500">{v.facultyName}</td>
                <td className="p-4">
                  {v.studyMaterialUrl ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-bold text-[10px]">
                      None
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-Friendly Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col my-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base sm:text-lg font-black text-gray-900">Upload New Video Lecture</h2>
                <p className="text-[11px] text-gray-500">All uploaded videos appear instantly on the student dashboard</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Video Topic Name *</label>
                <input
                  type="text"
                  required
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:border-[#173B2F] focus:outline-none transition"
                  placeholder="e.g. Introduction to Neural Networks"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Presented By *</label>
                <input
                  type="text"
                  required
                  value={presentedBy}
                  onChange={(e) => setPresentedBy(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:border-[#173B2F] focus:outline-none transition"
                  placeholder="e.g. Dr. A. Smith CSE"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:border-[#173B2F] focus:outline-none transition"
                    placeholder="e.g. CSE"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Year *</label>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:border-[#173B2F] focus:outline-none transition"
                    placeholder="e.g. 2024-25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Video File *</label>
                <input
                  type="file"
                  required
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Thumbnail Image *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Study Materials (Optional)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => setStudyMaterial(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 sm:w-auto px-6 py-2.5 text-xs font-bold bg-[#173B2F] hover:bg-[#102a21] text-white rounded-xl shadow-md transition cursor-pointer active:scale-95"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

