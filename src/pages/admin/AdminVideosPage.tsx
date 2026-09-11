import React, { useState } from 'react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { Video, Plus, Upload, X } from 'lucide-react';
import { Video as VideoType } from '../../types';

export const AdminVideosPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState<VideoType[]>(MOCK_VIDEOS);

  // Form State
  const [topicName, setTopicName] = useState('');
  const [presentedBy, setPresentedBy] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [studyMaterial, setStudyMaterial] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile || !topicName || !presentedBy || !department || !year) {
      alert("Please fill all compulsory fields.");
      return;
    }

    const newVideo: VideoType = {
      id: Math.random().toString(36).substr(2, 9),
      youtubeId: '',
      localVideoPath: URL.createObjectURL(videoFile),
      title: topicName,
      topic: topicName,
      facultyName: presentedBy,
      departmentCode: department,
      departmentId: department,
      academicYear: year,
      thumbnailUrl: URL.createObjectURL(thumbnailFile),
      studyMaterialUrl: studyMaterial ? URL.createObjectURL(studyMaterial) : undefined,
      description: 'Manually uploaded video.',
      durationSeconds: 120, // Mock duration
      publishedDate: new Date().toISOString(),
      program: 'B.E',
      semester: 1,
      subjectCode: 'GEN',
      subjectTitle: 'General Subject',
      unitNumber: 1,
      tags: [],
      viewCount: 0,
    };

    MOCK_VIDEOS.unshift(newVideo);
    setVideos([...MOCK_VIDEOS]);
    setIsModalOpen(false);
    resetForm();
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
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            Video Repository Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Curated College Video Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Manage and upload manual video lectures and study materials.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#173B2F] text-white rounded-xl font-bold text-xs shadow-md hover:bg-[#102a21] transition"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Video</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-sm">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900">Upload New Video</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Video Topic Name *</label>
                <input
                  type="text"
                  required
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
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
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g. Dr. A. Smith"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
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
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="e.g. 2024"
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
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Thumbnail Image *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Study Materials (Optional)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => setStudyMaterial(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold bg-[#173B2F] text-white rounded-xl shadow hover:bg-[#102a21]"
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

