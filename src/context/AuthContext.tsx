import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../lib/mockDatabase';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
  switchRole: (newRole: Role) => void;
  login: (email: string, role: Role) => void;
  logout: () => void;
  allDemoUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('campusiq_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    // Default to Student Vignesh
    return MOCK_USERS[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campusiq_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campusiq_user');
    }
  }, [currentUser]);

  const switchRole = (newRole: Role) => {
    const matched = MOCK_USERS.find(u => u.role === newRole) || MOCK_USERS[0];
    setCurrentUser(matched);
  };

  const login = (email: string, role: Role) => {
    const matched = MOCK_USERS.find(u => u.role === role) || {
      id: 'user_custom',
      name: email.split('@')[0],
      email,
      role,
      departmentId: 'dept_cse',
      departmentName: 'Computer Science & Engineering',
    };
    setCurrentUser(matched);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser ? currentUser.role : 'STUDENT',
        switchRole,
        login,
        logout,
        allDemoUsers: MOCK_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
