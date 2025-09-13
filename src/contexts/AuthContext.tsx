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
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getActiveSession = async () => {
      if (!mounted) return;
      
      setIsLoading(true);
      console.log('AuthContext: Starting session fetch...');
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.error('AuthContext: Session fetch timed out after 10 seconds');
        if (mounted) {
          setUser(null);
          setSession(null);
          setIsLoading(false);
        }
      }, 10000);
      
      try {
        console.log('AuthContext: Calling supabase.auth.getSession()...');
        const { data: { session }, error } = await supabase.auth.getSession();
        clearTimeout(timeoutId);

        console.log('AuthContext: Session response received', { session: !!session, error: !!error });

        if (error) {
          console.error('Error getting session:', error.message);
          if (mounted) {
            setUser(null);
            setSession(null);
          }
        } else if (session && mounted) {
          console.log('AuthContext: Session found, fetching user profile...');
          await fetchUserProfile(session.user, session);
        } else if (mounted) {
          console.log('AuthContext: No session found');
          setUser(null);
          setSession(null);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Session initialization error:', error);
        if (mounted) {
          setUser(null);
          setSession(null);
        }
      } finally {
        if (mounted) {
          console.log('AuthContext: Setting isLoading to false');
          setIsLoading(false);
        }
      }
    };

    getActiveSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
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
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser, session: Session) => {
    try {
      console.log('AuthContext: Fetching user profile for user:', supabaseUser.id);
      
      // Add timeout for profile fetch
      const profileTimeout = new Promise<{ data: any; error: any }>((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      );
      
      const profileQuery = supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
      
      // Race between profile fetch and timeout
      let profile = null;
      let error = null;
      
      try {
        const result = await Promise.race([profileQuery, profileTimeout]);
        profile = result.data;
        error = result.error;
      } catch (timeoutError) {
        console.warn('Profile fetch failed or timed out:', timeoutError.message);
        error = timeoutError;
      }

      if (error && error.code !== 'PGRST116') { // PGRST116: row not found
        console.error('Error fetching profile:', error.message);
        // Don't fail completely, create a basic profile instead
      }

      console.log('AuthContext: Profile data:', { profile: !!profile, error: !!error });

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

      console.log('AuthContext: Setting user and session');
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

      console.log('AuthContext: Setting fallback user and session');
      setUser(fullUser);
      setSession(session);
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Logged in successfully.' };
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
    isAuthenticated: !!user,
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
