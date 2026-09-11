import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { CopilotProvider } from './context/CopilotContext';
import { NotificationProvider } from './context/NotificationContext';

// Common Components
import { LoadingScreen } from './components/common/LoadingScreen';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { AppHeader } from './components/layout/AppHeader';
import { AppSidebar } from './components/layout/AppSidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';

// Core Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { LearningHubPage } from './pages/student/LearningHubPage';
import { VideoDetailPage } from './pages/student/VideoDetailPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Core Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVideosPage } from './pages/admin/AdminVideosPage';

// Layout Wrappers
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF8] text-[#17201C]">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

// RootRedirect enforces initial entry flow
const RootRedirect: React.FC = () => {
  const { currentUser, role } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={role === 'ADMIN' ? '/admin' : '/student'} replace />;
};

const AuthenticatedLayout: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F4F5F1] text-[#17201C] relative selection:bg-[#C49A55]/30">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 50% -10%, rgba(23, 59, 47, 0.07), transparent 70%),
            radial-gradient(ellipse 40% 40% at 90% 20%, rgba(196, 154, 85, 0.05), transparent 60%),
            radial-gradient(ellipse 50% 50% at 10% 85%, rgba(110, 127, 69, 0.04), transparent 70%)
          `,
        }}
      />

      {/* Desktop Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10 transition-all">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
          <Outlet />
        </main>
      </div>

      {/* Mobile Touch Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};

export function App() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <AuthProvider>
      <NotificationProvider>
        <CopilotProvider>
          {showLoading && (
            <LoadingScreen onComplete={() => setShowLoading(false)} />
          )}

          <BrowserRouter>
            <Routes>
              {/* Public Portal Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/landing" element={<LandingPage />} />
              </Route>

              {/* Authenticated Portal Routes */}
              <Route element={<AuthenticatedLayout />}>
                {/* Student Video Learning Routes */}
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/videos" element={<LearningHubPage />} />
                <Route path="/student/videos/:videoId" element={<VideoDetailPage />} />
                <Route path="/student/profile" element={<StudentProfilePage />} />

                {/* Admin Video Upload & Management Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/videos" element={<AdminVideosPage />} />

                {/* Legacy Role Fallbacks */}
                <Route path="/faculty" element={<Navigate to="/admin/videos" replace />} />
                <Route path="/hod" element={<Navigate to="/student" replace />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CopilotProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

