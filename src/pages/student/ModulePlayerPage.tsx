import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Award,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Video,
  Clock,
  Layers
} from 'lucide-react';
import {
  ModularCourse,
  ModularCourseModule,
  ModularContentItem,
  ModularQuiz,
} from '../../types';
import { curriculumApiService, CourseDetailResponse } from '../../services/curriculumApiService';
import { KnowledgeCheckQuiz } from '../../components/curriculum/KnowledgeCheckQuiz';

export const ModulePlayerPage: React.FC = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState<CourseDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active item state: 'introduction' | 'core_content' | 'knowledge_check'
  const [activeSection, setActiveSection] = useState<'introduction' | 'core_content' | 'knowledge_check'>('introduction');
  const [activeContentItemId, setActiveContentItemId] = useState<string>('');

  useEffect(() => {
    if (courseId) {
      loadCourseData(courseId);
    }
  }, [courseId]);

  const loadCourseData = async (cId: string) => {
    setLoading(true);
    try {
      const data = await curriculumApiService.getCourseDetail(cId);
      setCourseData(data);

      const stage = searchParams.get('stage');
      const item = searchParams.get('item');

      if (stage === 'quiz') {
        setActiveSection('knowledge_check');
      } else if (item) {
        setActiveSection('core_content');
        setActiveContentItemId(item);
      } else if (stage === 'intro') {
        setActiveSection('introduction');
      } else {
        setActiveSection('introduction');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !courseData) {
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        Loading Module Player...
      </div>
    );
  }

  const { course, progress, quizPassed } = courseData;
  const currentModule = course.modules.find((m) => m.id === moduleId) || course.modules[0];
  if (!currentModule) {
    return <div className="p-8 text-center text-gray-500">Module not found.</div>;
  }

  const coreVideos = currentModule.coreContent.filter((c) => c.type === 'video');
  const coreDocs = currentModule.coreContent.filter((c) => c.type === 'doc');

  const activeContentItem =
    currentModule.coreContent.find((c) => c.id === activeContentItemId) ||
    currentModule.coreContent[0];

  const isIntroComplete = progress[currentModule.introduction.id]?.status === 'completed';
  const isQuizPassed = Boolean(quizPassed[currentModule.knowledgeCheck.id]);

  const handleMarkComplete = async (contentItemId: string) => {
    if (!courseId || !moduleId) return;
    try {
      await curriculumApiService.updateProgress({
        contentItemId,
        courseId,
        moduleId,
        markComplete: true,
        watchPercentage: 100,
        scrollPercentage: 100,
      });
      await loadCourseData(courseId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdvanceToNext = () => {
    if (activeSection === 'introduction') {
      if (!isIntroComplete) handleMarkComplete(currentModule.introduction.id);
      setActiveSection('core_content');
      if (currentModule.coreContent.length > 0) {
        setActiveContentItemId(currentModule.coreContent[0].id);
      }
    } else if (activeSection === 'core_content') {
      if (activeContentItem) handleMarkComplete(activeContentItem.id);
      const currentIndex = currentModule.coreContent.findIndex((c) => c.id === activeContentItem.id);
      if (currentIndex !== -1 && currentIndex + 1 < currentModule.coreContent.length) {
        setActiveContentItemId(currentModule.coreContent[currentIndex + 1].id);
      } else {
        setActiveSection('knowledge_check');
      }
    }
  };

  const handlePreviousItem = () => {
    if (activeSection === 'knowledge_check') {
      setActiveSection('core_content');
      if (currentModule.coreContent.length > 0) {
        setActiveContentItemId(currentModule.coreContent[currentModule.coreContent.length - 1].id);
      }
    } else if (activeSection === 'core_content') {
      const currentIndex = currentModule.coreContent.findIndex((c) => c.id === activeContentItem.id);
      if (currentIndex > 0) {
        setActiveContentItemId(currentModule.coreContent[currentIndex - 1].id);
      } else {
        setActiveSection('introduction');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] pb-12 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Top Player Navigation Bar */}
      <div className="bg-[#101815] text-white px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to={`/student/courses/${course.id}`}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
            title="Back to Course Details"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <span className="text-[10px] font-bold text-[#C49A55] uppercase tracking-wider block">
              {course.code} • Unit {currentModule.orderIndex}
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {currentModule.title}
            </h1>
          </div>
        </div>

        {/* Stepper Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveSection('introduction')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'introduction'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>1. Intro</span>
            {isIntroComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <span className="text-gray-600">➔</span>

          <button
            onClick={() => {
              setActiveSection('core_content');
              if (!activeContentItemId && currentModule.coreContent.length > 0) {
                setActiveContentItemId(currentModule.coreContent[0].id);
              }
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'core_content'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>2. Core Content ({currentModule.coreContent.length} Lessons)</span>
          </button>

          <span className="text-gray-600">➔</span>

          <button
            onClick={() => setActiveSection('knowledge_check')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'knowledge_check'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>3. Knowledge Check</span>
            {isQuizPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        {/* Sidebar Toggle for Mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Player Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left / Center Viewport */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* 1. INTRODUCTION VIEW */}
          {activeSection === 'introduction' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#173B2F]/10 text-[#173B2F]">
                    Stage 1 • Overview & Orientation
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">
                    ~{currentModule.estimatedMinutes} Minutes
                  </span>
                </div>
                <span className="text-xs font-bold text-[#C49A55] flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" />
                  {coreVideos.length} Video Lectures Waiting
                </span>
              </div>

              <h2 className="text-2xl font-black text-gray-900">
                {currentModule.introduction.title}
              </h2>

              <div className="prose prose-sm text-gray-700 max-w-none whitespace-pre-line leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                {currentModule.introduction.urlOrPath}
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Anna University Regulation 2021 Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-950 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleMarkComplete(currentModule.introduction.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isIntroComplete
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {isIntroComplete ? '✓ Introduction Completed' : 'Mark Introduction Completed'}
                </button>

                <button
                  onClick={handleAdvanceToNext}
                  className="px-6 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#122F25] text-white text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Begin Core Video Lectures ({coreVideos.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. CORE CONTENT VIEW (Multiple Videos + Documents) */}
          {activeSection === 'core_content' && activeContentItem && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* VIDEO PLAYLIST STRIP: Browse Different Videos in this Course */}
              {coreVideos.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-rose-600" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">
                        Course Video Lectures ({coreVideos.length} Available)
                      </h3>
                    </div>
                    <span className="text-[11px] text-gray-500 font-semibold">
                      Click any video to watch
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {coreVideos.map((vid, idx) => {
                      const isSelected = activeContentItem.id === vid.id;
                      const isDone = progress[vid.id]?.status === 'completed';

                      return (
                        <button
                          key={vid.id}
                          onClick={() => setActiveContentItemId(vid.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                            isSelected
                              ? 'bg-[#173B2F] text-white border-[#173B2F] shadow-md ring-2 ring-[#C49A55]'
                              : isDone
                              ? 'bg-emerald-50/50 border-emerald-200 text-gray-800 hover:bg-emerald-50'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-[#C49A55]' : 'text-gray-400'}`}>
                              Part {idx + 1}
                            </span>
                            {isDone ? (
                              <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            ) : (
                              <Play className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-rose-500'}`} />
                            )}
                          </div>

                          <p className={`text-[11px] font-bold line-clamp-2 leading-tight ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {vid.title.replace(/^Lecture \d+:\s*/, '')}
                          </p>

                          <div className="flex items-center justify-between pt-1 text-[9px]">
                            <span className={isSelected ? 'text-gray-300' : 'text-gray-500'}>
                              {vid.durationSeconds ? `${Math.round(vid.durationSeconds / 60)} min` : '15 min'}
                            </span>
                            {isSelected && (
                              <span className="font-extrabold text-[#C49A55] uppercase">
                                Playing
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ACTIVE ITEM VIEW: Video Player or Document */}
              {activeContentItem.type === 'video' ? (
                <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeContentItem.urlOrPath}?autoplay=1&enablejsapi=1&rel=0`}
                      title={activeContentItem.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                        Technical Document & Slides
                      </span>
                    </div>
                    {activeContentItem.documentPages && (
                      <span className="text-xs font-bold text-gray-500">
                        {activeContentItem.documentPages} Pages
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">{activeContentItem.title}</h2>
                  <p className="text-xs text-gray-600 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    {activeContentItem.summary || 'Official study handout and reference guide mapped to Anna University Regulation 2021.'}
                  </p>

                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
                    <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
                    <p className="text-xs font-semibold text-gray-600">
                      Document viewer ready. Read the notes and mark completed when finished.
                    </p>
                    <a
                      href={activeContentItem.urlOrPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors"
                    >
                      <span>Open Document in Full Window</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Lesson Summary & Controls */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-md">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      Lesson {currentModule.coreContent.findIndex((c) => c.id === activeContentItem.id) + 1} of {currentModule.coreContent.length}
                    </span>
                    {activeContentItem.durationSeconds && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {Math.round(activeContentItem.durationSeconds / 60)} Minutes
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{activeContentItem.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {activeContentItem.summary || 'Complete this video lesson to advance through the course module.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={handlePreviousItem}
                    className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all cursor-pointer"
                    title="Previous Lesson"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMarkComplete(activeContentItem.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      progress[activeContentItem.id]?.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {progress[activeContentItem.id]?.status === 'completed'
                      ? '✓ Video Completed'
                      : 'Mark Video Completed'}
                  </button>

                  <button
                    onClick={handleAdvanceToNext}
                    className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#122F25] text-white text-xs font-black flex items-center gap-1.5 transition-all shadow cursor-pointer whitespace-nowrap"
                  >
                    <span>Next Video / Quiz</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. KNOWLEDGE CHECK VIEW (Quiz) */}
          {activeSection === 'knowledge_check' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <KnowledgeCheckQuiz
                quiz={currentModule.knowledgeCheck}
                courseId={course.id}
                moduleId={currentModule.id}
                onPass={async () => {
                  await loadCourseData(course.id);
                }}
                onClaimCertificate={async () => {
                  const cert = await curriculumApiService.claimCertificate(course.id);
                  navigate(`/verify-certificate/${cert.verificationId}`);
                }}
              />
            </div>
          )}
        </div>

        {/* Right Curriculum Drawer */}
        <div
          className={`w-full lg:w-80 bg-white border-l border-gray-200 p-5 space-y-5 overflow-y-auto ${
            sidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Module Curriculum
            </h4>
            <span className="text-[11px] font-bold text-[#173B2F]">
              Unit {currentModule.orderIndex}
            </span>
          </div>

          <div className="space-y-4">
            {/* Step 1: Introduction */}
            <button
              onClick={() => {
                setActiveSection('introduction');
                setSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                activeSection === 'introduction'
                  ? 'bg-[#173B2F]/10 border-[#173B2F] font-bold text-[#173B2F]'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#173B2F]" />
                <span className="text-xs">1. Introduction</span>
              </div>
              {isIntroComplete && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Step 2: Core Content Items */}
            <div className="space-y-1.5 pl-2 border-l-2 border-gray-200">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 pl-2">
                2. Core Content ({currentModule.coreContent.length})
              </p>
              {currentModule.coreContent.map((item, idx) => {
                const isSelected = activeSection === 'core_content' && activeContentItemId === item.id;
                const isDone = progress[item.id]?.status === 'completed';

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection('core_content');
                      setActiveContentItemId(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-[#173B2F]/10 border-[#173B2F] font-bold text-[#173B2F]'
                        : 'border-transparent hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      {item.type === 'video' ? (
                        <Play className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      )}
                      <span className="truncate">{item.title}</span>
                    </div>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Step 3: Knowledge Check */}
            <button
              onClick={() => {
                setActiveSection('knowledge_check');
                setSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                activeSection === 'knowledge_check'
                  ? 'bg-[#C49A55]/15 border-[#C49A55] font-bold text-[#C49A55]'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C49A55]" />
                <span className="text-xs">3. Knowledge Check (Quiz)</span>
              </div>
              {isQuizPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <span className="text-[10px] font-bold bg-[#C49A55] text-white px-1.5 py-0.5 rounded">
                  Quiz
                </span>
              )}
            </button>
          </div>

          {/* Certificate Banner if Course Completed */}
          {isQuizPassed && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#C49A55]/10 to-[#D97736]/10 border border-[#C49A55]/30 text-center space-y-2">
              <Award className="w-8 h-8 text-[#C49A55] mx-auto" />
              <p className="text-xs font-black text-gray-900">Module Passed!</p>
              <p className="text-[11px] text-gray-500">
                You can claim your official verified certificate with QR code.
              </p>
              <button
                onClick={async () => {
                  const cert = await curriculumApiService.claimCertificate(course.id);
                  navigate(`/verify-certificate/${cert.verificationId}`);
                }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] text-white text-xs font-black shadow transition-all cursor-pointer"
              >
                Claim Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
