import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, Session, User as SupabaseUser } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables or fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivnxbxbkadumzklsuwob.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bnhieGJrYWR1bXprbHN1d29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzAyMzMsImV4cCI6MjA3Mjg0NjIzM30.KyuT2oB2v55SeXHGAT7GHn4_waqpF3FuRFNkXIi259s';

const supabase = createClient(supabaseUrl, supabaseKey);

// Define the user profile structure
interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  skills?: string[];
  learning_goals?: string[];
  profile_complete?: boolean;
}

// Extended user type combining Supabase user and Blockademia profile
interface User extends SupabaseUser {
  profile: UserProfile;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  socialLogin: (provider: 'google' | 'github') => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; message: string }>;
  resendConfirmation: (email: string) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getActiveSession = async () => {
      if (!mounted) return;
      
      // Skip session initialization if in demo mode
      if (isDemoMode) {
        console.log('AuthContext: In demo mode, skipping session initialization');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error.message);
          if (mounted) {
            setUser(null);
            setSession(null);
          }
        } else if (session && mounted) {
          await fetchUserProfile(session.user, session);
        } else if (mounted) {
          setUser(null);
          setSession(null);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        if (mounted) {
          setUser(null);
          setSession(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getActiveSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      // Skip ALL Supabase auth state changes when in demo mode
      if (isDemoMode) {
        console.log('AuthContext: Ignoring Supabase auth state change - in demo mode');
        return;
      }
      
      // Skip Supabase auth state changes for demo users
      if (session?.user?.id === 'demo-user-id') {
        console.log('AuthContext: Skipping auth state change for demo user');
        return;
      }
      
      setIsLoading(true);
      
      try {
        if (event === 'SIGNED_IN' && session) {
          await fetchUserProfile(session.user, session);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        } else if (event === 'USER_UPDATED' && session) {
          await fetchUserProfile(session.user, session);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        setSession(null);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [isDemoMode]);

  const fetchUserProfile = async (supabaseUser: SupabaseUser, session: Session) => {
    // Never fetch user profile for demo mode
    if (isDemoMode) {
      console.log('AuthContext: Skipping fetchUserProfile - in demo mode');
      return;
    }
    
    // Skip profile fetching for demo users - they already have complete profiles
    if (supabaseUser.id === 'demo-user-id') {
      console.log('AuthContext: Skipping profile fetch for demo user');
      return;
    }
    
    try {
      // Try to fetch profile from profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116: row not found
        console.error('Error fetching profile:', error.message);
        // Don't fail completely, create a basic profile instead
      }

      // Create a basic profile if none exists or if there was an error
      const userProfile: UserProfile = profile || {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || 
              supabaseUser.user_metadata?.full_name || 
              supabaseUser.email?.split('@')[0] || 
              'User',
        avatar_url: supabaseUser.user_metadata?.avatar_url,
        profile_complete: false,
      };

      const fullUser: User = {
        ...supabaseUser,
        profile: userProfile,
      };

      setUser(fullUser);
      setSession(session);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      
      // Create a minimal user profile even if everything fails
      const fallbackProfile: UserProfile = {
        id: supabaseUser.id,
        name: supabaseUser.email?.split('@')[0] || 'User',
        profile_complete: false,
      };

      const fullUser: User = {
        ...supabaseUser,
        profile: fallbackProfile,
      };

      setUser(fullUser);
      setSession(session);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('AuthContext: Login attempt with email:', email);
    
    // Check for demo credentials - handle immediately
    if (email === 'demo@blockademia.com' && password === 'demo123') {
      console.log('AuthContext: Demo login detected, setting up demo state...');
      
      // Create a mock demo user with complete profile
      const demoUser: User = {
        id: 'demo-user-id',
        email: 'demo@blockademia.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        aud: 'authenticated',
        role: 'authenticated',
        email_confirmed_at: new Date().toISOString(),
        user_metadata: {
          name: 'Demo User',
          avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Demo+User'
        },
        app_metadata: {},
        profile: {
          id: 'demo-user-id',
          name: 'Demo User',
          avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Demo+User',
          profile_complete: true,
          bio: 'Demo user for testing Blockademia platform',
          location: 'Demo Location',
          skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
          learning_goals: ['Master Solidity', 'Build DApps', 'Understand Web3']
        }
      };

      // Create a mock session
      const demoSession = {
        access_token: 'demo-access-token',
        refresh_token: 'demo-refresh-token',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: demoUser
      };

      // Set state immediately and synchronously
      setIsDemoMode(true);
      setUser(demoUser);
      setSession(demoSession as Session);
      setIsLoading(false);
      
      console.log('AuthContext: Demo login completed successfully');
      return { success: true, message: 'Demo login successful! Welcome to Blockademia.' };
    }

    // Handle regular Supabase authentication for non-demo users
    console.log('AuthContext: Processing regular Supabase login for:', email);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.log('AuthContext: Supabase login error:', error.message);
        setIsLoading(false);
        return { success: false, message: error.message };
      }
      console.log('AuthContext: Supabase login successful');
      return { success: true, message: 'Logged in successfully.' };
    } catch (error) {
      console.error('AuthContext: Unexpected login error:', error);
      setIsLoading(false);
      return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          avatar_url: `https://api.dicebear.com/6.x/initials/svg?seed=${name}`,
        },
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }
    if (!data.user) {
        return { success: false, message: "Signup completed, but no user data returned." };
    }
    return { success: true, message: 'Signup successful! Please check your email to confirm.' };
  };

  const socialLogin = async (provider: 'google' | 'github') => {
    try {
      // Get the current origin for redirect
      const redirectTo = `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Social login error:', error.message);
        throw error;
      }
    } catch (error) {
      console.error('Failed to initiate social login:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Password reset link sent. Please check your email.' };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Password updated successfully.' };
  };

  const logout = async () => {
    // Handle demo user logout
    if (isDemoMode || user?.id === 'demo-user-id') {
      console.log('AuthContext: Demo logout');
      setIsDemoMode(false);
      setUser(null);
      setSession(null);
      setIsLoading(false);
      return;
    }

    // Regular Supabase logout for non-demo users
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { success: false, message: 'You must be logged in to update your profile.' };
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      return { success: false, message: error.message };
    }
    
    // Re-fetch user profile to update state
    if(session) {
        await fetchUserProfile(session.user, session);
    }

    return { success: true, message: 'Profile updated successfully.' };
  };

  const resendConfirmation = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Confirmation email sent successfully.' };
  };

  const isAuthenticated = !!user && !!session && !isLoading;

  const value = {
    user,
    session,
    isLoading,
    login,
    signup,
    socialLogin,
    resetPassword,
    updatePassword,
    logout,
    updateProfile,
    resendConfirmation,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}