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

export default function CataloguePage() {
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
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {learningPaths.map((path) => {
              const Icon = pathIcons[path] || Code;
              return (
                <Button
                  key={path}
                  variant={selectedProgram === path ? 'default' : 'outline'}
                  onClick={() => setSelectedProgram(path)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    selectedProgram === path 
                      ? 'bg-gradient-to-r from-accent to-primary text-accent-foreground shadow-lg' 
                      : 'border-primary/30 text-primary hover:bg-primary/10 hover:border-primary'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {path}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Selected Program Details */}
        {selectedProgram && (
          <Card className="mb-12 bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedProgram}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProgram(null)}>
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{pathDescriptions[selectedProgram]}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-center">
                <div className="glass p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <p className="text-xl font-bold">{getProgramStats(selectedProgram).totalCourses}</p>
                </div>
                <div className="glass p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-xl font-bold">{getProgramStats(selectedProgram).totalStudents.toLocaleString()}</p>
                </div>
                <div className="glass p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-xl font-bold">{getProgramStats(selectedProgram).avgRating} ★</p>
                </div>
                <div className="glass p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Premium</p>
                  <p className="text-xl font-bold">{getProgramStats(selectedProgram).premiumCourses}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCoursesByLearningPath(selectedProgram).map(course => (
                  <CourseCard course={course} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
