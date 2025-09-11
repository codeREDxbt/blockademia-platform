import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Create Supabase client
const createClient = (url: string, key: string) => {
  return {
    auth: {
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': key,
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      signInWithOAuth: async ({ provider }: { provider: string }) => {
        const redirectUrl = `${window.location.origin}/auth`;
        window.location.href = `${url}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUrl}`;
        return { data: null, error: null };
      },
      signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
        const response = await fetch(`${url}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': key,
          },
          body: JSON.stringify({ email, password, data: options?.data || {} }),
        });
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      resetPasswordForEmail: async (email: string, options?: { redirectTo?: string }) => {
        const response = await fetch(`${url}/auth/v1/recover`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': key,
          },
          body: JSON.stringify({ 
            email,
            ...(options?.redirectTo && { redirect_to: options.redirectTo })
          }),
        });
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      updateUser: async (attributes: any, options?: { accessToken: string }) => {
        const token = options?.accessToken || localStorage.getItem('supabase_token');
        const response = await fetch(`${url}/auth/v1/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'apikey': key,
          },
          body: JSON.stringify(attributes),
        });
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      signOut: async () => {
        const response = await fetch(`${url}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('supabase_token')}`,
            'apikey': key,
          },
        });
        return { error: response.ok ? null : await response.json() };
      },
      getSession: async () => {
        const token = localStorage.getItem('supabase_token');
        if (!token) return { data: { session: null }, error: null };
        
        const response = await fetch(`${url}/auth/v1/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'apikey': key,
          },
        });
        
        if (response.ok) {
          const user = await response.json();
          return { data: { session: { user, access_token: token } }, error: null };
        }
        return { data: { session: null }, error: null };
      },
      getUser: async (token?: string) => {
        const authToken = token || localStorage.getItem('supabase_token');
        if (!authToken) return { data: { user: null }, error: null };
        
        const response = await fetch(`${url}/auth/v1/user`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'apikey': key,
          },
        });
        
        if (response.ok) {
          const user = await response.json();
          return { data: { user }, error: null };
        }
        return { data: { user: null }, error: null };
      },
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        // Simplified auth state management
        const token = localStorage.getItem('supabase_token');
        if (token) {
          callback('SIGNED_IN', { access_token: token });
        } else {
          callback('SIGNED_OUT', null);
        }
      }
    }
  };
};

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  coursesCompleted: number;
  totalHours: number;
  certificates: number;
  isPremium: boolean;
  profileComplete?: boolean;
  bio?: string;
  location?: string;
  website?: string;
  skills?: string[];
  learningGoals?: string[];
  provider?: 'email' | 'google' | 'github';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'github') => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; message: string }>;
  resendConfirmation: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check URL for OAuth callback
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        
        if (accessToken) {
          // Store tokens
          localStorage.setItem('supabase_token', accessToken);
          if (refreshToken) {
            localStorage.setItem('supabase_refresh_token', refreshToken);
          }
          
          // Get user from Supabase
          const { data: { user }, error } = await supabase.auth.getUser(accessToken);
          if (user && !error) {
            const blockademiaUser = await createUserFromSupabaseUser(user, 'social');
            setUser(blockademiaUser);
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } else {
          // Check for existing session
          const { data: { session }, error } = await supabase.auth.getSession();
          if (session?.user && !error) {
            const blockademiaUser = await createUserFromSupabaseUser(session.user, 'email');
            setUser(blockademiaUser);
          } else {
            // Check local storage fallback
            const storedUser = localStorage.getItem('blockademia_user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('blockademia_user');
        localStorage.removeItem('supabase_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const createUserFromSupabaseUser = async (supabaseUser: any, provider: 'email' | 'social'): Promise<User> => {
    const isNewUser = !localStorage.getItem('blockademia_user');
    
    const user: User = {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.full_name || 
            supabaseUser.user_metadata?.name || 
            supabaseUser.email?.split('@')[0] || 'User',
      email: supabaseUser.email,
      avatar: supabaseUser.user_metadata?.avatar_url || 
              supabaseUser.user_metadata?.picture ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
      joinDate: new Date().toISOString().split('T')[0],
      coursesCompleted: 0,
      totalHours: 0,
      certificates: 0,
      isPremium: false,
      profileComplete: !isNewUser,
      provider: provider === 'social' ? 
        (supabaseUser.app_metadata?.provider || 'google') as 'google' | 'github' : 'email',
      bio: '',
      location: '',
      website: '',
      skills: [],
      learningGoals: []
    };

    // Store user data
    localStorage.setItem('blockademia_user', JSON.stringify(user));
    return user;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Demo mode for testing - remove in production
      if (email === 'demo@blockademia.com' && password === 'demo123') {
        const demoUser: User = {
          id: 'demo-user-123',
          name: 'Demo User',
          email: 'demo@blockademia.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          joinDate: new Date().toISOString().split('T')[0],
          coursesCompleted: 3,
          totalHours: 24,
          certificates: 2,
          isPremium: true,
          profileComplete: true,
          provider: 'email',
          bio: 'Demo user for testing',
          location: 'Demo City',
          website: 'https://blockademia.com',
          skills: ['React', 'Blockchain', 'JavaScript'],
          learningGoals: ['Master Web3', 'Learn Solidity']
        };
        
        setUser(demoUser);
        localStorage.setItem('blockademia_user', JSON.stringify(demoUser));
        localStorage.setItem('supabase_token', 'demo-token-123');
        setIsLoading(false);
        return true;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Login error:', error);
        console.log('Error details:', {
          code: error.code,
          error_code: error.error_code,
          message: error.message,
          msg: error.msg
        });
        setIsLoading(false);
        
        // Handle specific error cases
        if (error.error_code === 'email_not_confirmed' || 
            error.message?.toLowerCase().includes('email not confirmed') || 
            error.msg?.toLowerCase().includes('email not confirmed') ||
            error.code === 400) {
          // Show user-friendly message for email confirmation
          console.log('Email confirmation required - throwing EMAIL_NOT_CONFIRMED');
          throw new Error('EMAIL_NOT_CONFIRMED');
        }
        
        if (error.message?.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        
        // Generic error message for other cases
        throw new Error(error.message || 'Login failed. Please try again.');
      }

      if (data.session) {
        localStorage.setItem('supabase_token', data.session.access_token);
        const blockademiaUser = await createUserFromSupabaseUser(data.session.user, 'email');
        setUser(blockademiaUser);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      // Re-throw the error so it can be handled by the calling component
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        setIsLoading(false);
        
        // Handle specific signup errors
        if (error.message?.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try signing in instead.');
        }
        
        if (error.message?.includes('Password')) {
          throw new Error('Password must be at least 6 characters long.');
        }
        
        if (error.message?.includes('email')) {
          throw new Error('Please enter a valid email address.');
        }
        
        throw new Error(error.message || 'Signup failed. Please try again.');
      }

      if (data.user) {
        // Check if email confirmation is required
        if (!data.session && data.user && !data.user.email_confirmed_at) {
          // Email confirmation required - don't log user in yet
          setIsLoading(false);
          throw new Error('CHECK_EMAIL_CONFIRMATION');
        }
        
        const blockademiaUser = await createUserFromSupabaseUser(data.user, 'email');
        blockademiaUser.profileComplete = false; // New user needs to complete profile
        setUser(blockademiaUser);
        localStorage.setItem('blockademia_user', JSON.stringify(blockademiaUser));
        
        if (data.session) {
          localStorage.setItem('supabase_token', data.session.access_token);
        }
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      // Re-throw the error so it can be handled by the calling component
      throw error;
    }
  };

  const socialLogin = async (provider: 'google' | 'github'): Promise<void> => {
    try {
      // Check if running in iframe (common cause of blocked OAuth)
      const isInIframe = window !== window.top;
      
      if (isInIframe && provider === 'google') {
        throw new Error('Google login is blocked in embedded/preview mode. Please open this app in a new browser tab to use Google login.');
      }

      const { error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error('Social login error:', error);
        
        // Handle different types of errors
        if (error.message?.includes('provider') || error.message?.includes('not enabled')) {
          throw new Error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet. Please complete OAuth setup in your Supabase dashboard.`);
        }
        
        if (error.message?.includes('blocked') || error.message?.includes('X-Frame-Options')) {
          throw new Error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is blocked in this environment. Please open the app in a new browser tab.`);
        }
        
        throw error;
      }
    } catch (error) {
      console.error('Social login error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });
      
      if (error) {
        console.error('Password reset error:', error);
        return { 
          success: false, 
          message: 'Failed to send reset email. Please check your email address and try again.' 
        };
      }
      
      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox and follow the instructions.' 
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      };
    }
  };

  const updatePassword = async (password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const token = localStorage.getItem('supabase_token');
      if (!token) {
        return { 
          success: false, 
          message: 'You must be logged in to update your password.' 
        };
      }

      const { data, error } = await supabase.auth.updateUser(
        { password }, 
        { accessToken: token }
      );
      
      if (error) {
        console.error('Password update error:', error);
        return { 
          success: false, 
          message: 'Failed to update password. Please try again.' 
        };
      }
      
      return { 
        success: true, 
        message: 'Password updated successfully!' 
      };
    } catch (error) {
      console.error('Password update error:', error);
      return { 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      };
    }
  };

  const resendConfirmation = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // For resending confirmation, we use the resend endpoint
      const response = await fetch(`https://${projectId}.supabase.co/auth/v1/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': publicAnonKey,
        },
        body: JSON.stringify({ 
          email,
          type: 'signup' // This tells Supabase to resend the signup confirmation
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Resend confirmation error:', data);
        
        if (data.error_description?.includes('already confirmed')) {
          return { 
            success: false, 
            message: 'Your email is already confirmed. You can sign in now.' 
          };
        }
        
        return { 
          success: false, 
          message: data.error_description || 'Failed to send confirmation email. Please try again.' 
        };
      }
      
      return { 
        success: true, 
        message: 'Confirmation email sent! Please check your inbox and click the confirmation link.' 
      };
    } catch (error) {
      console.error('Resend confirmation error:', error);
      return { 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      };
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('blockademia_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('blockademia_user');
      localStorage.removeItem('supabase_token');
      localStorage.removeItem('supabase_refresh_token');
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    socialLogin,
    resetPassword,
    updatePassword,
    resendConfirmation,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
