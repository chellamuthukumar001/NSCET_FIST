import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_VIDEOS, MOCK_DEPARTMENTS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import { ExamRevisionModal } from '../../components/video/ExamRevisionModal';
import { SearchAndWatchSection } from '../../components/video/SearchAndWatchSection';
import { Video } from '../../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Bookmark,
  RotateCcw,
  BookOpen,
  Sparkles,
  Play,
  Clock,
  CheckCircle2,
  GraduationCap,
  Layers,
  LayoutGrid,
  ListTree,
  Mic,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check,
  Globe
} from 'lucide-react';

export const LearningHubPage: React.FC = () => {
  const [hubMode, setHubMode] = useState<'syllabus' | 'search_and_watch'>('syllabus');
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedSem, setSelectedSem] = useState<number | 'ALL'>('ALL');
  const [selectedUnit, setSelectedUnit] = useState<number | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'duration'>('recent');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [transcriptSearchMode, setTranscriptSearchMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'category' | 'syllabus'>('category');
  const [revisionModalVideo, setRevisionModalVideo] = useState<Video | null>(null);

  // In-progress active video for Spotlight Card
  const inProgressVideo = videos.find((v) => v.userProgressSeconds && !v.isCompleted) || videos[0];

  const handleToggleBookmark = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, isBookmarked: !v.isBookmarked } : v))
    );
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSubject('ALL');
    setSelectedCategory('ALL');
    setSelectedDept('ALL');
    setSelectedSem('ALL');
    setSelectedUnit('ALL');
    setOnlyBookmarked(false);
    setSortBy('recent');
    setTranscriptSearchMode(false);
  };

  // Distinct subjects list for subject tabs
  const uniqueSubjectCodes = Array.from(new Set(videos.map((v) => v.subjectCode)));
  const subjects = [
    { code: 'ALL', name: 'All Subjects', count: videos.length },
    ...uniqueSubjectCodes.map((code) => {
      const v = videos.find((item) => item.subjectCode === code);
      return {
        code,
        name: `${code} - ${v?.subjectTitle || ''}`,
        count: videos.filter((item) => item.subjectCode === code).length,
      };
    }),
  ];

  // Distinct academic domain categories
  const DOMAIN_CATEGORIES = [
    { id: 'ALL', name: 'All Domains', icon: '🌐', desc: 'All Academic Curriculum Tracks' },
    { id: 'Core Software & Algorithms', name: 'Core Software & Algorithms', icon: '💻', desc: 'DBMS, Algorithms, Data Structures, OOP Java, TOC & Compiler Design' },
    { id: 'Systems, Networks & Security', name: 'Systems, Networks & Security', icon: '🛡️', desc: 'Operating Systems, RSA Cryptography, Routing & Cloud Computing' },
    { id: 'Artificial Intelligence & Data Science', name: 'AI & Data Science', icon: '🧠', desc: 'Deep Learning, Neural Networks, Machine Learning & Computer Vision' },
    { id: 'Electronics & Embedded Systems', name: 'Electronics & Embedded', icon: '⚡', desc: 'ARM Cortex Microcontrollers, IoT & Digital Systems Design' },
    { id: 'Foundations & Computational Thinking', name: 'Foundations & Python', icon: '📐', desc: 'First Year Engineering Problem Solving & Python Programming' },
  ];

  // Dynamic statistics calculations
  const totalRepositorySeconds = videos.reduce((sum, v) => sum + v.durationSeconds, 0);
  const repoHours = Math.floor(totalRepositorySeconds / 3600);
  const repoMins = Math.floor((totalRepositorySeconds % 3600) / 60);

  // Filter & Sort Pipeline
  const filtered = videos
    .filter((v) => {
      let matchesSearch = true;

      if (search.trim()) {
        const queryLower = search.toLowerCase();
        const baseMatch =
          v.title.toLowerCase().includes(queryLower) ||
          v.subjectTitle.toLowerCase().includes(queryLower) ||
          v.facultyName.toLowerCase().includes(queryLower) ||
          v.topic.toLowerCase().includes(queryLower) ||
          (v.category && v.category.toLowerCase().includes(queryLower)) ||
          v.tags.some((t) => t.toLowerCase().includes(queryLower));

        if (transcriptSearchMode && v.transcript) {
          const transcriptMatch = v.transcript.some((t) =>
            t.text.toLowerCase().includes(queryLower)
          );
          matchesSearch = baseMatch || transcriptMatch;
        } else {
          matchesSearch = baseMatch;
        }
      }

      const matchesCategory = selectedCategory === 'ALL' || v.category === selectedCategory;
      const matchesSubject = selectedSubject === 'ALL' || v.subjectCode === selectedSubject;
      const matchesDept = selectedDept === 'ALL' || v.departmentCode === selectedDept;
      const matchesSem = selectedSem === 'ALL' || v.semester === selectedSem;
      const matchesUnit = selectedUnit === 'ALL' || v.unitNumber === selectedUnit;
      const matchesBookmark = !onlyBookmarked || v.isBookmarked;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubject &&
        matchesDept &&
        matchesSem &&
        matchesUnit &&
        matchesBookmark
      );
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.viewCount - a.viewCount;
      if (sortBy === 'duration') return b.durationSeconds - a.durationSeconds;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

  // Find spoken transcript matches for the active search
  const getTranscriptMatches = (video: Video) => {
    if (!search.trim() || !video.transcript) return [];
    return video.transcript.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Institutional Hero Header & Learning Analytics */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1C483A] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#6FA9C9]/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>NSCET Theni • Anna University Regulation 2021</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              YouTube Learning Hub & Lecture Vault
            </h1>

            <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
              Curated official video lectures mapped unit-by-unit to Anna University syllabi, featuring transcript timestamp jump points and instant Groq AI university exam prep kits.
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-[11px] font-medium text-white/80">
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>{uniqueSubjectCodes.length} Core Engineering Subjects</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>{DOMAIN_CATEGORIES.length - 1} Curriculum Tracks</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#6FA9C9]" />
                <span>{repoHours}h {repoMins}m Lecture Material</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Groq AI 2-Mark & 16-Mark Q&A</span>
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setRevisionModalVideo(inProgressVideo)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:from-[#b08744] hover:to-[#c2672b] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Exam Kit ✨</span>
            </button>

            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                onlyBookmarked
                  ? 'bg-white text-[#173B2F] border-white shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${onlyBookmarked ? 'fill-[#173B2F]' : ''}`} />
              <span>{onlyBookmarked ? 'Bookmarked Only (Active)' : 'View Bookmarks'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Institutional Hub Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setHubMode('syllabus')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
              hubMode === 'syllabus'
                ? 'bg-[#173B2F] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Curriculum Syllabus Vault (16 Faculty Lectures)</span>
          </button>

          <button
            onClick={() => setHubMode('search_and_watch')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
              hubMode === 'search_and_watch'
                ? 'bg-gradient-to-r from-[#C49A55] to-[#D97736] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Search & Watch Online (YouTube Education API)</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold ${
              hubMode === 'search_and_watch' ? 'bg-white/20 text-white' : 'bg-[#C49A55]/20 text-[#C49A55]'
            }`}>
              Live ✨
            </span>
          </button>
        </div>

        <div className="text-[11px] text-gray-500 font-medium hidden md:block">
          {hubMode === 'syllabus' ? (
            <span>Unit 1-5 Lectures mapped to Anna University Regulation 2021</span>
          ) : (
            <span>Search YouTube Data API & OpenCourseWare without leaving CampusIQ</span>
          )}
        </div>
      </div>

      {/* Search & Watch Online Mode */}
      {hubMode === 'search_and_watch' ? (
        <SearchAndWatchSection initialQuery="DBMS" />
      ) : (
        <>
          {/* 3. Spotlight "Continue Watching" Card */}
          {inProgressVideo && !onlyBookmarked && (
            <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-wider font-bold text-gray-700">
                Continue Learning • In-Progress Lecture
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#C49A55]">
              60% Watched
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-18 sm:w-36 sm:h-20 rounded-xl overflow-hidden bg-gray-900 shrink-0 shadow">
                <img
                  src={inProgressVideo.thumbnailUrl}
                  alt={inProgressVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono">
                  21:20
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#173B2F]/10 text-[#173B2F]">
                    {inProgressVideo.subjectCode} • Unit {inProgressVideo.unitNumber}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {inProgressVideo.facultyName} ({inProgressVideo.departmentCode})
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                  {inProgressVideo.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {inProgressVideo.topic} • Anna University CO3.1 Attainment
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setRevisionModalVideo(inProgressVideo)}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>Unit 3 Exam Kit</span>
              </button>

              <Link
                to={`/student/videos/${inProgressVideo.id}?t=${inProgressVideo.userProgressSeconds}`}
                className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-[#173B2F] hover:bg-[#112a21] text-white text-xs font-bold flex items-center justify-center gap-2 shadow cursor-pointer transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Resume Lecture (21:20)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Academic Domain Category Pills Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 px-1">
          <span className="flex items-center gap-1.5 text-[#173B2F]">
            <Layers className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Curriculum Domain Tracks</span>
          </span>
          <span className="text-[11px] text-gray-500 font-semibold">
            {DOMAIN_CATEGORIES.length - 1} Distinct Specializations
          </span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DOMAIN_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'ALL'
                ? videos.length
                : videos.filter((v) => v.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#173B2F] text-white border-[#173B2F] shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Subject Quick-Pills Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {subjects.map((sub) => (
          <button
            key={sub.code}
            onClick={() => setSelectedSubject(sub.code)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
              selectedSubject === sub.code
                ? 'bg-[#285443] text-white border-[#285443] shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <span>{sub.name}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                selectedSubject === sub.code ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {sub.count}
            </span>
          </button>
        ))}
      </div>

      {/* 5. Multi-Facet Search & Filter Control Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
        
        {/* Row 1: Search, Transcript Toggle & View Mode */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder={
                transcriptSearchMode
                  ? 'Search spoken words inside transcripts (e.g. "BCNF", "Round Robin", "AVL Rotations", "ARM")...'
                  : 'Search lectures by title, topic, subject code, category, or faculty...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:border-[#173B2F] focus:bg-white focus:outline-none transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Deep Transcript Search Toggle */}
          <button
            onClick={() => setTranscriptSearchMode(!transcriptSearchMode)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              transcriptSearchMode
                ? 'bg-[#6FA9C9]/20 text-[#173B2F] border-[#6FA9C9]'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
            }`}
            title="Search inside spoken audio transcripts with timestamp bookmarks"
          >
            <Mic className={`w-3.5 h-3.5 ${transcriptSearchMode ? 'text-[#173B2F]' : 'text-gray-400'}`} />
            <span>Transcript Deep Search</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('category')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                viewMode === 'category' ? 'bg-white shadow text-[#173B2F]' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Categorized Domain Shelves View"
            >
              <Layers className="w-4 h-4 text-[#C49A55]" />
              <span className="hidden sm:inline">Categorized</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                viewMode === 'grid' ? 'bg-white shadow text-[#173B2F]' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('syllabus')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                viewMode === 'syllabus' ? 'bg-white shadow text-[#173B2F]' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Syllabus Unit Hierarchy View"
            >
              <ListTree className="w-4 h-4" />
              <span className="hidden sm:inline">Syllabus</span>
            </button>
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns (Dept, Semester, Unit, Sort) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Department */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">Dept:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-[#173B2F]"
              >
                <option value="ALL">All Departments</option>
                {MOCK_DEPARTMENTS.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.code} - {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">Semester:</span>
              <select
                value={selectedSem}
                onChange={(e) =>
                  setSelectedSem(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
                }
                className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-[#173B2F]"
              >
                <option value="ALL">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">Unit:</span>
              <select
                value={selectedUnit}
                onChange={(e) =>
                  setSelectedUnit(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
                }
                className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-[#173B2F]"
              >
                <option value="ALL">All Units</option>
                {[1, 2, 3, 4, 5].map((u) => (
                  <option key={u} value={u}>
                    Unit {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-[#173B2F]"
              >
                <option value="recent">Recently Added</option>
                <option value="views">Most Viewed</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#173B2F] cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Results Subtitle */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>
          Showing <strong>{filtered.length}</strong> college lecture modules
          {transcriptSearchMode && search && ' with transcript analysis'}
        </span>
        <span className="hidden sm:inline">Official NSCET YouTube Academic Video Stream</span>
      </div>

      {/* 5. VIEW MODE: Grid Cards View */}
      {viewMode === 'grid' && (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((video) => {
                const matches = getTranscriptMatches(video);
                return (
                  <div key={video.id} className="flex flex-col space-y-2">
                    <VideoCard
                      video={video}
                      onToggleBookmark={handleToggleBookmark}
                      onOpenRevisionKit={(v) => setRevisionModalVideo(v)}
                    />

                    {/* Spoken Transcript Match Snippets (Deep Search Mode) */}
                    {transcriptSearchMode && matches.length > 0 && (
                      <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                          <span className="flex items-center gap-1">
                            <Mic className="w-3 h-3 text-[#C49A55]" />
                            Spoken Mention in Audio ({matches.length})
                          </span>
                        </div>
                        {matches.slice(0, 2).map((m) => {
                          const mins = Math.floor(m.startTime / 60);
                          const secs = m.startTime % 60;
                          const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;
                          return (
                            <Link
                              key={m.id}
                              to={`/student/videos/${video.id}?t=${m.startTime}`}
                              className="block p-1.5 rounded-lg bg-white/90 hover:bg-white border border-amber-100 text-[11px] text-gray-700 hover:text-[#173B2F] transition-colors"
                            >
                              <div className="flex items-center justify-between text-[9px] text-[#C49A55] font-mono font-bold mb-0.5">
                                <span>Section [{timeFormatted}]</span>
                                <span className="text-gray-400">Click to Seek ➜</span>
                              </div>
                              <p className="line-clamp-2 italic">"{m.text}"</p>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center glass-panel rounded-3xl space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-gray-400" />
              <h3 className="text-base font-bold text-[#17201C]">No matching college lectures found</h3>
              <p className="text-xs text-[#66736C]">
                Try clearing your search terms or resetting department and unit filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-semibold cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* 6. VIEW MODE: Categorized Domain Shelves View */}
      {viewMode === 'category' && (
        <div className="space-y-6">
          {DOMAIN_CATEGORIES.filter((c) => c.id !== 'ALL')
            .filter((cat) => {
              if (selectedCategory !== 'ALL' && selectedCategory !== cat.id) return false;
              return filtered.some((v) => v.category === cat.id);
            })
            .map((cat) => {
              const domainVideos = filtered.filter((v) => v.category === cat.id);
              const domainSecs = domainVideos.reduce((sum, v) => sum + v.durationSeconds, 0);
              const domainHours = Math.floor(domainSecs / 3600);
              const domainMins = Math.floor((domainSecs % 3600) / 60);

              return (
                <div
                  key={cat.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4 hover:border-[#173B2F]/30 transition-all"
                >
                  {/* Category Shelf Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#173B2F] to-[#285443] text-white flex items-center justify-center text-lg shadow-md">
                        {cat.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#173B2F] font-bold border border-emerald-200">
                            {domainVideos.length} {domainVideos.length === 1 ? 'Lecture' : 'Lectures'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 self-start sm:self-auto">
                      <span className="flex items-center gap-1 font-mono text-[11px] font-semibold bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {domainHours > 0 ? `${domainHours}h ${domainMins}m` : `${domainMins} mins`}
                      </span>
                    </div>
                  </div>

                  {/* Category Video Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
                    {domainVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onToggleBookmark={handleToggleBookmark}
                        onOpenRevisionKit={(v) => setRevisionModalVideo(v)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

          {filtered.length === 0 && (
            <div className="p-12 text-center glass-panel rounded-3xl space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-gray-400" />
              <h3 className="text-base font-bold text-[#17201C]">No lectures found in this category</h3>
              <p className="text-xs text-[#66736C]">
                Try selecting "All Domains" or clearing active search keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-semibold cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* 7. VIEW MODE: Syllabus Unit Hierarchy View */}
      {viewMode === 'syllabus' && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((unitNum) => {
            const unitVideos = filtered.filter((v) => v.unitNumber === unitNum);
            return (
              <div
                key={unitNum}
                className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#173B2F] text-white flex items-center justify-center font-bold text-sm shadow">
                      U{unitNum}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Anna University Unit {unitNum} Curriculum Modules
                      </h3>
                      <p className="text-xs text-gray-500">
                        Course Outcome Alignment: CO{unitNum}.1 & CO{unitNum}.2
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#C49A55] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {unitVideos.length} {unitVideos.length === 1 ? 'Lecture' : 'Lectures'} Available
                  </span>
                </div>

                {unitVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {unitVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onToggleBookmark={handleToggleBookmark}
                        onOpenRevisionKit={(v) => setRevisionModalVideo(v)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-gray-50 text-center text-xs text-gray-400">
                    No active lectures uploaded for Unit {unitNum} under current filters.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </>
      )}

      {/* 7. AI Exam Revision Modal */}
      {revisionModalVideo && (
        <ExamRevisionModal
          video={revisionModalVideo}
          isOpen={Boolean(revisionModalVideo)}
          onClose={() => setRevisionModalVideo(null)}
        />
      )}

    </div>
  );
};

