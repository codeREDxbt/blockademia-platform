export default function BlockchainBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 opacity-10">
        {/* Hexagonal Grid Pattern */}
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent"
        >
          <defs>
            <pattern
              id="hexagons"
              x="0"
              y="0"
              width="60"
              height="52"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,2 50,16 50,36 30,50 10,36 10,16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Floating Blockchain Nodes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full opacity-30 animate-pulse"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2.5s'
            }}
          >
            {/* Connection Lines */}
            {i < 7 && (
              <div
                className="absolute top-1/2 left-full w-20 h-px bg-gradient-to-r from-accent/30 via-primary/20 to-transparent"
                style={{
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Code-like Matrix Rain Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xs text-secondary/20 font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          >
            {['01', '10', '{}', '<>', '/>', '[]', '()', '&&', '||', '++'][Math.floor(Math.random() * 10)]}
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
              i % 3 === 0 ? 'bg-accent' : i % 3 === 1 ? 'bg-primary' : 'bg-secondary'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-5 blur-3xl"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${30 + (i * 20)}%`,
              background: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--primary)' : 'var(--secondary)',
              animation: `float ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
