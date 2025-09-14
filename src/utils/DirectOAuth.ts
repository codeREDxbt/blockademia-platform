import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivnxbxbkadumzklsuwob.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bnhieGJrYWR1bXprbHN1d29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzAyMzMsImV4cCI6MjA3Mjg0NjIzM30.KyuT2oB2v55SeXHGAT7GHn4_waqpF3FuRFNkXIi259s';

const supabase = createClient(supabaseUrl, supabaseKey);

export class DirectOAuth {
  static async initiateGoogleAuth(): Promise<void> {
    console.log('DirectOAuth: Starting Google authentication...');
    
    try {
      // Use popup mode instead of redirect
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true, // This will return the URL instead of redirecting
        },
      });

      if (error) {
        console.error('DirectOAuth: Error initiating OAuth:', error);
        throw error;
      }

      if (data?.url) {
        console.log('DirectOAuth: Opening OAuth URL:', data.url);
        // Open in same window
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('DirectOAuth: Failed to initiate:', error);
      throw error;
    }
  }

  static async handlePopupCallback(): Promise<{ success: boolean; user?: any; error?: string }> {
    console.log('DirectOAuth: Handling popup callback...');
    
    try {
      // Listen for auth state changes
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('DirectOAuth: Session error:', error);
        return { success: false, error: error.message };
      }

      if (session?.user) {
        console.log('DirectOAuth: User authenticated:', session.user.email);
        return { success: true, user: session.user };
      }

      return { success: false, error: 'No session found' };
    } catch (error) {
      console.error('DirectOAuth: Callback error:', error);
      return { success: false, error: error.message };
    }
  }

  static async createTestUser(): Promise<{ success: boolean; error?: string }> {
    console.log('DirectOAuth: Creating test user for debugging...');
    
    try {
      // Create a test user session manually
      const testUser = {
        id: 'test-user-' + Date.now(),
        email: 'test@blockademia.com',
        user_metadata: {
          name: 'Test User',
          avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Test%20User'
        }
      };

      // This is for debugging only - simulate successful auth
      console.log('DirectOAuth: Test user created:', testUser);
      return { success: true };
    } catch (error) {
      console.error('DirectOAuth: Test user creation failed:', error);
      return { success: false, error: error.message };
    }
  }
}