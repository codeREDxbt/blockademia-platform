import { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';

export default function FullCourseCatalogue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

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
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8 flex-wrap px-4 sm:px-0">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'default' : 'outline'}
              onClick={() => setSelectedLevel(level)}
              className="transition-all duration-200 text-xs sm:text-sm px-3 py-1 h-auto"
            >
              {level}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCourses().map(course => (
            <CourseCard course={course} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses().length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-foreground mb-2">No courses found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
