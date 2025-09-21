import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

// Define wallet types and interfaces
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  isConnecting: boolean;
  error: string | null;
  walletType: 'metamask' | 'trust' | 'walletconnect' | null;
}

interface WalletContextType extends WalletState {
  connectWallet: (walletType?: 'metamask' | 'trust' | 'walletconnect') => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
  signMessage: (message: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Supported networks
const supportedNetworks = {
  1: { name: 'Ethereum', symbol: 'ETH', explorer: 'https://etherscan.io' },
  11155111: { name: 'Sepolia', symbol: 'ETH', explorer: 'https://sepolia.etherscan.io' },
  137: { name: 'Polygon', symbol: 'MATIC', explorer: 'https://polygonscan.com' }
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
    isConnecting: false,
    error: null,
    walletType: null
  });

  // Check for existing wallet connection on mount
  useEffect(() => {
    checkWalletConnection();
    
    // Listen for account and network changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const network = await provider.getNetwork();
          const walletType = detectWalletType();
          
          setWalletState({
            isConnected: true,
            address: accounts[0],
            chainId: network.chainId,
            provider,
            isConnecting: false,
            error: null,
            walletType
          });
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const detectWalletType = (): 'metamask' | 'trust' | 'walletconnect' => {
    if (window.ethereum?.isMetaMask) return 'metamask';
    if (window.ethereum?.isTrust) return 'trust';
    return 'walletconnect';
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      setWalletState(prev => ({
        ...prev,
        address: accounts[0]
      }));
    }
  };

  const handleChainChanged = (chainId: string) => {
    const numericChainId = parseInt(chainId, 16);
    setWalletState(prev => ({
      ...prev,
      chainId: numericChainId
    }));
  };

  const handleDisconnect = () => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      provider: null,
      isConnecting: false,
      error: null,
      walletType: null
    });
  };

  const connectWallet = async (walletType?: 'metamask' | 'trust' | 'walletconnect') => {
    try {
      setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

      if (!window.ethereum) {
        throw new Error('No crypto wallet found. Please install MetaMask or Trust Wallet.');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      const detectedWalletType = walletType || detectWalletType();

      setWalletState({
        isConnected: true,
        address: accounts[0],
        chainId: network.chainId,
        provider,
        isConnecting: false,
        error: null,
        walletType: detectedWalletType
      });
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet'
      }));
      throw error;
    }
  };

  const disconnectWallet = async () => {
    handleDisconnect();
  };

  const switchNetwork = async (chainId: number) => {
    try {
      if (!window.ethereum) throw new Error('No wallet found');

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added to wallet, could add logic to add it here
        throw new Error(`Network with chain ID ${chainId} is not configured in your wallet`);
      }
      throw error;
    }
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!walletState.provider || !walletState.address) {
      throw new Error('Wallet not connected');
    }

    const signer = walletState.provider.getSigner();
    return await signer.signMessage(message);
  };

  return (
    <WalletContext.Provider
      value={{
        ...walletState,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        signMessage
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isTrust?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}