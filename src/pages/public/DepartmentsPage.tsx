import React, { useState } from 'react';
import { MOCK_DEPARTMENTS, MOCK_VIDEOS } from '../../lib/mockDatabase';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Award, Video, ArrowRight } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept_cse');

  const activeDept = MOCK_DEPARTMENTS.find((d) => d.id === selectedDeptId) || MOCK_DEPARTMENTS[0];
  const deptVideos = MOCK_VIDEOS.filter((v) => v.departmentId === activeDept.id);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Academic Divisions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17201C] tracking-tight mt-1">
          Colleges & Academic Departments
        </h1>
        <p className="text-sm text-[#66736C] max-w-2xl mt-1">
          Nadar Saraswathi College of Engineering & Technology comprises 6 dynamic engineering departments equipped with research laboratories, academic faculty, and online lecture archives.
        </p>
      </div>

      {/* Department Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {MOCK_DEPARTMENTS.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDeptId(dept.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedDeptId === dept.id
                ? 'bg-[#173B2F] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {dept.code} - {dept.name}
          </button>
        ))}
      </div>

      {/* Active Department Spotlight */}
      <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Department Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#173B2F] text-white text-xs font-bold">
              {activeDept.code}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ★ {activeDept.satisfactionScore}% Overall Student Satisfaction
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#17201C]">
            {activeDept.name}
          </h2>

          <p className="text-sm text-[#66736C] leading-relaxed">
            {activeDept.description}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <Users className="w-5 h-5 text-[#173B2F] mb-1" />
              <div className="text-lg font-black text-[#17201C]">{activeDept.studentCount}</div>
              <div className="text-[11px] text-gray-500">Enrolled Students</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <GraduationCap className="w-5 h-5 text-[#C49A55] mb-1" />
              <div className="text-lg font-black text-[#17201C]">{activeDept.facultyCount}</div>
              <div className="text-[11px] text-gray-500">Faculty Members</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <Award className="w-5 h-5 text-[#6FA9C9] mb-1" />
              <div className="text-lg font-black text-[#17201C]">Anna Univ</div>
              <div className="text-[11px] text-gray-500">Affiliation</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-500 block">Head of Department:</span>
              <strong className="text-[#17201C] text-sm">{activeDept.hodName}</strong>
            </div>
            <a
              href={`mailto:${activeDept.hodEmail}`}
              className="text-xs text-[#173B2F] font-semibold hover:underline"
            >
              {activeDept.hodEmail}
            </a>
          </div>
        </div>

        {/* Department Media & Video Hub */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden aspect-video border border-gray-200 shadow-inner">
            <img
              src={activeDept.image || '/assets/campus/academic-blocks-courtyard.jpg'}
              alt={activeDept.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#173B2F]/5 border border-[#173B2F]/15 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#173B2F] flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>Department Video Lectures ({deptVideos.length})</span>
              </span>
              <Link
                to="/student/videos"
                className="text-[11px] text-[#C49A55] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Browse All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {deptVideos.map((v) => (
              <Link
                key={v.id}
                to={`/student/videos/${v.id}`}
                className="p-2.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#173B2F] flex items-center gap-3 transition-colors block"
              >
                <div className="w-8 h-8 rounded-lg bg-[#173B2F] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  U{v.unitNumber}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-[#17201C] truncate">{v.title}</div>
                  <div className="text-[10px] text-gray-500">Faculty: {v.facultyName}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

