import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Search,
  Filter,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ModularCourse } from '../../types';
import { curriculumApiService } from '../../services/curriculumApiService';

export const CourseCatalogPage: React.FC = () => {
  const [courses, setCourses] = useState<ModularCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(false);
    try {
      const data = await curriculumApiService.getCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    { code: 'ALL', label: 'All Disciplines' },
    { code: 'CSE', label: 'Computer Science (CSE)' },
    { code: 'AI&DS', label: 'Artificial Intelligence & Data Science' },
    { code: 'ECE', label: 'Electronics & Comm (ECE)' },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDept === 'ALL' ||
      (selectedDept === 'CSE' && c.department.includes('Computer Science')) ||
      (selectedDept === 'AI&DS' && (c.department.includes('Data Science') || c.department.includes('Artificial Intelligence'))) ||
      (selectedDept === 'ECE' && c.department.includes('Electronics'));

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Header: SWAYAM / Simplilearn Style */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#1F4D3E] to-[#173B2F] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-[#C49A55] border border-white/10 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            <span>SWAYAM & Simplilearn Modular Architecture • Anna Univ Reg 2021</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            10 Accredited Course Modules
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            Select any of the 10 core engineering course modules below. Each module is structured into 
            <span className="text-[#C49A55] font-bold"> 1. Introduction</span>, 
            <span className="text-[#C49A55] font-bold"> 2. Core Lessons (Videos & Notes)</span>, and 
            <span className="text-[#C49A55] font-bold"> 3. Knowledge Check (Quiz)</span> with verifiable certificate generation.
          </p>
        </div>

        {/* Decorative background glows */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C49A55]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 10 courses or subjects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#173B2F] shadow-sm"
          />
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {departments.map((dept) => (
            <button
              key={dept.code}
              onClick={() => setSelectedDept(dept.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedDept === dept.code
                  ? 'bg-[#173B2F] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid: 10 Course Modules */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 font-medium">
          Loading 10 Course Modules...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center text-gray-500 bg-white rounded-3xl border border-gray-200">
          No courses found matching &quot;{searchTerm}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <Link
              key={course.id}
              to={`/student/courses/${course.id}`}
              className="group bg-white rounded-3xl border border-gray-200 hover:border-[#173B2F]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 cursor-pointer"
            >
              {/* Thumbnail with Overlay Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Module Number & Course Code Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/20">
                    Module {idx + 1} • {course.code}
                  </span>
                  <span className="px-2 py-1 rounded-xl text-[10px] font-bold bg-[#C49A55] text-white shadow">
                    Reg 2021
                  </span>
                </div>

                {/* Credits & Duration in Bottom Thumbnail */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px]">
                    <Clock className="w-3 h-3 text-[#C49A55]" />
                    {course.totalDurationHours} Hours
                  </span>
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px]">
                    <Award className="w-3 h-3 text-emerald-400" />
                    {course.credits} Credits
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#6E7F45]">
                    <span>{course.department}</span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-semibold">
                      {course.difficultyLevel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#173B2F] transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* 3-Stage Pipeline Preview */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    <span>Module Structure</span>
                    <span className="text-emerald-600">3 Stages</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-center text-[10px] font-bold">
                    <div className="p-1.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-100">
                      1. Intro
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#173B2F]/5 text-[#173B2F] border border-[#173B2F]/15">
                      2. Lessons
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#C49A55]/10 text-[#C49A55] border border-[#C49A55]/20">
                      3. Quiz
                    </div>
                  </div>
                </div>

                {/* Instructor & CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{course.instructor}</p>
                    <p className="text-[11px] text-gray-500">{course.instructorTitle}</p>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-[#173B2F]/5 group-hover:bg-[#173B2F] text-[#173B2F] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
