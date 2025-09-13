import { Button } from './ui/button';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';
import { useNavigate } from 'react-router-dom';

export default function CoursesSection() {
  const navigate = useNavigate();
  const featuredCourses = courses.filter(c => c.featured).slice(0, 4); // Show up to 4 featured courses

  return (
    <section id="courses" className="py-12 sm:py-16 px-3 sm:px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-heading">
            Featured Courses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-body leading-relaxed px-4 sm:px-0">
            Get a glimpse of our top-rated courses, designed to kickstart your learning journey.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featuredCourses.map(course => (
            <CourseCard course={course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button onClick={() => navigate('/courses')} size="lg" className="bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold btn-pulse-glow">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
