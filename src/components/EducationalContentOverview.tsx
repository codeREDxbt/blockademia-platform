import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Code2, 
  BookOpen, 
  Trophy, 
  Zap, 
  Target, 
  Cpu, 
  Brain,
  CheckCircle,
  Clock,
  Star,
  Coins,
  Award,
  Rocket,
  Monitor,
  Database,
  Shield
} from 'lucide-react';

export default function EducationalContentOverview() {
  const features = [
    {
      title: "Real-Time Code Compiler",
      description: "Write, compile, and test code directly in the browser with Monaco Editor integration",
      icon: <Code2 className="w-6 h-6" />,
      benefits: [
        "Support for Solidity, JavaScript, TypeScript, Python",
        "Syntax highlighting and auto-completion",
        "Real-time error detection and debugging",
        "Automated testing with instant feedback"
      ],
      languages: ["Solidity", "JavaScript", "TypeScript", "Python"]
    },
    {
      title: "Interactive Learning System",
      description: "Hands-on projects and simulations that adapt to your learning pace",
      icon: <Brain className="w-6 h-6" />,
      benefits: [
        "Step-by-step guided tutorials",
        "Interactive blockchain simulations",
        "Drag-and-drop exercises",
        "Real-time progress tracking"
      ],
      types: ["Simulations", "Quizzes", "Projects", "Interactive Labs"]
    },
    {
      title: "Comprehensive Course Content",
      description: "From blockchain basics to advanced DeFi protocols and Web3 development",
      icon: <BookOpen className="w-6 h-6" />,
      benefits: [
        "Beginner to advanced level progression",
        "Industry-relevant project portfolio",
        "Expert-designed curriculum",
        "Regular content updates"
      ],
      tracks: ["Blockchain Development", "Web3 Frontend", "DeFi Engineering"]
    },
    {
      title: "Gamified Progress Tracking",
      description: "Earn XP, level up, and get rewarded for your learning achievements",
      icon: <Trophy className="w-6 h-6" />,
      benefits: [
        "XP and leveling system",
        "BLOCK token rewards",
        "Achievement badges",
        "Leaderboards and competition"
      ],
      rewards: ["XP Points", "BLOCK Tokens", "NFT Certificates", "Premium Access"]
    }
  ];

  const courseHighlights = [
    {
      title: "Blockchain Fundamentals",
      level: "Beginner",
      duration: "8 weeks",
      projects: 5,
      color: "bg-blue-500/20 border-blue-500/30",
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      description: "Build your own blockchain from scratch"
    },
    {
      title: "Smart Contract Development",
      level: "Intermediate", 
      duration: "12 weeks",
      projects: 8,
      color: "bg-purple-500/20 border-purple-500/30",
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      description: "Create and deploy production-ready smart contracts"
    },
    {
      title: "Web3 Frontend Development",
      level: "Intermediate",
      duration: "10 weeks", 
      projects: 6,
      color: "bg-green-500/20 border-green-500/30",
      icon: <Monitor className="w-5 h-5 text-green-400" />,
      description: "Build responsive Web3 applications with React"
    },
    {
      title: "DeFi Protocol Engineering",
      level: "Advanced",
      duration: "16 weeks",
      projects: 10,
      color: "bg-yellow-500/20 border-yellow-500/30", 
      icon: <Database className="w-5 h-5 text-yellow-400" />,
      description: "Design and implement complex DeFi protocols"
    }
  ];

  const projectTypes = [
    {
      name: "Build a Blockchain",
      difficulty: "Medium",
      language: "JavaScript",
      points: 300,
      description: "Implement proof-of-work consensus and mining"
    },
    {
      name: "ERC-20 Token Contract", 
      difficulty: "Hard",
      language: "Solidity",
      points: 400,
      description: "Deploy with advanced tokenomics features"
    },
    {
      name: "DEX Frontend",
      difficulty: "Hard", 
      language: "TypeScript",
      points: 500,
      description: "Complete trading interface with charts"
    },
    {
      name: "Yield Farming Protocol",
      difficulty: "Expert",
      language: "Solidity", 
      points: 600,
      description: "Multi-pool staking with governance"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Comprehensive Educational Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master blockchain development with our interactive learning platform featuring real-time coding, 
          hands-on projects, and gamified progress tracking.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {feature.languages && (
                  <div>
                    <h4 className="font-medium mb-2">Supported Languages:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {feature.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {feature.types && (
                  <div>
                    <h4 className="font-medium mb-2">Content Types:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {feature.types.map((type, idx) => (
                        <Badge key={idx} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {feature.tracks && (
                  <div>
                    <h4 className="font-medium mb-2">Learning Tracks:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {feature.tracks.map((track, idx) => (
                        <Badge key={idx} variant="outline">{track}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {feature.rewards && (
                  <div>
                    <h4 className="font-medium mb-2">Rewards:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {feature.rewards.map((reward, idx) => (
                        <Badge key={idx} variant="outline" className="text-accent border-accent">{reward}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Course Highlights
          </CardTitle>
          <CardDescription>
            Comprehensive courses designed to take you from beginner to blockchain expert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courseHighlights.map((course, index) => (
              <Card key={index} className={`${course.color} border`}>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {course.icon}
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{course.projects} projects</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Sample Coding Projects
          </CardTitle>
          <CardDescription>
            Real-world projects that build your portfolio and earn you bonus rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTypes.map((project, index) => (
              <Card key={index} className="border-l-4 border-l-primary/50">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{project.name}</h3>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-accent" />
                        <span className="text-accent font-medium">{project.points} pts</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{project.language}</Badge>
                      <Badge 
                        variant="outline" 
                        className={
                          project.difficulty === 'Expert' ? 'border-red-500 text-red-500' :
                          project.difficulty === 'Hard' ? 'border-orange-500 text-orange-500' :
                          project.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                          'border-green-500 text-green-500'
                        }
                      >
                        {project.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gamification Features */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Gamification & Rewards System
          </CardTitle>
          <CardDescription>
            Stay motivated with our comprehensive reward system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">XP & Leveling</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Earn XP for every completed task</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Level up to unlock new content</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Bonus XP for perfect scores</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">BLOCK Tokens</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Earn tokens for achievements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Redeem for course discounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Receive in your Web3 wallet</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Unlock achievement badges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Compete on leaderboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Mint NFT certificates</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <CardContent className="pt-8 pb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ready to Start Your Blockchain Journey?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who are already building the future of Web3. 
              Start with our free courses and unlock your potential in blockchain development.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Learning for Free
              </Button>
              <Button size="lg" variant="outline">
                Explore Premium Courses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}