import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../lib/mockDatabase';
import { signInWithGoogle } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
  switchRole: (newRole: Role) => void;
  login: (email: string, role: Role) => void;
  loginWithGoogle: (targetRole?: Role) => Promise<User>;
  logout: () => void;
  allDemoUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('campusiq_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.role === 'STUDENT' || parsed.role === 'ADMIN' || parsed.role === 'SUPER_ADMIN')) {
          return parsed;
        }
      } catch (_) {}
    }
    // Return null when unauthenticated so user starts at login page
    return null;
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

  const loginWithGoogle = async (targetRole: Role = 'STUDENT'): Promise<User> => {
    const cred = await signInWithGoogle();
    const fbUser = cred.user;
    const email = fbUser.email || 'student@nscet.org';
    const name = fbUser.displayName || email.split('@')[0];

    const newUser: User = {
      id: `google_${fbUser.uid}`,
      name,
      email,
      role: targetRole,
      departmentId: 'dept_cse',
      departmentName: 'Computer Science & Engineering',
    };

    setCurrentUser(newUser);
    return newUser;
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
        loginWithGoogle,
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
