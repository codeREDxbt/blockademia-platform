export default function QuickLogo() {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-heading">Blockademia Quick Logo Download</h2>
      <p className="text-muted-foreground text-center">Right-click on the logo below and select "Save image as..." to download</p>
      
      {/* Downloadable Logo Image */}
      <div className="relative">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="border border-border rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          style={{ backgroundColor: '#0a0a0f' }}
        >
          {/* Background */}
          <rect width="300" height="300" fill="#0a0a0f" rx="24"/>
          
          {/* Background Pattern */}
          <defs>
            <pattern id="quickGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="300" height="300" fill="url(#quickGrid)"/>
          
          {/* Central Design */}
          <g transform="translate(150, 120)">
            {/* Outer Ring */}
            <circle r="60" fill="none" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="2" strokeDasharray="8 4"/>
            
            {/* Inner Circle */}
            <circle r="35" fill="rgba(0, 255, 136, 0.1)" stroke="rgba(255, 215, 0, 0.4)" strokeWidth="1"/>
            
            {/* Central Icon */}
            <rect x="-12" y="-12" width="24" height="24" fill="none" stroke="#00ff88" strokeWidth="2" rx="3"/>
            <rect x="-8" y="-8" width="4" height="4" fill="#00ff88"/>
            <rect x="0" y="-8" width="4" height="4" fill="#00ff88"/>
            <rect x="-8" y="0" width="4" height="4" fill="#00ff88"/>
            <rect x="0" y="0" width="4" height="4" fill="#00ff88"/>
            <rect x="-4" y="-4" width="4" height="4" fill="#ffd700"/>
            
            {/* Book Overlay */}
            <path d="M -15 -12 L -15 12 L 10 12 L 10 -7 L -5 -12 Z" fill="rgba(255, 215, 0, 0.7)" stroke="#ffd700" strokeWidth="1"/>
            <line x1="-10" y1="-3" x2="5" y2="-3" stroke="#0a0a0f" strokeWidth="1"/>
            <line x1="-10" y1="2" x2="5" y2="2" stroke="#0a0a0f" strokeWidth="1"/>
            <line x1="-10" y1="7" x2="0" y2="7" stroke="#0a0a0f" strokeWidth="1"/>
          </g>
          
          {/* Brand Name */}
          <text x="150" y="220" textAnchor="middle" fill="url(#quickTextGradient)" fontSize="28" fontFamily="Space Grotesk, sans-serif" fontWeight="bold">
            Blockademia
          </text>
          
          {/* Tagline */}
          <text x="150" y="245" textAnchor="middle" fill="rgba(255, 255, 255, 0.7)" fontSize="12" fontFamily="JetBrains Mono, monospace">
            Learn • Build • Earn
          </text>
          
          {/* Corner Accents */}
          <circle cx="30" cy="30" r="3" fill="rgba(255, 215, 0, 0.6)"/>
          <circle cx="270" cy="30" r="3" fill="rgba(0, 255, 136, 0.6)"/>
          <circle cx="30" cy="270" r="3" fill="rgba(0, 255, 136, 0.6)"/>
          <circle cx="270" cy="270" r="3" fill="rgba(255, 215, 0, 0.6)"/>
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="quickTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd700"/>
              <stop offset="100%" stopColor="#00ff88"/>
            </linearGradient>
          </defs>
        </svg>
        
        {/* Download hint */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground text-center">
          Right-click → Save image as...
        </div>
      </div>
      
      {/* Alternative formats */}
      <div className="flex flex-wrap gap-3 mt-8">
        <a 
          href="/logo-download" 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent border border-accent rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          More Options
        </a>
      </div>
      
      {/* Quick instructions */}
      <div className="max-w-md text-center text-sm text-muted-foreground space-y-1">
        <p><strong>For JPEG:</strong> Right-click → Save as → Change format to JPEG</p>
        <p><strong>For PNG:</strong> Right-click → Save as → Keep PNG format</p>
        <p><strong>Size:</strong> 300x300px - Perfect for social media and documents</p>
      </div>
    </div>
  );
}
