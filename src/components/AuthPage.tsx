import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { Button } from './ui/button';
import { User, Crown } from 'lucide-react';
import StaticBlockademiaLogo from './StaticBlockademiaLogo';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (!isLoading && user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleDemoLogin = () => {
    // The demo user will be automatically set by the AuthContext on page reload
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-background to-secondary flex items-center justify-center">
        <div className="animate-pulse">
          <StaticBlockademiaLogo size="xl" className="text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl border border-primary/20 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <StaticBlockademiaLogo size="xl" className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Blockademia</h1>
            <p className="text-muted-foreground">Experience blockchain education like never before</p>
          </div>

          {/* Demo Login */}
          <div className="space-y-4">
            <Button
              onClick={handleDemoLogin}
              className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold btn-pulse-glow transition-all duration-300 hover:scale-105 py-3"
              size="lg"
            >
              <User className="w-5 h-5 mr-2" />
              Continue as Demo User
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span>Premium Demo Account Includes:</span>
              </div>
              <ul className="text-xs space-y-1">
                <li>• 12 Completed Courses</li>
                <li>• 2,450 Learning Points</li>
                <li>• 5 Certificates Earned</li>
                <li>• 7-Day Learning Streak</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>This is a demo environment for showcasing Blockademia's features</p>
          </div>
        </div>
      </div>
    </div>
  );
}