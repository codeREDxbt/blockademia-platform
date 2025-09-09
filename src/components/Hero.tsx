import { Button } from './ui/button';
import { Play, BookOpen, Users, Award, Zap, Rocket, TrendingUp, GitBranch, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLaunchLearning = () => {
    if (isAuthenticated) {
      // If logged in, show courses
      const coursesSection = document.querySelector('#courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not logged in, go to auth
      navigate('/auth');
    }
  };

  const handleExploreCourses = () => {
    const coursesSection = document.querySelector('#courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-12 sm:py-20 px-3 sm:px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left z-10 relative">
            <div className="flex flex-col items-center lg:items-start gap-3 mb-4 sm:mb-6">
              {/* New Feature Announcement */}

              
              <div className="inline-flex items-center space-x-2 glass px-3 sm:px-4 py-2 rounded-full border border-primary/30">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-accent font-medium font-code tracking-wide">Free • Accessible • AI-Powered</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text gradient-animate font-heading tracking-tight text-[32px] sm:text-[48px] lg:text-[64px] not-italic font-bold">
                Code Your Future With
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent font-code tracking-wider neon-text transform hover:scale-105 transition-transform duration-300 inline-block text-[32px] sm:text-[48px] lg:text-[64px] font-bold"> Blockademia</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 text-center lg:text-left font-body leading-relaxed">
              Master cutting-edge technologies with interactive courses, earn crypto rewards, and get blockchain-verified certificates that actually matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handleLaunchLearning}
                size="lg" 
                className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-bold font-tech btn-pulse-glow transition-all duration-300 hover:scale-105"
              >
                <Rocket className="w-5 h-5 mr-2" />
                {isAuthenticated ? 'Continue Learning Journey' : 'Launch Learning Journey'}
              </Button>
              <Button 
                onClick={handleExploreCourses}
                variant="outline" 
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 mt-8 sm:mt-12">
              <div className="text-center group">
                <div className="flex items-center space-x-1 text-lg sm:text-2xl mb-1 group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  <span className="text-primary font-bold">50K+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Coders</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center space-x-1 text-lg sm:text-2xl mb-1 group-hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-accent font-bold">200+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Live Courses</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center space-x-1 text-lg sm:text-2xl mb-1 group-hover:scale-110 transition-transform">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  <span className="text-secondary font-bold">10K+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Certificates</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-3xl transform rotate-6 animate-pulse"></div>
              <div className="relative glass border border-primary/30 rounded-2xl p-8 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1733412505442-36cfa59a4240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMHNjcmVlbiUyMGRhcmt8ZW58MXx8fHwxNzU3MjU0MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Code Programming Screen"
                  className="w-full h-64 object-cover rounded-xl"
                />
                
                {/* Floating Course Cards */}
                <div className="absolute -top-4 -right-4 glass border border-accent/30 rounded-lg p-3 shadow-lg animate-bounce">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-accent font-semibold">NFT Earned!</p>
                      <p className="text-xs text-muted-foreground">Web3 Master</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 glass border border-secondary/30 rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center animate-pulse">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-semibold">Progress: 87%</p>
                      <p className="text-xs text-muted-foreground">React Mastery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}