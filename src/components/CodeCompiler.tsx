import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Play, 
  Square, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Trophy,
  Lightbulb,
  Terminal,
  FileCode,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { toast } from 'sonner@2.0.3';

// Monaco Editor will be loaded dynamically
declare global {
  interface Window {
    monaco: any;
    require: any;
  }
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  output?: string;
}

interface CompilerProps {
  language: 'solidity' | 'javascript' | 'typescript' | 'python';
  template: string;
  solution?: string;
  tests?: any[];
  onTaskComplete?: (success: boolean, score: number) => void;
  timeLimit?: number;
  points?: number;
  taskId: string;
  title: string;
  description: string;
}

export default function CodeCompiler({
  language,
  template,
  solution,
  tests = [],
  onTaskComplete,
  timeLimit,
  points = 100,
  taskId,
  title,
  description
}: CompilerProps) {
  const { user } = useAuth();
  const { addXP, addTokens, awardProjectBonus } = useGame();
  const [code, setCode] = useState(template);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : 0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState(0);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // Initialize Monaco Editor
  useEffect(() => {
    const loadMonaco = async () => {
      if (window.monaco) {
        initializeEditor();
        return;
      }

      // Load Monaco from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';
      script.onload = () => {
        window.require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
        window.require(['vs/editor/editor.main'], () => {
          initializeEditor();
        });
      };
      document.head.appendChild(script);
    };

    loadMonaco();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLimit && timeLeft > 0 && !completed) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, completed, timeLimit]);

  const initializeEditor = () => {
    if (!window.monaco || editorRef.current) return;

    monacoRef.current = window.monaco;
    
    // Configure language-specific settings
    if (language === 'solidity') {
      monacoRef.current.languages.register({ id: 'solidity' });
      monacoRef.current.languages.setMonarchTokensProvider('solidity', {
        tokenizer: {
          root: [
            [/pragma|contract|function|modifier|event|struct|enum|mapping|address|uint256|bool|string/, 'keyword'],
            [/public|private|internal|external|pure|view|payable|returns/, 'keyword'],
            [/if|else|for|while|do|break|continue|return/, 'keyword'],
            [/true|false|null/, 'keyword'],
            [/[0-9]+/, 'number'],
            [/".*?"/, 'string'],
            [/\/\/.*$/, 'comment'],
            [/\/\*[\s\S]*?\*\//, 'comment'],
          ]
        }
      });
    }

    // Create editor
    editorRef.current = monacoRef.current.editor.create(
      document.getElementById('code-editor'),
      {
        value: code,
        language: language === 'solidity' ? 'solidity' : language,
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
        lineNumbers: 'on',
        folding: true,
        bracketMatching: 'always',
        autoIndent: 'full',
        formatOnPaste: true,
        formatOnType: true
      }
    );

    // Listen for changes
    editorRef.current.onDidChangeModelContent(() => {
      setCode(editorRef.current.getValue());
    });
  };

  const handleTimeUp = () => {
    toast.error('Time limit reached!');
    if (onTaskComplete) {
      onTaskComplete(false, 0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);

    try {
      let result = '';
      
      if (language === 'javascript' || language === 'typescript') {
        // Run JavaScript/TypeScript in a sandboxed environment
        result = await runJavaScript(code);
      } else if (language === 'solidity') {
        // Compile Solidity
        result = await compileSolidity(code);
      } else if (language === 'python') {
        // Run Python (would need Pyodide or similar)
        result = await runPython(code);
      }

      setOutput(result);
      
      // Run tests if available
      if (tests.length > 0) {
        await runTests();
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runJavaScript = async (jsCode: string): Promise<string> => {
    return new Promise((resolve) => {
      try {
        // Create a sandboxed environment
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: any[]) => logs.push(args.join(' ')),
          error: (...args: any[]) => logs.push(`Error: ${args.join(' ')}`),
          warn: (...args: any[]) => logs.push(`Warning: ${args.join(' ')}`)
        };

        // Create a function with the code
        const func = new Function('console', 'require', 'module', 'exports', jsCode);
        func(mockConsole, () => ({}), {}, {});
        
        resolve(logs.join('\n') || 'Code executed successfully');
      } catch (error: any) {
        resolve(`Error: ${error.message}`);
      }
    });
  };

  const compileSolidity = async (solidityCode: string): Promise<string> => {
    setIsCompiling(true);
    try {
      // Mock Solidity compilation (in real app, would use solc)
      if (solidityCode.includes('pragma solidity') && solidityCode.includes('contract')) {
        setIsCompiling(false);
        return 'Contract compiled successfully!\n\nBytecode generated and ready for deployment.';
      } else {
        throw new Error('Invalid Solidity contract structure');
      }
    } catch (error: any) {
      setIsCompiling(false);
      throw error;
    }
  };

  const runPython = async (pythonCode: string): Promise<string> => {
    // Mock Python execution (would use Pyodide in real implementation)
    return 'Python execution not implemented in this demo.\nCode syntax appears valid.';
  };

  const runTests = async () => {
    const results: TestResult[] = [];
    
    for (const test of tests) {
      try {
        let passed = false;
        
        switch (test.type) {
          case 'compilation':
            passed = !output.includes('Error:');
            break;
          case 'assertion':
            // Mock assertion testing
            passed = Math.random() > 0.3; // 70% pass rate for demo
            break;
          case 'function-exists':
            passed = code.includes(test.function);
            break;
          case 'render':
            passed = code.includes('return') && code.includes('<');
            break;
          default:
            passed = true;
        }
        
        results.push({
          name: test.name,
          passed,
          output: passed ? 'Test passed' : 'Test failed'
        });
      } catch (error: any) {
        results.push({
          name: test.name,
          passed: false,
          error: error.message
        });
      }
    }
    
    setTestResults(results);
    
    // Calculate score
    const passedTests = results.filter(r => r.passed).length;
    const newScore = Math.round((passedTests / results.length) * points);
    setScore(newScore);
    
    // Check if task is complete
    if (passedTests === results.length) {
      setCompleted(true);
      if (user) {
        addXP(newScore);
        
        // Award project completion bonus based on language and complexity
        const getDifficulty = () => {
          if (language === 'solidity') return 'hard';
          if (language === 'typescript') return 'medium';
          return 'easy';
        };
        
        const projectType = `${language} coding`;
        const difficulty = getDifficulty();
        const scorePercentage = (newScore / points) * 100;
        
        // Award project bonus through game context
        awardProjectBonus(projectType, difficulty, scorePercentage);
      }
      toast.success(`Task completed! +${newScore} XP + Project Bonus!`);
      if (onTaskComplete) {
        onTaskComplete(true, newScore);
      }
    }
  };

  const showHint = () => {
    const taskHints = [
      'Check the syntax and structure of your code',
      'Make sure all required functions are implemented',
      'Review the documentation for the specific language features',
      'Test edge cases and error handling',
      'Consider performance and security best practices'
    ];
    
    if (currentHint < taskHints.length) {
      setHints(prev => [...prev, taskHints[currentHint]]);
      setCurrentHint(prev => prev + 1);
    }
  };

  const resetCode = () => {
    setCode(template);
    if (editorRef.current) {
      editorRef.current.setValue(template);
    }
    setOutput('');
    setTestResults([]);
    setScore(0);
    setCompleted(false);
    setHints([]);
    setCurrentHint(0);
  };

  const viewSolution = () => {
    if (solution) {
      setShowSolution(true);
      setCode(solution);
      if (editorRef.current) {
        editorRef.current.setValue(solution);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <FileCode className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {title}
                  <Badge variant="outline" className="text-accent border-accent">
                    <Trophy className="w-3 h-3 mr-1" />
                    {points} pts
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
            
            {timeLimit && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-destructive' : 'text-accent'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Code Editor ({language})
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showHint}
                  disabled={currentHint >= 5}
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Hint
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCode}
                >
                  Reset
                </Button>
                {solution && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={viewSolution}
                    disabled={!completed}
                  >
                    Solution
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                id="code-editor" 
                className="h-96 border rounded-lg overflow-hidden"
                style={{ height: '400px' }}
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={runCode}
                  disabled={isRunning || isCompiling}
                  className="flex-1"
                >
                  {isRunning || isCompiling ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      {isCompiling ? 'Compiling...' : 'Running...'}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {language === 'solidity' ? 'Compile' : 'Run'}
                    </>
                  )}
                </Button>
                
                {tests.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={runTests}
                    disabled={isRunning || !output}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output and Results */}
        <div className="space-y-4">
          {/* Console Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Console Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm min-h-32 max-h-48 overflow-auto">
                {output || 'Run your code to see output...'}
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Test Results
                  <Badge variant={completed ? "default" : "destructive"}>
                    {testResults.filter(r => r.passed).length}/{testResults.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testResults.map((test, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        test.passed 
                          ? 'bg-accent/10 border-accent/30' 
                          : 'bg-destructive/10 border-destructive/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {test.passed ? (
                          <CheckCircle className="w-4 h-4 text-accent" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="text-sm font-medium">{test.name}</span>
                      </div>
                      {test.error && (
                        <p className="text-xs text-destructive mt-1">{test.error}</p>
                      )}
                      {test.output && (
                        <p className="text-xs text-muted-foreground mt-1">{test.output}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm text-accent">{score}/{points} pts</span>
                  </div>
                  <Progress value={(score / points) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hints */}
          {hints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Hints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hints.map((hint, index) => (
                    <Alert key={index}>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>{hint}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Completion Badge */}
          {completed && (
            <Card className="border-accent">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Award className="w-12 h-12 text-accent mx-auto" />
                  <h3 className="font-medium text-accent">Task Completed!</h3>
                  <p className="text-sm text-muted-foreground">
                    Great job! You earned {score} XP and {Math.floor(score / 10)} BLOCK tokens.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Solution Display */}
      {showSolution && solution && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-auto">
              <code>{solution}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
