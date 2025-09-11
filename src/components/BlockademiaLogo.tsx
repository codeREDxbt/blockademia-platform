import { motion } from 'motion/react';

interface BlockademiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function BlockademiaLogo({ className = '', size = 'md' }: BlockademiaLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className} relative`}
      whileHover={{ scale: 1.05 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 2, -2, 0] }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer hexagonal ring */}
        <motion.path
          d="M50 5 L80 25 L80 60 L50 80 L20 60 L20 25 Z"
          stroke="url(#primaryGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Inner hexagonal core */}
        <motion.path
          d="M50 15 L70 30 L70 55 L50 70 L30 55 L30 30 Z"
          stroke="url(#accentGradient)"
          strokeWidth="2"
          fill="url(#coreGradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Central "A" styled as academic/blockchain blocks */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Top peak of "A" */}
          <polygon
            points="50,28 46,38 54,38"
            fill="url(#blockGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Left side of "A" */}
          <rect
            x="39"
            y="38"
            width="12"
            height="3"
            rx="1"
            fill="url(#blockGradient)"
            stroke="currentColor"
            strokeWidth="1"
            transform="rotate(25 45 40)"
          />
          
          {/* Right side of "A" */}
          <rect
            x="49"
            y="38"
            width="12"
            height="3"
            rx="1"
            fill="url(#blockGradient)"
            stroke="currentColor"
            strokeWidth="1"
            transform="rotate(-25 55 40)"
          />
          
          {/* Cross bar of "A" */}
          <rect
            x="44"
            y="43"
            width="12"
            height="3"
            rx="1"
            fill="url(#accentGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Left leg */}
          <rect
            x="40"
            y="46"
            width="3"
            height="12"
            rx="1"
            fill="url(#blockGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Right leg */}
          <rect
            x="57"
            y="46"
            width="3"
            height="12"
            rx="1"
            fill="url(#blockGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.g>
        
        {/* Rotating orbital rings representing knowledge flow */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 5"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        />
        
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#orbitGradient2)"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="3 7"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        />
        
        {/* Knowledge nodes representing learning points */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => (
          <motion.circle
            key={index}
            cx={50 + 32 * Math.cos((angle * Math.PI) / 180)}
            cy={50 + 32 * Math.sin((angle * Math.PI) / 180)}
            r="2"
            fill="url(#nodeGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ 
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#ffed4a" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#00e676" />
          </linearGradient>
          
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 255, 136, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 215, 0, 0.05)" />
          </radialGradient>
          
          <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0.3)" />
          </linearGradient>
          
          <linearGradient id="orbitGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 136, 0.2)" />
            <stop offset="100%" stopColor="rgba(30, 64, 175, 0.2)" />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#ffd700" />
          </radialGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
