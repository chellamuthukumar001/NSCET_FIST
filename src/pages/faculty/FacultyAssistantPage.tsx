import React from 'react';
import { useCopilot } from '../../context/CopilotContext';
import { Sparkles, BookOpen, Award, FileText, ArrowRight } from 'lucide-react';

export const FacultyAssistantPage: React.FC = () => {
  const { openCopilot } = useCopilot();

  const prompts = [
    {
      title: 'Generate Unit Revision Quiz',
      desc: 'Create 5 Anna University standard MCQs with explanations for CS3351 Unit 3.',
      query: 'Generate 5 multiple choice questions with answers and detailed explanations for CS3351 Database Management Systems Unit 3 Normalization.'
    },
    {
      title: 'Summarize Student Feedback',
      desc: 'Review anonymized student feedback regarding Computer Lab 2 practicals.',
      query: 'Summarize student feedback regarding Computer Lab 2 practicals and suggest actionable solutions.'
    },
    {
      title: 'Draft Lesson Plan',
      desc: 'Create a 50-minute interactive lesson plan on BCNF decomposition.',
      query: 'Draft a 50-minute structured lecture plan for Boyce-Codd Normal Form with board examples.'
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C49A55] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Faculty Copilot Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight mt-0.5">
          Academic AI Workflows
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Utilize CampusIQ RAG to draft quizzes, analyze curriculum bottlenecks, and review student sentiment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prompts.map((p, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div>
              <h3 className="text-sm font-bold text-[#17201C]">{p.title}</h3>
              <p className="text-xs text-[#66736C] mt-1 leading-relaxed">{p.desc}</p>
            </div>

            <button
              onClick={() => openCopilot(p.query)}
              className="w-full py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
            >
              <span>Run AI Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

