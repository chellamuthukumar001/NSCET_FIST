import React from 'react';
import { BookOpen, Award, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoursesPage: React.FC = () => {
  const programs = [
    {
      code: 'B.E. CSE',
      title: 'B.E. Computer Science & Engineering',
      duration: '4 Years (8 Semesters)',
      intake: 120,
      regulation: 'Anna University Regulation 2021',
      highlights: [
        'Data Structures & Algorithms (CS3301)',
        'Database Management Systems (CS3351)',
        'Operating Systems & Kernel Design (CS3451)',
        'Computer Networks & Protocols (CS3591)',
        'Full Stack Web Development & Cloud Architectures'
      ]
    },
    {
      code: 'B.Tech AI&DS',
      title: 'B.Tech Artificial Intelligence & Data Science',
      duration: '4 Years (8 Semesters)',
      intake: 60,
      regulation: 'Anna University Regulation 2021',
      highlights: [
        'Mathematical Foundations of Data Science',
        'Deep Learning Architectures (AI3401)',
        'Natural Language Processing & LLMs',
        'Computer Vision & Autonomous Systems',
        'Big Data Analytics with Apache Spark'
      ]
    },
    {
      code: 'B.E. ECE',
      title: 'B.E. Electronics & Communication Engineering',
      duration: '4 Years (8 Semesters)',
      intake: 90,
      regulation: 'Anna University Regulation 2021',
      highlights: [
        'VLSI Design & Embedded Systems',
        'Signals & Linear Systems',
        'Wireless 5G Networks & IoT',
        'Microcontrollers & ARM Architecture'
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Curriculum & Programs
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17201C] tracking-tight mt-1">
          Academic Degree Programs
        </h1>
        <p className="text-sm text-[#66736C] max-w-2xl mt-1">
          Accredited undergraduate programs adhering to Anna University Regulation 2021 with Choice-Based Credit System (CBCS).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {programs.map((prog, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-xl bg-[#173B2F] text-white text-xs font-bold">
                {prog.code}
              </span>
              <span className="text-[11px] font-mono text-gray-500">
                Intake: {prog.intake} seats
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#17201C] mb-2">{prog.title}</h3>
            <div className="text-xs text-[#C49A55] font-semibold mb-4">{prog.duration}</div>

            <div className="space-y-2 flex-1 mb-6 border-t border-gray-100 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Core Curriculum Highlights:
              </span>
              {prog.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#17201C]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <Link
              to="/student/videos"
              className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-[#173B2F] text-[#173B2F] hover:text-white border border-gray-200 text-xs font-bold uppercase tracking-wider text-center transition-colors block"
            >
              Explore Course Lectures
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

