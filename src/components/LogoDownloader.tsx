import { useRef } from 'react';
import { Download, Cpu, BookOpen, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import BlockademiaLogoSVG from './BlockademiaLogoSVG';
// import html2canvas from 'html2canvas'; // Will be added via npm install

export default function LogoDownloader() {
  const logoRef = useRef<HTMLDivElement>(null);

  const downloadAsJPEG = async () => {
    // For now, we'll provide instructions to screenshot
    alert('To download: \n1. Right-click on the logo above\n2. Select "Save image as..."\n3. Choose JPEG format\n\nAlternatively, take a screenshot of the logo area.');
  };

  const downloadAsPNG = async () => {
    // For now, we'll provide instructions to screenshot  
    alert('To download: \n1. Right-click on the logo above\n2. Select "Save image as..."\n3. Choose PNG format\n\nAlternatively, take a screenshot of the logo area.');
  };

  return (
    <div className="min-h-screen pt-20 container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading mb-4">
          Blockademia{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Logo Generator
          </span>
        </h1>
        <p className="text-muted-foreground">
          Download high-resolution logo files for your Blockademia project
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo Preview */}
        <Card className="glass-glow">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-xl font-semibold mb-6">Logo Preview</h3>
              
              {/* Primary Logo Design */}
              <div
                ref={logoRef}
                className="inline-flex items-center justify-center w-80 h-80 mx-auto bg-gradient-to-br from-background via-card to-background rounded-3xl relative overflow-hidden"
                style={{ backgroundColor: '#0a0a0f' }}
              >
                {/* Blockchain Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="border border-accent/20"
                        style={{
                          background: i % 3 === 0 ? 'rgba(0, 255, 136, 0.1)' : 
                                    i % 5 === 0 ? 'rgba(255, 215, 0, 0.1)' : 
                                    'transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Central Logo Element */}
                <div className="relative z-10 text-center">
                  {/* Icon Container */}
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-spin" style={{ animationDuration: '8s' }}></div>
                    
                    {/* Middle Ring */}
                    <div className="absolute inset-2 rounded-full border-3 border-primary/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                    
                    {/* Inner Circle with Icons */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="relative">
                        <Cpu className="w-8 h-8 text-accent absolute -top-1 -left-1" />
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Blockademia
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-accent"></div>
                      <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                        Learn • Build • Earn
                      </Badge>
                      <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-primary"></div>
                    </div>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4">
                  <Zap className="w-6 h-6 text-primary/60" />
                </div>
                <div className="absolute top-4 right-4">
                  <Zap className="w-6 h-6 text-accent/60" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Zap className="w-6 h-6 text-accent/60" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Zap className="w-6 h-6 text-primary/60" />
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  onClick={downloadAsJPEG}
                  className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download JPEG
                </Button>
                
                <Button
                  onClick={downloadAsPNG}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Logo Designs */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-glow">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-center">Minimal Version</h4>
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-background to-card rounded-2xl flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    B
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-glow">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-center">Text Only</h4>
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-background to-card rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Blockademia
                  </h2>
                  <div className="text-sm text-muted-foreground mt-1 font-code">
                    Learn • Build • Earn
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SVG Logo Versions */}
        <Card className="glass-glow">
          <CardContent className="p-6">
            <BlockademiaLogoSVG />
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="glass-glow">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Usage Guidelines</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• <strong>JPEG:</strong> Best for social media, presentations, and general web use</p>
              <p>• <strong>PNG:</strong> Best for transparent backgrounds and professional documents</p>
              <p>• <strong>SVG:</strong> Best for websites, infinite scalability, and professional print</p>
              <p>• <strong>Colors:</strong> Primary: #ffd700 (Electric Yellow), Accent: #00ff88 (Neon Green)</p>
              <p>• <strong>Usage:</strong> Right-click any logo above and "Save image as..." for instant download</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}