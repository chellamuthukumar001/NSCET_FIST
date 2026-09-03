import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  ShieldCheck,
  Mail,
  BookOpen,
  GraduationCap,
  Award,
  Bell,
  CheckCircle,
  Clock,
  Printer,
  QrCode,
  Sparkles,
  Phone,
  Building2,
  Calendar,
  Layers,
  TrendingUp,
  KeyRound,
  RefreshCw,
  Sliders,
  Check,
  ExternalLink,
  Save,
  AlertCircle,
  FileText,
  BadgeCheck,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, role } = useAuth();

  // Active Profile Tab
  const [activeTab, setActiveTab] = useState<'courses' | 'ai_portfolio' | 'privacy_shield' | 'settings'>('courses');

  // Anonymous Token State
  const [anonToken, setAnonToken] = useState('anon_9f82d1c44a');
  const [copiedToken, setCopiedToken] = useState(false);

  // Editable Profile Settings State
  const [fullName, setFullName] = useState(currentUser?.name || 'Vignesh R');
  const [email, setEmail] = useState(currentUser?.email || 'vignesh.cse@nscet.org');
  const [phone, setPhone] = useState('+91 98421 87654');
  const [studentType, setStudentType] = useState<'Day Scholar' | 'Hostel'>('Day Scholar');
  const [busRoute, setBusRoute] = useState('Route 4: Cumbum - Theni - NSCET');
  const [preferredLang, setPreferredLang] = useState<'en' | 'ta'>('en');
  const [dailyGoal, setDailyGoal] = useState(45);
  const [notifyFeedback, setNotifyFeedback] = useState(true);
  const [notifyLectures, setNotifyLectures] = useState(true);
  const [notifyPlacement, setNotifyPlacement] = useState(true);
  const [notifyHallTicket, setNotifyHallTicket] = useState(true);

  // Save changes state
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Avatar Presets
  const [selectedAvatar, setSelectedAvatar] = useState(
    currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
  );

  const avatarPresets = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  ];

  const handleCopyToken = () => {
    navigator.clipboard.writeText(anonToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleRegenerateToken = () => {
    const newToken = 'anon_' + Math.random().toString(36).substring(2, 12);
    setAnonToken(newToken);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 600);
  };

  // Enrolled Courses under Regulation 2021
  const enrolledCourses = [
    { code: 'CS3351', title: 'Database Management Systems', credits: 3, faculty: 'Dr. S. Karthik', ia1: '46/50', ia2: '48/50', model: '92/100', attendance: 92 },
    { code: 'CS3451', title: 'Operating Systems', credits: 3, faculty: 'Dr. M. Deepa', ia1: '44/50', ia2: '45/50', model: '88/100', attendance: 88 },
    { code: 'CS3491', title: 'Cryptography & Cyber Security', credits: 3, faculty: 'Dr. S. Karthik', ia1: '47/50', ia2: '49/50', model: '95/100', attendance: 94 },
    { code: 'CS3452', title: 'Theory of Computation', credits: 3, faculty: 'Prof. P. Ramasamy', ia1: '42/50', ia2: '46/50', model: '86/100', attendance: 85 },
    { code: 'CS3391', title: 'Object Oriented Programming', credits: 3, faculty: 'Dr. M. Deepa', ia1: '48/50', ia2: '47/50', model: '94/100', attendance: 90 },
    { code: 'CS3591', title: 'Computer Networks', credits: 3, faculty: 'Prof. K. Sundar', ia1: '45/50', ia2: '44/50', model: '89/100', attendance: 87 },
  ];

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1C483A] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-[#6FA9C9]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>NSCET Theni • Directorate of Student Affairs & Academic Records</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Student Academic Profile & Smart ID
            </h1>

            <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
              Official institutional credentials, continuous assessment records (Internal 40% / External 60%), and verified digital biometric identity under Anna University Regulation 2021.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-[11px] font-medium text-white/80">
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Anna University Enrolled</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>PII Privacy Shield Active</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Groq AI Copilot Synchronized</span>
              </span>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 self-start md:self-auto shadow"
          >
            <Printer className="w-4 h-4 text-[#C49A55]" />
            <span>Print Student Credential</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive NSCET Biometric Smart ID Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#122A22] via-[#173B2F] to-[#0A1A14] border-2 border-[#C49A55]/40 text-white p-6 sm:p-8 shadow-2xl">
        {/* Hologram Light Streak Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-white/10 to-transparent rotate-45 pointer-events-none transform -translate-y-24 translate-x-24" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          {/* Card Left: Institutional Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Student Photo & Preset Selector */}
            <div className="space-y-3 shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#C49A55] shadow-xl bg-black/40">
                <img
                  src={selectedAvatar}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#101815]" />
              </div>

              {/* Avatar Preset Switcher Pills */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                {avatarPresets.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-4 h-4 rounded-full overflow-hidden border cursor-pointer transition-all ${
                      selectedAvatar === av ? 'border-[#C49A55] scale-125' : 'border-white/30 opacity-60'
                    }`}
                  >
                    <img src={av} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Credential Attributes */}
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#C49A55] shrink-0">
                  <img src="/assets/nscet-college-logo.jpg" alt="NSCET" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C49A55] font-bold">
                  Nadar Saraswathi College of Engineering & Technology
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {fullName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C49A55] text-black text-[10px] font-black uppercase tracking-wider">
                  {role}
                </span>
              </div>

              <p className="text-xs text-gray-300 font-medium">
                {currentUser?.program || 'B.E. Computer Science & Engineering (FIST)'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Register No.</span>
                  <span className="font-mono font-bold text-white text-xs">{currentUser?.studentId || '921022104042'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Semester / Batch</span>
                  <span className="font-bold text-white text-xs">Sem 5 • 2022 - 2026</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Residence Mode</span>
                  <span className="font-bold text-emerald-300 text-xs">{studentType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Right: Smart RFID Chip Graphic & Digital QR Verification */}
          <div className="flex sm:flex-row lg:flex-col items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md shrink-0 w-full lg:w-auto">
            {/* Smart Chip SVG Graphic */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-9 rounded-lg bg-gradient-to-r from-amber-400 to-amber-200 border border-amber-500 shadow-inner flex flex-col justify-around p-1">
                <div className="w-full h-0.5 bg-amber-700/40 rounded"></div>
                <div className="w-full h-0.5 bg-amber-700/40 rounded"></div>
                <div className="w-full h-0.5 bg-amber-700/40 rounded"></div>
              </div>
              <div className="text-left">
                <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Smart NFC Pass</span>
                <span className="text-[11px] font-mono text-[#C49A55] font-bold">NSCET-AUTH-ID</span>
              </div>
            </div>

            {/* Stylized QR Verification Box */}
            <div className="text-center space-y-1">
              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md mx-auto flex items-center justify-center">
                <QrCode className="w-14 h-14 text-black" />
              </div>
              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block">
                Scan to Verify Exam Hall Ticket
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Academic Standing Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: CGPA */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-1 hover:border-[#173B2F]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-bold text-[10px] uppercase">Cumulative GPA</span>
            <Award className="w-4 h-4 text-[#C49A55]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">8.74</span>
            <span className="text-xs font-bold text-gray-400">/ 10.0</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            First Class with Distinction
          </span>
        </div>

        {/* Metric 2: Attendance */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-1 hover:border-[#173B2F]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-bold text-[10px] uppercase">Attendance Ratio</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">89.2%</span>
          </div>
          <span className="text-[10px] font-semibold text-gray-500">
            Min 75% Required (Reg. 2021 Compliant)
          </span>
        </div>

        {/* Metric 3: Earned Credits */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-1 hover:border-[#173B2F]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-bold text-[10px] uppercase">Degree Credits</span>
            <BookOpen className="w-4 h-4 text-[#6FA9C9]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">114</span>
            <span className="text-xs font-bold text-gray-400">/ 165</span>
          </div>
          <span className="text-[10px] font-semibold text-gray-500">
            69% Curriculum Completed
          </span>
        </div>

        {/* Metric 4: Exam Clearance */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-1 hover:border-[#173B2F]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-bold text-[10px] uppercase">Hall Ticket Status</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-sm font-black text-emerald-700 flex items-center gap-1.5 mt-1">
            <BadgeCheck className="w-4 h-4" />
            <span>Eligible & Cleared</span>
          </div>
          <span className="text-[10px] font-semibold text-gray-500">
            Nov / Dec 2026 Anna Univ. Exams
          </span>
        </div>

      </div>

      {/* 4. Interactive Profile Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'courses'
              ? 'bg-[#173B2F] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Enrolled Courses & Internals</span>
        </button>

        <button
          onClick={() => setActiveTab('ai_portfolio')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'ai_portfolio'
              ? 'bg-[#173B2F] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C49A55]" />
          <span>AI Learning & Quiz Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy_shield')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'privacy_shield'
              ? 'bg-[#173B2F] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Privacy & Anonymous Token</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'settings'
              ? 'bg-[#173B2F] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Profile & Sync Settings</span>
        </button>
      </div>

      {/* 5. TAB 1: Enrolled Courses & Continuous Assessment Table */}
      {activeTab === 'courses' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Semester 5 Continuous Internal Assessment (CIA) Records
              </h3>
              <p className="text-xs text-gray-500">
                Anna University Regulation 2021 Clause 12.1: Internal Assessments contribute 40% towards overall course grading.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#173B2F] bg-emerald-50 px-2.5 py-1 rounded-full self-start sm:self-auto">
              6 Theory Courses • 18 Credits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold text-gray-500 uppercase">
                  <th className="p-3">Course Code & Subject</th>
                  <th className="p-3">Credits</th>
                  <th className="p-3">Faculty In-Charge</th>
                  <th className="p-3 text-center">IA 1 (50)</th>
                  <th className="p-3 text-center">IA 2 (50)</th>
                  <th className="p-3 text-center">Model Exam</th>
                  <th className="p-3 text-right">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {enrolledCourses.map((c) => (
                  <tr key={c.code} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{c.code}</div>
                      <div className="text-[11px] text-gray-500 truncate max-w-xs">{c.title}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#173B2F]">{c.credits}</td>
                    <td className="p-3 text-gray-600">{c.faculty}</td>
                    <td className="p-3 text-center font-mono font-semibold text-emerald-700">{c.ia1}</td>
                    <td className="p-3 text-center font-mono font-semibold text-emerald-700">{c.ia2}</td>
                    <td className="p-3 text-center font-mono font-bold text-gray-900">{c.model}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.attendance >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {c.attendance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB 2: AI Learning & Practice Quiz Portfolio */}
      {activeTab === 'ai_portfolio' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                AI Knowledge Mastery & Exam Readiness
              </h3>
              <p className="text-xs text-gray-500">
                Self-assessment analytics tracked across lecture modules and Groq AI practice drills.
              </p>
            </div>
            <Link
              to="/student/quiz"
              className="px-3 py-1.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Launch Quiz Studio</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Lecture Modules Studied</span>
              <div className="text-2xl font-black text-emerald-950">14 / 16</div>
              <p className="text-[11px] text-emerald-700">7h 12m active learning time logged across 5 domains</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">AI Practice Drills Attempted</span>
              <div className="text-2xl font-black text-amber-950">18 Quizzes</div>
              <p className="text-[11px] text-amber-700">88.5% Average Score across Part-A & Part-B questions</p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-2">
              <span className="text-[10px] font-bold uppercase text-sky-800 block">Distinction Badges Earned</span>
              <div className="text-2xl font-black text-sky-950">5 Badges</div>
              <p className="text-[11px] text-sky-700">Scored 80%+ on DBMS, OS, Crypto, TOC and DSA Drills</p>
            </div>
          </div>

          {/* Badges Ribbon */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Verified Concept Distinction Badges
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-sm">🏆</div>
                <div>
                  <div className="font-bold text-gray-900">CS3351 DBMS</div>
                  <div className="text-[10px] text-gray-500">Normalization 100%</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-sm">🏆</div>
                <div>
                  <div className="font-bold text-gray-900">CS3451 OS</div>
                  <div className="text-[10px] text-gray-500">Scheduling 100%</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-sm">🏆</div>
                <div>
                  <div className="font-bold text-gray-900">CS3491 Crypto</div>
                  <div className="text-[10px] text-gray-500">RSA Algorithm 90%</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-sm">🏆</div>
                <div>
                  <div className="font-bold text-gray-900">CS3452 TOC</div>
                  <div className="text-[10px] text-gray-500">DFA Automata 85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB 3: Privacy & Anonymous Voice Shield */}
      {activeTab === 'privacy_shield' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Zero-Identity Retaliation Privacy Shield</span>
              </h3>
              <p className="text-xs text-gray-500">
                Guaranteed by NSCET Student Voice Governance & Autonomous PII Sanitization.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <span className="text-[10px] font-bold uppercase text-gray-500 block">
              Your Private Anonymous Feedback Token
            </span>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 font-mono text-sm font-bold text-[#173B2F] flex-1">
                {anonToken}
              </div>
              <button
                onClick={handleCopyToken}
                className="px-4 py-2.5 rounded-xl bg-[#173B2F] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5" /> : <KeyRound className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
              </button>
              <button
                onClick={handleRegenerateToken}
                className="px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                title="Generates a new token for future feedback"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Cycle Token</span>
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              This cryptographic token links your submitted campus feedback to your dashboard without revealing your name, email, or roll number to HODs or administrative reviewers.
            </p>
          </div>

          {/* Privacy Demonstration Box */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-gray-700 block">
              Autonomous PII Sanitization Demonstration
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                <span className="text-[10px] font-bold uppercase text-rose-600 block">Raw Input (Before Submission)</span>
                <p className="text-[11px]">"{fullName} (Reg: {currentUser?.studentId || '921022104042'}): Lab 2 monitors frequently flicker."</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-600 block">Stored Record (After PII Scrubber)</span>
                <p className="text-[11px]">"[{anonToken}]: Lab 2 monitors frequently flicker."</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. TAB 4: Profile & Sync Settings Form */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Personal Information & Communication Preferences
              </h3>
              <p className="text-xs text-gray-500">
                Update your contact details, transportation mode, and notification channels.
              </p>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Profile settings successfully saved and synchronized with NSCET student registry!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-700">Full Student Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700">Official College Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700">Mobile Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700">Residence & Transit Mode:</label>
              <select
                value={studentType}
                onChange={(e: any) => setStudentType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
              >
                <option value="Day Scholar">Day Scholar (College Bus Transit)</option>
                <option value="Hostel">Hostel Resident (Campus Block A)</option>
              </select>
            </div>

            {studentType === 'Day Scholar' && (
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-gray-700">College Bus Transit Route:</label>
                <input
                  type="text"
                  value={busRoute}
                  onChange={(e) => setBusRoute(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700">Preferred AI Copilot Language:</label>
              <select
                value={preferredLang}
                onChange={(e: any) => setPreferredLang(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700">Daily Study Target (Minutes):</label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:outline-none focus:border-[#173B2F] focus:bg-white"
              >
                <option value={30}>30 mins / day</option>
                <option value={45}>45 mins / day (Recommended)</option>
                <option value={60}>60 mins / day</option>
                <option value={90}>90 mins / day</option>
              </select>
            </div>
          </div>

          {/* Notification Checkboxes */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Campus Notification & Alert Channels</span>
            </h4>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyFeedback}
                  onChange={(e) => setNotifyFeedback(e.target.checked)}
                  className="rounded text-[#173B2F]"
                />
                <span>Instant alert when an anonymous feedback issue reaches <strong>Action Closed</strong></span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyLectures}
                  onChange={(e) => setNotifyLectures(e.target.checked)}
                  className="rounded text-[#173B2F]"
                />
                <span>Notify when new Anna University Unit video lectures are uploaded</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyPlacement}
                  onChange={(e) => setNotifyPlacement(e.target.checked)}
                  className="rounded text-[#173B2F]"
                />
                <span>Receive campus placement drive and internship notifications</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyHallTicket}
                  onChange={(e) => setNotifyHallTicket(e.target.checked)}
                  className="rounded text-[#173B2F]"
                />
                <span>Receive Anna University Semester Examination Hall Ticket releases</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#C49A55]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#C49A55]" />
                  <span>Save Profile Preferences</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

    </div>
  );
};


