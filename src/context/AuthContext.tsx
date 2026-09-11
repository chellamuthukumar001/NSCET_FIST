import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { signInWithGoogle } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
  login: (email: string, password?: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  updateUserProfile: (updates: Partial<User>) => Promise<User | null>;
  logout: () => void;
  // Kept for backward compatibility
  switchRole?: (newRole: Role) => void;
  allDemoUsers?: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('campusiq_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          // Strictly enforce role even from saved state: only admincampusiq@gmail.com is ADMIN
          const cleanEmail = parsed.email.toLowerCase().trim();
          parsed.role = cleanEmail === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT';
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

  // Synchronize with database on initial mount if user exists
  useEffect(() => {
    if (currentUser?.email) {
      fetch(`/api/auth/user?email=${encodeURIComponent(currentUser.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setCurrentUser((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                ...data.data,
                // Strict enforcement: only admincampusiq@gmail.com is ADMIN
                role: prev.email.toLowerCase().trim() === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT',
              };
            });
          }
        })
        .catch(() => {
          // Backend or network temporarily unavailable, retain local state
        });
    }
  }, []);

  const login = async (email: string, _password?: string): Promise<User> => {
    const cleanEmail = email.toLowerCase().trim();
    // Strict role enforcement: Only admincampusiq@gmail.com is ADMIN
    const userRole: Role = cleanEmail === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT';
    const name = cleanEmail === 'admincampusiq@gmail.com' ? 'Administrator' : cleanEmail.split('@')[0];

    const userData: User = {
      id: 'usr_' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'),
      name,
      email: cleanEmail,
      role: userRole,
      departmentId: 'dept_cse',
      departmentName: 'Computer Science & Engineering',
      program: userRole === 'ADMIN' ? 'Administration' : 'B.E. Computer Science & Engineering',
      semester: userRole === 'ADMIN' ? 0 : 5,
      studentId: userRole === 'ADMIN' ? undefined : '921022104042',
      batch: '2022-2026',
    };

    // Save/Sync directly to MySQL database
    try {
      const res = await fetch('/api/auth/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          avatarUrl: userData.avatarUrl || null,
          departmentName: userData.departmentName,
          departmentId: userData.departmentId,
          program: userData.program,
          semester: userData.semester,
          studentId: userData.studentId,
          batch: userData.batch,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        userData.role = data.data.role;
        if (data.data.avatarUrl) userData.avatarUrl = data.data.avatarUrl;
        if (data.data.studentId) userData.studentId = data.data.studentId;
      }
    } catch (err) {
      console.warn('Could not sync user to MySQL DB:', err);
    }

    setCurrentUser(userData);
    return userData;
  };

  const loginWithGoogle = async (): Promise<User> => {
    const cred = await signInWithGoogle();
    const fbUser = cred.user;
    const cleanEmail = (fbUser.email || '').toLowerCase().trim();
    const name = fbUser.displayName || cleanEmail.split('@')[0] || 'Student';
    const photo = fbUser.photoURL || undefined;

    // Strict role enforcement: Only admincampusiq@gmail.com is ADMIN
    const userRole: Role = cleanEmail === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT';

    const userData: User = {
      id: `usr_${fbUser.uid}`,
      name,
      email: cleanEmail,
      role: userRole,
      avatarUrl: photo,
      departmentId: 'dept_cse',
      departmentName: 'Computer Science & Engineering',
      program: userRole === 'ADMIN' ? 'Administration' : 'B.E. Computer Science & Engineering',
      semester: userRole === 'ADMIN' ? 0 : 5,
      studentId: userRole === 'ADMIN' ? undefined : (fbUser.uid ? fbUser.uid.slice(-8).toUpperCase() : '921022104042'),
      batch: '2022-2026',
    };

    // Save/Sync directly to MySQL database
    try {
      const res = await fetch('/api/auth/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatarUrl: userData.avatarUrl || null,
          departmentName: userData.departmentName,
          departmentId: userData.departmentId,
          program: userData.program,
          semester: userData.semester,
          studentId: userData.studentId,
          batch: userData.batch,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        userData.role = data.data.role;
      }
    } catch (err) {
      console.warn('Could not sync user to MySQL DB:', err);
    }

    setCurrentUser(userData);
    return userData;
  };

  const updateUserProfile = async (updates: Partial<User>): Promise<User | null> => {
    if (!currentUser) return null;
    const updatedUser: User = {
      ...currentUser,
      ...updates,
      // Strictly enforce role cannot be spoofed
      role: currentUser.email.toLowerCase().trim() === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT',
    };

    setCurrentUser(updatedUser);

    try {
      await fetch('/api/auth/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          avatarUrl: updatedUser.avatarUrl || null,
          departmentName: updatedUser.departmentName,
          departmentId: updatedUser.departmentId,
          program: updatedUser.program,
          semester: updatedUser.semester,
          studentId: updatedUser.studentId,
          batch: updatedUser.batch,
        }),
      });
    } catch (err) {
      console.warn('Could not sync profile update to MySQL DB:', err);
    }

    return updatedUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('campusiq_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser ? currentUser.role : 'STUDENT',
        login,
        loginWithGoogle,
        updateUserProfile,
        logout,
        switchRole: () => {},
        allDemoUsers: [],
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
