import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Search,
  ArrowLeft,
  GraduationCap,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';
import { CourseCertificate } from '../../types';
import { curriculumApiService } from '../../services/curriculumApiService';

export const CertificateVerificationPage: React.FC = () => {
  const { verificationId } = useParams<{ verificationId: string }>();
  const [queryId, setQueryId] = useState(verificationId || '');
  const [certificate, setCertificate] = useState<CourseCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (verificationId) {
      verifyCert(verificationId);
    }
  }, [verificationId]);

  const verifyCert = async (idToVerify: string) => {
    if (!idToVerify.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await curriculumApiService.verifyCertificate(idToVerify);
      setCertificate(data);
    } catch (err) {
      console.error(err);
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      {/* Navigation / Lookup Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <Link
          to="/student/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B2F] hover:text-[#C49A55] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Modules</span>
        </Link>

        {/* Search ID */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            placeholder="Enter ID: NSCET-CERT-..."
            className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-mono uppercase focus:outline-none focus:border-[#173B2F] shadow-sm"
          />
          <button
            onClick={() => verifyCert(queryId)}
            className="px-4 py-1.5 rounded-xl bg-[#173B2F] text-white text-xs font-bold shadow hover:bg-[#122F25] transition-colors cursor-pointer"
          >
            Verify
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500 font-medium">
          Verifying certificate against institutional ledger...
        </div>
      ) : certificate ? (
        <div className="space-y-6">
          {/* Official Verification Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                  Officially Verified Credential
                </h3>
                <p className="text-xs opacity-90">
                  Issued by Nadar Saraswathi College of Engineering & Technology (Autonomous CBCS Regulation 2021)
                </p>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>

          {/* Certificate Document (Printable) */}
          <div
            id="printable-certificate"
            className="bg-white rounded-3xl border-8 border-double border-[#C49A55] p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-8 print:border-4 print:shadow-none print:m-0"
          >
            {/* Watermark Background Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-[#173B2F]" />
            </div>

            {/* Certificate Header */}
            <div className="space-y-2 relative z-10 border-b-2 border-gray-100 pb-6">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C49A55]">
                <GraduationCap className="w-5 h-5" />
                <span>Nadar Saraswathi College of Engineering & Technology</span>
              </div>
              <p className="text-[11px] text-gray-500 tracking-wider">
                Approved by AICTE, New Delhi • Affiliated to Anna University, Chennai (Regulation 2021)
              </p>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#173B2F] tracking-wide pt-2">
                CERTIFICATE OF COURSE COMPLETION
              </h1>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                This is to certify that
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 border-b border-gray-300 pb-2 inline-block px-8">
                {certificate.studentName}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
                has successfully completed all modules, practical laboratory assignments, and passed the final Knowledge Check assessment with a grade score of{' '}
                <span className="font-black text-[#173B2F]">{certificate.finalScore}%</span> in
              </p>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#173B2F]/5 via-[#C49A55]/10 to-[#173B2F]/5 border border-[#C49A55]/30">
                <h3 className="text-lg sm:text-xl font-bold text-[#173B2F]">
                  {certificate.courseTitle}
                </h3>
              </div>
            </div>

            {/* Footer Signatures and Verification Details */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10 border-t-2 border-gray-100 text-xs">
              {/* Left: Instructor Sign */}
              <div className="text-center sm:text-left space-y-1">
                <div className="font-serif italic text-base text-[#173B2F] font-bold">
                  {certificate.instructorName}
                </div>
                <div className="w-32 h-0.5 bg-gray-300 mx-auto sm:mx-0" />
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                  Course Instructor
                </p>
              </div>

              {/* Center: Gold Foil Seal */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C49A55] to-[#D97736] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Award className="w-8 h-8" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-[#C49A55]">
                  Official Academic Seal
                </span>
              </div>

              {/* Right: Principal / Academic Dean */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic text-base text-[#173B2F] font-bold">
                  Dr. C. Mathalai Sundaram
                </div>
                <div className="w-32 h-0.5 bg-gray-300 mx-auto sm:ml-auto" />
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                  Principal / Head of Institution
                </p>
              </div>
            </div>

            {/* Verification ID and QR Badge */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-gray-500 font-mono bg-gray-50 p-3 rounded-xl border border-gray-200">
              <span>Verification ID: <strong className="text-gray-900">{certificate.verificationId}</strong></span>
              <span>Issued On: {new Date(certificate.issuedAt).toLocaleDateString()}</span>
              <span className="text-emerald-700 font-bold">✓ Blockchain Verified</span>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-4">
          <Award className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">Certificate Not Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            No certificate matched the verification ID &quot;{queryId}&quot;. Please check the spelling or format (e.g. NSCET-CERT-2026-CS3351-XXXX).
          </p>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-3">
          <ShieldCheck className="w-12 h-12 text-[#173B2F] mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">Institutional Certificate Verification</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Enter an NSCET Certificate Verification ID above to inspect verified course credentials, grade scores, and academic accreditation.
          </p>
        </div>
      )}
    </div>
  );
};
