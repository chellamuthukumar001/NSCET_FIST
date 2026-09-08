import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCopilot } from '../../context/CopilotContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  Search,
  BookOpen,
  Video,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Compass,
  Zap,
  GraduationCap
} from 'lucide-react';
import { MOCK_VIDEOS, MOCK_DEPARTMENTS } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';

export const HomePage: React.FC = () => {
  const { openCopilot } = useCopilot();
  const { currentUser, role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredVideos = MOCK_VIDEOS.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      openCopilot(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const samplePrompts = [
    'Show me DBMS Unit 3 lectures',
    'What is the attendance requirement?',
    'Explain Operating Systems CPU scheduling',
    'How do I apply for a bonafide certificate?',
  ];

  return (
    <div className="flex flex-col min-h-screen relative text-white selection:bg-[#C49A55]/30 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* FULL-PAGE COLLEGE BACKGROUND IMAGE WITH RESPONSIVE AMBIENT OVERLAY         */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/assets/campus/nscet-entrance-gate.jpg"
          alt="Nadar Saraswathi College of Engineering & Technology Campus"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        {/* Translucent dark emerald glass overlay allowing college architecture to shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1410]/90 via-[#0D1914]/84 to-[#070D0A]/95" />
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#173B2F]/40 blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-[#C49A55]/15 blur-[140px]" />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative z-10 min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* College Crest & Institution Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-xs font-semibold uppercase tracking-wider text-white mb-6">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C49A55] bg-white">
              <img src="/assets/nscet-college-logo.jpg" alt="NSCET" className="w-full h-full object-cover" />
            </div>
            <span>Nadar Saraswathi College of Engineering & Technology, Theni</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-6">
            Your Campus. <br />
            <span className="bg-gradient-to-r from-white via-[#DCE7E1] to-[#6FA9C9] bg-clip-text text-transparent">
              One Intelligent Platform.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="max-w-2xl text-base sm:text-lg text-[#DCE7E1] font-normal leading-relaxed mb-8">
            Learn from your college resources, discover knowledge, master accredited courses, and get trusted answers with <strong>CampusIQ</strong>.
          </p>

          {/* Primary & Secondary Call to Actions with "Get Started" */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              to="/student"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white font-black text-sm tracking-wide shadow-xl shadow-amber-950/40 flex items-center gap-2.5 transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/20"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/student/courses"
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/30 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#C49A55]" />
              <span>Explore 10 Courses</span>
            </Link>

            <button
              onClick={() => openCopilot()}
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/30 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C49A55]" />
              <span>Ask CampusIQ</span>
            </button>
          </div>

          {/* Intelligent Glass Search Interface */}
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center rounded-2xl bg-black/40 backdrop-blur-xl border border-white/25 shadow-2xl p-2 transition-all focus-within:bg-black/60 focus-within:border-[#C49A55]">
                <Search className="w-5 h-5 text-white/70 ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything about your curriculum (e.g. DBMS Unit 3, attendance rules)..."
                  className="w-full py-2.5 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer border border-[#6FA9C9]/30"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Prompt Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[11px] text-[#A2B6AC] font-medium mr-1">Quick prompts:</span>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => openCopilot(prompt)}
                  className="px-3 py-1 rounded-full text-[11px] bg-black/40 hover:bg-black/60 text-white/90 border border-white/15 backdrop-blur-sm transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CAMPUSIQ LEARNING ECOSYSTEM & EMBLEM                          */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Column: Official College Emblem */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C49A55] to-[#6E7F45] blur-2xl opacity-30 animate-pulse-glow" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-[#173B2F] via-[#C49A55] to-[#6FA9C9] shadow-2xl overflow-hidden border-2 border-white/40">
                <img
                  src="/assets/campusiq-logo.png"
                  alt="Official CampusIQ Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49A55]/20 text-[#C49A55] border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider">
              <span>Next-Gen Engineering Learning Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              An intelligent digital learning hub for engineering students.
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              CAMPUSIQ connects the academic framework of <strong>Nadar Saraswathi College of Engineering & Technology</strong> with an interactive modular curriculum. Students discover verified video lectures mapped to Anna University syllabi, interact with timestamped transcripts, take auto-graded quizzes, and earn verifiable course certificates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 shadow-sm space-y-1">
                <div className="w-9 h-9 rounded-xl bg-[#173B2F]/40 text-[#6FA9C9] border border-[#6FA9C9]/30 flex items-center justify-center mb-2 font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">Official YouTube Hub</h4>
                <p className="text-[11px] text-gray-300">
                  Categorized by Department, Semester, and Unit 1–5 syllabi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 shadow-sm space-y-1">
                <div className="w-9 h-9 rounded-xl bg-[#C49A55]/20 text-[#C49A55] border border-[#C49A55]/30 flex items-center justify-center mb-2 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">Transcript RAG</h4>
                <p className="text-[11px] text-gray-300">
                  Query lecture concepts with clickable timestamp citations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 shadow-sm space-y-1">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-2 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">Accredited Certificates</h4>
                <p className="text-[11px] text-gray-300">
                  Verifiable course certificates mapped to Anna University Regulation 2021.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: YOUTUBE LEARNING HUB SPOTLIGHT                                  */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
                Curriculum Aligned Repository
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Official YouTube Learning Hub
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Anna University Regulation 2021 lectures recorded by department faculty.
              </p>
            </div>

            <Link
              to="/student/videos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C49A55] hover:text-white transition-colors"
            >
              <span>View All 240+ Lectures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CAMPUS DEPARTMENTS SHOWCASE                                    */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            Academic Disciplines
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Engineering & Technology Departments
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Explore syllabus requirements, faculty directories, and departmental analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="rounded-2xl border border-white/15 p-6 hover:shadow-xl transition-all flex flex-col bg-black/40 backdrop-blur-xl hover:border-[#C49A55]/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold border border-[#6FA9C9]/30">
                  {dept.code}
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {dept.satisfactionScore}% Satisfaction
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{dept.name}</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4 flex-1">
                {dept.description}
              </p>

              <div className="pt-3 border-t border-white/10 text-xs text-white flex items-center justify-between">
                <span className="text-[11px] text-gray-400">HOD: {dept.hodName}</span>
                <Link
                  to="/departments"
                  className="text-[#C49A55] font-bold text-[11px] hover:underline flex items-center gap-1"
                >
                  <span>View Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INSTITUTIONAL CALL-TO-ACTION                                    */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-[#173B2F]/60 backdrop-blur-2xl border-t border-white/15 text-white text-center">
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to experience CampusIQ?
          </h2>
          <p className="text-sm sm:text-base text-[#DCE7E1] leading-relaxed">
            Access your personalized student learning dashboard, explore accredited courses, and get answers from our institutional AI.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/student"
              className="px-8 py-3.5 rounded-xl bg-white text-[#173B2F] hover:bg-[#F5F4EF] font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 hover:scale-105"
            >
              <Zap className="w-4 h-4 text-[#C49A55] fill-[#C49A55]" />
              <span>Get Started &bull; Student Dashboard</span>
            </Link>
            <Link
              to="/login"
              className="px-7 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
            >
              Staff & Admin Login
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
