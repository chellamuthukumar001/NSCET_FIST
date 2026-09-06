import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ModularCourse, ModularCourseModule } from '../../types';
import { curriculumApiService, CourseDetailResponse } from '../../services/curriculumApiService';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState<CourseDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (courseId) {
      loadCourseDetail(courseId);
    }
  }, [courseId]);

  const loadCourseDetail = async (id: string) => {
    setLoading(true);
    try {
      const data = await curriculumApiService.getCourseDetail(id);
      setCourseData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!courseId) return;
    setEnrolling(true);
    try {
      await curriculumApiService.enroll(courseId);
      await loadCourseDetail(courseId);
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        Loading Course Module details...
      </div>
    );
  }

  if (!courseData || !courseData.course) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Course Module Not Found</h2>
        <Link
          to="/student/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B2F] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 10 Course Modules</span>
        </Link>
      </div>
    );
  }

  const { course, enrollment, progress, quizPassed } = courseData;
  const modules = course.modules || [];
  const primaryModule = modules[0];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Back Link */}
      <div>
        <Link
          to="/student/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B2F] hover:text-[#C49A55] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 10 Course Modules</span>
        </Link>
      </div>

      {/* Course Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#173B2F] via-[#1A4537] to-[#173B2F] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm border border-white/10">
                {course.code}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C49A55] text-white shadow">
                Anna University Regulation 2021
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200">
                {course.difficultyLevel} Level
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-300 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C49A55]" />
                {course.totalDurationHours} Hours Total
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                {course.credits} Credits
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-400" />
                {modules.length} Detailed Modules
              </span>
            </div>

            {/* Instructor */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm text-[#C49A55]">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{course.instructor}</p>
                <p className="text-[11px] text-gray-300">{course.instructorTitle}</p>
              </div>
            </div>
          </div>

          {/* Action Box / Enrollment Card */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-5 text-center">
            {enrollment ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300 mb-1.5">
                    <span>Course Progress</span>
                    <span className="text-[#C49A55] font-black">{enrollment.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C49A55] to-emerald-400 transition-all duration-500"
                      style={{ width: `${enrollment.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={primaryModule ? `/student/courses/${course.id}/modules/${primaryModule.id}` : '#'}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume Course Module</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-gray-300">
                  Enroll to track your progress across all 3 stages: Introduction, Core Content, and Knowledge Check.
                </p>

                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{enrolling ? 'Enrolling...' : 'Enroll in Course Module'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative blur */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#C49A55]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3-Stage Module Structure */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C49A55]">
              Course Blueprint
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-0.5">
              Structured Course Modules ({modules.length})
            </h2>
          </div>
        </div>

        {/* Render each module in the 3-stage sequence */}
        <div className="space-y-6">
          {modules.map((mod, mIdx) => {
            const introDone = progress[mod.introduction.id]?.status === 'completed';
            const coreAllDone = mod.coreContent.every((ci) => progress[ci.id]?.status === 'completed');
            const quizPassedState = Boolean(quizPassed[mod.knowledgeCheck.id]);

            return (
              <div
                key={mod.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Module Header Bar */}
                <div className="p-6 bg-gray-50/80 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#173B2F] text-white text-[10px] font-black uppercase tracking-wider">
                        Unit {mIdx + 1}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        ~{mod.estimatedMinutes} Minutes
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{mod.title}</h3>
                    <p className="text-xs text-gray-600 max-w-2xl">{mod.description}</p>
                  </div>

                  <Link
                    to={`/student/courses/${course.id}/modules/${mod.id}`}
                    className="px-4 py-2 rounded-xl bg-[#173B2F] hover:bg-[#122F25] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>Open Module Player</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 3 Strictly Enforced Sections */}
                <div className="p-6 space-y-6">
                  {/* Stage 1: Introduction */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#173B2F]">
                      <span className="w-5 h-5 rounded-full bg-[#173B2F] text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>Introduction (Objectives & Prerequisites)</span>
                    </div>

                    <Link
                      to={`/student/courses/${course.id}/modules/${mod.id}?stage=intro`}
                      className="p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/80 border border-gray-200 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center">
                          <BookOpen className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#173B2F]">
                            {mod.introduction.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Module Orientation & Anna University Regulation 2021 Syllabus
                          </p>
                        </div>
                      </div>

                      {introDone ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[#173B2F] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>Start Intro</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Stage 2: Core Content */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#173B2F]">
                        <span className="w-5 h-5 rounded-full bg-[#173B2F] text-white flex items-center justify-center text-[10px]">
                          2
                        </span>
                        <span>Core Content ({mod.coreContent.length} Modules & Lectures)</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#C49A55] bg-[#C49A55]/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                        {mod.coreContent.filter(c => c.type === 'video').length} Video Lectures • {mod.coreContent.filter(c => c.type === 'doc').length} Study Guide
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {mod.coreContent.map((ci, cIdx) => {
                        const isDone = progress[ci.id]?.status === 'completed';
                        return (
                          <Link
                            key={ci.id}
                            to={`/student/courses/${course.id}/modules/${mod.id}?item=${ci.id}`}
                            className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 transition-all flex items-center justify-between cursor-pointer group"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                  ci.type === 'video'
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'bg-blue-50 text-blue-600'
                                }`}
                              >
                                {ci.type === 'video' ? (
                                  <Play className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                                    {ci.type.toUpperCase()} • Lesson {cIdx + 1}
                                  </span>
                                  {ci.durationSeconds && (
                                    <span className="text-[11px] text-gray-500">
                                      {Math.round(ci.durationSeconds / 60)} min
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#173B2F]">
                                  {ci.title}
                                </p>
                              </div>
                            </div>

                            {isDone ? (
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Completed</span>
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-gray-400 group-hover:text-[#173B2F] flex items-center gap-1">
                                <span>Learn</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stage 3: Knowledge Check */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C49A55]">
                      <span className="w-5 h-5 rounded-full bg-[#C49A55] text-white flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>Knowledge Check (Course Quiz)</span>
                    </div>

                    <Link
                      to={`/student/courses/${course.id}/modules/${mod.id}?stage=quiz`}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                        quizPassedState
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-[#C49A55]/5 border-[#C49A55]/20 hover:border-[#C49A55]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#C49A55]/15 text-[#C49A55] flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#C49A55]">
                            {mod.knowledgeCheck.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {mod.knowledgeCheck.questions.length} Questions • Pass with &gt;=
                            {mod.knowledgeCheck.passingScore}% to finish module
                          </p>
                        </div>
                      </div>

                      {quizPassedState ? (
                        <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Passed & Verified</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-xl bg-[#C49A55] text-white text-xs font-bold shadow-sm">
                          Take Quiz
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
