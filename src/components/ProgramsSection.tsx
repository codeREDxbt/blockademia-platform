import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import CourseCard from './CourseCard';
import { courses, getLearningPaths, getCoursesByLearningPath } from '../data/courses';
import { 
  Code, 
  BookOpen, 
  Shield, 
  TrendingUp, 
  Palette, 
  Coins,
  ChevronRight,
  Users,
  Clock,
  Award
} from 'lucide-react';

const pathIcons = {
  'Blockchain Development': Code,
  'Web3 Frontend': BookOpen,
  'DeFi Development': TrendingUp,
  'NFT Development': Palette,
  'Cryptocurrency Trading': Coins,
  'Blockchain Security': Shield,
  'Full Stack Development': Code,
  'Frontend Development': BookOpen,
  'Backend Development': Code,
  'Web Development': BookOpen,
  'Programming Languages': Code,
  'Smart Contract Development': Code,
  'Solana Development': Code
};

const pathDescriptions = {
  'Blockchain Development': 'Master blockchain protocols, smart contracts, and decentralized systems',
  'Web3 Frontend': 'Build user interfaces for decentralized applications with React and Web3',
  'DeFi Development': 'Create decentralized finance protocols and financial applications',
  'NFT Development': 'Develop NFT platforms, marketplaces, and digital asset systems',
  'Cryptocurrency Trading': 'Learn systematic trading strategies and quantitative analysis',
  'Blockchain Security': 'Secure blockchain systems and conduct professional security audits',
  'Full Stack Development': 'Build complete web applications from frontend to backend with modern stacks',
  'Frontend Development': 'Create beautiful, responsive user interfaces with modern frameworks',
  'Backend Development': 'Develop scalable server-side applications and APIs',
  'Web Development': 'Master web technologies and create responsive, performant websites',
  'Programming Languages': 'Learn popular programming languages for various applications',
  'Smart Contract Development': 'Professional smart contract development with advanced patterns and security',
  'Solana Development': 'Build high-performance applications on Solana blockchain with Rust'
};

const pathColors = {
  'Blockchain Development': 'from-primary/20 to-accent/20',
  'Web3 Frontend': 'from-blue-500/20 to-purple-500/20',
  'Smart Contract Development': 'from-accent/20 to-primary/20',
  'Solana Development': 'from-purple-500/20 to-pink-500/20',
  'DeFi Development': 'from-green-500/20 to-emerald-500/20',
  'NFT Development': 'from-pink-500/20 to-rose-500/20',
  'Cryptocurrency Trading': 'from-yellow-500/20 to-orange-500/20',
  'Blockchain Security': 'from-red-500/20 to-pink-500/20',
  'Full Stack Development': 'from-blue-600/20 to-indigo-600/20',
  'Frontend Development': 'from-purple-500/20 to-violet-500/20',
  'Backend Development': 'from-gray-600/20 to-slate-600/20',
  'Web Development': 'from-cyan-500/20 to-teal-500/20',
  'Programming Languages': 'from-orange-500/20 to-red-500/20'
};

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const learningPaths = getLearningPaths();

  const getProgramStats = (path: string) => {
    const pathCourses = getCoursesByLearningPath(path);
    const totalStudents = pathCourses.reduce((sum, course) => sum + course.students, 0);
    const avgRating = pathCourses.reduce((sum, course) => sum + course.rating, 0) / pathCourses.length;
    const premiumCourses = pathCourses.filter(course => course.premium).length;
    
    return {
      totalCourses: pathCourses.length,
      totalStudents,
      avgRating: avgRating.toFixed(1),
      premiumCourses
    };
  };

  return (
    <section id="programs" className="py-12 sm:py-20 px-3 sm:px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Learning Programs
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg font-body leading-relaxed px-4 sm:px-0">
            Choose your path to mastery. Each program is carefully designed to take you from beginner to expert with hands-on projects and industry insights.
          </p>
        </div>

        {/* Program Navigation */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2 sm:px-0">
            <Button
              variant={selectedProgram === null ? "default" : "outline"}
              onClick={() => setSelectedProgram(null)}
              className="font-code text-xs sm:text-sm hover:scale-105 transition-all duration-200"
              size="sm"
            >
              All Programs
            </Button>
            {learningPaths.map((path) => (
              <Button
                key={path}
                variant={selectedProgram === path ? "default" : "outline"}
                onClick={() => setSelectedProgram(path)}
                className="font-code text-xs sm:text-sm hover:scale-105 transition-all duration-200"
                size="sm"
              >
                {path === 'Programming Languages' ? 'Languages' : 
                 path.length > 15 ? path.split(' ')[0] + ' ' + path.split(' ')[1] : path}
              </Button>
            ))}
          </div>
        </div>

        {/* Program Sections */}
        <div className="space-y-12 sm:space-y-16">
          {(selectedProgram ? [selectedProgram] : learningPaths).map((path) => {
            const pathCourses = getCoursesByLearningPath(path);
            const Icon = pathIcons[path as keyof typeof pathIcons] || Code;
            const stats = getProgramStats(path);
            
            return (
              <div key={path} className="space-y-6 sm:space-y-8">
                {/* Program Header */}
                <Card className={`border border-border/50 bg-gradient-to-r ${pathColors[path as keyof typeof pathColors] || 'from-muted/20 to-muted/30'} overflow-hidden`}>
                  <CardContent className="p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-card/80 rounded-xl border border-border/30">
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold mb-1 sm:mb-2">{path}</h3>
                          <p className="text-muted-foreground font-body max-w-2xl text-sm sm:text-base">
                            {pathDescriptions[path as keyof typeof pathDescriptions] || 'Advanced learning path for specialized skills'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 sm:gap-6 lg:ml-auto">
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-primary">{stats.totalCourses}</div>
                          <div className="text-xs text-muted-foreground font-code">Courses</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-accent">{stats.totalStudents > 1000 ? `${(stats.totalStudents/1000).toFixed(0)}k` : stats.totalStudents}</div>
                          <div className="text-xs text-muted-foreground font-code">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-secondary">{stats.avgRating}</div>
                          <div className="text-xs text-muted-foreground font-code">Rating</div>
                        </div>
                        {stats.premiumCourses > 0 && (
                          <div className="text-center">
                            <div className="text-lg sm:text-2xl font-bold text-primary">{stats.premiumCourses}</div>
                            <div className="text-xs text-muted-foreground font-code">Premium</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/20">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                        Beginner
                      </Badge>
                      <div className="w-8 h-px bg-border"></div>
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary">
                        Intermediate
                      </Badge>
                      <div className="w-8 h-px bg-border"></div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                        Advanced
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Courses Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {pathCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Program CTA */}
                <div className="text-center pt-4 sm:pt-6">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 transition-all duration-200 font-code sm:text-base text-sm w-full sm:w-auto"
                  >
                    Start {path} Journey
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats Section */}
        {!selectedProgram && (
          <div className="mt-12 sm:mt-20 pt-12 sm:pt-16 border-t border-border/20">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4">Platform Overview</h3>
              <p className="text-muted-foreground font-body text-sm sm:text-base">Your complete blockchain and web development education hub</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <Card className="border border-border/50 bg-card/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{courses.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-code">Total Courses</div>
                </CardContent>
              </Card>
              
              <Card className="border border-border/50 bg-card/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold text-accent mb-1">
                    {Math.round(courses.reduce((sum, course) => sum + course.students, 0) / 1000)}k+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-code">Active Students</div>
                </CardContent>
              </Card>
              
              <Card className="border border-border/50 bg-card/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold text-secondary mb-1">500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-code">Hours Content</div>
                </CardContent>
              </Card>
              
              <Card className="border border-border/50 bg-card/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{learningPaths.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-code">Learning Paths</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}