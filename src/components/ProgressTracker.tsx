import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Zap, 
  Award, 
  Brain,
  BookOpen,
  CheckCircle,
  Trophy,
  Flame,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { useWeb3 } from '../contexts/Web3Context';

interface LearningStreak {
  current: number;
  longest: number;
  lastActivity: Date;
}

interface SkillProgress {
  skill: string;
  level: number;
  xp: number;
  maxXp: number;
  category: string;
}

export default function ProgressTracker() {
  const { user } = useAuth();
  const { userProgress, getStats } = useGame();
  const { wallet } = useWeb3();
  const [streak, setStreak] = useState<LearningStreak>({ current: 5, longest: 12, lastActivity: new Date() });
  const [skills, setSkills] = useState<SkillProgress[]>([]);
  const [timeSpentToday, setTimeSpentToday] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(10); // hours

  // Real-time progress tracking
  useEffect(() => {
    const updateProgress = () => {
      // Simulate real-time progress updates
      const mockSkills: SkillProgress[] = [
        { skill: 'Blockchain Fundamentals', level: 3, xp: 750, maxXp: 1000, category: 'Blockchain' },
        { skill: 'Smart Contract Development', level: 2, xp: 450, maxXp: 800, category: 'Development' },
        { skill: 'Web3 Frontend', level: 4, xp: 320, maxXp: 400, category: 'Frontend' },
        { skill: 'DeFi Protocols', level: 1, xp: 180, maxXp: 500, category: 'DeFi' },
        { skill: 'Security Auditing', level: 1, xp: 90, maxXp: 500, category: 'Security' }
      ];
      setSkills(mockSkills);
      
      // Update time spent (mock real-time tracking)
      setTimeSpentToday(prev => prev + 0.1);
    };

    const interval = setInterval(updateProgress, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const stats = getStats();
  const completionRate = stats.totalCourses > 0 ? (stats.completedCourses / stats.totalCourses) * 100 : 0;
  const weeklyProgress = (timeSpentToday / (weeklyGoal * 7)) * 100;
  
  // Get values from userProgress with fallbacks
  const level = userProgress?.level || 1;
  const xp = userProgress?.xp || 0;
  const totalTokens = userProgress?.blocktokens || 0;

  const getSkillColor = (category: string) => {
    const colors = {
      'Blockchain': 'text-primary',
      'Development': 'text-accent',
      'Frontend': 'text-blue-500',
      'DeFi': 'text-purple-500',
      'Security': 'text-red-500'
    };
    return colors[category as keyof typeof colors] || 'text-muted-foreground';
  };

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', unlocked: true, icon: '🎯' },
    { id: 2, title: 'Blockchain Explorer', description: 'Complete Blockchain Fundamentals', unlocked: true, icon: '⛓️' },
    { id: 3, title: 'Code Warrior', description: 'Deploy your first smart contract', unlocked: false, icon: '⚔️' },
    { id: 4, title: 'Week Streak', description: 'Learn for 7 consecutive days', unlocked: true, icon: '🔥' },
    { id: 5, title: 'Token Collector', description: 'Earn 1000 BLOCK tokens', unlocked: false, icon: '🪙' },
    { id: 6, title: 'DeFi Master', description: 'Complete Advanced DeFi course', unlocked: false, icon: '🏆' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold text-accent">{level}</p>
              </div>
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>XP: {xp}</span>
                <span>Next: {(level + 1) * 1000}</span>
              </div>
              <Progress 
                value={(xp / ((level + 1) * 1000)) * 100} 
                className="h-2 mt-1" 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">BLOCK Tokens</p>
                <p className="text-2xl font-bold text-primary">{totalTokens}</p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
            {wallet && (
              <div className="mt-2">
                <div className="text-xs text-muted-foreground">
                  Wallet: {wallet.blockTokenBalance} BLOCK
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold text-orange-500">{streak.current} days</p>
              </div>
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Longest: {streak.longest} days
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold text-blue-500">{Math.round(completionRate)}%</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {stats.completedCourses}/{stats.totalCourses} courses
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              Skill Progress
            </CardTitle>
            <CardDescription>
              Track your mastery across different blockchain domains
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.skill}</span>
                    <Badge variant="outline" className={getSkillColor(skill.category)}>
                      Level {skill.level}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {skill.xp}/{skill.maxXp} XP
                  </span>
                </div>
                <Progress value={(skill.xp / skill.maxXp) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Learning Analytics
            </CardTitle>
            <CardDescription>
              Your learning patterns and time investment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Time Spent Today */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time Today
                </span>
                <span className="text-accent font-bold">
                  {Math.round(timeSpentToday * 60)} min
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Goal: 2 hours/day
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Weekly Goal
                </span>
                <span className="text-primary font-bold">
                  {Math.round(weeklyProgress)}%
                </span>
              </div>
              <Progress value={weeklyProgress} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {Math.round(timeSpentToday)} / {weeklyGoal} hours this week
              </div>
            </div>

            {/* Learning Velocity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Learning Velocity
                </span>
                <span className="text-accent font-bold">+15%</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Improvement over last week
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock achievements as you progress through your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 border rounded-lg transition-all ${
                  achievement.unlocked
                    ? 'border-accent/30 bg-accent/5'
                    : 'border-muted/30 bg-muted/5 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <CheckCircle className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Recommendations */}
      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <div className="font-medium">💡 Personalized Recommendations</div>
            <ul className="text-sm space-y-1">
              <li>• Focus on Smart Contract Development to reach Level 3</li>
              <li>• Complete 2 more lessons to maintain your learning streak</li>
              <li>• Consider starting the DeFi course to diversify your skills</li>
              <li>• Practice coding exercises to improve retention</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}