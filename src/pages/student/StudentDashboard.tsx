import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import { MOCK_VIDEOS, MOCK_NOTIFICATIONS, MOCK_FEEDBACK } from '../../lib/mockDatabase';
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
  MessageSquareHeart,
  ChevronRight,
  Play
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
  const recentFeedback = MOCK_FEEDBACK.slice(0, 2);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      openCopilot(searchVal.trim());
      setSearchVal('');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Personalized Greeting Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#285443] to-[#173B2F] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-[#6E7F45]/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider">
            <span>Semester {currentUser?.semester || 5} • B.E. Computer Science</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Good morning, {currentUser?.name?.split(' ')[0] || 'Vignesh'}
          </h1>

          <p className="text-xs sm:text-sm text-[#DCE7E1]">
            What would you like to learn or know today?
          </p>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
            <div className="relative flex items-center rounded-2xl bg-black/30 border border-white/20 p-1.5 focus-within:border-[#6FA9C9]">
              <Search className="w-4 h-4 text-white/60 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search your campus (e.g. DBMS Normalization, exam rules)..."
                className="w-full py-1.5 bg-transparent text-white placeholder-white/50 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#C49A55] text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* YOUR LEARNING STATS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Your Learning Performance
          </h2>
          <Link to="/student/progress" className="text-xs text-[#173B2F] font-bold hover:underline flex items-center gap-1">
            <span>Detailed Analytics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-[#17201C]">4 / 6</div>
              <div className="text-[11px] text-gray-500">Courses Completed</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C49A55] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-[#17201C]">32.5h</div>
              <div className="text-[11px] text-gray-500">Learning Hours</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-[#17201C]">7 Days 🔥</div>
              <div className="text-[11px] text-gray-500">Current Streak</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#6FA9C9] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-[#17201C]">68%</div>
              <div className="text-[11px] text-gray-500">Syllabus Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE LEARNING SECTION */}
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
              className="text-xs font-semibold text-[#173B2F] hover:underline"
            >
              Watch History
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueLearningVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED FOR YOU (AI Recommendations) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C49A55]" />
              <span>Personalized AI Curriculum</span>
            </span>
            <h2 className="text-lg font-bold text-[#17201C]">Recommended For You</h2>
          </div>
          <Link
            to="/student/videos"
            className="text-xs font-semibold text-[#173B2F] hover:underline"
          >
            Explore All Lectures
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedVideos.map((video) => (
            <VideoCard key={video.id} video={video} showProgress={false} />
          ))}
        </div>
      </div>

      {/* TWO COLUMNS: COLLEGE ASSISTANT & CAMPUS VOICE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* College Assistant Glass Panel */}
        <div className="lg:col-span-7 rounded-3xl p-6 bg-[#173B2F] text-white border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C49A55] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CampusIQ College Assistant</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Ask CampusIQ anything about your college.
            </h3>
            <p className="text-xs text-[#DCE7E1] leading-relaxed">
              Instant grounded answers verified against Anna University 2021 regulations, semester syllabi, and official NSCET notices.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] text-gray-300 font-medium">Common questions today:</div>
            <div className="flex flex-wrap gap-2">
              {[
                'What is the attendance requirement?',
                'Show me DBMS Unit 3 lectures',
                'How do I apply for a bonafide certificate?',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => openCopilot(q)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 text-left transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => openCopilot()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch CampusIQ Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Feedback Activity */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
                Campus Voice
              </span>
              <Link
                to="/student/feedback"
                className="text-[11px] font-bold text-[#173B2F] hover:underline"
              >
                + New Feedback
              </Link>
            </div>
            <h3 className="text-base font-bold text-[#17201C] mb-2">
              Recent Institutional Feedback
            </h3>
            <p className="text-xs text-[#66736C]">
              Your suggestions help our department upgrade facilities. All reports are 100% anonymous.
            </p>
          </div>

          <div className="space-y-2.5">
            {recentFeedback.map((fb) => (
              <div
                key={fb.id}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#173B2F]">{fb.category}</span>
                  <span className="text-gray-400 font-mono">{fb.anonymousToken}</span>
                </div>
                <p className="text-[#17201C] line-clamp-2 italic">"{fb.text}"</p>
              </div>
            ))}
          </div>

          <Link
            to="/student/feedback"
            className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#173B2F] font-bold text-xs text-center uppercase tracking-wider block transition-colors"
          >
            Submit Anonymous Feedback
          </Link>
        </div>

      </div>

    </div>
  );
};

