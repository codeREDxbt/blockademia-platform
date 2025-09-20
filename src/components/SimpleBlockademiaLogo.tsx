interface SimpleBlockademiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SimpleBlockademiaLogo({ className = '', size = 'md' }: SimpleBlockademiaLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer hexagonal ring */}
        <path
          d="M50 5 L80 25 L80 60 L50 80 L20 60 L20 25 Z"
          stroke="#ffd700"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Inner hexagonal core */}
        <path
          d="M50 15 L70 30 L70 55 L50 70 L30 55 L30 30 Z"
          stroke="#00ff88"
          strokeWidth="2"
          fill="rgba(0, 255, 136, 0.1)"
        />
        
        {/* Central "A" */}
        <g>
          {/* Top peak of "A" */}
          <polygon
            points="50,28 46,38 54,38"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="1"
          />
          
          {/* Cross bar of "A" */}
          <rect
            x="44"
            y="43"
            width="12"
            height="3"
            rx="1"
            fill="#00ff88"
            stroke="#1e40af"
            strokeWidth="1"
          />
          
          {/* Left leg */}
          <rect
            x="40"
            y="46"
            width="3"
            height="12"
            rx="1"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="1"
          />
          
          {/* Right leg */}
          <rect
            x="57"
            y="46"
            width="3"
            height="12"
            rx="1"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="1"
          />
        </g>
        
        {/* Static knowledge nodes */}
        <circle cx="82" cy="32" r="2" fill="#ffd700" />
        <circle cx="68" cy="18" r="2" fill="#00ff88" />
        <circle cx="32" cy="18" r="2" fill="#ffd700" />
        <circle cx="18" cy="32" r="2" fill="#00ff88" />
        <circle cx="18" cy="68" r="2" fill="#ffd700" />
        <circle cx="82" cy="68" r="2" fill="#00ff88" />
      </svg>
    </div>
  );
}