import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import {
  GraduationCap,
  Play,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Video,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Search,
  Bot,
  Zap,
  Layers,
  FileText,
  Star,
  Compass,
  Check,
  X,
  HelpCircle,
  QrCode,
  ExternalLink
} from 'lucide-react';
import { ModularCourse } from '../../types';
import { curriculumApiService } from '../../services/curriculumApiService';

export const LandingPage: React.FC = () => {
  const { currentUser, role } = useAuth();
  const { openCopilot } = useCopilot();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<ModularCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course_cs3351');
  const [activeStageStep, setActiveStageStep] = useState<number>(1);
  const [copilotPrompt, setCopilotPrompt] = useState<string>('');

  // Interactive Quiz State in Step 3
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Interactive Lecture State in Step 2
  const [selectedLectureIdx, setSelectedLectureIdx] = useState<number>(0);
  const [previewSpeed, setPreviewSpeed] = useState<string>('1.0x');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await curriculumApiService.getCourses();
      if (data && data.length > 0) {
        setCourses(data);
        setSelectedCourseId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (copilotPrompt.trim()) {
      openCopilot(copilotPrompt.trim());
      setCopilotPrompt('');
    }
  };

  const learningSteps = [
    {
      step: 1,
      title: 'Module Orientation',
      desc: 'Anna University Regulation 2021 curriculum mapping, unit objectives, and prerequisite alignment.',
      badge: 'Step 1: Introduction',
      icon: BookOpen,
      color: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400'
    },
    {
      step: 2,
      title: 'Core Video Masterclasses',
      desc: '6 high-definition curriculum video lectures per module with seamless embedded playback & notes.',
      badge: 'Step 2: 60+ Core Lectures',
      icon: Video,
      color: 'from-rose-500/20 to-pink-500/20',
      border: 'border-rose-500/30',
      text: 'text-rose-400'
    },
    {
      step: 3,
      title: 'Auto-Graded Knowledge Check',
      desc: 'Interactive MCQ assessment with instant feedback, pedagogical explanations, and passing threshold (>=70%).',
      badge: 'Step 3: Verification Quiz',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400'
    },
    {
      step: 4,
      title: 'Institutional Certificate',
      desc: 'Instant cryptographic completion certificate with unique verification ID and printable PDF.',
      badge: 'Step 4: AICTE/Anna Univ Accredited',
      icon: Award,
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      text: 'text-[#C49A55]'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0E1513] text-white selection:bg-[#C49A55]/40 selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Dynamic Ambient Canvas with High-Contrast Glassmorphism */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Campus Photograph Background with Dark Gradient Veil */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/campus/nscet-entrance-gate.jpg"
            alt="NSCET Campus Gate"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1513]/90 via-[#12241E]/95 to-[#0E1513]" />

          {/* Interactive Ambient Glow Orbs */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#173B2F]/40 blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#C49A55]/20 blur-[130px] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-6">
          
          {/* Institutional Accreditation Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-bold uppercase tracking-wider text-gray-200">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C49A55] bg-white">
              <img src="/assets/nscet-college-logo.jpg" alt="NSCET" className="w-full h-full object-cover" />
            </div>
            <span>Nadar Saraswathi College of Engineering & Technology</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A55]" />
            <span className="text-[#C49A55]">Anna Univ Reg 2021</span>
          </div>

          {/* User Welcome Pill if logged in */}
          {currentUser && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-[#173B2F]/80 border border-[#6FA9C9]/40 text-xs font-semibold text-[#DCE7E1]">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Welcome back, <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})</span>
            </div>
          )}

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Next-Gen Engineering. <br />
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E8D5B5] to-[#C49A55] bg-clip-text text-transparent">
              Structured • Interactive • Verified.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
            Experience modern engineering education structured into 
            <strong className="text-white font-bold"> 10 Accredited Course Modules</strong>, 
            <strong className="text-[#C49A55] font-bold"> 60+ Video Masterclasses</strong>, 
            instant <strong className="text-emerald-400 font-bold">Knowledge Checks</strong>, and 
            cryptographically verifiable certificates.
          </p>

          {/* ========================================================================= */}
          {/* PRIMARY "GET STARTED" BUTTON (Direct to Learning Dashboard)                */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              to="/student"
              className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-[#C49A55] via-[#D97736] to-[#C49A55] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black text-base uppercase tracking-wider shadow-2xl shadow-amber-900/50 flex items-center justify-center gap-3 cursor-pointer hover:scale-105 active:scale-95 border border-white/30"
            >
              <Zap className="w-5 h-5 text-white fill-white animate-bounce" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              to="/student/courses"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm tracking-wide backdrop-blur-xl border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#C49A55]/50"
            >
              <Layers className="w-4 h-4 text-[#C49A55]" />
              <span>Explore 10 Course Modules</span>
            </Link>
          </div>

          {/* Key Metrics Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 w-full max-w-4xl">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-[#C49A55]">10</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Course Modules</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-rose-400">60+</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Video Lectures</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Verified Certs</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">24/7</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Campus Copilot</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE SECTION: Live Course Modules Interactive Terminal          */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#C49A55] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Learning Terminal</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Select Any Course to Preview Its Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mt-1">
              Click between the accredited courses below to preview the 3-stage module architecture, video lectures, and syllabus breakdown.
            </p>
          </div>

          <Link
            to="/student"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A55] hover:text-white transition-colors self-start md:self-auto"
          >
            <span>Open Learning Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Layout: Left Course Selector + Right Interactive Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Scrollable Course Selector Strip */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {courses.map((c) => {
              const isSelected = selectedCourseId === c.id;
              const videoCount = c.modules[0]?.coreContent.filter((item) => item.type === 'video').length || 6;

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#173B2F] to-[#12241E] border-[#C49A55] shadow-lg shadow-amber-950/20 ring-1 ring-[#C49A55]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        isSelected ? 'bg-[#C49A55] text-white' : 'bg-white/10 text-gray-400'
                      }`}>
                        {c.code}
                      </span>
                      <span className="text-[10px] text-gray-400">{c.department.split('&')[0]}</span>
                    </div>
                    <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {c.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span>{videoCount} Video Lectures</span>
                      <span>•</span>
                      <span>{c.credits} Credits</span>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-[#C49A55] text-white' : 'bg-white/5 text-gray-500'
                  }`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Course Preview Terminal */}
          {selectedCourse && (
            <div className="lg:col-span-7 bg-white/5 rounded-3xl border border-white/15 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C49A55]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Course Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#C49A55] text-white text-xs font-black uppercase tracking-wider">
                      {selectedCourse.code}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/10 text-gray-300 text-xs font-bold">
                      {selectedCourse.difficultyLevel} Level
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C49A55]" />
                      {selectedCourse.totalDurationHours} Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      {selectedCourse.credits} Credits
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Faculty In-Charge */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C49A55]/20 text-[#C49A55] border border-[#C49A55]/40 flex items-center justify-center font-black text-sm">
                    {selectedCourse.instructor.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{selectedCourse.instructor}</div>
                    <div className="text-[11px] text-gray-400">{selectedCourse.instructorTitle}</div>
                  </div>
                </div>

                {/* 3-Stage Pipeline Breakdown Inside This Course */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                    3-Stage Curriculum Pipeline
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 space-y-1">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">Stage 1</span>
                      <p className="font-bold text-white truncate">Introduction</p>
                      <p className="text-[11px] text-gray-400">Objectives & Syllabus</p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 space-y-1">
                      <span className="text-[10px] font-bold text-rose-400 uppercase">Stage 2</span>
                      <p className="font-bold text-white truncate">6 Core Lectures</p>
                      <p className="text-[11px] text-gray-400">Embedded Video Playlist</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">Stage 3</span>
                      <p className="font-bold text-white truncate">Knowledge Check</p>
                      <p className="text-[11px] text-gray-400">Auto-Graded Quiz (70%)</p>
                    </div>
                  </div>
                </div>

                {/* Video Lectures Preview Strip */}
                <div className="space-y-2">
                  <div className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Curriculum Masterclasses Preview
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedCourse.modules[0]?.coreContent.filter(item => item.type === 'video').slice(0, 4).map((vid, idx) => (
                      <div
                        key={vid.id}
                        className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <Play className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                          <span className="truncate text-gray-200">{vid.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                          {Math.round((vid.durationSeconds || 900) / 60)} min
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action: Open in Module Player */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                <Link
                  to={`/student/courses/${selectedCourse.id}`}
                  className="w-full py-3.5 rounded-xl bg-[#173B2F] hover:bg-[#1E4D3E] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer border border-[#6FA9C9]/30"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch {selectedCourse.code} in Player</span>
                </Link>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE 4-STAGE LEARNING JOURNEY WITH LIVE INTERACTIVE SIMULATOR    */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#C49A55]">
            Engineered for Mastery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            How Students Learn with CampusIQ
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Click any of the 4 milestones below to see live interactive previews of the learning pipeline.
          </p>
        </div>

        {/* 4 Steps Interactive Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningSteps.map((stepItem) => {
            const isSelected = activeStageStep === stepItem.step;
            const Icon = stepItem.icon;

            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStageStep(stepItem.step)}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? `bg-gradient-to-b ${stepItem.color} ${stepItem.border} shadow-xl scale-[1.02] ring-2 ring-white/30`
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black text-white">
                      0{stepItem.step}
                    </span>
                    <Icon className={`w-5 h-5 ${stepItem.text}`} />
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider block ${stepItem.text}`}>
                    {stepItem.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[#C49A55]">
                  <span>{isSelected ? 'Active Preview Below' : 'Click to Preview'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC LIVE INTERACTIVE SIMULATOR FOR ACTIVE STEP */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121A17] border border-white/20 shadow-2xl transition-all">
          {/* STEP 1 PREVIEW: Module Orientation */}
          {activeStageStep === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Live Preview: Stage 1 • Module Orientation</h4>
                    <p className="text-xs text-gray-400">Anna University Regulation 2021 Syllabus & Prerequisites</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                  Estimated Time: 15 Mins
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#C49A55]">Course Outcome 1</span>
                  <h5 className="font-bold text-white">Relational Data Model</h5>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    Understand relational calculus, relational algebra operators, and schema constraints according to Anna University Unit 1.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#C49A55]">Course Outcome 2</span>
                  <h5 className="font-bold text-white">SQL & Relational Design</h5>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    Master DDL, DML, complex nested queries, functional dependencies, and lossless BCNF/3NF decomposition.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#C49A55]">Prerequisites Verified</span>
                  <h5 className="font-bold text-white">Discrete Mathematics & Data Structures</h5>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    Graph theory, set theory, and B+ Tree indexing concepts are automatically linked to student prerequisites.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 PREVIEW: Core Video Masterclasses */}
          {activeStageStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Live Preview: Stage 2 • 60+ Core Lectures & Video Suite</h4>
                    <p className="text-xs text-gray-400">Embedded YouTube Playback, Speed Controls & Concept Timestamps</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {['1.0x', '1.25x', '1.5x'].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPreviewSpeed(spd)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        previewSpeed === spd ? 'bg-[#C49A55] text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-black/60 rounded-2xl border border-white/10 p-5 flex flex-col justify-between min-h-[220px]">
                  <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-white/10">
                    <span className="text-[#C49A55] font-bold">Now Previewing Lecture {selectedLectureIdx + 1} of 6</span>
                    <span>Speed: {previewSpeed}</span>
                  </div>
                  <div className="py-6 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
                      <Play className="w-5 h-5 fill-rose-400 ml-0.5" />
                    </div>
                    <p className="text-sm font-bold text-white">
                      {[
                        'Unit 1: Introduction to Database Architectures & Schema Design',
                        'Unit 2: Relational Query Optimization & Tuple Relational Calculus',
                        'Unit 3: Normalization Algorithms (1NF, 2NF, 3NF & BCNF Proofs)'
                      ][selectedLectureIdx]}
                    </p>
                    <p className="text-xs text-gray-400">Official Anna University NPTEL / Top Engineering Curated Lecture</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/10">
                    <span>08:42 / 24:15</span>
                    <span className="text-emerald-400 font-semibold">HD 1080p • Closed Captions Available</span>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Interactive Lecture Selector</span>
                  {[
                    'Unit 1: Introduction to Database Architectures',
                    'Unit 2: Relational Query Optimization',
                    'Unit 3: Normalization Algorithms & Proofs'
                  ].map((title, lIdx) => (
                    <button
                      key={lIdx}
                      onClick={() => setSelectedLectureIdx(lIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        selectedLectureIdx === lIdx
                          ? 'bg-[#173B2F] border-[#6FA9C9] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 text-rose-400" />
                        <span className="font-semibold truncate">{title}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">~22m</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 PREVIEW: Auto-Graded Knowledge Check (Interactive Quiz Widget) */}
          {activeStageStep === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Live Interactive Quiz: Stage 3 • Knowledge Check</h4>
                    <p className="text-xs text-gray-400">Try answering this sample question right now to test auto-grading</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  Passing Threshold: 70%
                </span>
              </div>

              {/* Sample Interactive Question */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="text-[#C49A55] font-bold">Question 1 of 5 • CS3351 DBMS</span>
                  <span>10 Points</span>
                </div>

                <p className="text-sm font-bold text-white leading-relaxed">
                  In Relational Database Design, which Normal Form strictly eliminates <span className="text-[#C49A55] underline">transitive dependencies</span> of non-prime attributes on the primary key?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {[
                    { id: 0, label: 'A. First Normal Form (1NF)', isCorrect: false },
                    { id: 1, label: 'B. Second Normal Form (2NF)', isCorrect: false },
                    { id: 2, label: 'C. Third Normal Form (3NF)', isCorrect: true },
                    { id: 3, label: 'D. Boyce-Codd Normal Form (BCNF)', isCorrect: false },
                  ].map((opt) => {
                    const isPicked = selectedQuizOption === opt.id;
                    let btnStyle = 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/10';

                    if (isPicked) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500';
                      } else {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-white ring-1 ring-rose-500';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSelectedQuizOption(opt.id);
                          setQuizSubmitted(true);
                        }}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt.label}</span>
                        {isPicked && opt.isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                        {isPicked && !opt.isCorrect && <X className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Banner */}
                {quizSubmitted && selectedQuizOption !== null && (
                  <div className={`p-4 rounded-xl text-xs space-y-1 transition-all ${
                    selectedQuizOption === 2
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/15 border border-rose-500/30 text-rose-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {selectedQuizOption === 2 ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Excellent! Correct Answer (3NF).</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="w-4 h-4 text-rose-400" />
                          <span>Not quite. 3NF eliminates transitive functional dependencies. Try clicking Option C!</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Pedagogical Explanation: A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on any candidate key (X → Y where Y is non-prime implies X is a superkey).
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 PREVIEW: Institutional Certificate */}
          {activeStageStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-[#C49A55] border border-amber-500/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Live Preview: Stage 4 • Institutional Certificate of Completion</h4>
                    <p className="text-xs text-gray-400">Cryptographically verifiable credential with QR code verification</p>
                  </div>
                </div>
                <Link
                  to="/verify-certificate"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C49A55] text-xs font-bold transition-colors"
                >
                  <span>Verification Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Certificate Card Simulator */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C2824] to-[#121A17] border-2 border-[#C49A55]/40 shadow-2xl relative overflow-hidden max-w-3xl mx-auto text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C49A55] bg-white">
                    <img src="/assets/nscet-college-logo.jpg" alt="NSCET" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black uppercase text-[#C49A55]">Nadar Saraswathi College of Engineering & Technology</div>
                    <div className="text-[10px] text-gray-400">Affiliated to Anna University, Chennai • AICTE Approved</div>
                  </div>
                </div>

                <div className="py-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Certificate of Completion</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {currentUser?.name || 'Vignesh R.'}
                  </h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto mt-1">
                    has successfully demonstrated mastery and completed all curriculum masterclasses and knowledge assessments for:
                  </p>
                  <p className="text-sm font-black text-[#C49A55] mt-1">
                    Database Management Systems (CS3351) — 3 Credits
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-left text-xs">
                  <div>
                    <div className="text-[10px] text-gray-400">Verification Hash ID:</div>
                    <div className="font-mono text-[#6FA9C9] font-bold text-[11px]">NSCET-2024-REG21-CS3351-921022</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Cryptographically Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE COPILOT TEASER SECTION                                     */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#12241E] to-[#173B2F] border border-white/20 p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#C49A55]">
            <Bot className="w-4 h-4" />
            <span>AI Voice & RAG Academic Copilot</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Have a Question About Your Syllabus or Campus?
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            Ask our institutional RAG assistant powered by Groq LPU inference. Instant explanations, Anna University regulations, and syllabus search.
          </p>

          {/* Interactive Search Box */}
          <form onSubmit={handleCopilotSubmit} className="max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                placeholder="Ask e.g. What is 2PL concurrency in DBMS CS3351?"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-black/50 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C49A55] shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white text-xs font-black shadow-lg cursor-pointer transition-all"
            >
              Ask Copilot
            </button>
          </form>

          {/* Prompt chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {['Explain Normalization in DBMS', 'Operating System CPU Scheduling', 'Dijkstra Algorithm in C'].map((prompt, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => openCopilot(prompt)}
                className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 transition-colors cursor-pointer"
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL PERSISTENT CALL TO ACTION: Direct to Learning Dashboard           */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0A0F0D]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#C49A55] to-[#D97736] flex items-center justify-center mx-auto shadow-2xl text-white">
            <GraduationCap className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Begin Your Learning Journey?
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            Enter your personal learning dashboard to track module completion, watch educational videos, take quizzes, and earn certificates.
          </p>

          <div className="pt-2">
            <Link
              to="/student"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#C49A55] via-[#D97736] to-[#C49A55] hover:bg-right transition-all duration-500 text-white font-black text-base uppercase tracking-wider shadow-2xl shadow-amber-950/60 hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Get Started &bull; Enter Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
