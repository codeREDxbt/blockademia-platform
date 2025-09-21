import { User, Menu, X, BookOpen, LogIn, LogOut, Crown, ChevronDown, Settings, Award, BarChart3, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import StaticBlockademiaLogo from './StaticBlockademiaLogo';
import WalletButton from './WalletButton';

// Enhanced User Profile with Dropdown
function UserProfileDropdown() {
  const { user, logout } = useAuth();
  const { isConnected, address, walletType } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/auth');
  };

  const userStats = {
    coursesCompleted: 12,
    totalPoints: 2450,
    currentStreak: 7,
    certificates: 5
  };

  const getAuthMethodDisplay = () => {
    if (user?.auth_method === 'wallet' && isConnected) {
      const walletIcon = walletType === 'metamask' ? '🦊' : walletType === 'trust' ? '🛡️' : '📱';
      return `${walletIcon} Wallet`;
    }
    return 'Demo Mode';
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={handleProfileClick}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-foreground">{user?.user_metadata?.name || 'Demo User'}</div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Crown className="w-3 h-3 mr-1 text-yellow-400" />
            Premium • {getAuthMethodDisplay()}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            {/* User Info Header */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{user?.user_metadata?.name || 'Demo User'}</div>
                  <div className="text-sm text-muted-foreground">{user?.email || 'demo@blockademia.com'}</div>
                  <div className="flex items-center mt-1">
                    <Crown className="w-3 h-3 mr-1 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-medium">Premium Member</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-4 grid grid-cols-2 gap-3 border-b border-border">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{userStats.coursesCompleted}</div>
                <div className="text-xs text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{userStats.totalPoints}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-secondary">{userStats.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">{userStats.certificates}</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => {
                  navigate('/profile-setup');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Profile Settings</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/certificates');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-left"
              >
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">My Certificates</span>
              </button>
              
              <button
                onClick={() => {
                  const dashboardSection = document.querySelector('#dashboard');
                  if (dashboardSection) {
                    dashboardSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-left"
              >
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Learning Progress</span>
              </button>

              <div className="border-t border-border my-2"></div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-destructive/10 transition-colors text-left text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function FixedHeader() {
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

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const handleCoursesClick = () => {
    navigate('/courses');
  };

  const handleDashboardClick = () => {
    if (location.pathname === '/') {
      const dashboardSection = document.querySelector('#dashboard');
      if (dashboardSection) {
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
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
      const rewardsSection = document.querySelector('#rewards');
      if (rewardsSection) {
        rewardsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
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
            <StaticBlockademiaLogo size="md" className="text-primary" />
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
                <WalletButton variant="outline" size="sm" />
                <UserProfileDropdown />
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
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  handleCoursesClick();
                  setIsMenuOpen(false);
                }} 
                className="text-foreground hover:text-primary transition-colors font-medium text-left"
              >
                Courses
              </button>
              <button 
                onClick={() => {
                  handleRewardsClick();
                  setIsMenuOpen(false);
                }} 
                className="text-foreground hover:text-accent transition-colors font-medium text-left"
              >
                Rewards
              </button>
              <button 
                onClick={() => {
                  handleDashboardClick();
                  setIsMenuOpen(false);
                }} 
                className="text-foreground hover:text-secondary transition-colors font-medium text-left"
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  navigate('/premium');
                  setIsMenuOpen(false);
                }} 
                className="text-primary hover:text-primary/80 transition-colors font-medium text-left flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Premium
              </button>
              <button 
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }} 
                className="text-foreground hover:text-primary transition-colors font-medium text-left"
              >
                About
              </button>
              
              {isAuthenticated ? (
                <div className="pt-3 border-t border-border">
                  <UserProfileDropdown />
                </div>
              ) : (
                <div className="pt-3 border-t border-border space-y-2">
                  <Button 
                    onClick={() => {
                      handleLogin();
                      setIsMenuOpen(false);
                    }}
                    variant="outline" 
                    size="sm"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}