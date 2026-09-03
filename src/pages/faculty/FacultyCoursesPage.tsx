import React from 'react';
import { BookOpen, Video, Users, Clock, Plus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacultyCoursesPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            Curriculum Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Assigned Courses & Lecture Syllabi
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Map YouTube lectures, review unit progress, and manage lecture transcripts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
              CS3451
            </span>
            <span className="text-xs text-gray-500">Semester 4</span>
          </div>

          <h3 className="text-lg font-bold text-[#17201C]">Operating Systems</h3>
          <p className="text-xs text-gray-600">
            Process management, CPU scheduling, deadlocks, virtual memory, and file systems.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
            <div>Lectures Uploaded: <strong>12 Modules</strong></div>
            <div>Transcript Verified: <strong>100%</strong></div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              to="/student/videos/vid_2"
              className="flex-1 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-bold text-center uppercase tracking-wider shadow"
            >
              View Course Hub
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
              CS3351
            </span>
            <span className="text-xs text-gray-500">Semester 5</span>
          </div>

          <h3 className="text-lg font-bold text-[#17201C]">Database Management Systems</h3>
          <p className="text-xs text-gray-600">
            Relational model, SQL, normalization (1NF-BCNF), ACID transactions, and query optimization.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
            <div>Lectures Uploaded: <strong>16 Modules</strong></div>
            <div>Transcript Verified: <strong>100%</strong></div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              to="/student/videos/vid_1"
              className="flex-1 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-bold text-center uppercase tracking-wider shadow"
            >
              View Course Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

