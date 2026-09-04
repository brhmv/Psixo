import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PsychologistsPage } from './pages/PsychologistsPage';
import { PsychologistDetailPage } from './pages/PsychologistDetailPage';
import { SessionBookingPage } from './pages/SessionBookingPage';
import { WebinarsPage } from './pages/WebinarsPage';
import { WebinarDetailPage } from './pages/WebinarDetailPage';
import { WebinarRegistrationPage } from './pages/WebinarRegistrationPage';
import { LiveWebinarRoomPage } from './pages/LiveWebinarRoomPage';
import { TrainingsPage } from './pages/TrainingsPage';
import { TrainingDetailPage } from './pages/TrainingDetailPage';
import { TrainingRegistrationPage } from './pages/TrainingRegistrationPage';
import { CoursePlayerPage } from './pages/CoursePlayerPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { GlobalSearchPage } from './pages/GlobalSearchPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ForPsychologistsPage } from './pages/ForPsychologistsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PricingPage } from './pages/PricingPage';

// Client Dashboard Pages
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage';
import { DashboardFindPsychologistsPage } from './pages/dashboard/DashboardFindPsychologistsPage';
import { DashboardSessionsPage } from './pages/dashboard/DashboardSessionsPage';
import { DashboardSessionDetailPage } from './pages/dashboard/DashboardSessionDetailPage';
import { DashboardWebinarsPage } from './pages/dashboard/DashboardWebinarsPage';
import { DashboardWebinarDetailPage } from './pages/dashboard/DashboardWebinarDetailPage';
import { DashboardTrainingsPage } from './pages/dashboard/DashboardTrainingsPage';
import { DashboardCoursePlayerPage } from './pages/dashboard/DashboardCoursePlayerPage';
import { DashboardCertificatesPage } from './pages/dashboard/DashboardCertificatesPage';
import { DashboardCertificateDetailPage } from './pages/dashboard/DashboardCertificateDetailPage';
import { DashboardFavoritesPage } from './pages/dashboard/DashboardFavoritesPage';
import { DashboardMessagesPage } from './pages/dashboard/DashboardMessagesPage';
import { DashboardPaymentsPage } from './pages/dashboard/DashboardPaymentsPage';
import { DashboardProfilePage } from './pages/dashboard/DashboardProfilePage';
import { DashboardSettingsPage } from './pages/dashboard/DashboardSettingsPage';

// Role Dashboards
import { PsychologistLayout } from './layouts/PsychologistLayout';
import { PsychologistDashboardPage } from './pages/psychologist/PsychologistDashboardPage';
import { PsychologistProfilePage } from './pages/psychologist/PsychologistProfilePage';
import { PsychologistSessionsPage } from './pages/psychologist/PsychologistSessionsPage';
import { PsychologistCalendarPage } from './pages/psychologist/PsychologistCalendarPage';
import { PsychologistClientsPage } from './pages/psychologist/PsychologistClientsPage';
import { PsychologistWebinarsPage } from './pages/psychologist/PsychologistWebinarsPage';
import { PsychologistCreateWebinarPage } from './pages/psychologist/PsychologistCreateWebinarPage';
import { PsychologistTrainingsPage } from './pages/psychologist/PsychologistTrainingsPage';
import { PsychologistCreateTrainingPage } from './pages/psychologist/PsychologistCreateTrainingPage';
import { PsychologistReviewsPage } from './pages/psychologist/PsychologistReviewsPage';
import { PsychologistEarningsPage } from './pages/psychologist/PsychologistEarningsPage';
import { PsychologistAnalyticsPage } from './pages/psychologist/PsychologistAnalyticsPage';
import { PsychologistMessagesPage } from './pages/psychologist/PsychologistMessagesPage';
import { PsychologistNotificationsPage } from './pages/psychologist/PsychologistNotificationsPage';
import { PsychologistSettingsPage } from './pages/psychologist/PsychologistSettingsPage';
import { AdminPanelPage } from './pages/admin/AdminPanelPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Website Routes (Navbar + Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/psixoloqlar" element={<PsychologistsPage />} />
          <Route path="/psixoloqlar/:id" element={<PsychologistDetailPage />} />
          <Route path="/seans/rezervasiya" element={<SessionBookingPage />} />
          
          <Route path="/vebinarlar" element={<WebinarsPage />} />
          <Route path="/vebinarlar/qeydiyyat" element={<WebinarRegistrationPage />} />
          <Route path="/vebinarlar/:id" element={<WebinarDetailPage />} />
          <Route path="/vebinarlar/:id/qeydiyyat" element={<WebinarRegistrationPage />} />
          <Route path="/vebinarlar/:id/canli" element={<LiveWebinarRoomPage />} />

          <Route path="/telimler" element={<TrainingsPage />} />
          <Route path="/telimler/qeydiyyat" element={<TrainingRegistrationPage />} />
          <Route path="/telimler/:id" element={<TrainingDetailPage />} />
          <Route path="/telimler/:id/qeydiyyat" element={<TrainingRegistrationPage />} />
          <Route path="/telimler/:id/dersler" element={<CoursePlayerPage />} />

          <Route path="/meqaleler" element={<ArticlesPage />} />
          <Route path="/meqaleler/:id" element={<ArticleDetailPage />} />

          <Route path="/axtaris" element={<GlobalSearchPage />} />
          <Route path="/daxil-ol" element={<LoginPage />} />
          <Route path="/qeydiyyat" element={<RegisterPage />} />
          
          <Route path="/haqqimizda" element={<AboutPage />} />
          <Route path="/nece-isleyir" element={<HowItWorksPage />} />
          <Route path="/psixoloqlar-ucun" element={<ForPsychologistsPage />} />
          <Route path="/elaqe" element={<ContactPage />} />
          <Route path="/qiymetler" element={<PricingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/tez-tez-verilen-suallar" element={<FaqPage />} />
        </Route>

        {/* User / Client Dashboard Routes (Dashboard Sidebar + No Public Navbar) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="psixoloqlar" element={<DashboardFindPsychologistsPage />} />
          <Route path="seanslar" element={<DashboardSessionsPage />} />
          <Route path="seanslar/:id" element={<DashboardSessionDetailPage />} />
          <Route path="vebinarlar" element={<DashboardWebinarsPage />} />
          <Route path="vebinarlar/:id" element={<DashboardWebinarDetailPage />} />
          <Route path="telimler" element={<DashboardTrainingsPage />} />
          <Route path="telimler/:id" element={<DashboardCoursePlayerPage />} />
          <Route path="sertifikatlar" element={<DashboardCertificatesPage />} />
          <Route path="sertifikatlar/:id" element={<DashboardCertificateDetailPage />} />
          <Route path="secilmisler" element={<DashboardFavoritesPage />} />
          <Route path="mesajlar" element={<DashboardMessagesPage />} />
          <Route path="odenisler" element={<DashboardPaymentsPage />} />
          <Route path="profil" element={<DashboardProfilePage />} />
          <Route path="tenzimlemeler" element={<DashboardSettingsPage />} />
        </Route>

        {/* Specialist Psychologist Portal */}
        <Route path="/psixoloq" element={<PsychologistLayout />}>
          <Route index element={<Navigate to="/psixoloq/dashboard" replace />} />
          <Route path="dashboard" element={<PsychologistDashboardPage />} />
          <Route path="profil" element={<PsychologistProfilePage />} />
          <Route path="seanslar" element={<PsychologistSessionsPage />} />
          <Route path="teqvim" element={<PsychologistCalendarPage />} />
          <Route path="musteriler" element={<PsychologistClientsPage />} />
          <Route path="vebinarlar" element={<PsychologistWebinarsPage />} />
          <Route path="vebinarlar/yeni" element={<PsychologistCreateWebinarPage />} />
          <Route path="telimler" element={<PsychologistTrainingsPage />} />
          <Route path="telimler/yeni" element={<PsychologistCreateTrainingPage />} />
          <Route path="reyler" element={<PsychologistReviewsPage />} />
          <Route path="gelirler" element={<PsychologistEarningsPage />} />
          <Route path="analitika" element={<PsychologistAnalyticsPage />} />
          <Route path="mesajlar" element={<PsychologistMessagesPage />} />
          <Route path="bildirisler" element={<PsychologistNotificationsPage />} />
          <Route path="tenzimlemeler" element={<PsychologistSettingsPage />} />
        </Route>
        
        {/* Admin Dedicated Portal */}
        <Route path="/admin" element={<AdminPanelPage />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
