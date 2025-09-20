interface StaticBlockademiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function StaticBlockademiaLogo({ className = '', size = 'md' }: StaticBlockademiaLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`} style={{ transform: 'scale(1)', transition: 'transform 0.2s' }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Outer hexagonal ring */}
        <path
          d="M50 5 L80 25 L80 60 L50 80 L20 60 L20 25 Z"
          stroke="url(#primaryGradient)"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Inner hexagonal core */}
        <path
          d="M50 15 L70 30 L70 55 L50 70 L30 55 L30 30 Z"
          stroke="url(#accentGradient)"
          strokeWidth="2"
          fill="url(#coreGradient)"
        />
        
        {/* Central "A" styled as academic/blockchain blocks */}
        <g>
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
        </g>
        
        {/* Static orbital rings with CSS animation */}
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 5"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#orbitGradient2)"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="3 7"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Knowledge nodes representing learning points */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => (
          <circle
            key={index}
            cx={50 + 32 * Math.cos((angle * Math.PI) / 180)}
            cy={50 + 32 * Math.sin((angle * Math.PI) / 180)}
            r="2"
            fill="url(#nodeGradient)"
          >
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="1.5s"
              begin={`${index * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
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
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0.3)" />
          </linearGradient>
          
          <linearGradient id="orbitGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 136, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 215, 0, 0.2)" />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#ffd700" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}