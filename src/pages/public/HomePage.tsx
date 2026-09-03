import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCopilot } from '../../context/CopilotContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  Search,
  BookOpen,
  Video,
  MessageSquareHeart,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  Compass
} from 'lucide-react';
import { MOCK_VIDEOS, MOCK_DEPARTMENTS, MOCK_CLOSED_LOOP_ISSUES } from '../../lib/mockDatabase';
import { VideoCard } from '../../components/video/VideoCard';
import { GlassCard } from '../../components/common/GlassCard';

export const HomePage: React.FC = () => {
  const { openCopilot } = useCopilot();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredVideos = MOCK_VIDEOS.slice(0, 3);
  const recentResolution = MOCK_CLOSED_LOOP_ISSUES[0];

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
    'What are students saying about the computer lab?',
    'How do I apply for a bonafide certificate?',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* Full-bleed campus photograph with dark translucent gradient & glass search */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Background Campus Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/campus/nscet-entrance-gate.jpg"
            alt="Nadar Saraswathi College of Engineering & Technology Campus Gate"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Subtle Dark Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(16, 24, 21, 0.85) 0%, rgba(23, 59, 47, 0.78) 50%, rgba(16, 24, 21, 0.95) 100%)',
            }}
          />
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#6E7F45]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C49A55]/20 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* College Crest & Institution Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-xs font-semibold uppercase tracking-wider text-white mb-6">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C49A55]">
              <img src="/assets/campusiq-logo.png" alt="" className="w-full h-full object-cover" />
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
            Learn from your college resources, discover knowledge, share your experience, and get trusted answers with <strong>CampusIQ</strong>.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              to="/student/videos"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-xl shadow-amber-950/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Explore Learning</span>
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
              <div className="relative flex items-center rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl p-2 transition-all focus-within:bg-white/25 focus-within:border-white/50">
                <Search className="w-5 h-5 text-white/70 ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything about your college (e.g. DBMS Unit 3, attendance rules)..."
                  className="w-full py-2.5 bg-transparent text-white placeholder-white/60 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
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
                  className="px-3 py-1 rounded-full text-[11px] bg-black/30 hover:bg-black/50 text-white/90 border border-white/15 backdrop-blur-sm transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CAMPUSIQ INTRODUCTION & EMBLEM                                 */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Column: Official Emblem */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C49A55] to-[#6E7F45] blur-2xl opacity-30 animate-pulse-glow" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-[#173B2F] via-[#C49A55] to-[#6FA9C9] shadow-2xl overflow-hidden border-2 border-white">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173B2F]/10 text-[#173B2F] text-xs font-bold uppercase tracking-wider">
              <span>Next-Gen University Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17201C] tracking-tight leading-tight">
              An intelligent digital version of our actual campus.
            </h2>

            <p className="text-sm sm:text-base text-[#66736C] leading-relaxed">
              CAMPUSIQ bridges the physical infrastructure of <strong>Nadar Saraswathi College of Engineering & Technology</strong> with an intelligent knowledge engine. Students find verified video lectures mapped to Anna University syllabi, interact with timestamped transcripts, and submit genuinely anonymous feedback protected by our PII sanitization engine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center mb-2 font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#17201C]">Official YouTube Hub</h4>
                <p className="text-[11px] text-[#66736C] mt-1">
                  Categorized by Department, Semester, and Unit 1–5 syllabi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#C49A55]/10 text-[#C49A55] flex items-center justify-center mb-2 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#17201C]">Transcript RAG</h4>
                <p className="text-[11px] text-[#66736C] mt-1">
                  Query lecture concepts with clickable timestamp citations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#6E7F45]/10 text-[#6E7F45] flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#17201C]">Anonymous Voice</h4>
                <p className="text-[11px] text-[#66736C] mt-1">
                  Roll numbers and PII stripped before entering knowledge layer.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: YOUTUBE LEARNING HUB SPOTLIGHT                                  */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#173B2F]/5 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
                Curriculum Aligned Repository
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17201C] tracking-tight mt-1">
                Official YouTube Learning Hub
              </h2>
              <p className="text-xs sm:text-sm text-[#66736C] mt-1">
                Anna University Regulation 2021 lectures recorded by department faculty.
              </p>
            </div>

            <Link
              to="/student/videos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B2F] hover:underline"
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
      {/* SECTION 4: STUDENT VOICE & CLOSED-LOOP ACTION TICKER                      */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#101815] text-white p-8 sm:p-12 border border-white/10 shadow-2xl">
          
          {/* Subtle Background Campus Texture */}
          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
            <img
              src="/assets/campus/campus-aerial-overview.jpg"
              alt="Campus Aerial"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E7F45]/30 text-[#C49A55] text-xs font-bold uppercase tracking-wider border border-[#6E7F45]/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Closed-Loop Institutional Action</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Turning student voices into concrete campus improvements.
              </h3>

              <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
                Feedback on CampusIQ is not tossed into an unmonitored mailbox. Our system automatically clusters recurring feedback, alerts HODs, generates departmental tickets, and broadcasts verified resolutions back to students.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/student/feedback"
                  className="px-5 py-2.5 rounded-xl bg-[#C49A55] hover:bg-[#D97736] text-white text-xs font-bold tracking-wide shadow-md transition-all cursor-pointer"
                >
                  Share Anonymous Feedback
                </Link>
                <Link
                  to="/admin/closed-loop"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
                >
                  View Public Resolution Log
                </Link>
              </div>
            </div>

            {/* Live Case Study Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-semibold border border-emerald-500/30">
                    STATUS: {recentResolution.status.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {recentResolution.resolvedDate}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">
                  {recentResolution.title}
                </h4>

                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{recentResolution.publicResolutionNotice}"
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span>Assigned: {recentResolution.assignedPerson}</span>
                  <span className="text-[#C49A55] font-bold">★ {recentResolution.studentSatisfactionRating}/5</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CAMPUS DEPARTMENTS SHOWCASE                                    */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              Academic Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17201C] tracking-tight mt-1">
              Engineering & Technology Departments
            </h2>
            <p className="text-xs sm:text-sm text-[#66736C] mt-2">
              Explore syllabus requirements, faculty directories, and departmental analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DEPARTMENTS.map((dept) => (
              <div
                key={dept.id}
                className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all flex flex-col bg-gray-50/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
                    {dept.code}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {dept.satisfactionScore}% Satisfaction
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#17201C] mb-2">{dept.name}</h3>
                <p className="text-xs text-[#66736C] leading-relaxed mb-4 flex-1">
                  {dept.description}
                </p>

                <div className="pt-3 border-t border-gray-200 text-xs text-[#17201C] flex items-center justify-between">
                  <span className="text-[11px] text-[#66736C]">HOD: {dept.hodName}</span>
                  <Link
                    to="/departments"
                    className="text-[#173B2F] font-bold text-[11px] hover:underline flex items-center gap-1"
                  >
                    <span>View Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INSTITUTIONAL CALL-TO-ACTION                                    */}
      {/* ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#173B2F] text-white text-center">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="/assets/campus/campus-sports-quad.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to experience CampusIQ?
          </h2>
          <p className="text-sm sm:text-base text-[#DCE7E1] leading-relaxed">
            Access your personalized student learning dashboard, ask questions to our institutional AI, or review department insights.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/student"
              className="px-7 py-3 rounded-xl bg-white text-[#173B2F] hover:bg-[#F5F4EF] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Enter Student Workspace
            </Link>
            <Link
              to="/login"
              className="px-7 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
            >
              Staff & Admin Login
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

