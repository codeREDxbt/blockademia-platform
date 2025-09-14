import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { OAuthHandler } from '../utils/OAuthHandler';

export default function OAuthDiagnostic() {
  const { user, session, isLoading } = useAuth();
  const [logs, setLogs] = useState<string[]>([]);
  const [urlInfo, setUrlInfo] = useState<any>({});

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-9), `${timestamp}: ${message}`]);
  };

  useEffect(() => {
    // Monitor URL changes
    const updateUrlInfo = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      setUrlInfo({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        hasAccessToken: !!(urlParams.get('access_token') || hashParams.get('access_token')),
        hasCode: !!urlParams.get('code'),
        hasError: !!(urlParams.get('error') || hashParams.get('error')),
        isOAuthCallback: OAuthHandler.isOAuthCallback()
      });
    };

    updateUrlInfo();
    
    // Log auth state changes
    addLog(`Auth state: user=${!!user}, session=${!!session}, loading=${isLoading}`);
    
    const interval = setInterval(updateUrlInfo, 1000);
    return () => clearInterval(interval);
  }, [user, session, isLoading]);

  const handleTestOAuth = async () => {
    addLog('Testing OAuth callback handling...');
    try {
      const result = await OAuthHandler.handleCallback();
      addLog(`OAuth test result: ${result.success ? 'SUCCESS' : 'FAILED'} - ${result.error || 'OK'}`);
    } catch (error) {
      addLog(`OAuth test error: ${error.message}`);
    }
  };

  const handleForceAuth = () => {
    addLog('Forcing authentication state for testing...');
    // This is a debug function to simulate successful auth
    window.location.href = '/';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-lg text-xs max-w-md max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2 text-yellow-400">OAuth Diagnostic</h3>
      
      <div className="mb-2">
        <p><strong>Current State:</strong></p>
        <p>User: {user ? '✅ EXISTS' : '❌ NULL'}</p>
        <p>Session: {session ? '✅ EXISTS' : '❌ NULL'}</p>
        <p>Loading: {isLoading ? '🔄 TRUE' : '✅ FALSE'}</p>
        <p>Path: {urlInfo.pathname}</p>
      </div>

      <div className="mb-2">
        <p><strong>URL Analysis:</strong></p>
        <p>OAuth Callback: {urlInfo.isOAuthCallback ? '✅ YES' : '❌ NO'}</p>
        <p>Access Token: {urlInfo.hasAccessToken ? '✅ YES' : '❌ NO'}</p>
        <p>Auth Code: {urlInfo.hasCode ? '✅ YES' : '❌ NO'}</p>
        <p>Error: {urlInfo.hasError ? '❌ YES' : '✅ NO'}</p>
      </div>

      <div className="mb-2">
        <p><strong>Recent Logs:</strong></p>
        <div className="text-xs bg-gray-800 p-1 rounded max-h-20 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <button 
          onClick={handleTestOAuth}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
        >
          Test OAuth Handler
        </button>
        <button 
          onClick={handleForceAuth}
          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
        >
          Emergency: Force Auth
        </button>
        <button 
          onClick={() => window.location.href = '/auth'}
          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
        >
          Go to Auth Page
        </button>
      </div>
    </div>
  );
}