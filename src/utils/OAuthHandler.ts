import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivnxbxbkadumzklsuwob.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bnhieGJrYWR1bXprbHN1d29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzAyMzMsImV4cCI6MjA3Mjg0NjIzM30.KyuT2oB2v55SeXHGAT7GHn4_waqpF3FuRFNkXIi259s';

const supabase = createClient(supabaseUrl, supabaseKey);

export class OAuthHandler {
  static async handleCallback(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('OAuthHandler: Starting callback processing...');
      
      // Get all URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      const accessToken = urlParams.get('access_token') || hashParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token') || hashParams.get('refresh_token');
      const expiresIn = urlParams.get('expires_in') || hashParams.get('expires_in');
      const tokenType = urlParams.get('token_type') || hashParams.get('token_type');
      const error = urlParams.get('error') || hashParams.get('error');
      const code = urlParams.get('code');
      
      console.log('OAuthHandler: URL analysis', {
        accessToken: !!accessToken,
        refreshToken: !!refreshToken,
        expiresIn,
        tokenType,
        error,
        code: !!code,
        fullSearch: window.location.search,
        fullHash: window.location.hash
      });
      
      if (error) {
        console.error('OAuth error from URL:', error);
        return { success: false, error: `OAuth error: ${error}` };
      }
      
      // If we have tokens, manually set the session
      if (accessToken) {
        console.log('OAuthHandler: Found access token, setting session...');
        
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });
        
        if (sessionError) {
          console.error('Failed to set session:', sessionError);
          return { success: false, error: sessionError.message };
        }
        
        if (data.session) {
          console.log('OAuthHandler: Session set successfully');
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
          return { success: true };
        }
      }
      
      // If we have an authorization code, exchange it
      if (code) {
        console.log('OAuthHandler: Found authorization code, exchanging...');
        
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          console.error('Failed to exchange code:', exchangeError);
          return { success: false, error: exchangeError.message };
        }
        
        if (data.session) {
          console.log('OAuthHandler: Code exchange successful');
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
          return { success: true };
        }
      }
      
      // Try getting current session as fallback
      console.log('OAuthHandler: No tokens found, checking current session...');
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session check failed:', sessionError);
        return { success: false, error: sessionError.message };
      }
      
      if (sessionData.session) {
        console.log('OAuthHandler: Found existing session');
        return { success: true };
      }
      
      console.log('OAuthHandler: No session found');
      return { success: false, error: 'No OAuth data found in callback' };
      
    } catch (error) {
      console.error('OAuthHandler: Unexpected error:', error);
      return { success: false, error: `Unexpected error: ${error.message}` };
    }
  }
  
  static isOAuthCallback(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    return !!(
      urlParams.get('access_token') || 
      hashParams.get('access_token') ||
      urlParams.get('code') ||
      urlParams.get('error') ||
      hashParams.get('error')
    );
  }
}