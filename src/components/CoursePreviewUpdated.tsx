import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Lock, 
  BookOpen, 
  Award, 
  Code, 
  Target,
  ArrowLeft,
  Download,
  Share,
  Heart,
  Crown,
  Shield,
  Zap,
  Coins,
  Trophy
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';

export default function CoursePreview() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCourseProgress, updateCourseProgress, completeCourse, addXP } = useGame();
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const course = courseId ? getCourseById(courseId) : null;

  const isLocked = course?.premium && (!user || !user.isPremium);
  const isPremiumCourse = course?.premium || course?.price > 0;
  const courseProgress = courseId ? getCourseProgress(courseId) : null;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading mb-4">Course not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  );
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progressPercentage = courseProgress ? courseProgress.progress : 0;

  // Function to simulate course progress and XP earning
  const simulateLearning = () => {
    if (!courseId || isLocked) return;

    const newProgress = Math.min(100, simulatedProgress + 20);
    setSimulatedProgress(newProgress);
    updateCourseProgress(courseId, newProgress);

    if (newProgress >= 100 && !courseProgress?.completed) {
      completeCourse(courseId);
    }
  };

  // Handle premium navigation
  const handlePremiumAction = () => {
    if (!user) {
      toast.info('Please sign in to access premium features');
      navigate('/auth');
      return;
    }
    navigate('/premium');
  };

  // Handle course start/continue
  const handleStartLearning = () => {
    if (!user) {
      toast.info('Please sign in to start learning');
      navigate('/auth');
      return;
    }

    if (isLocked) {
      handlePremiumAction();
      return;
    }

    // For demo purposes, simulate learning
    simulateLearning();
    toast.success('Learning session started! +20% progress');
  };

  // Handle course preview
  const handlePreview = () => {
    navigate('/educational-overview');
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (!user) {
      toast.info('Please sign in to add to wishlist');
      navigate('/auth');
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Course link copied to clipboard!');
    }
  };

  // Handle syllabus download
  const handleDownloadSyllabus = () => {
    toast.success('Syllabus download started');
    // In a real app, this would trigger a PDF download
  };

  useEffect(() => {
    if (courseProgress) {
      setSimulatedProgress(courseProgress.progress);
    }
  }, [courseProgress]);

  return (
    <div className="min-h-screen pt-12 sm:pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-card via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground mb-4 p-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-sm sm:text-base">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {course.level}
                  </Badge>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Star className="w-4 h-4 mr-1 fill-accent text-accent" />
                    {course.rating}
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {course.title}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {course.longDescription}
                </p>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>Instructor: <span className="text-foreground font-medium">{course.instructor}</span></span>
                  {course.certificate && (
                    <>
                      <span>•</span>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-accent" />
                        Certificate included
                      </div>
                    </>
                  )}
                </div>

                {/* Progress Bar and Gamification (if user has started) */}
                {user && (
                  <div className="space-y-4">
                    {progressPercentage > 0 && (
                      <div className="space-y-3 p-4 bg-card/50 rounded-lg border border-accent/20">
                        <div className="flex justify-between text-sm">
                          <span>Your Progress</span>
                          <span>{Math.round(progressPercentage)}% Complete</span>
                        </div>
                        <Progress value={progressPercentage} className="h-3" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{Math.floor(progressPercentage / 10)} of {totalLessons} lessons completed</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-accent" />
                              <span>{courseProgress?.xpEarned || 0} XP earned</span>
                            </div>
                            {courseProgress?.completed && (
                              <Badge variant="outline" className="text-accent border-accent">
                                <Trophy className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Learning Simulation (for demo purposes) */}
                    {!isLocked && (
                      <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-sm">Interactive Learning Demo</h4>
                            <p className="text-xs text-muted-foreground">Simulate progress to see XP and token rewards</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              +50 XP/lesson
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={simulateLearning}
                          disabled={simulatedProgress >= 100}
                          size="sm"
                          className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                        >
                          {simulatedProgress >= 100 ? 'Course Completed! 🎉' : `Continue Learning (+${20}% progress)`}
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Premium Lock Notice */}
                {isLocked && (
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <Crown className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Premium Course</h3>
                        <p className="text-sm text-muted-foreground">Unlock this advanced course with Blockademia Premium</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                        onClick={handlePremiumAction}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/educational-overview')}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <Button 
                    size="default" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 w-full sm:w-auto"
                    onClick={handleStartLearning}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {isLocked ? 'Upgrade to Access' : (progressPercentage > 0 ? 'Continue Learning' : 'Start Learning')}
                  </Button>
                  <div className="flex gap-2 sm:gap-4">
                    <Button 
                      variant="outline" 
                      size="default" 
                      className="flex-1 sm:flex-none"
                      onClick={handlePreview}
                    >
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="default"
                      onClick={handleWishlistToggle}
                    >
                      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="default"
                      onClick={handleShare}
                    >
                      <Share className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Course Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <Button 
                    size="lg" 
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground"
                    onClick={handleStartLearning}
                  >
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-card border border-border rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-primary">{course.students > 1000 ? `${(course.students/1000).toFixed(1)}k` : course.students}</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <Tabs defaultValue="curriculum" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:flex text-xs sm:text-sm">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-heading font-bold">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <Card key={module.id} className="border border-border/50">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base sm:text-lg">{module.title}</CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{module.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {module.lessons.length} lessons
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div 
                              key={lesson.id} 
                              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors ${
                                lesson.completed 
                                  ? 'bg-accent/10 border border-accent/20' 
                                  : lesson.locked 
                                    ? 'bg-muted/30 text-muted-foreground' 
                                    : 'hover:bg-muted/50 cursor-pointer'
                              }`}
                              onClick={() => {
                                if (!lesson.locked && !isLocked) {
                                  toast.info('Lesson player would open here');
                                }
                              }}
                            >
                              <div className="flex-shrink-0">
                                {lesson.completed ? (
                                  <CheckCircle className="w-5 h-5 text-accent" />
                                ) : lesson.locked ? (
                                  <Lock className="w-5 h-5" />
                                ) : lesson.type === 'video' ? (
                                  <Play className="w-5 h-5" />
                                ) : lesson.type === 'interactive' ? (
                                  <Code className="w-5 h-5" />
                                ) : lesson.type === 'quiz' ? (
                                  <Target className="w-5 h-5" />
                                ) : (
                                  <BookOpen className="w-5 h-5" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm sm:text-base">{lesson.title}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1 sm:gap-2 mt-1">
                                  <span>{lesson.duration}</span>
                                  <Badge variant="secondary" className="text-xs px-1 sm:px-2 py-0">
                                    {lesson.type}
                                  </Badge>
                                </div>
                              </div>
                              {!lesson.locked && !isLocked && (
                                <Button variant="ghost" size="sm">
                                  <Play className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle>Course Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Technologies You'll Use</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleDownloadSyllabus}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Syllabus
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle>Course Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Lessons</span>
                      <span className="font-medium">{totalLessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificate</span>
                      <span className="font-medium">{course.certificate ? 'Yes' : 'No'}</span>
                    </div>
                    {isPremiumCourse && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium text-primary">
                          {course.price === 0 ? 'Free' : `₹${course.price}`}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 sm:space-y-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold mb-4">What You'll Learn</h3>
                  <div className="space-y-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm sm:text-base">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-heading font-bold mb-4">Prerequisites</h3>
                  <div className="space-y-3">
                    {course.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-muted-foreground">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-bold mb-4">Course Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Card className="border border-accent/20 bg-accent/5">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Award className="w-12 h-12 text-accent mx-auto" />
                      <div>
                        <h4 className="font-bold text-lg">Get Certified</h4>
                        <p className="text-muted-foreground text-sm">
                          Earn a certificate upon completion to showcase your new skills
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Instructor Tab */}
          <TabsContent value="instructor" className="space-y-6">
            <Card className="border border-border/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-2">{course.instructor}</h3>
                    <p className="text-muted-foreground mb-4">
                      Senior Full-Stack Developer with 8+ years of experience building scalable web applications. 
                      Passionate about teaching and helping developers level up their skills.
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">50k+</span> Students
                      </div>
                      <div>
                        <span className="font-medium text-foreground">4.9</span> Rating
                      </div>
                      <div>
                        <span className="font-medium text-foreground">15</span> Courses
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold">{course.rating}</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < Math.floor(course.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {course.students.toLocaleString()} reviews</p>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  name: "Alex Johnson",
                  rating: 5,
                  comment: "Excellent course! The instructor explains complex concepts in a very understandable way.",
                  date: "2 weeks ago"
                },
                {
                  name: "Maria Garcia",
                  rating: 5,
                  comment: "Great hands-on projects and practical examples. Really helped me understand the concepts.",
                  date: "1 month ago"
                },
                {
                  name: "David Chen",
                  rating: 4,
                  comment: "Well structured course with good progression. Some sections could be more detailed.",
                  date: "2 months ago"
                }
              ].map((review, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
