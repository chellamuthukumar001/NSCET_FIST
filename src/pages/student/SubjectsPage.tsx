import React, { useState } from 'react';
import { BookOpen, Video, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SubjectsPage: React.FC = () => {
  const [expandedUnit, setExpandedUnit] = useState<number | null>(3);

  const units = [
    {
      unit: 1,
      title: 'Relational Model & Relational Algebra',
      topics: ['Database System Concepts', 'Data Independence', 'Entity-Relationship (ER) Modeling', 'Relational Algebra Operations', 'Tuple Relational Calculus'],
      lectureCount: 4,
    },
    {
      unit: 2,
      title: 'SQL & Database Architecture',
      topics: ['DDL, DML, DCL Statements', 'Complex Queries & Subqueries', 'Views, Triggers & Stored Procedures', 'Embedded SQL & Dynamic SQL'],
      lectureCount: 5,
    },
    {
      unit: 3,
      title: 'Relational Database Design & Normalization',
      topics: ['Functional Dependencies', 'Anomalies in Relational Design', 'First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
      lectureCount: 6,
    },
    {
      unit: 4,
      title: 'Transactions & Concurrency Control',
      topics: ['ACID Properties', 'Schedules & Serializability', 'Two-Phase Locking (2PL)', 'Timestamp Ordering', 'Deadlock Detection & Resolution'],
      lectureCount: 5,
    },
    {
      unit: 5,
      title: 'Indexing, Storage & Query Processing',
      topics: ['RAID Levels & File Organization', 'B-Trees & B+ Tree Indexing', 'Hashing Techniques', 'Query Evaluation Steps', 'Query Optimization Strategies'],
      lectureCount: 4,
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C49A55] uppercase tracking-wider">
          <span>B.E. CSE • Semester 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight mt-0.5">
          CS3351 - Database Management Systems
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Anna University Regulation 2021 syllabus breakdown with video lectures mapped to each unit.
        </p>
      </div>

      {/* Course Overview Card */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#173B2F]">Course Coordinator: Dr. S. Karthik (HOD CSE)</div>
          <div className="text-xs text-gray-500">Credits: 3 • Total Modules: 24 Video Lectures • Status: Active</div>
        </div>
        <Link
          to="/student/videos"
          className="px-4 py-2 rounded-xl bg-[#173B2F] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
        >
          <Video className="w-4 h-4" />
          <span>Browse DBMS Lectures</span>
        </Link>
      </div>

      {/* Units Accordion */}
      <div className="space-y-4">
        {units.map((u) => {
          const isExpanded = expandedUnit === u.unit;
          return (
            <div
              key={u.unit}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedUnit(isExpanded ? null : u.unit)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#173B2F] text-white flex items-center justify-center font-bold text-xs">
                    U{u.unit}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17201C]">{u.title}</h3>
                    <span className="text-[11px] text-gray-500">{u.lectureCount} Video Lectures</span>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-[#173B2F]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Syllabus Topics (Regulation 2021):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {u.topics.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-gray-200 text-xs text-[#17201C] flex items-center justify-between"
                      >
                        <span>{t}</span>
                        <Link
                          to={`/student/videos/vid_1`}
                          className="text-[10px] text-[#173B2F] font-semibold hover:underline flex items-center gap-0.5 shrink-0 ml-2"
                        >
                          <Video className="w-3 h-3 text-[#C49A55]" />
                          <span>Watch</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

