import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentNotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            Campus Circulars & Alerts
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Notifications ({unreadCount} unread)
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Official updates regarding exams, feedback resolution, placements, and lectures.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#173B2F] hover:bg-gray-50 shadow-sm cursor-pointer"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              n.read
                ? 'bg-white border-gray-200 opacity-75'
                : 'bg-white border-[#173B2F]/40 shadow-sm ring-1 ring-[#173B2F]/10'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${n.read ? 'bg-gray-300' : 'bg-rose-500'}`}
                  />
                  <h4 className="text-sm font-bold text-[#17201C]">{n.title}</h4>
                </div>
                <p className="text-xs text-[#66736C] leading-relaxed pl-4">{n.message}</p>
              </div>

              <span className="text-[11px] text-gray-400 shrink-0 font-mono">{n.timestamp}</span>
            </div>

            {n.link && (
              <div className="mt-3 pl-4">
                <Link
                  to={n.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#173B2F] hover:underline"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

