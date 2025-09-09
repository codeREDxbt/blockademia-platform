import { Award, BookOpen, Clock, TrendingUp, Zap, Target, Star, Coins, Trophy, Flame, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';

export default function ProgressDashboard() {
  const { userProgress, getOverallProgress, getCourseProgress, completeCourse } = useGame();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock course data - in real app, this would come from courses context/database
  const mockCourses = [
    { id: 'blockchain-fundamentals', name: 'Blockchain Fundamentals', category: 'Blockchain' },
    { id: 'smart-contracts', name: 'Smart Contract Development', category: 'Blockchain' },
    { id: 'react-masterclass', name: 'React Masterclass', category: 'Web Development' },
    { id: 'python-data-science', name: 'Python Data Science', category: 'Programming' },
    { id: 'solana-fellowship', name: 'Solana Fellowship', category: 'Advanced' }
  ];

  // Get progress data for enrolled courses
  const getProgressData = () => {
    if (!userProgress) return [];
    
    return mockCourses
      .map(course => {
        const progress = getCourseProgress(course.id);
        return progress ? {
          ...course,
          progress: progress.progress,
          timeSpent: `${Math.floor(progress.progress / 10)}h`,
          status: progress.completed ? 'Completed' : progress.progress > 0 ? 'In Progress' : 'Not Started',
          xpEarned: progress.xpEarned,
          lastAccessed: progress.lastAccessed
        } : null;
      })
      .filter(Boolean)
      .slice(0, 5); // Show top 5 courses
  };

  const progressData = getProgressData();

  if (!isAuthenticated) {
    return (
      <section id="dashboard" className="py-12 sm:py-16 px-3 sm:px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-heading">
              Your Learning <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent neon-text font-tech">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed text-sm sm:text-base px-4 sm:px-0 mb-8">
              Sign in to track your progress with our gamified learning system featuring XP, levels, and blockchain rewards.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg" 
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate"
            >
              Sign In to Start Your Journey
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-12 sm:py-16 px-3 sm:px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-heading">
            Your Learning <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent neon-text font-tech">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed text-sm sm:text-base px-4 sm:px-0">
            Track your progress with our gamified learning system. Earn XP, level up, and collect BLOCK tokens!
          </p>
        </div>

        {/* Enhanced Progress Tracker */}
        <ProgressTracker />

        {/* Level Progress Bar */}
        <Card className="mb-8 glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Level {userProgress?.level || 1} Progress
                </h3>
                <p className="text-sm text-muted-foreground">
                  {userProgress?.xpToNextLevel || 1000} XP to next level
                </p>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {userProgress?.xp || 0} / {((userProgress?.xp || 0) + (userProgress?.xpToNextLevel || 1000))} XP
              </Badge>
            </div>
            <Progress 
              value={userProgress ? (userProgress.xp / (userProgress.xp + userProgress.xpToNextLevel)) * 100 : 0} 
              className="h-4 mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Level {userProgress?.level || 1}</span>
              <span>Level {(userProgress?.level || 1) + 1}</span>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Course Progress */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-heading">
                  <BookOpen className="w-5 h-5" />
                  <span>Course Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {progressData.length > 0 ? (
                  <div className="space-y-6">
                    {progressData.map((course, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium font-heading">{course.name}</h4>
                            <p className="text-xs text-muted-foreground">{course.category}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={course.status === 'Completed' ? 'default' : course.status === 'In Progress' ? 'secondary' : 'outline'}
                              className={course.status === 'Completed' ? 'bg-accent hover:bg-accent/80' : ''}
                            >
                              {course.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{course.progress}%</span>
                          </div>
                        </div>
                        
                        {/* Enhanced blockchain-inspired progress bar */}
                        <div className="relative">
                          <Progress value={course.progress} className="h-3" />
                          {/* Block markers with chain effect */}
                          <div className="absolute inset-0 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="relative" style={{ marginLeft: i === 0 ? '0' : 'calc(25% - 8px)' }}>
                                <div
                                  className={`w-4 h-4 border-2 border-background rounded-sm transition-all duration-300 ${
                                    (i + 1) * 20 <= course.progress 
                                      ? 'bg-gradient-to-r from-accent to-primary shadow-lg shadow-accent/25' 
                                      : 'bg-muted'
                                  }`}
                                />
                                {/* Chain connection */}
                                {i < 4 && (
                                  <div 
                                    className={`absolute top-1/2 left-4 w-[calc(25vw/5-16px)] h-0.5 transition-all duration-300 ${
                                      (i + 1) * 20 < course.progress 
                                        ? 'bg-gradient-to-r from-accent to-primary' 
                                        : 'bg-muted'
                                    }`}
                                    style={{ transform: 'translateY(-50%)' }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.timeSpent} completed</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-4 h-4 text-accent" />
                              <span>{course.xpEarned} XP earned</span>
                            </div>
                          </div>
                          <span>
                            {course.status === 'Completed' ? 'Certificate earned! 🏆' : 
                             course.status === 'In Progress' ? 'Keep going! 💪' : 
                             'Start learning! 🚀'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Courses Started Yet</h3>
                    <p className="text-muted-foreground mb-4">Start your first course to see your progress here!</p>
                    <Button 
                      onClick={() => {
                        const coursesSection = document.querySelector('#courses');
                        if (coursesSection) {
                          coursesSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                    >
                      Browse Courses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Learning Analytics */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="text-center glass">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-accent mb-2 font-tech">
                    {getOverallProgress()}%
                  </div>
                  <p className="text-sm text-muted-foreground font-body">Overall Progress</p>
                </CardContent>
              </Card>
              <Card className="text-center glass">
                <CardContent className="pt-6">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary mb-2 font-tech">
                    {Math.floor((userProgress?.totalXP || 0) / 20)}h
                  </div>
                  <p className="text-sm text-muted-foreground font-body">Learning Time</p>
                </CardContent>
              </Card>
              <Card className="text-center glass">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-secondary mb-2 font-tech">
                    #{Math.max(1, 1000 - (userProgress?.totalXP || 0))}
                  </div>
                  <p className="text-sm text-muted-foreground font-body">Leaderboard Rank</p>
                </CardContent>
              </Card>
            </div>

            {/* Test Certificate Generation - Demo Feature */}
            <Card className="glass border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Certificate System Demo
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Try out our automatic certificate generation system
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 'blockchain_fundamentals', name: 'Blockchain Fundamentals' },
                    { id: 'web_development', name: 'Modern Web Development' },
                    { id: 'smart_contracts', name: 'Smart Contracts Mastery' }
                  ].map((course) => (
                    <div key={course.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                      <h4 className="font-heading mb-2 text-sm">{course.name}</h4>
                      <Button
                        onClick={() => completeCourse(course.id, course.name)}
                        size="sm"
                        className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-xs"
                      >
                        Complete Course & Get Certificate
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="text-center pt-4 border-t border-border/50">
                  <Button
                    onClick={() => navigate('/certificates')}
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    View My Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Achievements & Blockchain Elements */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-heading">
                  <Award className="w-5 h-5" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProgress?.achievements.length ? (
                  <div className="space-y-4">
                    {userProgress.achievements.slice(-4).reverse().map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border border-accent/20">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium font-body">{achievement.name}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const rewardsSection = document.querySelector('#rewards');
                        if (rewardsSection) {
                          rewardsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      View All Achievements
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Complete courses to unlock achievements!</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Token Balance & Blockchain Info */}
            <Card className="glass bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm font-tech flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  BLOCK Token Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {userProgress?.blocktokens || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">BLOCK Tokens</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Level Rewards</span>
                      <Badge variant="outline">{(userProgress?.level || 1) * 100} Earned</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Course Rewards</span>
                      <Badge variant="outline">{(userProgress?.coursesCompleted.length || 0) * 100} Earned</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      const rewardsSection = document.querySelector('#rewards');
                      if (rewardsSection) {
                        rewardsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <Coins className="w-4 h-4 mr-2" />
                    Visit Marketplace
                  </Button>
                  
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Your learning progress and tokens are tracked on our testnet blockchain for verification.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}