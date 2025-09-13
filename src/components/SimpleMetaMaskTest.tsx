import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// This is the most basic MetaMask test possible - no contexts, no complex logic
export default function SimpleMetaMaskTest() {
  const [result, setResult] = useState<string>('Click test to start');
  const [loading, setLoading] = useState(false);

  const runBasicTest = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Step 1: Check if window.ethereum exists
      console.log('Step 1: Checking window.ethereum...');
      if (!window.ethereum) {
        setResult('❌ FAILED: window.ethereum not found. MetaMask not installed.');
        setLoading(false);
        return;
      }
      
      console.log('✅ window.ethereum found');
      
      // Step 2: Check if it's MetaMask
      console.log('Step 2: Checking if MetaMask...');
      console.log('isMetaMask:', window.ethereum.isMetaMask);
      
      // Step 3: Try the most basic request
      console.log('Step 3: Making eth_requestAccounts request...');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      console.log('✅ Success! Accounts:', accounts);
      setResult(`✅ SUCCESS! Connected to ${accounts.length} accounts. First account: ${accounts[0]?.slice(0, 6)}...${accounts[0]?.slice(-4)}`);
      
    } catch (error: any) {
      console.error('❌ Error:', error);
      setResult(`❌ ERROR: ${error.message || 'Unknown error'} (Code: ${error.code || 'N/A'})`);
    }
    
    setLoading(false);
  };

  const checkEnvironment = () => {
    const info = {
      hasWindow: typeof window !== 'undefined',
      hasEthereum: !!(window as any).ethereum,
      isMetaMask: !!(window as any).ethereum?.isMetaMask,
      userAgent: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other',
      providersCount: (window as any).ethereum?.providers?.length || 0
    };
    
    console.log('Environment check:', info);
    setResult(`Environment: ${JSON.stringify(info, null, 2)}`);
  };

  const forceMetaMaskOpen = () => {
    // Try multiple ways to trigger MetaMask
    console.log('Forcing MetaMask open...');
    
    if ((window as any).ethereum) {
      // Method 1: Direct call
      (window as any).ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          console.log('Force open success:', accounts);
          setResult(`🚀 FORCE SUCCESS: ${accounts.length} accounts`);
        })
        .catch((error: any) => {
          console.log('Force open failed:', error);
          setResult(`🚀 FORCE FAILED: ${error.message}`);
        });
    } else {
      setResult('🚀 FORCE FAILED: No ethereum object');
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>🧪 Isolated MetaMask Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            onClick={runBasicTest} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : '🔥 Run Basic MetaMask Test'}
          </Button>
          
          <Button 
            onClick={checkEnvironment}
            variant="outline"
            className="w-full"
          >
            🔍 Check Environment
          </Button>
          
          <Button 
            onClick={forceMetaMaskOpen}
            variant="outline"
            className="w-full"
          >
            🚀 Force MetaMask Open
          </Button>
        </div>
        
        <div className="p-4 bg-muted/20 rounded-lg">
          <pre className="text-xs whitespace-pre-wrap">{result}</pre>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div>• This test bypasses all app logic</div>
          <div>• Check browser console for detailed logs</div>
          <div>• Try each button if others fail</div>
        </div>
      </CardContent>
    </Card>
  );
}
