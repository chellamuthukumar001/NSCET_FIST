import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Video,
  User,
  GraduationCap,
  TrendingUp,
  Database,
  Users
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();

  const getRoleNavItems = () => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return [
          { label: 'Overview', path: '/admin', icon: LayoutDashboard },
          { label: 'Upload Video', path: '/admin/videos', icon: Video },
          { label: 'Student View', path: '/student', icon: GraduationCap },
        ];
      default:
        return [
          { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
          { label: 'Video Hub', path: '/student/videos', icon: Video },
          { label: 'Profile', path: '/student/profile', icon: User },
        ];
    }
  };

  const navItems = getRoleNavItems();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A120E]/95 backdrop-blur-2xl border-t border-white/10 px-3 pt-2 pb-3 flex items-center justify-around text-white shadow-[0_-10px_25px_rgba(0,0,0,0.6)]">
      {navItems.map((item) => {
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
