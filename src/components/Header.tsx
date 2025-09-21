import { User, Menu, X, BookOpen, LogIn, LogOut, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BlockademiaLogo from './BlockademiaLogo';
import UserProfile from './UserProfile';
import WalletConnect from './WalletConnect';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleStartLearning = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    logout();
  };

  const handleCoursesClick = () => {
    navigate('/courses');
  };

  const handleDashboardClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to dashboard section
      const dashboardSection = document.querySelector('#dashboard');
      if (dashboardSection) {
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to home and then scroll
      navigate('/', { replace: true });
      setTimeout(() => {
        const dashboardSection = document.querySelector('#dashboard');
        if (dashboardSection) {
          dashboardSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleRewardsClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to rewards section
      const rewardsSection = document.querySelector('#rewards');
      if (rewardsSection) {
        rewardsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to home and then scroll
      navigate('/', { replace: true });
      setTimeout(() => {
        const rewardsSection = document.querySelector('#rewards');
        if (rewardsSection) {
          rewardsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };



  return (
    <header className="glass sticky top-0 z-[100] border-b border-border backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <BlockademiaLogo size="md" className="text-primary" />
            <span className="text-lg sm:text-xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text px-[2px] py-[0px]">
              Blockademia
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 font-body px-[3px] py-[0px]">
            <button onClick={handleCoursesClick} className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group font-medium cursor-pointer px-2 py-1 mt-[0px] mr-[16px] mb-[0px] ml-[3px]">
              Courses
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
            </button>

            <button onClick={handleRewardsClick} className="text-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group font-medium cursor-pointer px-2 py-1 px-[6px] py-[4px]">
              Rewards
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
            </button>
            <button onClick={handleDashboardClick} className="text-foreground hover:text-secondary transition-all duration-300 hover:scale-105 relative group font-medium cursor-pointer px-2 py-1 px-[6px] py-[4px]">
              Dashboard
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
            </button>
            <button 
              onClick={() => navigate('/premium')} 
              className="text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105 relative group font-medium cursor-pointer flex items-center gap-1.5 px-2 py-1 px-[6px] py-[4px]"
            >
              <Crown className="w-4 h-4" />
              Premium
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
            </button>
            <button onClick={() => navigate('/about')} className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group font-medium cursor-pointer px-2 py-1 m-[0px] px-[6px] py-[4px]">
              About
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
            </button>
          </nav>

          {/* CTA Buttons / User Profile */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <>
                <WalletConnect />
                <UserProfile />
              </>
            ) : (
              <>
                <Button 
                  onClick={handleLogin}
                  variant="outline" 
                  size="sm"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 px-[12px] mt-[0px] mr-[16px] mb-[0px] ml-[10px] py-[0px]"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  onClick={handleStartLearning}
                  size="sm" 
                  className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold font-tech btn-pulse-glow transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary hover:text-accent transition-colors p-2 -mr-2 z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-background/95 backdrop-blur-lg border-b border-border z-[90] shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-1">
                <button 
                  onClick={() => { handleCoursesClick(); setIsMenuOpen(false); }} 
                  className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer text-left p-3 rounded-lg font-medium"
                >
                  Courses
                </button>

                <button 
                  onClick={() => { handleRewardsClick(); setIsMenuOpen(false); }} 
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer text-left p-3 rounded-lg font-medium"
                >
                  Rewards
                </button>
                <button 
                  onClick={() => { handleDashboardClick(); setIsMenuOpen(false); }} 
                  className="text-foreground hover:text-secondary hover:bg-secondary/10 transition-all duration-200 cursor-pointer text-left p-3 rounded-lg font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => { navigate('/premium'); setIsMenuOpen(false); }} 
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200 cursor-pointer text-left flex items-center gap-2 p-3 rounded-lg font-medium"
                >
                  <Crown className="w-4 h-4" />
                  Premium
                </button>
                <button 
                  onClick={() => { navigate('/about'); setIsMenuOpen(false); }} 
                  className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer text-left p-3 rounded-lg font-medium"
                >
                  About
                </button>
                
                {/* Mobile Actions Section */}
                <div className="pt-6 mt-6 border-t border-border space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 p-4 bg-card/60 rounded-xl border border-border/50">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{user?.user_metadata?.name}</div>
                          <div className="text-sm text-muted-foreground">{user?.email}</div>
                        </div>
                      </div>
                      <div className="w-full" onClick={() => setIsMenuOpen(false)}>
                        <WalletConnect />
                      </div>
                      <Button 
                        onClick={() => { handleDashboardClick(); setIsMenuOpen(false); }} 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground h-12"
                      >
                        Dashboard
                      </Button>
                      <Button 
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground h-12"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => { handleLogin(); setIsMenuOpen(false); }} 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground h-12"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                      <Button 
                        onClick={() => { handleStartLearning(); setIsMenuOpen(false); }} 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold h-12"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
