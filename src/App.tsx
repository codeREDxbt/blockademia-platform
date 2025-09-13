import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CoursesSection from './components/CoursesSection';
import ProgramsSection from './components/ProgramsSection';
import ProgressDashboard from './components/ProgressDashboard';
import RewardsSection from './components/RewardsSection';
import Footer from './components/Footer';
import BlockchainBackground from './components/BlockchainBackground';
import FloatingObjects from './components/FloatingObjects';
import CoursePreview from './components/CoursePreviewUpdated';
import AuthPage from './components/AuthPage';
import ProfileSetup from './components/ProfileSetup';
import PasswordReset from './components/PasswordReset';
import PasswordResetInfo from './components/PasswordResetInfo';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';
import MonadSetupGuide from './components/MonadSetupGuide';
import DevelopmentBanner from './components/DevelopmentBanner';
import PremiumPurchase from './components/PremiumPurchase';
import ComplianceCheck from './components/ComplianceCheck';
import EducationalContentOverview from './components/EducationalContentOverview';
import About from './components/About';
import LogoDownloader from './components/LogoDownloader';
import QuickLogo from './components/QuickLogo';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import CertificateManager from './components/CertificateManager';
import EmailConfirmation from './components/EmailConfirmation';
import SimpleMetaMaskTest from './components/SimpleMetaMaskTest';
import EmailConfirmationDebugger from './components/EmailConfirmationDebugger';
import CataloguePage from './components/CataloguePage';
import FullCourseCatalogue from './components/FullCourseCatalogue';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { Web3Provider } from './contexts/Web3Context';
import { Toaster } from './components/ui/sonner';

// Main App Content Component
function AppContent() {
  const { user, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
          {/* Debug info for production */}
          {import.meta.env.DEV && (
            <div className="text-xs text-gray-500 mt-4">
              <p>Environment: {import.meta.env.MODE}</p>
              <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show profile setup for new users who haven't completed their profile
  if (user && user.profile && !user.profile.profile_complete) {
    return <ProfileSetup />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <DevelopmentBanner />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CataloguePage />} />
        <Route path="/course/:courseId" element={<CoursePreview />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/reset-password/info" element={<PasswordResetInfo />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/monad-setup" element={<MonadSetupGuide />} />
        <Route path="/premium" element={<PremiumPurchase />} />
        <Route path="/compliance" element={<ComplianceCheck />} />
        <Route path="/educational-overview" element={<EducationalContentOverview />} />
        <Route path="/about" element={<About />} />
        <Route path="/logo-download" element={<LogoDownloader />} />
        <Route path="/quick-logo" element={<QuickLogo />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/certificates" element={<CertificateManager />} />
        <Route path="/confirm-email" element={<EmailConfirmation />} />
        <Route path="/metamask-test" element={<SimpleMetaMaskTest />} />

        {/* Handle legacy URLs and redirects */}
        <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
        <Route path="/preview_page" element={<Navigate to="/" replace />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

// Home Page Component
function HomePage() {
  return (
    <main>
      <Hero />
      <FullCourseCatalogue />
      <ProgressDashboard />
      <RewardsSection />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Web3Provider>
        <GameProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-foreground relative">
              {/* Blockchain-inspired background */}
              <BlockchainBackground />
              
              {/* Floating animated objects */}
              <FloatingObjects />
              
              {/* Main content with higher z-index */}
              <div className="relative z-10">
                <AppContent />
              </div>
              
              {/* Toast notifications */}
              <Toaster 
                position="bottom-right"
                theme="dark"
                toastOptions={{
                  style: {
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  },
                }}
              />
            </div>
          </Router>
        </GameProvider>
      </Web3Provider>
    </AuthProvider>
  );
}
