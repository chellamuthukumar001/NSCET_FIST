import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import { MOCK_VIDEOS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import {
  Sparkles,
  Search,
  Flame,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  Play,
  GraduationCap,
  Video,
  CheckCircle2,
  Calendar,
  Zap,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { openCopilot } = useCopilot();
  const [searchVal, setSearchVal] = useState('');

  const continueLearningVideos = MOCK_VIDEOS.filter(
    (v) => v.userProgressSeconds && !v.isCompleted
  );
  const recommendedVideos = MOCK_VIDEOS.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      openCopilot(searchVal.trim());
      setSearchVal('');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. BENTO HERO: GREETING + QUICK SEARCH + ACTIVE SEMESTER CHIP             */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white p-6 sm:p-9 shadow-2xl border border-white/15">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full bg-[#6FA9C9]/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#C49A55] uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Semester {currentUser?.semester || 5} &bull; B.E. Computer Science</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Anna Univ Reg 2021 Compliant</span>
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Vignesh'}!
            </h1>
            <p className="text-xs sm:text-sm text-[#DCE7E1]">
              You have completed <strong>68%</strong> of your semester coursework. 10 modular engineering courses and 240+ video lectures are active.
            </p>
          </div>

          {/* Quick Copilot Search Input */}
          <form onSubmit={handleSearchSubmit} className="pt-1 max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-black/40 backdrop-blur-xl border border-white/25 p-1.5 focus-within:border-[#C49A55] focus-within:ring-2 focus-within:ring-[#C49A55]/30 transition-all shadow-inner">
              <Search className="w-4 h-4 text-white/70 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search lectures, syllabus concepts or ask Copilot (e.g. DBMS Normalization)..."
                className="w-full py-2 bg-transparent text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow transition-all active:scale-95"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BENTO MICRO-METRICS GRID (4 CARDS WITH PROGRESS BARS)                  */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Learning Performance Indices</span>
          </h2>
          <Link
            to="/student/progress"
            className="text-xs text-[#173B2F] font-bold hover:underline flex items-center gap-1"
          >
            <span>Detailed Progress Analytics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Modules Completed */}
          <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full font-bold">
                4 / 10 Active
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#17201C]">4 Completed</div>
              <div className="text-[11px] text-gray-500 mt-0.5">AU Modular Courses</div>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '40%' }} />
            </div>
          </div>

          {/* Card 2: Hours */}
          <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#C49A55] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#C49A55] bg-amber-100/60 px-2 py-0.5 rounded-full font-bold">
                +4.5h This Week
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#17201C]">32.5 hrs</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Video Masterclasses</div>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#C49A55] h-full rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          {/* Card 3: Streak */}
          <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-rose-700 bg-rose-100/60 px-2 py-0.5 rounded-full font-bold">
                Personal Best 🔥
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#17201C]">7 Days</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Learning Streak</div>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Card 4: Syllabus Coverage */}
          <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#6FA9C9] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full font-bold">
                On Track
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#17201C]">68%</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Anna Univ Coverage</div>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#6FA9C9] h-full rounded-full" style={{ width: '68%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. IN-PROGRESS MODULAR COURSE SPOTLIGHT (BENTO FEATURE CARD)              */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#173B2F] text-white flex items-center justify-center shrink-0 shadow-lg">
            <GraduationCap className="w-7 h-7 text-[#C49A55]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#173B2F]/10 text-[#173B2F] text-[10px] font-bold uppercase font-mono">
                CS3451
              </span>
              <span className="text-xs text-gray-500 font-semibold">Semester 4 Core</span>
            </div>
            <h3 className="text-lg font-bold text-[#17201C]">
              Operating Systems & Concurrency Architecture
            </h3>
            <p className="text-xs text-gray-600 max-w-xl">
              Currently on <strong>Module 2: CPU Scheduling & Process Synchronization</strong>. Video masterclasses, spoken transcript notes and 5-question knowledge check ready.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <Link
            to="/student/courses/cs3451/modules/cs3451-m2"
            className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Continue Module</span>
          </Link>
          <Link
            to="/student/courses"
            className="px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider transition-all"
          >
            All 10 Courses
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 1-TAP QUICK ACTION DOCK (CURRENT TREND: TACTILE LAUNCH TILES)          */}
      {/* ========================================================================= */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#C49A55]" />
          <span>Quick Learning Launchpad</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <Link
            to="/student/courses"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#173B2F] hover:shadow-md transition-all group flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17201C] group-hover:text-[#173B2F]">10 AU Modules</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Anna Univ Curriculum</div>
            </div>
          </Link>

          <Link
            to="/student/quiz"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#C49A55] hover:shadow-md transition-all group flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#C49A55]/15 text-[#C49A55] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17201C] group-hover:text-[#C49A55]">AI Quiz Studio</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Self-assessment drills</div>
            </div>
          </Link>

          <Link
            to="/student/videos"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#6FA9C9] hover:shadow-md transition-all group flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#6FA9C9] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17201C] group-hover:text-[#6FA9C9]">YouTube Hub</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Sync spoken transcripts</div>
            </div>
          </Link>

          <Link
            to="/student/certificates"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17201C] group-hover:text-emerald-600">Certificates</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Verified credentials</div>
            </div>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. CONTINUE LEARNING (RESUME RECENT VIDEOS)                                */}
      {/* ========================================================================= */}
      {continueLearningVideos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
                Resume Playback
              </span>
              <h2 className="text-lg font-bold text-[#17201C]">Continue Learning</h2>
            </div>
            <Link
              to="/student/history"
              className="text-xs font-semibold text-[#173B2F] hover:underline flex items-center gap-1"
            >
              <span>Watch History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueLearningVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. AI RECOMMENDED LECTURES                                                */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C49A55]" />
              <span>Personalized Curriculum Recommendations</span>
            </span>
            <h2 className="text-lg font-bold text-[#17201C]">Recommended For You</h2>
          </div>
          <Link
            to="/student/videos"
            className="text-xs font-semibold text-[#173B2F] hover:underline flex items-center gap-1"
          >
            <span>Explore All Lectures</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedVideos.map((video) => (
            <VideoCard key={video.id} video={video} showProgress={false} />
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. CAMPUSIQ COPILOT ASSISTANT PROMPT BAR                                  */}
      {/* ========================================================================= */}
      <div className="w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#101815] text-white border border-white/10 shadow-xl flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C49A55] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CampusIQ Bilingual Academic RAG Copilot</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ask CampusIQ anything about your engineering courses.
          </h3>
          <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed max-w-3xl">
            Ground truth syllabus answers calibrated for Anna University 2021 Regulation. Query lecture concepts in English or தமிழ்.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] text-gray-300 font-medium">Common questions today:</div>
          <div className="flex flex-wrap gap-2">
            {[
              'Explain Database Normalization 1NF to 3NF',
              'Show me Operating Systems CPU scheduling algorithms',
              'What are the CIA internal assessment marks weightages?',
              'What are the criteria for Anna University attendance eligibility?',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => openCopilot(q)}
                className="px-3.5 py-1.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 text-left transition-colors cursor-pointer active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => openCopilot()}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all self-start active:scale-95"
        >
          <span>Launch CampusIQ Assistant (⌘K)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
