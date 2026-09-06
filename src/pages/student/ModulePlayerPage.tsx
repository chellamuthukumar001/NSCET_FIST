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
  RotateCcw
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
  const [watchProgress, setWatchProgress] = useState(0);

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

      // Determine initial active section from query params
      const stage = searchParams.get('stage');
      const item = searchParams.get('item');

      if (stage === 'quiz') {
        setActiveSection('knowledge_check');
      } else if (item) {
        setActiveSection('core_content');
        setActiveContentItemId(item);
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

  const activeContentItem = currentModule.coreContent.find((c) => c.id === activeContentItemId) || currentModule.coreContent[0];
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
      const currentIndex = currentModule.coreContent.findIndex((c) => c.id === activeContentItemId);
      if (currentIndex !== -1 && currentIndex + 1 < currentModule.coreContent.length) {
        setActiveContentItemId(currentModule.coreContent[currentIndex + 1].id);
      } else {
        setActiveSection('knowledge_check');
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
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[240px] sm:max-w-md">
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
            <span>2. Core Lessons ({currentModule.coreContent.length})</span>
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
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#173B2F]/10 text-[#173B2F]">
                  Stage 1 • Overview & Orientation
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  Estimated Study Time: ~{currentModule.estimatedMinutes} Minutes
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
                  <span>Begin First Core Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. CORE CONTENT VIEW (Video / Document) */}
          {activeSection === 'core_content' && activeContentItem && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {activeContentItem.type === 'video' ? (
                /* Video Player Stage */
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
                /* Document Viewer Stage */
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
                <div>
                  <h3 className="text-base font-bold text-gray-900">{activeContentItem.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activeContentItem.summary || 'Complete this lesson to unlock the next item.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleMarkComplete(activeContentItem.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      progress[activeContentItem.id]?.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {progress[activeContentItem.id]?.status === 'completed'
                      ? '✓ Lesson Completed'
                      : 'Mark Lesson Completed'}
                  </button>

                  <button
                    onClick={handleAdvanceToNext}
                    className="px-5 py-2 rounded-xl bg-[#173B2F] hover:bg-[#122F25] text-white text-xs font-black flex items-center gap-1.5 transition-all shadow cursor-pointer"
                  >
                    <span>Next Lesson</span>
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
                2. Core Lessons
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
