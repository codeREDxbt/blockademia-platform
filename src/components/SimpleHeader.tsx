import { User, Menu, X, BookOpen, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SimpleHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleCoursesClick = () => {
    navigate('/courses');
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      const section = document.querySelector(`#${sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.querySelector(`#${sectionId}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">
              Blockademia
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={handleCoursesClick} 
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')} 
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('rewards')} 
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Rewards
            </button>
          </nav>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-5 h-5" />
              <span className="text-sm">{user?.user_metadata?.name || 'Demo User'}</span>
            </div>
            <Crown className="w-5 h-5 text-yellow-400" title="Premium User" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  handleCoursesClick();
                  setIsMenuOpen(false);
                }} 
                className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-left"
              >
                Courses
              </button>
              <button 
                onClick={() => {
                  scrollToSection('dashboard');
                  setIsMenuOpen(false);
                }} 
                className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-left"
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  scrollToSection('rewards');
                  setIsMenuOpen(false);
                }} 
                className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-left"
              >
                Rewards
              </button>
              <div className="flex items-center space-x-2 text-gray-300 pt-2 border-t border-gray-800">
                <User className="w-5 h-5" />
                <span className="text-sm">{user?.user_metadata?.name || 'Demo User'}</span>
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}