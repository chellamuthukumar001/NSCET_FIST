import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Video,
  BookOpen,
  Bookmark,
  History,
  TrendingUp,
  MessageSquareHeart,
  Bot,
  Bell,
  User,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Users,
  Database,
  Award,
  Sparkles,
  ChevronRight,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { role, currentUser } = useAuth();
  const location = useLocation();

  const getLinks = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
          { label: 'YouTube Learning', path: '/student/videos', icon: Video },
          { label: 'Subjects & Units', path: '/student/subjects', icon: BookOpen },
          { label: 'Bookmarks', path: '/student/bookmarks', icon: Bookmark },
          { label: 'Watch History', path: '/student/history', icon: History },
          { label: 'Learning Progress', path: '/student/progress', icon: TrendingUp },
          { label: 'AI Practice Quiz', path: '/student/quiz', icon: Award },
          { label: 'Student Voice (Feedback)', path: '/student/feedback', icon: MessageSquareHeart },
          { label: 'CampusIQ Copilot', path: '/student/assistant', icon: Bot },
          { label: 'Notifications', path: '/student/notifications', icon: Bell },
          { label: 'My Profile', path: '/student/profile', icon: User },
        ];
      case 'FACULTY':
        return [
          { label: 'Faculty Overview', path: '/faculty', icon: LayoutDashboard },
          { label: 'Assigned Courses', path: '/faculty/courses', icon: BookOpen },
          { label: 'Video Lecture Sync', path: '/faculty/content', icon: Video },
          { label: 'Class Analytics', path: '/faculty/analytics', icon: TrendingUp },
          { label: 'Faculty Copilot', path: '/faculty/assistant', icon: Sparkles },
        ];
      case 'HOD':
        return [
          { label: 'Department Overview', path: '/hod', icon: LayoutDashboard },
          { label: 'Department Analytics', path: '/hod/analytics', icon: TrendingUp },
          { label: 'Student Feedback Stream', path: '/hod/feedback', icon: MessageSquareHeart },
          { label: 'AI Health Reports', path: '/hod/reports', icon: FileText },
        ];
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return [
          { label: 'Campus Intelligence', path: '/admin', icon: LayoutDashboard },
          { label: 'Feedback Moderation', path: '/admin/moderation', icon: ShieldAlert },
          { label: 'Closed-Loop Issues', path: '/admin/closed-loop', icon: CheckCircle2 },
          { label: 'Knowledge Base (RAG)', path: '/admin/knowledge', icon: Database },
          { label: 'YouTube Channel Sync', path: '/admin/videos', icon: Video },
          { label: 'User Directory & RBAC', path: '/admin/users', icon: Users },
          { label: 'Audit & Compliance', path: '/admin/audit', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 z-30 hidden lg:flex flex-col bg-gradient-to-b from-[#101815] via-[#14201B] to-[#0D1311] border-r border-white/10 text-white shadow-2xl overflow-hidden select-none">
      
      {/* Brand Header with Official NSCET Emblem */}
      <div className="p-3.5 border-b border-white/10 bg-[#173B2F]/60 backdrop-blur-md shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 px-2 py-0.5 rounded-xl bg-white shadow-md border border-[#C49A55]/50 flex items-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/assets/nscet-college-logo.jpg"
              alt="NSCET Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-base font-black tracking-tight text-white">CAMPUS</span>
              <span className="text-base font-black text-[#6FA9C9]">IQ</span>
            </div>
            <span className="text-[9px] text-[#A2B6AC] tracking-wider uppercase font-semibold truncate">
              NSCET Theni • CSE Dept
            </span>
          </div>
        </Link>
      </div>

      {/* User Persona Profile Card */}
      <div className="p-3 mx-3 my-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shrink-0">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-[#C49A55]/60 shadow-sm shrink-0">
          {currentUser?.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 m-2.5 text-[#C49A55]" />
          )}
          {/* Online active dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#101815]" />
        </div>
        <div className="overflow-hidden min-w-0">
          <div className="text-xs font-bold text-white truncate leading-tight">
            {currentUser?.name}
          </div>
          <div className="text-[10px] text-[#A2B6AC] truncate mt-0.5">
            {currentUser?.departmentName || 'Computer Science'}
          </div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#173B2F] text-[#C49A55] border border-[#6E7F45]/40">
            {role}
          </span>
        </div>
      </div>

      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A2B6AC]">
          {role} Workspace
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-white/15 to-white/5 text-white font-bold border-l-4 border-[#C49A55] shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5 hover:translate-x-1'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#C49A55]' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#C49A55] shrink-0" />}
            </Link>
          );
        })}
      </div>

      {/* Institutional Accreditation Footer */}
      <div className="p-3 border-t border-white/10 bg-black/20 shrink-0 space-y-2">
        <div className="px-2 py-1.5 rounded-xl bg-[#173B2F]/40 border border-[#6E7F45]/30 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-[#C49A55] uppercase tracking-wider">
            <GraduationCap className="w-3 h-3" />
            <span>NSCET Theni</span>
          </div>
          <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
            AICTE Approved • Anna University
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-gray-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span>Public Portal Homepage</span>
        </Link>
      </div>

    </aside>
  );
};

