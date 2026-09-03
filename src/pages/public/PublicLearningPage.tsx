import React, { useState } from 'react';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import { Search, Filter, Video } from 'lucide-react';

export const PublicLearningPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filtered = MOCK_VIDEOS.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.subjectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || v.departmentCode === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Open Courseware
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17201C] tracking-tight mt-1">
          College YouTube Learning Repository
        </h1>
        <p className="text-sm text-[#66736C] max-w-2xl mt-1">
          Open-access university lecture sessions recorded at Nadar Saraswathi College of Engineering & Technology. Free for all students and aspirants.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search subjects, units, faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:border-[#173B2F] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'CSE', 'AI&DS', 'ECE'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                selectedDept === d
                  ? 'bg-[#173B2F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {d === 'ALL' ? 'All Departments' : d}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} showProgress={false} />
        ))}
      </div>
    </div>
  );
};

