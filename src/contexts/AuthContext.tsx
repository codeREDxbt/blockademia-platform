import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

interface User {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    avatar_url: string;
  };
  profile: UserProfile;
  wallet_address?: string;
  auth_method: 'demo' | 'wallet';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loginWithWallet: (address: string, walletType: string) => Promise<void>;
  switchToDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create a mock demo user with complete profile
    const demoUser: User = {
      id: 'demo-user-id',
      email: 'demo@blockademia.com',
      user_metadata: {
        name: 'Demo User',
        avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Demo+User'
      },
      profile: {
        id: 'demo-user-id',
        name: 'Demo User',
        avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Demo+User',
        profile_complete: true,
        bio: 'Demo user for testing Blockademia platform',
        location: 'Demo Location',
        skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
        learning_goals: ['Master Solidity', 'Build DApps', 'Understand Web3']
      },
      auth_method: 'demo'
    };
    setUser(demoUser);
    setIsLoading(false);
  }, []);

  const loginWithWallet = async (address: string, walletType: string) => {
    setIsLoading(true);
    
    // Create a wallet-based user
    const walletUser: User = {
      id: `wallet-${address}`,
      email: `${address}@wallet.user`,
      user_metadata: {
        name: `Wallet User (${walletType})`,
        avatar_url: `https://api.dicebear.com/6.x/identicon/svg?seed=${address}`
      },
      profile: {
        id: `wallet-${address}`,
        name: `Wallet User`,
        avatar_url: `https://api.dicebear.com/6.x/identicon/svg?seed=${address}`,
        profile_complete: false,
        bio: '',
        location: '',
        skills: [],
        learning_goals: []
      },
      wallet_address: address,
      auth_method: 'wallet'
    };
    
    setUser(walletUser);
    setIsLoading(false);
  };

  const switchToDemo = () => {
    setIsLoading(true);
    const demoUser: User = {
      id: 'demo-user-id',
      email: 'demo@blockademia.com',
      user_metadata: {
        name: 'Demo User',
        avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Demo+User'
      },
      profile: {
        id: 'demo-user-id',
        name: 'Demo User',
        avatar_url: 'https://api.dicebear.com/6.x/initials/svg?seed=Demo+User',
        profile_complete: true,
        bio: 'Demo user for testing Blockademia platform',
        location: 'Demo Location',
        skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
        learning_goals: ['Master Solidity', 'Build DApps', 'Understand Web3']
      },
      auth_method: 'demo'
    };
    setUser(demoUser);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      logout,
      isAuthenticated: !!user,
      loginWithWallet,
      switchToDemo
    }}>
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