import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { GameProvider } from './contexts/GameContext';
import { Web3Provider } from './contexts/Web3Context';
import FixedHeader from './components/FixedHeader';
import Hero from './components/Hero';
import FullCourseCatalogue from './components/FullCourseCatalogue';
import ProgressDashboard from './components/ProgressDashboard';
import RewardsSection from './components/RewardsSection';
import Footer from './components/Footer';
import BlockchainBackground from './components/BlockchainBackground';
import FloatingObjects from './components/FloatingObjects';
import ScrollToTop from './components/ScrollToTop';
import AuthPage from './components/AuthPage';
import CataloguePage from './components/CataloguePage';
import CoursePreview from './components/CoursePreviewUpdated';
import PremiumPurchase from './components/PremiumPurchase';
import About from './components/About';
import WorkingProfileSetup from './components/WorkingProfileSetup';
import CertificateManager from './components/CertificateManager';
import { Toaster } from './components/ui/sonner';

// HomePage Component - Working Version
function HomePage() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const showAuthenticatedSections = !isLoading && user && user.email;

  return (
    <main>
      <Hero />
      <FullCourseCatalogue />
      {/* Only show authenticated sections for logged in users with complete data */}
      {showAuthenticatedSections && (
        <>
          <ProgressDashboard />
          <RewardsSection />
        </>
      )}
    </main>
  );
}

// Main App Content Component - With Fixed Header
function AppContent() {
  return (
    <>
      <FixedHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/courses" element={<CataloguePage />} />
        <Route path="/course/:courseId" element={<CoursePreview />} />
        <Route path="/premium" element={<PremiumPurchase />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile-setup" element={<WorkingProfileSetup />} />
        <Route path="/certificates" element={<CertificateManager />} />
        <Route path="*" element={<div className="p-8 text-white">404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
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
      </WalletProvider>
    </AuthProvider>
  );
}
