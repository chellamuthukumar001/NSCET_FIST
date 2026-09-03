import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { LectureQuizModal } from '../../components/video/LectureQuizModal';
import { generateAIQuiz } from '../../lib/quizGenerator';
import {
  Award,
  Sparkles,
  BookOpen,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  SlidersHorizontal,
  Clock,
  Loader2,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  BarChart3
} from 'lucide-react';

const NSCET_SUBJECTS = [
  { code: 'CS3351', title: 'Database Management Systems', defaultUnit: 3, defaultTopic: 'Relational Normalization (1NF to BCNF)' },
  { code: 'CS3451', title: 'Operating Systems', defaultUnit: 2, defaultTopic: 'CPU Scheduling & Process Synchronization' },
  { code: 'CS3491', title: 'Cryptography & Cyber Security', defaultUnit: 3, defaultTopic: 'Public Key Cryptography & RSA Algorithm' },
  { code: 'CS3452', title: 'Theory of Computation', defaultUnit: 2, defaultTopic: 'Finite Automata & DFA Minimization' },
  { code: 'CS3391', title: 'Object Oriented Programming', defaultUnit: 3, defaultTopic: 'Java Multithreading & Synchronization' },
  { code: 'CS3591', title: 'Computer Networks', defaultUnit: 3, defaultTopic: 'Network Layer & Routing Protocols' },
  { code: 'CS3401', title: 'Algorithms Design & Analysis', defaultUnit: 3, defaultTopic: 'Dynamic Programming & Shortest Paths' },
  { code: 'CS3501', title: 'Compiler Design', defaultUnit: 2, defaultTopic: 'Syntax Analysis & Top-Down LL(1) Parsing' },
  { code: 'CS3691', title: 'Embedded Systems and IoT', defaultUnit: 1, defaultTopic: 'ARM Cortex Architecture & Peripheral Interfacing' },
  { code: 'CCS335', title: 'Cloud Computing Technologies', defaultUnit: 2, defaultTopic: 'Virtualization & Cloud Infrastructure' },
  { code: 'EC3352', title: 'Digital Systems Design', defaultUnit: 1, defaultTopic: 'Combinational Logic Minimization & Verilog' },
  { code: 'AD3501', title: 'Deep Learning & Computer Vision', defaultUnit: 3, defaultTopic: 'Convolutional Neural Networks & Feature Extraction' },
  { code: 'AI3401', title: 'Deep Learning Architectures', defaultUnit: 2, defaultTopic: 'Backpropagation & Neural Optimization' },
  { code: 'AI3402', title: 'Machine Learning Techniques', defaultUnit: 4, defaultTopic: 'Support Vector Machines (SVM) & Kernels' },
  { code: 'CS3301', title: 'Data Structures & Algorithms', defaultUnit: 4, defaultTopic: 'Binary Search Trees & AVL Rotations' },
  { code: 'GE3151', title: 'Problem Solving and Python Programming', defaultUnit: 1, defaultTopic: 'Flowcharts & Python Control Structures' },
];

export const StudentQuizPage: React.FC = () => {
  // Generator State
  const [selectedSubjectCode, setSelectedSubjectCode] = useState('CS3351');
  const [selectedUnit, setSelectedUnit] = useState(3);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Foundation' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [selectedCount, setSelectedCount] = useState(5);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ta'>('en');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Quiz Modal State
  const [activeQuizModal, setActiveQuizModal] = useState<{
    isOpen: boolean;
    title: string;
    questions: QuizQuestion[];
  }>({
    isOpen: false,
    title: '',
    questions: [],
  });

  // Pre-curated Fast Practice Packs
  const prebuiltQuizzes = [
    {
      code: 'CS3351',
      title: 'CS3351 DBMS: Unit 3 Normalization Mastery',
      unit: 3,
      topic: '1NF, 2NF, 3NF & BCNF',
      questionCount: 3,
      estTime: '3 mins',
      difficulty: 'Intermediate',
      badge: 'High-Yield Exam Unit',
    },
    {
      code: 'CS3451',
      title: 'CS3451 OS: Unit 2 CPU Scheduling & Deadlocks',
      unit: 2,
      topic: 'SJF, Round Robin & Banker\'s Algorithm',
      questionCount: 3,
      estTime: '3 mins',
      difficulty: 'Intermediate',
      badge: 'Core Theory',
    },
    {
      code: 'CS3491',
      title: 'CS3491 Crypto: Unit 3 RSA & Public Key Systems',
      unit: 3,
      topic: 'Euler\'s Totient & Modular Inverse',
      questionCount: 2,
      estTime: '2 mins',
      difficulty: 'Advanced',
      badge: 'Numerical Problems',
    },
    {
      code: 'CS3452',
      title: 'CS3452 TOC: Unit 2 Finite Automata & Regular Grammars',
      unit: 2,
      topic: 'DFA State Transitions & Pumping Lemma',
      questionCount: 2,
      estTime: '2 mins',
      difficulty: 'Advanced',
      badge: 'Proof Techniques',
    },
    {
      code: 'CS3301',
      title: 'CS3301 DSA: Unit 4 Tree Structures & AVL Rotations',
      unit: 4,
      topic: 'Balance Factors & LL/RR Rotations',
      questionCount: 2,
      estTime: '2 mins',
      difficulty: 'Foundation',
      badge: 'Data Structures',
    },
    {
      code: 'AI3401',
      title: 'AI3401 AI&DS: Backpropagation & Optimization',
      unit: 2,
      topic: 'Gradient Descent & Cost Functions',
      questionCount: 3,
      estTime: '4 mins',
      difficulty: 'Advanced',
      badge: 'Deep Learning',
    },
  ];

  const handleGenerateCustomQuiz = async () => {
    setIsGenerating(true);
    const subObj = NSCET_SUBJECTS.find((s) => s.code === selectedSubjectCode) || NSCET_SUBJECTS[0];

    try {
      const generated = await generateAIQuiz({
        subjectCode: subObj.code,
        subjectTitle: subObj.title,
        unitNumber: selectedUnit,
        topic: subObj.defaultTopic,
        difficulty: selectedDifficulty,
        count: selectedCount,
        language: selectedLanguage,
      });

      setActiveQuizModal({
        isOpen: true,
        title: `${subObj.code} Unit ${selectedUnit}: ${subObj.title} (${selectedDifficulty})`,
        questions: generated,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartPrebuiltDrill = async (quiz: typeof prebuiltQuizzes[0]) => {
    const subObj = NSCET_SUBJECTS.find((s) => s.code === quiz.code) || NSCET_SUBJECTS[0];
    setIsGenerating(true);
    try {
      const questions = await generateAIQuiz({
        subjectCode: quiz.code,
        subjectTitle: subObj.title,
        unitNumber: quiz.unit,
        topic: quiz.topic,
        difficulty: quiz.difficulty as any,
        count: quiz.questionCount,
        language: 'en',
      });

      setActiveQuizModal({
        isOpen: true,
        title: quiz.title,
        questions,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1C483A] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-[#6FA9C9]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>NSCET Theni • AI Knowledge & Exam Preparation Hub</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              AI Practice Quiz & Knowledge Studio
            </h1>

            <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
              Generate real-time, syllabus-grounded practice question sets with instant faculty explanations powered by Groq LPU inference. Aligned with Anna University Regulation 2021 evaluation standards.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-[11px] font-medium text-white/80">
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>10 Engineering Subjects Available</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Real-Time Conceptual Feedback</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Multilingual: English & தமிழ்</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shrink-0 space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-300 block">
              Anna University Ready
            </span>
            <div className="text-2xl font-black text-[#C49A55]">100%</div>
            <span className="text-[11px] text-white/80 font-medium">Curriculum Aligned</span>
          </div>
        </div>
      </div>

      {/* 2. Custom AI Quiz Generator Studio Console */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#173B2F] text-white flex items-center justify-center font-bold shadow">
              <Sparkles className="w-4 h-4 text-[#C49A55]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Custom AI Quiz Generator
              </h2>
              <p className="text-xs text-gray-500">
                Configure your desired course code, unit number, and difficulty to synthesize a brand-new drill set.
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#173B2F]/10 text-[#173B2F] font-bold self-start sm:self-auto">
            Powered by Groq LPU Engine
          </span>
        </div>

        {/* Generator Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          
          {/* Subject Selector */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-bold text-gray-700">Course Subject:</label>
            <select
              value={selectedSubjectCode}
              onChange={(e) => setSelectedSubjectCode(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-[#173B2F] focus:border-[#173B2F] focus:bg-white focus:outline-none"
            >
              {NSCET_SUBJECTS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Syllabus Unit:</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-[#173B2F] focus:border-[#173B2F] focus:bg-white focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map((u) => (
                <option key={u} value={u}>
                  Unit {u}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Difficulty Level:</label>
            <select
              value={selectedDifficulty}
              onChange={(e: any) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-[#173B2F] focus:border-[#173B2F] focus:bg-white focus:outline-none"
            >
              <option value="Foundation">Foundation (2 Marks)</option>
              <option value="Intermediate">Intermediate (Univ. Exam)</option>
              <option value="Advanced">Advanced (GATE / Model)</option>
            </select>
          </div>

          {/* Questions Count & Language */}
          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Questions & Lang:</label>
            <div className="flex items-center gap-1.5">
              <select
                value={selectedCount}
                onChange={(e) => setSelectedCount(Number(e.target.value))}
                className="w-1/2 p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-[#173B2F]"
              >
                <option value={3}>3 Qs</option>
                <option value={5}>5 Qs</option>
                <option value={10}>10 Qs</option>
              </select>

              <select
                value={selectedLanguage}
                onChange={(e: any) => setSelectedLanguage(e.target.value)}
                className="w-1/2 p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-[#173B2F]"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>

        </div>

        {/* Generate Button Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            Synthesizes questions strictly conforming to the Anna University Regulation 2021 Bloom's Taxonomy breakdown.
          </p>

          <button
            onClick={handleGenerateCustomQuiz}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#173B2F] to-[#285443] hover:from-[#112d23] hover:to-[#173B2F] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#C49A55]" />
                <span>Synthesizing via Groq AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#C49A55]" />
                <span>Generate Custom AI Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Pre-Built Rapid Knowledge Drills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Curated High-Yield Revision Drills
            </h3>
            <p className="text-xs text-gray-500">
              Instant drills based on previous year Anna University Chennai examination papers.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#173B2F]">
            {prebuiltQuizzes.length} Fast Packs Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {prebuiltQuizzes.map((quiz, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#173B2F]/40 transition-all space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-[10px] font-bold font-mono">
                    {quiz.code} • Unit {quiz.unit}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    {quiz.difficulty}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#17201C] group-hover:text-[#173B2F] transition-colors leading-snug">
                  {quiz.title}
                </h4>

                <p className="text-[11px] text-gray-500 mt-1">
                  Focus: {quiz.topic}
                </p>

                <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {quiz.questionCount} Questions
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {quiz.estTime}
                  </span>
                  <span>•</span>
                  <span className="text-[#C49A55] font-bold">{quiz.badge}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartPrebuiltDrill(quiz)}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-[#173B2F] text-gray-700 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#173B2F] shadow-sm transition-all cursor-pointer"
              >
                <span>Start Practice Drill</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Active Lecture Quiz Modal */}
      {activeQuizModal.isOpen && (
        <LectureQuizModal
          isOpen={activeQuizModal.isOpen}
          onClose={() => setActiveQuizModal({ isOpen: false, title: '', questions: [] })}
          questions={activeQuizModal.questions}
          subjectTitle={activeQuizModal.title}
        />
      )}

    </div>
  );
};

