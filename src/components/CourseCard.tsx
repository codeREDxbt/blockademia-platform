import { Clock, Users, Star, Play, Lock, Unlock, Zap, Trophy, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { Course } from '../data/courses';
import { useAuth } from '../contexts/AuthContext';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    id, 
    title, 
    description, 
    image, 
    duration, 
    students, 
    rating, 
    level, 
    price,
    premium 
  } = course;

  const isLocked = premium && (!user || !user.isPremium);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-accent text-accent-foreground';
      case 'Intermediate': return 'bg-secondary text-secondary-foreground';
      case 'Advanced': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handlePreviewCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/course/${id}`);
  };

  const handleEnrollStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/course/${id}`);
  };

  const handleCardClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div 
      className={`group relative glass border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:border-primary/50 cursor-pointer ${isLocked ? 'opacity-75' : ''}`}
      onClick={handleCardClick}
    >
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      
      {/* Premium Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <Lock className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
            <h4 className="font-semibold text-primary mb-2">Premium Course</h4>
            <p className="text-sm text-muted-foreground">Upgrade to access this course</p>
          </div>
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <Button 
            onClick={handlePreviewCourse}
            size="sm" 
            className="bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold btn-pulse-glow"
            disabled={isLocked}
          >
            <Play className="w-4 h-4 mr-2" />
            {isLocked ? 'Locked' : 'Preview Course'}
          </Button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-secondary text-secondary-foreground font-semibold">
            {course.tags[0]}
          </Badge>
        </div>
        
        {/* Price/Free Badge */}
        <div className="absolute top-3 right-3">
          {premium ? (
            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold animate-pulse">
              <Crown className="w-3 h-3 mr-1" />
              PREMIUM
            </Badge>
          ) : (
            <Badge className="bg-accent text-accent-foreground font-semibold animate-pulse">
              <Unlock className="w-3 h-3 mr-1" />
              FREE
            </Badge>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={`text-xs font-semibold ${getLevelColor(level)}`}>
            {level}
          </Badge>
          <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-semibold text-primary">{rating}</span>
          </div>
        </div>
        
        <h3 className="mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 font-semibold font-heading text-sm sm:text-base">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 font-body leading-relaxed">
          {description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-xs sm:text-sm mb-3 sm:mb-4 font-tech">
          <div className="flex items-center space-x-1 text-accent">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center space-x-1 text-secondary">
            <Users className="w-4 h-4" />
            <span className="font-medium">{students.toLocaleString()}</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={handleEnrollStart}
          className={`w-full font-semibold font-tech transition-all duration-300 hover:scale-105 ${
            isLocked 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground btn-pulse-glow'
          }`}
          variant="default"
          disabled={isLocked}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Upgrade Required
            </>
          ) : (
            <>
              <Trophy className="w-4 h-4 mr-2" />
              Start Learning
            </>
          )}
        </Button>
      </div>
      
      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}
