import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Code,
  Brain,
  Zap,
  Trophy,
  Clock,
  Target,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Settings
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { lessonContent, LessonContent, LessonTask, TaskValidation } from '../data/lessons';
import CodeCompiler from './CodeCompiler';
import { toast } from 'sonner@2.0.3';

interface LessonPlayerProps {
  lessonId: string;
  courseId: string;
  onComplete: () => void;
}

interface TaskState {
  taskId: string;
  completed: boolean;
  score: number;
  attempts: number;
  timeSpent: number;
  userAnswer?: any;
}

export default function LessonPlayer({ lessonId, courseId, onComplete }: LessonPlayerProps) {
  const { addXP, addTokens, completeLesson } = useGame();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskStates, setTaskStates] = useState<Map<string, TaskState>>(new Map());
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  // Load lesson content
  useEffect(() => {
    const foundLesson = lessonContent.find(l => l.id === lessonId && l.courseId === courseId);
    if (foundLesson) {
      setLesson(foundLesson);
      // Initialize task states
      const initialStates = new Map();
      foundLesson.tasks.forEach(task => {
        initialStates.set(task.id, {
          taskId: task.id,
          completed: false,
          score: 0,
          attempts: 0,
          timeSpent: 0,
          userAnswer: null
        });
      });
      setTaskStates(initialStates);
    }
  }, [lessonId, courseId]);

  // Timer for tracking time spent
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, startTime]);

  // Auto-start lesson
  useEffect(() => {
    if (lesson) {
      setIsPlaying(true);
    }
  }, [lesson]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const currentTask = lesson?.tasks[currentTaskIndex];
  const currentTaskState = currentTask ? taskStates.get(currentTask.id) : null;
  const overallProgress = lesson ? (currentTaskIndex / lesson.tasks.length) * 100 : 0;

  const validateTask = async (taskId: string, userAnswer: any): Promise<TaskValidation> => {
    // Mock validation - in production, this would be more sophisticated
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const task = lesson?.tasks.find(t => t.id === taskId);
    if (!task) {
      return {
        taskId,
        isValid: false,
        feedback: 'Task not found'
      };
    }

    // Simple validation logic based on task type
    switch (task.type) {
      case 'quiz':
        const correctAnswers = task.content.questions.filter((q: any, index: number) => 
          userAnswer[index] === q.correct
        );
        const isValid = correctAnswers.length === task.content.questions.length;
        return {
          taskId,
          isValid,
          feedback: isValid 
            ? '🎉 Perfect! You got all questions correct!' 
            : `You got ${correctAnswers.length}/${task.content.questions.length} correct. Review the concepts and try again.`,
          hints: isValid ? [] : ['Review the lesson content', 'Take your time with each question']
        };

      case 'code':
        // Simple check for code completion
        const hasRequiredKeywords = task.content.solution ? 
          ['function', 'contract', 'constructor'].some(keyword => 
            userAnswer.toLowerCase().includes(keyword.toLowerCase())
          ) : true;
        return {
          taskId,
          isValid: hasRequiredKeywords && userAnswer.length > 50,
          feedback: hasRequiredKeywords 
            ? '✅ Great! Your code looks good and compiles successfully!' 
            : '❌ Your code seems incomplete. Make sure to implement all required functions.',
          hints: hasRequiredKeywords ? [] : [
            'Make sure to implement all required functions',
            'Check the template for guidance',
            'Test your code before submitting'
          ]
        };

      case 'interactive':
        return {
          taskId,
          isValid: true,
          feedback: '🌟 Interactive task completed successfully!',
          nextSteps: ['Move on to the next task', 'Apply what you learned']
        };

      default:
        return {
          taskId,
          isValid: true,
          feedback: 'Task completed!'
        };
    }
  };

  const handleTaskSubmit = async (userAnswer: any) => {
    if (!currentTask || !currentTaskState) return;

    const validation = await validateTask(currentTask.id, userAnswer);
    
    const updatedState: TaskState = {
      ...currentTaskState,
      attempts: currentTaskState.attempts + 1,
      timeSpent: timeElapsed,
      userAnswer,
      completed: validation.isValid,
      score: validation.isValid ? currentTask.points : Math.max(0, currentTask.points - (currentTaskState.attempts * 10))
    };

    setTaskStates(prev => new Map(prev.set(currentTask.id, updatedState)));

    if (validation.isValid) {
      // Award points and move to next task
      addXP(updatedState.score);
      
      toast.success(validation.feedback, {
        description: `+${updatedState.score} XP earned!`
      });

      // Auto-advance to next task after a delay
      setTimeout(() => {
        if (currentTaskIndex < lesson!.tasks.length - 1) {
          setCurrentTaskIndex(prev => prev + 1);
        } else {
          handleLessonComplete();
        }
      }, 2000);
    } else {
      toast.error(validation.feedback, {
        description: validation.hints?.[0] || 'Try again!'
      });
    }
  };

  const handleLessonComplete = () => {
    if (!lesson) return;

    setLessonCompleted(true);
    setIsPlaying(false);

    // Calculate total score
    const totalScore = Array.from(taskStates.values()).reduce((sum, state) => sum + state.score, 0);
    const totalPossible = lesson.tasks.reduce((sum, task) => sum + task.points, 0);
    const percentage = (totalScore / totalPossible) * 100;

    // Award lesson rewards
    addXP(lesson.rewards.xp);
    addTokens(lesson.rewards.tokens, `Lesson completed: ${lesson.title}`);
    completeLesson(lesson.id, percentage);

    toast.success(`🎉 Lesson Complete!`, {
      description: `You earned ${lesson.rewards.xp} XP and ${lesson.rewards.tokens} BLOCK tokens!`
    });

    // Call completion callback
    onComplete();
  };

  const renderQuizTask = (task: LessonTask) => {
    const [answers, setAnswers] = useState<number[]>([]);

    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
      const newAnswers = [...answers];
      newAnswers[questionIndex] = answerIndex;
      setAnswers(newAnswers);
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {task.content.questions.map((question: any, qIndex: number) => (
            <Card key={question.id} className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                <CardDescription>{question.question}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {question.options.map((option: string, oIndex: number) => (
                    <Button
                      key={oIndex}
                      variant={answers[qIndex] === oIndex ? "default" : "outline"}
                      className="w-full text-left justify-start"
                      onClick={() => handleAnswerSelect(qIndex, oIndex)}
                    >
                      {String.fromCharCode(65 + oIndex)}. {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          onClick={() => handleTaskSubmit(answers)}
          disabled={answers.length !== task.content.questions.length}
          className="w-full"
          size="lg"
        >
          Submit Quiz
        </Button>
      </div>
    );
  };

  const renderCodeTask = (task: LessonTask) => {
    const handleCodeTaskComplete = (success: boolean, score: number) => {
      if (success) {
        handleTaskSubmit({ code: 'completed', score });
      }
    };

    return (
      <CodeCompiler
        language={task.content.language}
        template={task.content.template}
        solution={task.content.solution}
        tests={task.content.tests}
        onTaskComplete={handleCodeTaskComplete}
        timeLimit={task.timeLimit}
        points={task.points}
        taskId={task.id}
        title={task.title}
        description={task.description}
      />
    );
  };

  const renderInteractiveTask = (task: LessonTask) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

    const handleStepComplete = () => {
      const newCompleted = [...completedSteps];
      newCompleted[currentStep] = true;
      setCompletedSteps(newCompleted);

      if (currentStep < task.content.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleTaskSubmit({ completed: true, steps: newCompleted });
      }
    };

    const currentStepData = task.content.steps[currentStep];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Interactive Simulation</h3>
          <Badge variant="outline">
            Step {currentStep + 1} of {task.content.steps.length}
          </Badge>
        </div>

        <Card className="border-2 border-dashed border-accent/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              {currentStepData?.instruction}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Simulation Area - {task.content.simulation}
                </p>
                <div className="mt-2 p-4 border-2 border-dashed border-primary/30 rounded text-center">
                  <Zap className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-sm">Interactive {task.content.simulation} simulation would run here</p>
                </div>
              </div>

              <Button 
                onClick={handleStepComplete}
                className="w-full"
                size="lg"
              >
                Complete Step
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            {task.content.steps.map((_: any, index: number) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < currentStep ? 'bg-accent' :
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSimulationTask = (task: LessonTask) => {
    const [simulationStarted, setSimulationStarted] = useState(false);

    return (
      <div className="space-y-6">
        <Card className="border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              {task.content.simulationType} Simulation
            </CardTitle>
            <CardDescription>
              Watch and interact with a live blockchain simulation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(task.content.parameters).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 bg-muted/30 rounded">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 border-2 border-dashed border-primary/30 rounded-lg text-center">
                {simulationStarted ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p>Simulation running...</p>
                    <Button onClick={() => handleTaskSubmit({ watched: true })}>
                      Complete Simulation
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Play className="w-12 h-12 mx-auto text-primary" />
                    <p>Click to start the blockchain simulation</p>
                    <Button onClick={() => setSimulationStarted(true)}>
                      Start Simulation
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTaskContent = (task: LessonTask) => {
    switch (task.type) {
      case 'quiz':
        return renderQuizTask(task);
      case 'code':
        return renderCodeTask(task);
      case 'interactive':
        return renderInteractiveTask(task);
      case 'simulation':
        return renderSimulationTask(task);
      default:
        return (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p>Task type not yet implemented</p>
          </div>
        );
    }
  };

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (lessonCompleted) {
    return (
      <div className="text-center space-y-6 py-12">
        <Trophy className="w-16 h-16 mx-auto text-primary" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Lesson Completed! 🎉</h2>
          <p className="text-muted-foreground">
            You've successfully completed "{lesson.title}"
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-accent">+{lesson.rewards.xp}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-primary">+{lesson.rewards.tokens}</div>
              <div className="text-sm text-muted-foreground">BLOCK Tokens</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </CardContent>
          </Card>
        </div>

        <Button onClick={onComplete} size="lg">
          Continue Learning <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Lesson Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-sm text-muted-foreground">Time Elapsed</div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </div>

      {/* Current Task */}
      {currentTask && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {currentTask.type === 'quiz' && <Brain className="w-5 h-5" />}
                  {currentTask.type === 'code' && <Code className="w-5 h-5" />}
                  {currentTask.type === 'interactive' && <Target className="w-5 h-5" />}
                  {currentTask.type === 'simulation' && <Zap className="w-5 h-5" />}
                  {currentTask.title}
                </CardTitle>
                <CardDescription>{currentTask.description}</CardDescription>
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline">
                  Task {currentTaskIndex + 1} of {lesson.tasks.length}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {currentTask.points} points
                </div>
                {currentTask.timeLimit && (
                  <div className="text-sm text-muted-foreground">
                    {currentTask.timeLimit} min limit
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderTaskContent(currentTask)}
          </CardContent>
        </Card>
      )}

      {/* Task Progress Indicators */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {lesson.tasks.map((task, index) => {
            const state = taskStates.get(task.id);
            return (
              <div
                key={task.id}
                className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                  state?.completed ? 'bg-accent text-accent-foreground' :
                  index === currentTaskIndex ? 'bg-primary text-primary-foreground' : 
                  'bg-muted'
                }`}
              >
                {state?.completed ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
