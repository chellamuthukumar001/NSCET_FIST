import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, Shield, Key } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { allDemoUsers, switchRole } = useAuth();

  return (
    <div className="space-y-8 pb-16">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
          Identity & Access Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
          Role-Based Access Control (RBAC)
        </h1>
        <p className="text-xs sm:text-sm text-[#66736C]">
          Manage institutional roles across students, faculty, heads of department, and administrators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allDemoUsers.map((u) => (
          <div
            key={u.id}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#173B2F] text-white flex items-center justify-center font-bold text-sm">
                {u.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#17201C]">{u.name}</h4>
                <div className="text-xs text-gray-500">{u.email}</div>
                <div className="text-[10px] text-[#C49A55] font-bold uppercase mt-0.5">
                  {u.role} • {u.departmentName}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                switchRole(u.role);
                alert(`Switched active session to ${u.name} (${u.role})`);
              }}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#173B2F] hover:text-white text-[#173B2F] text-xs font-bold transition-colors cursor-pointer"
            >
              Impersonate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

