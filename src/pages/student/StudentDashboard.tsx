import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MOCK_VIDEOS,
  MOCK_NOTIFICATIONS,
  MOCK_KNOWLEDGE_DOCUMENTS
} from '../../lib/mockDatabase';
import coursesData from '../../data/coursesData.json';
import { VideoCard } from '../../components/video/VideoCard';
import { KnowledgeDocument, ModularCourse } from '../../types';
import {
  Search,
  BookOpen,
  FileText,
  Video,
  Bell,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  Eye,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchVal, setSearchVal] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'COURSES' | 'DOCS' | 'VIDEOS' | 'NOTICES'>('ALL');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);

  // Admin Uploaded Modular Courses
  const adminCourses = (coursesData as unknown) as ModularCourse[];

  // Filtered Admin Documents
  const filteredDocs = useMemo(() => {
    return MOCK_KNOWLEDGE_DOCUMENTS.filter((doc) => {
      if (!searchVal.trim()) return true;
      const q = searchVal.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        doc.content.toLowerCase().includes(q)
      );
    });
  }, [searchVal]);

  // Filtered Admin Courses
  const filteredCourses = useMemo(() => {
    return adminCourses.filter((c) => {
      if (!searchVal.trim()) return true;
      const q = searchVal.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    });
  }, [adminCourses, searchVal]);

  // Filtered Admin Videos
  const filteredVideos = useMemo(() => {
    return MOCK_VIDEOS.filter((v) => {
      if (!searchVal.trim()) return true;
      const q = searchVal.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.subjectTitle.toLowerCase().includes(q) ||
        v.facultyName.toLowerCase().includes(q) ||
        v.departmentCode.toLowerCase().includes(q)
      );
    });
  }, [searchVal]);

  // Filtered Admin Notifications
  const filteredNotices = useMemo(() => {
    return MOCK_NOTIFICATIONS.filter((n) => {
      if (!searchVal.trim()) return true;
      const q = searchVal.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    });
  }, [searchVal]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Official Institutional Header - Clean Admin Information */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#20493B] to-[#101815] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#C49A55] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Published Academic Records • Semester {currentUser?.semester || 5}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Official Student Academic Portal
          </h1>

          <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
            Welcome, <strong>{currentUser?.name || 'Vignesh R.'}</strong>. Access verified institutional regulations, Anna University Regulation 2021 syllabi, curated department lectures, and administrative circulars uploaded by the Office of Academic Affairs.
          </p>

          {/* Real-time Admin Uploads Search */}
          <div className="pt-2 max-w-xl">
            <div className="relative flex items-center rounded-2xl bg-black/35 border border-white/20 p-1.5 focus-within:border-[#C49A55] transition-all">
              <Search className="w-4 h-4 text-white/60 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search admin courses, official documents, circulars & lectures..."
                className="w-full py-1.5 bg-transparent text-white placeholder-white/50 text-xs focus:outline-none"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal('')}
                  className="px-2.5 py-1 text-[11px] text-gray-300 hover:text-white cursor-pointer mr-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content Category Filter Navigation */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ALL'
                ? 'bg-[#173B2F] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>All Admin Uploads</span>
          </button>

          <button
            onClick={() => setActiveTab('DOCS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'DOCS'
                ? 'bg-[#173B2F] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Official Documents ({filteredDocs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('COURSES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'COURSES'
                ? 'bg-[#173B2F] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Curriculum Courses ({filteredCourses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('VIDEOS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'VIDEOS'
                ? 'bg-[#173B2F] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Department Lectures ({filteredVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('NOTICES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'NOTICES'
                ? 'bg-[#173B2F] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>Official Notices ({filteredNotices.length})</span>
          </button>
        </div>

        <span className="text-[11px] text-gray-500 font-medium shrink-0 hidden md:inline">
          Anna Univ. Reg 2021 Compliance
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: ADMIN UPLOADED INSTITUTIONAL DOCUMENTS & REGULATIONS           */}
      {/* ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'DOCS') && (
        <div className="space-y-4" id="admin-docs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Institutional Knowledge Base • Uploaded by Admin</span>
              </span>
              <h2 className="text-lg font-bold text-[#17201C]">
                Official College Regulations & Administrative Procedures
              </h2>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {filteredDocs.length} Verified Documents
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#173B2F]/30 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#173B2F]/10 text-[#173B2F] text-[11px] font-bold">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                      ✓ Admin Verified
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#17201C] group-hover:text-[#173B2F] transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {doc.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">
                    Updated {doc.lastUpdated}
                  </span>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C49A55]" />
                    <span>View Document</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: ADMIN APPROVED MODULAR CURRICULUM COURSES                      */}
      {/* ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'COURSES') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>Curriculum Catalog • Approved by Academic Affairs</span>
              </span>
              <h2 className="text-lg font-bold text-[#17201C]">
                Anna University Modular Engineering Courses (10 Tracks)
              </h2>
            </div>
            <Link
              to="/student/courses"
              className="text-xs font-semibold text-[#173B2F] hover:underline flex items-center gap-1"
            >
              <span>Explore All 10 Tracks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice(0, 6).map((c) => (
              <div
                key={c.id}
                className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={c.thumbnailUrl || 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80'}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#173B2F]/90 backdrop-blur-md text-white font-mono font-bold text-xs shadow">
                    {c.code}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#C49A55] text-black font-bold text-[10px] shadow">
                    {c.credits} Credits
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#C49A55] font-bold">
                      {c.department} &bull; Sem {c.semester}
                    </div>
                    <h3 className="text-sm font-bold text-[#17201C] mt-1 line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="text-gray-500 truncate max-w-[150px]">
                      <span className="font-semibold text-gray-700">{c.instructor}</span>
                    </div>
                    <Link
                      to={`/student/courses/${c.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <span>Study Track</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: ADMIN CURATED VIDEO LECTURES & REPOSITORY                      */}
      {/* ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'VIDEOS') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>Department Masterclasses • Uploaded by College Faculty</span>
              </span>
              <h2 className="text-lg font-bold text-[#17201C]">
                Official YouTube Engineering Lecture Sessions
              </h2>
            </div>
            <Link
              to="/student/videos"
              className="text-xs font-semibold text-[#173B2F] hover:underline flex items-center gap-1"
            >
              <span>View All Department Lectures</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.slice(0, 6).map((video) => (
              <VideoCard key={video.id} video={video} showProgress={false} />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: OFFICIAL ADMINISTRATIVE NOTICES & CIRCULARS                    */}
      {/* ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'NOTICES') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-rose-500" />
                <span>Official Circulars • Administrative Office</span>
              </span>
              <h2 className="text-lg font-bold text-[#17201C]">
                Published Institutional Announcements & Examination Orders
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotices.map((n) => (
              <div
                key={n.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C49A55] flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#17201C]">
                        {n.title}
                      </h4>
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Official Order
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {n.message}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-[11px] text-gray-400 font-mono">
                  <span>{n.timestamp}</span>
                  {n.link && (
                    <Link
                      to={n.link}
                      className="text-xs font-bold text-[#173B2F] hover:underline mt-1 inline-flex items-center gap-0.5"
                    >
                      <span>Open Link</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: FULL OFFICIAL DOCUMENT VIEWER                                      */}
      {/* ========================================================================= */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-[#173B2F] to-[#20493B] text-white flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] text-[#C49A55] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>NSCET Administration Official Knowledge Base</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Metadata Sub-bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
              <span className="font-semibold">Category: {selectedDoc.category}</span>
              <span className="font-mono text-[11px]">Last Updated: {selectedDoc.lastUpdated}</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                Anna Univ. Reg 2021 Validated
              </span>
            </div>

            {/* Modal Document Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line font-sans select-text">
              {selectedDoc.content}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Office of Academic Affairs • NSCET Theni
              </span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Document
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
