import { 
  Code, 
  BookOpen, 
  GraduationCap, 
  Laptop, 
  Zap, 
  Terminal, 
  Cpu, 
  Database,
  Blocks,
  Braces,
  Hash,
  Binary
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingObjects() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Code symbols that float across the screen
  const codeSymbols = [
    { symbol: '{', delay: '0s', duration: '20s' },
    { symbol: '}', delay: '5s', duration: '25s' },
    { symbol: '<>', delay: '10s', duration: '18s' },
    { symbol: '[]', delay: '15s', duration: '22s' },
    { symbol: '()', delay: '8s', duration: '24s' },
    { symbol: '/>', delay: '12s', duration: '19s' }
  ];

  // Learning objects
  const learningObjects = [
    { icon: BookOpen, top: '20%', left: '10%', animation: 'float-slow' },
    { icon: GraduationCap, top: '60%', left: '80%', animation: 'bounce-gentle' },
    { icon: Laptop, top: '40%', left: '5%', animation: 'float-fast' },
    { icon: Terminal, top: '70%', left: '90%', animation: 'pulse-scale' },
    { icon: Cpu, top: '30%', left: '85%', animation: 'float-slow' },
    { icon: Database, top: '80%', left: '15%', animation: 'bounce-gentle' }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
      {/* Floating Code Symbols */}
      <div className="absolute inset-0">
        {codeSymbols.map((item, index) => (
          <div
            key={index}
            className="absolute text-2xl font-code text-accent/20 drift-left"
            style={{
              top: `${20 + (index * 15)}%`,
              animationDelay: item.delay,
              animationDuration: item.duration
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Learning Objects */}
      <div className="absolute inset-0">
        {learningObjects.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`absolute ${item.animation}`}
              style={{
                top: item.top,
                left: item.left,
                transform: `translateY(${scrollY * 0.1}px)`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <Icon className="w-8 h-8 text-primary/30 hover:text-primary/60 transition-colors duration-300" />
            </div>
          );
        })}
      </div>

      {/* Binary Rain Effect */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-sm font-code text-secondary/15 code-rain"
            style={{
              left: `${10 + (i * 12)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + (i * 2)}s`
            }}
          >
            {Math.random() > 0.5 ? '1010101' : '0101010'}
          </div>
        ))}
      </div>

      {/* Blockchain Blocks */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute float-slow"
            style={{
              top: `${25 + (i * 20)}%`,
              right: `${10 + (i * 15)}%`,
              animationDelay: `${i * 1.5}s`,
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            <Blocks className="w-6 h-6 text-accent/25 hover:text-accent/50 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Floating Programming Symbols */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-[15%] left-[20%] float-fast"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <Hash className="w-5 h-5 text-primary/30" />
        </div>
        <div 
          className="absolute top-[45%] left-[75%] bounce-gentle"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        >
          <Code className="w-6 h-6 text-accent/30" />
        </div>
        <div 
          className="absolute top-[65%] left-[25%] pulse-scale"
          style={{ transform: `translateY(${scrollY * 0.06}px)` }}
        >
          <Braces className="w-5 h-5 text-secondary/30" />
        </div>
        <div 
          className="absolute top-[35%] left-[60%] float-slow"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Zap className="w-5 h-5 text-primary/30" />
        </div>
      </div>

      {/* Scroll-based Moving Elements */}
      <div 
        className="absolute top-[50%] left-0 w-16 h-16 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-xl"
        style={{
          transform: `translateX(${scrollY * 0.3}px) translateY(${Math.sin(scrollY * 0.01) * 20}px)`
        }}
      />
      <div 
        className="absolute top-[30%] right-0 w-12 h-12 bg-gradient-to-l from-secondary/10 to-accent/10 rounded-full blur-xl"
        style={{
          transform: `translateX(${-scrollY * 0.2}px) translateY(${Math.cos(scrollY * 0.008) * 30}px)`
        }}
      />

      {/* Tech Keywords Floating */}
      <div className="absolute inset-0 font-tech text-xs">
        {['React', 'Node.js', 'Python', 'AI', 'Web3', 'Blockchain'].map((tech, i) => (
          <div
            key={tech}
            className="absolute text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors duration-300"
            style={{
              top: `${15 + (i * 15)}%`,
              left: `${5 + (i * 18)}%`,
              transform: `translateY(${scrollY * (0.05 + i * 0.01)}px)`,
              animation: `float-slow ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
