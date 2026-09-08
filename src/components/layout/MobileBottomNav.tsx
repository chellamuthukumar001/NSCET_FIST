import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Video, MessageSquareHeart, User, GraduationCap } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();

  const getRoleNavItems = () => {
    switch (role) {
      case 'FACULTY':
        return [
          { label: 'Overview', path: '/faculty', icon: LayoutDashboard },
          { label: 'Courses', path: '/faculty/courses', icon: Video },
          { label: 'Sync Video', path: '/faculty/content', icon: MessageSquareHeart },
          { label: 'Analytics', path: '/faculty/analytics', icon: User },
        ];
      case 'HOD':
        return [
          { label: 'Overview', path: '/hod', icon: LayoutDashboard },
          { label: 'Analytics', path: '/hod/analytics', icon: Video },
          { label: 'Courses', path: '/student/courses', icon: GraduationCap },
        ];
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return [
          { label: 'Overview', path: '/admin', icon: LayoutDashboard },
          { label: 'Courses', path: '/student/courses', icon: GraduationCap },
          { label: 'Knowledge', path: '/admin/knowledge', icon: Video },
          { label: 'Users', path: '/admin/users', icon: User },
        ];
      default:
        return [
          { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
          { label: 'Courses', path: '/student/courses', icon: GraduationCap },
          { label: 'Videos', path: '/student/videos', icon: Video },
          { label: 'Profile', path: '/student/profile', icon: User },
        ];
    }
  };

  const navItems = getRoleNavItems();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101815]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 flex items-center justify-around text-white">
      {/* Item 1 */}
      <Link
        to={navItems[0].path}
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl text-[10px] ${
          location.pathname === navItems[0].path ? 'text-[#C49A55] font-bold' : 'text-gray-400'
        }`}
      >
        <LayoutDashboard className="w-4 h-4 mb-0.5" />
        <span>{navItems[0].label}</span>
      </Link>

      {/* Item 2 */}
      <Link
        to={navItems[1].path}
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl text-[10px] ${
          location.pathname === navItems[1].path ? 'text-[#6FA9C9] font-bold' : 'text-gray-400'
        }`}
      >
        <Video className="w-4 h-4 mb-0.5" />
        <span>{navItems[1].label}</span>
      </Link>


      {/* Item 3 */}
      <Link
        to={navItems[2].path}
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl text-[10px] ${
          location.pathname === navItems[2].path ? 'text-[#6E7F45] font-bold' : 'text-gray-400'
        }`}
      >
        <MessageSquareHeart className="w-4 h-4 mb-0.5" />
        <span>{navItems[2].label}</span>
      </Link>

      {/* Item 4 */}
      <Link
        to={navItems[3].path}
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl text-[10px] ${
          location.pathname === navItems[3].path ? 'text-[#C49A55] font-bold' : 'text-gray-400'
        }`}
      >
        <User className="w-4 h-4 mb-0.5" />
        <span>{navItems[3].label}</span>
      </Link>
    </div>
  );
};

