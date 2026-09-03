import React, { useState } from 'react';
import { FileText, Sparkles, Download, CheckCircle2 } from 'lucide-react';

export const HodReportsPage: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Executive Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          AI Department Health & Accreditation Report
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          One-click AI compilation of student satisfaction, lab infrastructure status, and Anna University syllabus completion.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#17201C]">
              Q3 2026 Departmental Executive Brief
            </h3>
            <p className="text-xs text-gray-500">
              Covers 420 students, 24 faculty, 5 closed-loop tickets, and 48 video lecture modules.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C49A55]" />
            <span>{generating ? 'Compiling RAG Insights...' : 'Generate AI Report'}</span>
          </button>
        </div>

        {generated && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-300 shadow-lg space-y-6 print:border-none print:shadow-none">
            {/* Official Letterhead Header */}
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C49A55] shrink-0">
                  <img src="/assets/campusiq-logo.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#173B2F] tracking-tight">
                    NADAR SARASWATHI COLLEGE OF ENGINEERING & TECHNOLOGY
                  </h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    Department of Computer Science & Engineering • Theni, Tamil Nadu
                  </p>
                  <p className="text-[9px] text-[#C49A55] font-mono">
                    Accredited by AICTE, New Delhi • Affiliated to Anna University, Chennai
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C49A55] hover:bg-[#D97736] text-white text-xs font-bold uppercase tracking-wider shadow cursor-pointer print:hidden"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export / Print PDF</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-800 leading-relaxed">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between font-mono text-[11px]">
                <span>Ref: NSCET/CSE/AI-HEALTH/2026-Q3</span>
                <span>Date: {new Date().toLocaleDateString('en-GB')}</span>
              </div>

              <div className="space-y-3">
                <p>
                  <strong>1. Executive Summary & Student Experience:</strong> Aggregate CSE department satisfaction stands at <strong>84%</strong>. Academic instruction and placement training outperform target benchmarks (&gt;88%). 28 student feedback entries reviewed by HOD and verified through the CampusIQ PII Shield.
                </p>
                <p>
                  <strong>2. Critical Action Recommended:</strong> Computer Lab 2 systems require RAM upgrades for Android Studio and Docker virtualization workloads. 4 student tickets acknowledged and routed to Principal Administration.
                </p>
                <p>
                  <strong>3. Curriculum & Syllabi Delivery Status:</strong> Anna University Regulation 2021 theory lecture coverage is currently <strong>78%</strong> on average across Semester 3, 5, and 7 courses. All 48 recorded video lecture modules indexed for transcript RAG search.
                </p>
                <p>
                  <strong>4. Accreditation & Compliance Readiness:</strong> NAAC Criteria 2 (Teaching-Learning Evaluation) and NBA Outcome-Based Education (OBE) course outcome attainment metrics are currently logged and auditable via the CampusIQ system audit trail.
                </p>
              </div>

              {/* Digital Sign-off Badges */}
              <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-center font-mono text-[10px]">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-emerald-700 font-bold mb-1">✓ DIGITALLY VERIFIED</div>
                  <div className="font-bold text-gray-800">Dr. S. Karthik, M.E., Ph.D.</div>
                  <div className="text-gray-500">Head of Department (CSE)</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-emerald-700 font-bold mb-1">✓ INSTITUTIONAL APPROVAL</div>
                  <div className="font-bold text-gray-800">Office of the Principal</div>
                  <div className="text-gray-500">NSCET Theni</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

