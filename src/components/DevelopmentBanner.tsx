import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Settings, ExternalLink } from 'lucide-react';
import { validateConfig } from '../config/blockchain';

export default function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  useEffect(() => {
    const validation = validateConfig();
    const dismissed = localStorage.getItem('dev-banner-dismissed') === 'true';
    
    // Show banner only in development mode if not dismissed
    if (validation.isMock && !dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('dev-banner-dismissed', 'true');
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <Alert className="border-primary/30 bg-primary/5 mb-4">
      <Settings className="h-4 w-4 text-primary" />
      <AlertDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary/30">
              Development Mode
            </Badge>
            <span className="text-sm">
              Using mock Monad testnet integration. 
            </span>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-primary underline"
              asChild
            >
              <a href="/monad-setup">
                Configure real contract <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-auto p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
