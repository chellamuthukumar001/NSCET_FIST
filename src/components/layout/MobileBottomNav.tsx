import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCopilot } from '../../context/CopilotContext';
import {
  LayoutDashboard,
  Video,
  Sparkles,
  User,
  GraduationCap,
  TrendingUp,
  Database,
  Users
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { role } = useAuth();
  const { openCopilot } = useCopilot();
  const location = useLocation();

  const getRoleNavItems = () => {
    switch (role) {
      case 'FACULTY':
        return [
          { label: 'Overview', path: '/faculty', icon: LayoutDashboard },
          { label: 'Courses', path: '/faculty/courses', icon: GraduationCap },
          { label: 'Video Sync', path: '/faculty/content', icon: Video },
          { label: 'Analytics', path: '/faculty/analytics', icon: TrendingUp },
        ];
      case 'HOD':
        return [
          { label: 'Overview', path: '/hod', icon: LayoutDashboard },
          { label: 'Analytics', path: '/hod/analytics', icon: TrendingUp },
          { label: '10 Courses', path: '/student/courses', icon: GraduationCap },
          { label: 'Profile', path: '/student/profile', icon: User },
        ];
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return [
          { label: 'Control', path: '/admin', icon: LayoutDashboard },
          { label: '10 Courses', path: '/student/courses', icon: GraduationCap },
          { label: 'Knowledge', path: '/admin/knowledge', icon: Database },
          { label: 'Users', path: '/admin/users', icon: Users },
        ];
      default:
        return [
          { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
          { label: '10 Courses', path: '/student/courses', icon: GraduationCap },
          { label: 'Video Hub', path: '/student/videos', icon: Video },
          { label: 'Profile', path: '/student/profile', icon: User },
        ];
    }
  };

  const navItems = getRoleNavItems();
  const firstTwo = navItems.slice(0, 2);
  const lastTwo = navItems.slice(2, 4);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A120E]/95 backdrop-blur-2xl border-t border-white/10 px-3 pt-2 pb-3 flex items-center justify-around text-white shadow-[0_-10px_25px_rgba(0,0,0,0.6)]">
      {/* First Two Items */}
      {firstTwo.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl text-[10px] transition-all relative active:scale-95 ${
              isActive ? 'text-[#C49A55] font-black' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110 text-[#C49A55]' : ''}`} />
            <span className="tracking-tight leading-tight">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A55] mt-0.5 shadow-sm shadow-[#C49A55]" />
            )}
          </Link>
        );
      })}

      {/* Elevated Center Floating Action Button for AI Copilot */}
      <div className="relative -top-5 flex flex-col items-center">
        <button
          onClick={() => openCopilot()}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#173B2F] via-[#C49A55] to-[#D97736] p-0.5 shadow-xl shadow-black/80 flex items-center justify-center border-2 border-[#0A120E] cursor-pointer active:scale-90 transition-transform group"
          title="Ask CampusIQ Copilot"
          aria-label="Ask CampusIQ Copilot"
        >
          <div className="w-full h-full rounded-full bg-[#101E17] flex items-center justify-center group-hover:bg-[#173B2F] transition-colors">
            <Sparkles className="w-6 h-6 text-[#C49A55] animate-pulse" />
          </div>
        </button>
        <span className="text-[9px] font-bold tracking-wider text-[#C49A55] uppercase mt-0.5">Copilot</span>
      </div>

      {/* Last Two Items */}
      {lastTwo.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl text-[10px] transition-all relative active:scale-95 ${
              isActive ? 'text-[#C49A55] font-black' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110 text-[#C49A55]' : ''}`} />
            <span className="tracking-tight leading-tight">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A55] mt-0.5 shadow-sm shadow-[#C49A55]" />
            )}
          </Link>
        );
      })}
    </div>
  );
};
