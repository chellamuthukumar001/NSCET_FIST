import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { MOCK_VIDEOS, MOCK_QUIZ_QUESTIONS } from '../../lib/mockDatabase';
import { TranscriptViewer } from '../../components/video/TranscriptViewer';
import { LectureQuizModal } from '../../components/video/LectureQuizModal';
import { ExamRevisionModal } from '../../components/video/ExamRevisionModal';
import { useCopilot } from '../../context/CopilotContext';
import {
  Bookmark,
  Sparkles,
  Share2,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Eye,
  ChevronLeft,
  Play,
  FileText,
  HelpCircle,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

interface StudentNote {
  id: string;
  timestampSeconds: number;
  timeFormatted: string;
  text: string;
}

export const VideoDetailPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [searchParams] = useSearchParams();
  const { openCopilot } = useCopilot();

  const video = MOCK_VIDEOS.find((v) => v.id === videoId) || MOCK_VIDEOS[0];
  const nextVideo = MOCK_VIDEOS.find((v) => v.id !== video.id) || MOCK_VIDEOS[1];

  const initialTime = searchParams.get('t') ? Number(searchParams.get('t')) : (video.userProgressSeconds || 0);
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(initialTime);
  const [isBookmarked, setIsBookmarked] = useState(video.isBookmarked || false);
  const [isCompleted, setIsCompleted] = useState(video.isCompleted || false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'transcript' | 'notes' | 'ai'>('transcript');
  
  // Interactive student notes
  const [notes, setNotes] = useState<StudentNote[]>([
    {
      id: 'n1',
      timestampSeconds: 981,
      timeFormatted: '16:21',
      text: 'Crucial for Anna University Part B: 3NF requires either X is a superkey or Y is a prime attribute.',
    },
    {
      id: 'n2',
      timestampSeconds: 1541,
      timeFormatted: '25:41',
      text: 'BCNF condition: Every determinant must be a candidate key (no prime attribute exception!).',
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (seconds: number) => {
    setCurrentTimeSeconds(seconds);
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?start=${seconds}&autoplay=1`;
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: StudentNote = {
      id: 'note_' + Date.now(),
      timestampSeconds: currentTimeSeconds,
      timeFormatted: formatTime(currentTimeSeconds),
      text: newNoteText.trim(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAskCopilotAboutChunk = (chunkText: string, timestampStr: string) => {
    openCopilot(
      `In the lecture "${video.title}" at section [${timestampStr}], the professor explains: "${chunkText}". Can you provide a detailed technical explanation and an exam example for this topic?`
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const progressPct = Math.min(100, Math.round((currentTimeSeconds / video.durationSeconds) * 100));

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Top Breadcrumb & Status Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link
            to="/student/videos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B2F] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Learning Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-semibold text-gray-500">{video.subjectCode}</span>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-800">Unit {video.unitNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Marked as Completed' : 'Mark Completed'}</span>
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#C49A55] text-white border-[#C49A55]'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Player, Chapter Navigator, Metadata, CO Details */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* YouTube Video Player Embed */}
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-2xl border border-gray-800">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?start=${initialTime}&enablejsapi=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Active Timestamp Scrubber Bar */}
          <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="font-bold text-gray-800">Active Timestamp:</span>
              <span className="font-mono font-bold text-[#C49A55] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                {formatTime(currentTimeSeconds)} / {formatTime(video.durationSeconds)} ({progressPct}%)
              </span>
            </div>

            {/* Quick Speed / Jump Chips */}
            <div className="flex items-center gap-1.5 text-[11px] overflow-x-auto">
              <span className="text-gray-400 font-semibold mr-1">Chapters:</span>
              {video.transcript?.slice(0, 4).map((chunk, idx) => (
                <button
                  key={chunk.id}
                  onClick={() => handleSeek(chunk.startTime)}
                  className={`px-2 py-1 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    currentTimeSeconds >= chunk.startTime && currentTimeSeconds <= chunk.endTime
                      ? 'bg-[#173B2F] text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  title={chunk.text}
                >
                  {formatTime(chunk.startTime)}
                </button>
              ))}
            </div>
          </div>

          {/* Lecture Metadata & Primary Action Bar */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#173B2F] text-white text-xs font-bold shadow-sm">
                {video.subjectCode} - {video.subjectTitle}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#C49A55]/15 text-[#C49A55] text-xs font-bold border border-[#C49A55]/30">
                Unit {video.unitNumber}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                Semester {video.semester}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                {video.departmentCode}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
                Anna Univ. Reg 2021
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#17201C] leading-snug">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between text-xs text-[#66736C] pt-2 border-t border-gray-100 gap-2">
              <div className="flex items-center gap-2">
                <span>Faculty: <strong className="text-[#17201C]">{video.facultyName}</strong></span>
                <span>•</span>
                <span>Topic: <strong className="text-[#17201C]">{video.topic}</strong></span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{video.viewCount.toLocaleString()} views</span>
                </span>
                <span>{video.publishedDate}</span>
              </div>
            </div>

            {/* Action Bar with Exam Revision Kit & Quiz Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsRevisionModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:from-[#b08744] hover:to-[#c4682c] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-950/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI University Exam Revision Kit</span>
              </button>

              <button
                onClick={() => setIsQuizModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#C49A55]" />
                <span>Take Practice Quiz</span>
              </button>

              <button
                onClick={() =>
                  openCopilot(
                    `Can you summarize the core technical takeaways and expected Anna University questions from "${video.title}" for Unit ${video.unitNumber}?`
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#17201C] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C49A55]" />
                <span>Ask Copilot</span>
              </button>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Lecture Synopsis & Syllabus Alignment
              </h4>
              <p className="text-xs text-[#66736C] leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

          {/* 3. Anna University Course Outcome (CO) & Accreditation Mapping Card */}
          <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#173B2F]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B2F]">
                  Anna University Course Outcome (CO) Mapping
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Bloom's Taxonomy: Level 3 (Apply)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#173B2F]/5 border border-[#173B2F]/15 space-y-1 text-xs text-gray-800">
              <div className="font-bold text-[#173B2F]">
                CO{video.unitNumber}.1: Design and normalize relational database schemas avoiding functional anomalies
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Mandated for Anna University Internal Assessment Exam 2 (IAT 2) and End-Semester University Theory Examination (Part A: 4 Marks, Part B: 13/16 Marks).
              </p>
            </div>
          </div>

          {/* 4. Recommended Next Lecture in Syllabus */}
          {nextVideo && (
            <div className="p-5 rounded-3xl bg-gray-50 border border-gray-200/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A55] block">
                  Next in Syllabus
                </span>
                <h4 className="text-sm font-bold text-[#17201C] mt-0.5">{nextVideo.title}</h4>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {nextVideo.subjectCode} • Unit {nextVideo.unitNumber} • {nextVideo.facultyName}
                </div>
              </div>

              <Link
                to={`/student/videos/${nextVideo.id}`}
                className="px-4 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow"
              >
                <span>Play Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Tabbed Interactive Sidebar (Transcript, Notes, AI Copilot) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          
          {/* Sidebar Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setSidebarTab('transcript')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                sidebarTab === 'transcript'
                  ? 'bg-[#173B2F] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Transcript</span>
            </button>

            <button
              onClick={() => setSidebarTab('notes')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                sidebarTab === 'notes'
                  ? 'bg-[#173B2F] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notes ({notes.length})</span>
            </button>

            <button
              onClick={() => setSidebarTab('ai')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                sidebarTab === 'ai'
                  ? 'bg-[#173B2F] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>AI Copilot</span>
            </button>
          </div>

          {/* TAB 1: Transcript Viewer */}
          {sidebarTab === 'transcript' && (
            <div className="space-y-4">
              <TranscriptViewer
                transcript={video.transcript}
                currentTimeSeconds={currentTimeSeconds}
                onSeek={handleSeek}
                onAskCopilotAboutChunk={handleAskCopilotAboutChunk}
              />
            </div>
          )}

          {/* TAB 2: Interactive Student Notes with Timestamp Bookmarking */}
          {sidebarTab === 'notes' && (
            <div className="p-4 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Personal Study Notes
                </span>
                <span className="text-[11px] font-mono text-[#C49A55] font-bold">
                  @ {formatTime(currentTimeSeconds)}
                </span>
              </div>

              {/* Add note input */}
              <div className="space-y-2">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={`Add a study note at ${formatTime(currentTimeSeconds)}...`}
                  rows={2}
                  className="w-full p-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:border-[#173B2F] focus:bg-white focus:outline-none"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!newNoteText.trim()}
                  className="w-full py-1.5 rounded-lg bg-[#173B2F] hover:bg-[#285443] disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Note at {formatTime(currentTimeSeconds)}</span>
                </button>
              </div>

              {/* Saved Notes Feed */}
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pt-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleSeek(note.timestampSeconds)}
                        className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#173B2F] bg-white px-2 py-0.5 rounded border border-[#173B2F]/20 hover:bg-[#173B2F] hover:text-white transition-colors cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>[{note.timeFormatted}]</span>
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-gray-400 hover:text-red-500 cursor-pointer p-0.5"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: "Ask About This Lecture" RAG Card */}
          {sidebarTab === 'ai' && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#173B2F] to-[#101815] text-white border border-white/15 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#C49A55] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>CampusIQ AI Lecture Assistant</span>
              </div>
              <p className="text-xs text-[#DCE7E1] leading-relaxed">
                Powered by Groq LPU inference. Grounded in this video's verified transcript chunks and Anna University syllabus standards.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  `Explain 3NF vs BCNF differences in this lecture`,
                  `Generate Anna University 2-mark questions for Unit ${video.unitNumber}`,
                  `What are the database update anomalies explained here?`,
                  `How do I solve BCNF decomposition step-by-step?`
                ].map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => openCopilot(sample)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white/90 transition-colors cursor-pointer"
                  >
                    💡 {sample}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsRevisionModalOpen(true)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Full University Exam Revision Kit</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* AI Practice Quiz Modal */}
      <LectureQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        questions={MOCK_QUIZ_QUESTIONS}
        subjectTitle={`${video.subjectCode} Unit ${video.unitNumber} Practice Quiz`}
      />

      {/* AI Exam Revision Kit Modal */}
      <ExamRevisionModal
        video={video}
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
      />

    </div>
  );
};

