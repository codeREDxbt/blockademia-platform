import { Filter, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Badge } from './ui/badge';
import CourseCard from './CourseCard';
import { useState } from 'react';
import { courses, getLearningPaths } from '../data/courses';



export default function CoursesSection() {

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedLevel, setSelectedLevel] = useState('All');

  const learningPaths = getLearningPaths();



  const handleFilter = () => {
    const totalCourses = courses.length;
    const freeCourses = courses.filter(c => !c.premium).length;
    const premiumCourses = courses.filter(c => c.premium).length;
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const levelCounts = levels.map(level => `${level}: ${courses.filter(c => c.level === level).length}`);
    
    alert(`Course Statistics:\n\n` +
          `📚 Total Courses: ${totalCourses}\n` +
          `🆓 Free Courses: ${freeCourses}\n` +
          `💎 Premium Courses: ${premiumCourses}\n\n` +
          `By Level:\n${levelCounts.join('\n')}\n\n` +
          `Use the search bar and level filters above to find specific courses!`);
  };

  const filteredCourses = () => {
    let pathCourses = courses;
    
    if (selectedLevel !== 'All') {
      pathCourses = pathCourses.filter(course => course.level === selectedLevel);
    }

    if (searchTerm) {
      pathCourses = pathCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return pathCourses;
  };



  return (
    <section id="courses" className="py-12 sm:py-16 px-3 sm:px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-heading">
            Master the <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent neon-text gradient-animate font-tech" style={{ wordSpacing: '-0.4em' }}>Next-Gen Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-body leading-relaxed px-4 sm:px-0">
            Level up with cutting-edge courses designed by industry experts. Learn through structured paths from beginner to advanced levels.
          </p>
        </div>
        


        {/* Enhanced Search with Instant Results */}
        <div className="mb-6">
          <div className="relative max-w-lg mx-auto px-4 sm:px-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5 z-10" />
              <Input
                placeholder="Search courses..."
                className="pl-12 pr-12 h-10 sm:h-12 bg-card/50 border-border focus:border-accent focus:ring-2 focus:ring-accent/20 font-body text-sm sm:text-base placeholder:text-muted-foreground/80 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button 
                  onClick={() => setSearchTerm('')}
                  variant="ghost" 
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/20 hover:text-accent transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {/* Search Results Counter */}
            {searchTerm && (
              <div className="mt-2 text-center">
                <span className="text-sm text-muted-foreground font-code">
                  {filteredCourses().length} course{filteredCourses().length !== 1 ? 's' : ''} found
                  {filteredCourses().length === 0 && ' - try different keywords'}
                </span>
              </div>
            )}
            
            {/* Quick Search Suggestions - Only when no search term */}
            {!searchTerm && (
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <span className="text-xs text-muted-foreground font-code mr-2">Try:</span>
                {['Blockchain', 'React', 'Python', 'DeFi'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="text-xs px-2 py-1 rounded-md bg-muted/30 hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all duration-200 font-code border border-transparent hover:border-accent/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Level Filter and Stats - Streamlined */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 items-center justify-between">
          {/* Level Filter */}
          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <Button
                key={level}
                onClick={() => setSelectedLevel(level)}
                variant={level === selectedLevel ? 'default' : 'outline'}
                size="sm"
                className={`font-semibold font-code transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${
                  level === selectedLevel 
                    ? 'bg-gradient-to-r from-accent to-primary text-accent-foreground gradient-animate btn-pulse-glow shadow-lg' 
                    : 'border-primary/30 text-primary hover:bg-primary/10 hover:border-primary'
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
          
          {/* Compact Stats */}
          <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground font-code">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>{courses.length} Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>{learningPaths.length} Paths</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span>{courses.filter(c => c.premium).length} Premium</span>
            </div>
          </div>
        </div>
        
        {/* All Courses - Simple Grid */}
        <div className="space-y-8">
          {/* Show filtered courses */}
          {searchTerm ? (
            <div>
              <h3 className="text-xl font-heading mb-6 text-center">Search Results</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCourses().map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              {filteredCourses().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground font-body text-lg">No courses found matching your search.</p>
                  <p className="text-muted-foreground font-body mt-2">Try different keywords or browse by level filters above.</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Featured Courses Grid */}
              <div className="mb-12">
                <h4 className="text-lg font-heading mb-4 flex items-center gap-2 justify-center">
                  Featured Courses
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">Popular</Badge>
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCourses().filter(course => course.featured).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* All Courses Grid */}
              <div>
                <h4 className="text-lg font-heading mb-6 text-center">All Courses</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCourses().map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-8 sm:mt-12">
          <Button 
            size="sm"
            className="bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary gradient-animate text-secondary-foreground font-semibold font-tech px-6 sm:px-8 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            Explore More Learning Paths
          </Button>
        </div>
      </div>
    </section>
  );
}