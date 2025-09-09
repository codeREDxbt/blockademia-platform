export default function BlockademiaLogoSVG() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h2 className="text-2xl font-heading">Blockademia Logo - Right-click to save</h2>
      
      {/* Main Logo SVG */}
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="border border-border rounded-2xl bg-background"
      >
        {/* Background */}
        <rect width="400" height="400" fill="#0a0a0f" rx="32"/>
        
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid)"/>
        
        {/* Outer Ring */}
        <circle
          cx="200"
          cy="160"
          r="80"
          fill="none"
          stroke="rgba(0, 255, 136, 0.3)"
          strokeWidth="3"
          strokeDasharray="10 5"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 200 160"
            to="360 200 160"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Middle Ring */}
        <circle
          cx="200"
          cy="160"
          r="60"
          fill="none"
          stroke="rgba(255, 215, 0, 0.4)"
          strokeWidth="2"
          strokeDasharray="8 4"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 200 160"
            to="0 200 160"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Inner Circle */}
        <circle
          cx="200"
          cy="160"
          r="40"
          fill="rgba(0, 255, 136, 0.1)"
          stroke="rgba(255, 215, 0, 0.3)"
          strokeWidth="1"
        />
        
        {/* Central Icons */}
        {/* CPU/Chip Icon */}
        <rect
          x="185"
          y="145"
          width="30"
          height="30"
          fill="none"
          stroke="#00ff88"
          strokeWidth="2"
          rx="4"
        />
        <rect x="190" y="150" width="5" height="5" fill="#00ff88"/>
        <rect x="200" y="150" width="5" height="5" fill="#00ff88"/>
        <rect x="190" y="160" width="5" height="5" fill="#00ff88"/>
        <rect x="200" y="160" width="5" height="5" fill="#00ff88"/>
        <rect x="195" y="155" width="5" height="5" fill="#ffd700"/>
        
        {/* Book Icon Overlay */}
        <path
          d="M 180 145 L 180 175 L 210 175 L 210 150 L 190 145 Z"
          fill="rgba(255, 215, 0, 0.7)"
          stroke="#ffd700"
          strokeWidth="1"
        />
        <line x1="185" y1="155" x2="200" y2="155" stroke="#0a0a0f" strokeWidth="1"/>
        <line x1="185" y1="160" x2="200" y2="160" stroke="#0a0a0f" strokeWidth="1"/>
        <line x1="185" y1="165" x2="195" y2="165" stroke="#0a0a0f" strokeWidth="1"/>
        
        {/* Brand Name */}
        <text
          x="200"
          y="250"
          textAnchor="middle"
          fill="url(#textGradient)"
          fontSize="36"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="bold"
        >
          Blockademia
        </text>
        
        {/* Tagline */}
        <text
          x="200"
          y="280"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="14"
          fontFamily="JetBrains Mono, monospace"
        >
          Learn • Build • Earn
        </text>
        
        {/* Corner Decorations */}
        <polygon points="40,40 50,30 60,40 50,50" fill="rgba(255, 215, 0, 0.6)"/>
        <polygon points="340,40 350,30 360,40 350,50" fill="rgba(0, 255, 136, 0.6)"/>
        <polygon points="40,360 50,350 60,360 50,370" fill="rgba(0, 255, 136, 0.6)"/>
        <polygon points="340,360 350,350 360,360 350,370" fill="rgba(255, 215, 0, 0.6)"/>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd700"/>
            <stop offset="100%" stopColor="#00ff88"/>
          </linearGradient>
        </defs>
      </svg>
      
      {/* Alternative Minimal Logo */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-center">Minimal Version</h3>
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="border border-border rounded-xl bg-background"
        >
          <rect width="200" height="200" fill="#0a0a0f" rx="16"/>
          
          {/* Simple Circle */}
          <circle
            cx="100"
            cy="80"
            r="30"
            fill="rgba(0, 255, 136, 0.1)"
            stroke="#00ff88"
            strokeWidth="2"
          />
          
          {/* Book Icon */}
          <path
            d="M 85 70 L 85 90 L 110 90 L 110 75 L 95 70 Z"
            fill="#ffd700"
            stroke="#ffd700"
            strokeWidth="1"
          />
          <line x1="90" y1="78" x2="105" y2="78" stroke="#0a0a0f" strokeWidth="1"/>
          <line x1="90" y1="83" x2="105" y2="83" stroke="#0a0a0f" strokeWidth="1"/>
          
          {/* Text */}
          <text
            x="100"
            y="130"
            textAnchor="middle"
            fill="url(#miniGradient)"
            fontSize="18"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="bold"
          >
            B
          </text>
          
          <defs>
            <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd700"/>
              <stop offset="100%" stopColor="#00ff88"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Download Instructions */}
      <div className="max-w-2xl text-center space-y-4">
        <h3 className="text-lg font-heading">Download Instructions</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Option 1:</strong> Right-click on any logo above → "Save image as..." → Choose JPEG or PNG</p>
          <p><strong>Option 2:</strong> Screenshot the logo area and crop to desired size</p>
          <p><strong>Option 3:</strong> Copy the SVG code below for infinite scalability</p>
        </div>
      </div>
      
      {/* SVG Code for Copy-Paste */}
      <details className="w-full max-w-4xl">
        <summary className="cursor-pointer text-center p-4 bg-card rounded-lg border border-border">
          Click to view SVG code for copy-paste
        </summary>
        <pre className="mt-4 p-4 bg-muted rounded-lg text-xs overflow-x-auto">
{`<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#0a0a0f" rx="32"/>
  <circle cx="200" cy="160" r="40" fill="rgba(0, 255, 136, 0.1)" stroke="rgba(255, 215, 0, 0.3)" stroke-width="1"/>
  <rect x="185" y="145" width="30" height="30" fill="none" stroke="#00ff88" stroke-width="2" rx="4"/>
  <path d="M 180 145 L 180 175 L 210 175 L 210 150 L 190 145 Z" fill="rgba(255, 215, 0, 0.7)"/>
  <text x="200" y="250" text-anchor="middle" fill="url(#textGradient)" font-size="36" font-weight="bold">Blockademia</text>
  <defs>
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#00ff88"/>
    </linearGradient>
  </defs>
</svg>`}
        </pre>
      </details>
    </div>
  );
}