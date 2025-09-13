import { Github, Linkedin, Mail, ExternalLink, Loader2, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { useNavigate } from 'react-router-dom';

// Custom X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();

  const handleSocialClick = (platform: string) => {
    alert(`Connect with Blockademia on ${platform}! Follow us for the latest updates and tech insights.`);
  };

  const handleCourseClick = (course: string) => {
    alert(`Jump to "${course}" course! Start learning cutting-edge skills today.`);
  };

  const handlePlatformClick = (feature: string) => {
    alert(`Explore ${feature}! Advanced platform features coming soon.`);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error('Please enter your email address to join the Blockademia community!');
      return;
    }
    
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would make an API call here:
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // For now, we'll simulate a successful subscription
      toast.success(
        `🚀 Welcome to the revolution! Check your inbox for exclusive Blockademia updates and early access to new courses.`,
        {
          duration: 5000,
        }
      );
      
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleLegalClick = (page: string) => {
    alert(`${page} page coming soon! We're committed to transparency and user privacy.`);
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 border-2 border-accent-foreground rounded-sm"></div>
              </div>
              <span className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text">
                Blockademia
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              Empowering the next generation of developers with cutting-edge education, interactive learning, and blockchain-inspired achievements.
            </p>
            <div className="flex space-x-2">
              <Button onClick={() => handleSocialClick('X')} variant="outline" size="icon">
                <XIcon className="w-4 h-4" />
              </Button>
              <Button onClick={() => handleSocialClick('GitHub')} variant="outline" size="icon">
                <Github className="w-4 h-4" />
              </Button>
              <Button onClick={() => handleSocialClick('LinkedIn')} variant="outline" size="icon">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button onClick={() => handleSocialClick('Email')} variant="outline" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Courses */}
          <div className="space-y-4">
            <h4 className="font-heading">Courses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleCourseClick('Blockchain Fundamentals'); }} className="hover:text-foreground transition-colors cursor-pointer">Blockchain Fundamentals</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleCourseClick('Smart Contracts'); }} className="hover:text-foreground transition-colors cursor-pointer">Smart Contracts</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleCourseClick('Web Development'); }} className="hover:text-foreground transition-colors cursor-pointer">Web Development</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleCourseClick('Data Science'); }} className="hover:text-foreground transition-colors cursor-pointer">Data Science</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleCourseClick('AI & Machine Learning'); }} className="hover:text-foreground transition-colors cursor-pointer">AI & Machine Learning</a></li>
            </ul>
          </div>
          
          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-heading">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#dashboard" onClick={(e) => { e.preventDefault(); document.querySelector('#dashboard')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-foreground transition-colors cursor-pointer">Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePlatformClick('Certificates'); }} className="hover:text-foreground transition-colors cursor-pointer">Certificates</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePlatformClick('Wallet Integration'); }} className="hover:text-foreground transition-colors cursor-pointer">Wallet Integration</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePlatformClick('Progress Tracking'); }} className="hover:text-foreground transition-colors cursor-pointer">Progress Tracking</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePlatformClick('Community'); }} className="hover:text-foreground transition-colors cursor-pointer">Community</a></li>
              <li>
                <button 
                  onClick={() => navigate('/logo-download')} 
                  className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5 text-accent hover:text-accent/80"
                >
                  <Download className="w-3 h-3" />
                  Download Logo
                </button>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading">Stay Updated</h4>
            <p className="text-sm text-muted-foreground font-body">
              Get the latest courses and blockchain education news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                type="email"
                disabled={isSubscribing}
                className="bg-input-background border-border focus:border-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <Button 
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold font-tech disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join the Revolution'
                )}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button 
                onClick={() => navigate('/privacy-policy')} 
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/terms-of-service')} 
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => navigate('/cookie-policy')} 
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="text-accent font-medium">Powered by Web3</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-accent">Network: Online</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            © 2025 Blockademia. All rights reserved. Built with <span className="text-accent">⚡</span> for the next generation of developers.
          </div>
        </div>
      </div>
    </footer>
  );
}
