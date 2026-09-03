import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import {
  X,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  HelpCircle,
  Clock,
  Printer,
  RotateCcw,
  BookOpen,
  MessageSquareShare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCopilot } from '../../context/CopilotContext';

interface LectureQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  subjectTitle: string;
}

export const LectureQuizModal: React.FC<LectureQuizModalProps> = ({
  isOpen,
  onClose,
  questions,
  subjectTitle,
}) => {
  const { openCopilot } = useCopilot();
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(300); // 5 minutes default

  // Timer effect
  useEffect(() => {
    if (!isOpen || submitted) return;
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, submitted]);

  // Reset timer on open
  useEffect(() => {
    if (isOpen) {
      setTimeRemainingSeconds(questions.length * 60); // 1 min per question
      setUserAnswers({});
      setSubmitted(false);
      setCurrentQIndex(0);
    }
  }, [isOpen, questions]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score >= Math.ceil(questions.length * 0.8)) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#173B2F', '#C49A55', '#6FA9C9'],
        });
      } catch (_) {}
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const score = calculateScore();
  const scorePercent = Math.round((score / Math.max(1, questions.length)) * 100);
  const allAnswered = Object.keys(userAnswers).length === questions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#173B2F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C49A55]/20 text-[#C49A55] flex items-center justify-center border border-[#C49A55]/40 shadow-inner">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Practice & Knowledge Drill</span>
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
                  {questions.length} Questions
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug truncate max-w-md">
                {subjectTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Timer */}
            {!submitted && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-colors ${
                  timeRemainingSeconds < 60
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 animate-pulse'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Question Navigator Ribbon */}
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-gray-500 font-semibold mr-1">Questions:</span>
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = currentQIndex === idx;
              let dotStyle = 'bg-white border-gray-300 text-gray-700';

              if (submitted) {
                const isCorrect = userAnswers[idx] === questions[idx].correctAnswerIndex;
                dotStyle = isCorrect
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-rose-600 text-white border-rose-600';
              } else if (isCurrent) {
                dotStyle = 'bg-[#173B2F] text-white border-[#173B2F] ring-2 ring-[#C49A55]';
              } else if (isAnswered) {
                dotStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold border flex items-center justify-center transition-all cursor-pointer ${dotStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="text-gray-500 text-[11px]">
            {submitted ? (
              <span className="font-bold text-[#173B2F]">Review Mode</span>
            ) : (
              <span>
                <strong>{Object.keys(userAnswers).length}</strong> of {questions.length} answered
              </span>
            )}
          </div>
        </div>

        {/* Questions Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {questions.map((q, qIdx) => {
            const selectedOpt = userAnswers[qIdx];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                id={`q_${qIdx}`}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  currentQIndex === qIdx
                    ? 'bg-white border-[#173B2F] shadow-sm ring-1 ring-[#173B2F]/20'
                    : 'bg-gray-50/80 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    <span className="text-[#173B2F] font-black mr-2">Q{qIdx + 1}.</span>
                    {q.question}
                  </h4>
                  {submitted && (
                    <span className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selectedOpt === optIdx;
                    let optionStyle = 'bg-white border-gray-200 hover:border-[#173B2F]/40';

                    if (submitted) {
                      if (optIdx === q.correctAnswerIndex) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      } else if (isOptionSelected && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                      } else {
                        optionStyle = 'bg-white border-gray-200 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'bg-[#173B2F]/10 border-[#173B2F] text-[#173B2F] font-bold shadow-sm';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        disabled={submitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center font-mono text-[10px] text-gray-600 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {submitted && optIdx === q.correctAnswerIndex && (
                          <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                            Correct Answer
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Post-submission detailed rationale */}
                {submitted && (
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-blue-800 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Anna University Concept Rationale:</span>
                      </span>

                      <button
                        onClick={() =>
                          openCopilot(
                            `In the quiz for "${subjectTitle}", explain question ${qIdx + 1}: "${q.question}". Why is "${q.options[q.correctAnswerIndex]}" correct, and why were other options incorrect?`
                          )
                        }
                        className="text-[10px] font-bold text-[#173B2F] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquareShare className="w-3 h-3" />
                        <span>Ask Copilot to explain</span>
                      </button>
                    </div>
                    <p className="leading-relaxed text-blue-900">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Score & Action Bar */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            {submitted ? (
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-semibold text-gray-600">Your Score:</span>
                  <span className="text-xl font-black text-[#173B2F]">
                    {score} / {questions.length}
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    ({scorePercent}%)
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    scorePercent >= 80
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : scorePercent >= 50
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {scorePercent >= 80 ? '🏆 Distinction' : scorePercent >= 50 ? '🥈 Good Effort' : '📘 Revision Advised'}
                </span>
              </div>
            ) : (
              <span className="text-xs text-gray-600">
                Answered <strong>{Object.keys(userAnswers).length}</strong> of {questions.length} questions
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {submitted ? (
              <>
                <button
                  onClick={handlePrint}
                  className="px-3 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Scorecard</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setUserAnswers({});
                    setTimeRemainingSeconds(questions.length * 60);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs shadow cursor-pointer"
                >
                  Done
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:from-[#b08744] hover:to-[#c4682c] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


