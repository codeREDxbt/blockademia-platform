import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  Info, 
  RefreshCw,
  User,
  AlertTriangle,
  TestTube
} from 'lucide-react';

export default function EmailConfirmationDebugger() {
  const { resendConfirmation } = useAuth();
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<{
    action: string;
    status: 'success' | 'error' | 'info';
    message: string;
    timestamp: string;
  }>>([]);

  const addResult = (action: string, status: 'success' | 'error' | 'info', message: string) => {
    setResults(prev => [...prev, {
      action,
      status,
      message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testEmailConfirmation = async () => {
    setIsLoading(true);
    addResult('Test Started', 'info', `Testing email confirmation for: ${testEmail}`);
    
    try {
      const result = await resendConfirmation(testEmail);
      if (result.success) {
        addResult('Resend Success', 'success', result.message);
      } else {
        addResult('Resend Failed', 'error', result.message);
      }
    } catch (error: any) {
      addResult('Resend Error', 'error', error.message || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateEmailConfirmed = () => {
    addResult('Demo Confirmation', 'success', 'Simulated email confirmation - user can now sign in');
  };

  const checkSupabaseConfig = () => {
    const hasSupabaseConfig = !!(window as any).supabase || 
                              localStorage.getItem('supabase_token') ||
                              document.querySelector('meta[name="supabase-url"]');
    
    if (hasSupabaseConfig) {
      addResult('Config Check', 'success', 'Supabase configuration detected');
    } else {
      addResult('Config Check', 'error', 'Supabase configuration not found - check env variables');
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const getStatusIcon = (status: 'success' | 'error' | 'info') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: 'success' | 'error' | 'info') => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Success</Badge>;
      case 'error':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
      default:
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Info</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-accent" />
          Email Confirmation Debugger
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Test Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Test Email Address:</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground"
              placeholder="Enter email to test"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={testEmailConfirmation}
              disabled={isLoading || !testEmail}
              className="bg-accent hover:bg-accent/90"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Test Resend Email
                </>
              )}
            </Button>
            
            <Button
              onClick={simulateEmailConfirmed}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Simulate Confirmed
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={checkSupabaseConfig}
              variant="outline"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Check Config
            </Button>
            
            <Button
              onClick={clearResults}
              variant="ghost"
              className="text-muted-foreground"
            >
              Clear Results
            </Button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Info className="w-4 h-4" />
              Test Results
            </h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50"
                >
                  {getStatusIcon(result.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{result.action}</span>
                      {getStatusBadge(result.status)}
                      <span className="text-xs text-muted-foreground">{result.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-medium text-blue-500 flex items-center gap-2">
            <Info className="w-4 h-4" />
            How to Test Email Confirmation
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
            <li>Sign up with a new email address</li>
            <li>Try to sign in before confirming - should show confirmation UI</li>
            <li>Use "Simulate Confirmed" to mark email as confirmed for testing</li>
            <li>Use "Test Resend Email" to test the resend functionality</li>
            <li>Check your email configuration if resend fails</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}