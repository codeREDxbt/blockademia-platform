import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Home, 
  BookOpen, 
  Search, 
  ArrowLeft,
  AlertTriangle 
} from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <Card className="border border-border/50 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl font-heading">Page Not Found</CardTitle>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 py-4">
              <BlockademiaLogo className="w-8 h-8" />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blockademia
              </span>
            </div>

            {/* Error Code */}
            <div className="py-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
                404
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Oops! This learning path doesn't exist.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>

              <Button 
                onClick={() => navigate('/', { replace: true })}
                variant="outline"
                className="w-full"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>

              <Button 
                onClick={() => window.history.back()}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Help Text */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Looking for something specific? Try searching our{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-xs underline text-primary"
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const coursesSection = document.querySelector('#courses');
                      if (coursesSection) {
                        coursesSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  course catalog
                </Button>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div>
            <div className="text-lg font-bold text-primary">100+</div>
            <div className="text-xs text-muted-foreground">Courses</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">50k+</div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}