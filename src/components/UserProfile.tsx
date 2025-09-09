import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';
import ProfileSetup from './ProfileSetup';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import {
  User,
  BookOpen,
  Award,
  Clock,
  Settings,
  LogOut,
  ChevronDown,
  Trophy,
  Target,
  Shield
} from 'lucide-react';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleProfile = () => {
    setShowProfileEdit(true);
    setIsOpen(false);
  };

  const handleSettings = () => {
    alert('Settings page coming soon! Customize your learning experience.');
    setIsOpen(false);
  };

  const handleDashboard = () => {
    const dashboardSection = document.querySelector('#dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-auto px-2 hover:bg-primary/10">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-foreground">{user.name}</span>
              <span className="text-xs text-muted-foreground">Welcome back!</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0" align="end" side="bottom">
        {/* User Info Header */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/30">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-2 rounded-lg bg-card/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen className="w-3 h-3 text-primary" />
                <span className="font-bold text-sm">{user.coursesCompleted}</span>
              </div>
              <span className="text-xs text-muted-foreground">Courses</span>
            </div>
            <div className="text-center p-2 rounded-lg bg-card/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-accent" />
                <span className="font-bold text-sm">{user.totalHours}h</span>
              </div>
              <span className="text-xs text-muted-foreground">Learning</span>
            </div>
            <div className="text-center p-2 rounded-lg bg-card/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-3 h-3 text-secondary" />
                <span className="font-bold text-sm">{user.certificates}</span>
              </div>
              <span className="text-xs text-muted-foreground">Certificates</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDashboard} className="cursor-pointer">
            <Target className="mr-2 h-4 w-4" />
            <span>Learning Dashboard</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => { navigate('/'); setIsOpen(false); }} className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Browse Courses</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => { navigate('/certificates'); setIsOpen(false); }} className="cursor-pointer">
            <Award className="mr-2 h-4 w-4" />
            <span>My Certificates</span>
            {user.certificates > 0 && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {user.certificates}
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => { alert('Achievements coming soon!'); setIsOpen(false); }} className="cursor-pointer">
            <Trophy className="mr-2 h-4 w-4" />
            <span>Achievements</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          {user.provider === 'email' && (
            <DropdownMenuItem onClick={() => navigate('/reset-password')} className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>Change Password</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* Profile Edit Dialog */}
    <Dialog open={showProfileEdit} onOpenChange={setShowProfileEdit}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information and learning preferences.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className="p-0">
          <ProfileSetup 
            isEdit={true} 
            onComplete={() => setShowProfileEdit(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}