import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { ModularQuiz, QuizAttempt } from '../../types';
import { curriculumApiService } from '../../services/curriculumApiService';

interface KnowledgeCheckQuizProps {
  quiz: ModularQuiz;
  courseId: string;
  moduleId?: string;
  onPass?: () => void;
  onClaimCertificate?: () => void;
}

export const KnowledgeCheckQuiz: React.FC<KnowledgeCheckQuizProps> = ({
  quiz,
  courseId,
  moduleId,
  onPass,
  onClaimCertificate,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestionIndex];
  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  const handleSelectOption = (optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await curriculumApiService.submitQuiz({
        quizId: quiz.id,
        courseId,
        moduleId,
        answers: selectedAnswers,
      });
      setAttemptResult(res.attempt);
      setSubmitted(true);
      if (res.passed && onPass) {
        onPass();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setAttemptResult(null);
    setCurrentQuestionIndex(0);
  };

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
        No questions currently available for this Knowledge Check.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#173B2F]/10 text-[#173B2F]">
              Knowledge Check
            </span>
            <span className="text-xs font-semibold text-gray-500">
              Min. Passing Score: {quiz.passingScore}%
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#17201C] mt-1">{quiz.title}</h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#173B2F] to-[#C49A55] transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Result Card if Submitted */}
      {submitted && attemptResult && (
        <div
          className={`p-6 rounded-2xl border ${
            attemptResult.passed
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          } animate-fade-in space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {attemptResult.passed ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 flex-shrink-0" />
              )}
              <div>
                <h3 className="text-lg font-black">
                  {attemptResult.passed ? 'Knowledge Check Passed! 🎉' : 'Assessment Not Passed'}
                </h3>
                <p className="text-xs opacity-90 mt-0.5">
                  You scored {attemptResult.score}% ({attemptResult.correctCount} of{' '}
                  {attemptResult.totalQuestions} correct). Required: {quiz.passingScore}%.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black">{attemptResult.score}%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!attemptResult.passed ? (
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Module Marked Completed
                </span>
                {onClaimCertificate && (
                  <button
                    onClick={onClaimCertificate}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:brightness-110 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer ml-auto"
                  >
                    <Award className="w-4 h-4" />
                    <span>View / Claim Certificate</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="w-7 h-7 rounded-xl bg-[#173B2F] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
            {currentQuestionIndex + 1}
          </span>
          <p className="text-base font-bold text-gray-900 leading-snug">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            const isCorrect = currentQ.correctAnswer === idx;

            let borderStyle = 'border-gray-200 hover:border-gray-300 bg-white';
            if (submitted) {
              if (isCorrect) {
                borderStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold';
              } else if (isSelected && !isCorrect) {
                borderStyle = 'border-rose-500 bg-rose-50/70 text-rose-950';
              } else {
                borderStyle = 'border-gray-100 opacity-60 bg-gray-50';
              }
            } else if (isSelected) {
              borderStyle = 'border-[#173B2F] bg-[#173B2F]/5 font-semibold text-[#173B2F] shadow-sm';
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${borderStyle}`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                    isSelected
                      ? 'bg-[#173B2F] text-white border-[#173B2F]'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-xs sm:text-sm flex-1">{option}</span>
                {submitted && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                )}
                {submitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation on Submitted */}
        {submitted && (
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs leading-relaxed space-y-1 mt-3 animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold text-blue-950">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Pedagogical Explanation:</span>
            </div>
            <p className="text-blue-800">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Question Stepper Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 disabled:opacity-40 cursor-pointer"
        >
          Previous Question
        </button>

        <div className="flex items-center gap-2">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#122F25] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : !submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#173B2F] to-[#6E7F45] hover:brightness-110 text-white text-xs font-black shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Evaluating...' : 'Submit Knowledge Check'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
