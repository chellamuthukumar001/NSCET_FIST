import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  LayoutDashboard,
  Video,
  BookOpen,
  Bookmark,
  History,
  TrendingUp,
  Bot,
  Bell,
  User,
  Award,
  Sparkles,
  ChevronRight,
  GraduationCap,
  LogOut,
  Database,
  Users
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const AppSidebar: React.FC = () => {
  const { role, currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  const getNavGroups = (): NavGroup[] => {
    switch (role) {
      case 'FACULTY':
        return [
          {
            groupTitle: 'Instruction Core',
            items: [
              { label: 'Faculty Overview', path: '/faculty', icon: LayoutDashboard },
              { label: 'Assigned Courses', path: '/faculty/courses', icon: BookOpen },
              { label: 'Video Lecture Sync', path: '/faculty/content', icon: Video },
            ]
          },
          {
            groupTitle: 'Performance & Analytics',
            items: [
              { label: 'Class Analytics', path: '/faculty/analytics', icon: TrendingUp },
            ]
          }
        ];
      case 'HOD':
        return [
          {
            groupTitle: 'Department Leadership',
            items: [
              { label: 'Overview', path: '/hod', icon: LayoutDashboard },
              { label: 'Mastery Analytics', path: '/hod/analytics', icon: TrendingUp },
            ]
          }
        ];
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return [
          {
            groupTitle: 'Academic Operations',
            items: [
              { label: 'Academic Control', path: '/admin', icon: LayoutDashboard },
              { label: 'Video Hub Sync', path: '/admin/videos', icon: Video },
            ]
          },
          {
            groupTitle: 'Institutional Governance',
            items: [
              { label: 'Academic Knowledge', path: '/admin/knowledge', icon: Database },
              { label: 'Learners & Faculty', path: '/admin/users', icon: Users },
            ]
          }
        ];
      default: // STUDENT
        return [
          {
            groupTitle: 'Academic Core',
            items: [
              { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
              { label: 'Curated Video Hub', path: '/student/videos', icon: Video, badge: 'Sync' },
            ]
          },
          {
            groupTitle: 'Learning Workspace',
            items: [
              { label: 'Watch History', path: '/student/history', icon: History },
            ]
          },
          {
            groupTitle: 'Account & Notices',
            items: [
              {
                label: 'Notifications',
                path: '/student/notifications',
                icon: Bell,
                badge: unreadCount > 0 ? `${unreadCount}` : undefined
              },
              { label: 'My Profile', path: '/student/profile', icon: User },
            ]
          }
        ];
    }
  };

  const navGroups = getNavGroups();

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 z-30 hidden lg:flex flex-col bg-gradient-to-b from-[#09130F] via-[#0E1B15] to-[#070D0A] border-r border-white/10 text-white shadow-2xl overflow-hidden select-none">
      
      {/* Brand Header with Official NSCET Emblem */}
      <div className="p-3.5 border-b border-white/10 bg-[#173B2F]/60 backdrop-blur-xl shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 px-2 py-0.5 rounded-xl bg-white shadow-md border border-[#C49A55]/50 flex items-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/assets/nscet-college-logo.jpg"
              alt="NSCET Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-white">CAMPUS</span>
              <span className="text-base font-black text-[#6FA9C9]">IQ</span>
              <span className="text-[8px] font-mono font-bold bg-[#C49A55]/20 text-[#C49A55] px-1 py-0.2 rounded border border-[#C49A55]/30">
                2.0
              </span>
            </div>
            <span className="text-[9px] text-[#A2B6AC] tracking-wider uppercase font-semibold truncate">
              NSCET Theni &bull; CSE Dept
            </span>
          </div>
        </Link>
      </div>

      {/* User Status Capsule Card */}
      <div className="p-3 mx-3 mt-3 mb-1 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/10 flex items-center gap-3 shrink-0 transition-colors">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-[#C49A55]/60 shadow-sm shrink-0">
          {currentUser?.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 m-2.5 text-[#C49A55]" />
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0E1B15]" />
        </div>
        <div className="overflow-hidden min-w-0 flex-1">
          <div className="text-xs font-bold text-white truncate leading-tight">
            {currentUser?.name || 'Student User'}
          </div>
          <div className="text-[10px] text-[#A2B6AC] truncate mt-0.5">
            {currentUser?.departmentName || 'Computer Science'}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider bg-[#173B2F] text-[#C49A55] border border-[#6E7F45]/40">
              {role}
            </span>
            <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Categorized Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#A2B6AC]/70">
              {group.groupTitle}
            </div>
            {group.items.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C49A55]/20 via-[#173B2F]/40 to-transparent text-white font-bold border-l-4 border-[#C49A55] shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#C49A55]' : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span className="truncate">{link.label}</span>
                  </div>

                  {link.badge ? (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                        isActive
                          ? 'bg-[#C49A55] text-white border-white/20'
                          : link.badge === 'New' || link.badge === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-white/10 text-gray-300 border-white/10 group-hover:border-white/20'
                      }`}
                    >
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isActive ? 'opacity-100 text-[#C49A55]' : 'text-gray-500'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Footer Action Capsule */}
      <div className="p-3 border-t border-white/10 bg-[#070D0A]/70 flex items-center justify-between shrink-0">
        <div className="text-[10px] text-gray-400">
          <span className="text-[#C49A55] font-semibold">Anna Univ</span> &bull; Reg 2021
        </div>
        <button
          onClick={() => logout()}
          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

    </aside>
  );
};
