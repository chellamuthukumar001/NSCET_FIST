import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CopilotProvider } from './context/CopilotContext';
import { NotificationProvider } from './context/NotificationContext';

// Common Components
import { LoadingScreen } from './components/common/LoadingScreen';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { AppHeader } from './components/layout/AppHeader';
import { AppSidebar } from './components/layout/AppSidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { CopilotDrawer } from './components/copilot/CopilotDrawer';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { DepartmentsPage } from './pages/public/DepartmentsPage';
import { CoursesPage } from './pages/public/CoursesPage';
import { PublicLearningPage } from './pages/public/PublicLearningPage';
import { LoginPage } from './pages/public/LoginPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { LearningHubPage } from './pages/student/LearningHubPage';
import { VideoDetailPage } from './pages/student/VideoDetailPage';
import { SubjectsPage } from './pages/student/SubjectsPage';
import { BookmarksPage } from './pages/student/BookmarksPage';
import { WatchHistoryPage } from './pages/student/WatchHistoryPage';
import { LearningProgressPage } from './pages/student/LearningProgressPage';
import { StudentFeedbackPage } from './pages/student/StudentFeedbackPage';
import { StudentAssistantPage } from './pages/student/StudentAssistantPage';
import { StudentQuizPage } from './pages/student/StudentQuizPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyCoursesPage } from './pages/faculty/FacultyCoursesPage';
import { FacultyContentPage } from './pages/faculty/FacultyContentPage';
import { FacultyAnalyticsPage } from './pages/faculty/FacultyAnalyticsPage';
import { FacultyAssistantPage } from './pages/faculty/FacultyAssistantPage';

// HOD Pages
import { HodDashboard } from './pages/hod/HodDashboard';
import { HodAnalyticsPage } from './pages/hod/HodAnalyticsPage';
import { HodFeedbackPage } from './pages/hod/HodFeedbackPage';
import { HodReportsPage } from './pages/hod/HodReportsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminModerationPage } from './pages/admin/AdminModerationPage';
import { AdminClosedLoopPage } from './pages/admin/AdminClosedLoopPage';
import { AdminKnowledgePage } from './pages/admin/AdminKnowledgePage';
import { AdminVideosPage } from './pages/admin/AdminVideosPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAuditPage } from './pages/admin/AdminAuditPage';

// Layout Wrappers
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#17201C]">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <CopilotDrawer />
    </div>
  );
};

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F5F1] text-[#17201C] relative selection:bg-[#C49A55]/30">
      {/* Subtle Ambient Institutional Dashboard Background Canvas */}
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

      {/* Desktop Left Fixed Sidebar */}
      <AppSidebar />

      {/* Main Content Area - Flush with sidebar on desktop, eliminating the gap */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10 transition-all">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
          <Outlet />
        </main>
      </div>

      {/* Mobile Touch Bottom Nav */}
      <MobileBottomNav />

      {/* Global Slide-over Copilot Drawer */}
      <CopilotDrawer />
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
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/public-learning" element={<PublicLearningPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* Authenticated Portal Routes */}
              <Route element={<AuthenticatedLayout />}>
                {/* Student Routes */}
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/videos" element={<LearningHubPage />} />
                <Route path="/student/videos/:videoId" element={<VideoDetailPage />} />
                <Route path="/student/subjects" element={<SubjectsPage />} />
                <Route path="/student/bookmarks" element={<BookmarksPage />} />
                <Route path="/student/history" element={<WatchHistoryPage />} />
                <Route path="/student/progress" element={<LearningProgressPage />} />
                <Route path="/student/feedback" element={<StudentFeedbackPage />} />
                <Route path="/student/assistant" element={<StudentAssistantPage />} />
                <Route path="/student/quiz" element={<StudentQuizPage />} />
                <Route path="/student/notifications" element={<StudentNotificationsPage />} />
                <Route path="/student/profile" element={<StudentProfilePage />} />

                {/* Faculty Routes */}
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/faculty/courses" element={<FacultyCoursesPage />} />
                <Route path="/faculty/content" element={<FacultyContentPage />} />
                <Route path="/faculty/analytics" element={<FacultyAnalyticsPage />} />
                <Route path="/faculty/assistant" element={<FacultyAssistantPage />} />

                {/* HOD Routes */}
                <Route path="/hod" element={<HodDashboard />} />
                <Route path="/hod/analytics" element={<HodAnalyticsPage />} />
                <Route path="/hod/feedback" element={<HodFeedbackPage />} />
                <Route path="/hod/reports" element={<HodReportsPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/moderation" element={<AdminModerationPage />} />
                <Route path="/admin/closed-loop" element={<AdminClosedLoopPage />} />
                <Route path="/admin/knowledge" element={<AdminKnowledgePage />} />
                <Route path="/admin/videos" element={<AdminVideosPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/audit" element={<AdminAuditPage />} />
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

