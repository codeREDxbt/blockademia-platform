import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { Separator } from './ui/separator';

interface DebugInfo {
  hasWindow: boolean;
  hasEthereum: boolean;
  isMetaMask: boolean;
  hasProviders: boolean;
  providersCount: number;
  providers: any[];
  userAgent: string;
  isExtensionInstalled: boolean;
}

export default function MetaMaskDebugger() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runDiagnostic = () => {
    setIsLoading(true);
    
    // Wait a moment to ensure all extensions are loaded
    setTimeout(() => {
      const info: DebugInfo = {
        hasWindow: typeof window !== 'undefined',
        hasEthereum: !!(window as any).ethereum,
        isMetaMask: !!(window as any).ethereum?.isMetaMask,
        hasProviders: !!(window as any).ethereum?.providers,
        providersCount: (window as any).ethereum?.providers?.length || 0,
        providers: (window as any).ethereum?.providers || [],
        userAgent: navigator.userAgent,
        isExtensionInstalled: !!(window as any).ethereum
      };
      
      setDebugInfo(info);
      setIsLoading(false);
      
      console.log('🔍 MetaMask Diagnostic Results:', info);
    }, 500);
  };

  const testDirectConnection = async () => {
    try {
      if (!(window as any).ethereum) {
        toast.error('No Ethereum provider found');
        return;
      }

      console.log('🧪 Testing direct MetaMask connection...');
      
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      console.log('✅ Success! Accounts:', accounts);
      toast.success('MetaMask connection successful!', {
        description: `Connected to ${accounts.length} account(s)`
      });
      
    } catch (error: any) {
      console.error('❌ Direct connection failed:', error);
      toast.error('Direct connection failed', {
        description: error.message || 'Unknown error'
      });
    }
  };

  const testProviderLoop = async () => {
    if (!(window as any).ethereum?.providers) {
      toast.error('No providers array found');
      return;
    }

    for (let i = 0; i < (window as any).ethereum.providers.length; i++) {
      const provider = (window as any).ethereum.providers[i];
      console.log(`🔍 Provider ${i}:`, {
        isMetaMask: provider.isMetaMask,
        name: provider.name,
        chainId: provider.chainId
      });
      
      if (provider.isMetaMask) {
        try {
          const accounts = await provider.request({
            method: 'eth_requestAccounts',
          });
          toast.success(`MetaMask found at index ${i}!`, {
            description: `Connected to ${accounts.length} account(s)`
          });
          return;
        } catch (error: any) {
          console.error(`❌ Provider ${i} failed:`, error);
        }
      }
    }
    
    toast.error('No working MetaMask provider found');
  };

  const openMetaMaskDirectly = () => {
    // Try various methods to detect and open MetaMask
    const methods = [
      () => window.open('https://metamask.app.link/', '_blank'),
      () => window.location.href = 'https://metamask.app.link/',
      () => {
        // Try to trigger metamask through custom protocol
        const link = document.createElement('a');
        link.href = 'metamask://';
        link.click();
      }
    ];

    methods[0](); // Try opening MetaMask
    toast.info('Attempting to open MetaMask...', {
      description: 'If installed, MetaMask should open'
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔧 MetaMask Connection Debugger
        </CardTitle>
        <CardDescription>
          Comprehensive debugging tool for MetaMask connection issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Run Diagnostic */}
        <div className="space-y-2">
          <Button 
            onClick={runDiagnostic} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Running Diagnostic...' : '🔍 Run Complete Diagnostic'}
          </Button>
        </div>

        {/* Show Diagnostic Results */}
        {debugInfo && (
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h3 className="font-medium">Diagnostic Results:</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between">
                <span>Window Object:</span>
                <Badge variant={debugInfo.hasWindow ? "default" : "destructive"}>
                  {debugInfo.hasWindow ? "✅" : "❌"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Ethereum Provider:</span>
                <Badge variant={debugInfo.hasEthereum ? "default" : "destructive"}>
                  {debugInfo.hasEthereum ? "✅" : "❌"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Is MetaMask:</span>
                <Badge variant={debugInfo.isMetaMask ? "default" : "destructive"}>
                  {debugInfo.isMetaMask ? "✅" : "❌"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Has Providers:</span>
                <Badge variant={debugInfo.hasProviders ? "default" : "secondary"}>
                  {debugInfo.hasProviders ? "✅" : "❌"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between col-span-2">
                <span>Providers Count:</span>
                <Badge variant="outline">
                  {debugInfo.providersCount}
                </Badge>
              </div>
            </div>

            {debugInfo.providers.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Detected Providers:</h4>
                {debugInfo.providers.map((provider, index) => (
                  <div key={index} className="text-xs p-2 bg-background rounded border">
                    <div>Index {index}: {provider.isMetaMask ? "MetaMask" : provider.name || "Unknown"}</div>
                    <div className="text-muted-foreground">
                      isMetaMask: {provider.isMetaMask ? "true" : "false"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Connection Tests */}
        <div className="space-y-2">
          <h3 className="font-medium">Connection Tests:</h3>
          
          <Button 
            onClick={testDirectConnection}
            variant="outline"
            className="w-full"
          >
            🧪 Test Direct Connection
          </Button>
          
          <Button 
            onClick={testProviderLoop}
            variant="outline"
            className="w-full"
          >
            🔄 Test All Providers
          </Button>
          
          <Button 
            onClick={openMetaMaskDirectly}
            variant="outline"
            className="w-full"
          >
            🦊 Try to Open MetaMask
          </Button>
        </div>

        <Separator />

        {/* Troubleshooting Steps */}
        <div className="space-y-2">
          <h3 className="font-medium">Troubleshooting Steps:</h3>
          <div className="text-sm space-y-1 text-muted-foreground">
            <div>1. Make sure MetaMask extension is installed and enabled</div>
            <div>2. Try refreshing the page after installing MetaMask</div>
            <div>3. Check if MetaMask is locked (click the extension icon)</div>
            <div>4. Disable other wallet extensions temporarily</div>
            <div>5. Try in incognito/private mode</div>
            <div>6. Check browser console for error messages</div>
          </div>
        </div>

        {/* Browser Info */}
        {debugInfo && (
          <div className="text-xs text-muted-foreground">
            <div className="truncate">
              Browser: {debugInfo.userAgent.slice(0, 100)}...
            </div>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
}
