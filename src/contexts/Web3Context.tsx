import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { BLOCKCHAIN_CONFIG, ERC20_ABI, validateConfig } from '../config/blockchain';

// Types for Web3 functionality
export interface WalletInfo {
  address: string;
  chainId: number;
  isConnected: boolean;
  balance: string;
  blockTokenBalance: string;
  network: string;
  walletType?: 'metamask' | 'trustwallet' | 'unknown';
  walletName?: string;
}

export interface TokenTransaction {
  hash: string;
  amount: number;
  to: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'faucet' | 'reward' | 'transfer';
  reason: string;
}

interface Web3ContextType {
  wallet: WalletInfo | null;
  isConnecting: boolean;
  transactions: TokenTransaction[];
  
  // Wallet functions
  connectWallet: (preferredWallet?: 'metamask' | 'trustwallet') => Promise<boolean>;
  disconnectWallet: () => void;
  switchToTestnet: () => Promise<boolean>;
  
  // Token functions
  sendTokens: (to: string, amount: number, reason: string) => Promise<string | null>;
  getTokenBalance: () => Promise<string>;
  
  // Contract interaction
  faucetTokens: (amount: number, reason: string) => Promise<boolean>;
  
  // Transaction tracking
  getTransactionHistory: () => TokenTransaction[];
  addTransaction: (tx: Omit<TokenTransaction, 'timestamp' | 'status'>) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Mock Web3 implementation for development
// In production, this would use actual Web3 providers like MetaMask, WalletConnect, etc.

// Get configuration from centralized config
const MONAD_TESTNET_CONFIG = {
  chainId: BLOCKCHAIN_CONFIG.MONAD_TESTNET.chainIdHex,
  chainName: BLOCKCHAIN_CONFIG.MONAD_TESTNET.name,
  nativeCurrency: BLOCKCHAIN_CONFIG.MONAD_TESTNET.nativeCurrency,
  rpcUrls: [BLOCKCHAIN_CONFIG.MONAD_TESTNET.rpcUrl],
  blockExplorerUrls: [BLOCKCHAIN_CONFIG.MONAD_TESTNET.blockExplorer],
};

const BLOCK_TOKEN_CONTRACT = BLOCKCHAIN_CONFIG.BLOCK_TOKEN;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);

  // Validate configuration on component mount
  useEffect(() => {
    const validation = validateConfig();
    
    // Only show critical errors as toast notifications
    if (!validation.isValid) {
      console.warn('⚠️ Blockchain configuration issues:', validation.issues);
      validation.issues.forEach(issue => {
        if (issue.includes('placeholder')) {
          // Less intrusive for placeholder issues
          console.warn(issue);
        } else {
          toast.error(issue, {
            description: 'Check /config/blockchain.ts',
            duration: 5000,
          });
        }
      });
    }
    
    // Show development warnings in console only
    if (validation.warnings?.length > 0) {
      console.info('🔧 Development mode:', validation.warnings);
      if (validation.isMock) {
        toast.success('🔧 Development mode active', {
          description: 'Using mock contract for testing',
          duration: 3000,
        });
      }
    }
  }, []);

  // Inject Web3 context into window for GameContext integration
  useEffect(() => {
    (window as any).__blockademia_web3_context = {
      wallet,
      faucetTokens,
      sendTokens,
      getTokenBalance,
    };
  }, [wallet]);

  // Load saved wallet info and transactions from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('blockademia_wallet');
    const savedTransactions = localStorage.getItem('blockademia_transactions');
    
    if (savedWallet) {
      const walletData = JSON.parse(savedWallet);
      // Check if wallet is still connected (mock check)
      setWallet(walletData);
    }
    
    if (savedTransactions) {
      const txData = JSON.parse(savedTransactions);
      setTransactions(txData.map((tx: any) => ({
        ...tx,
        timestamp: new Date(tx.timestamp)
      })));
    }
  }, []);

  // Save wallet info to localStorage
  const saveWallet = (walletInfo: WalletInfo | null) => {
    if (walletInfo) {
      localStorage.setItem('blockademia_wallet', JSON.stringify(walletInfo));
    } else {
      localStorage.removeItem('blockademia_wallet');
    }
    setWallet(walletInfo);
  };

  // Save transactions to localStorage
  const saveTransactions = (txs: TokenTransaction[]) => {
    localStorage.setItem('blockademia_transactions', JSON.stringify(txs));
    setTransactions(txs);
  };

  // Helper function to interact with your token contract
  const getTokenBalanceFromContract = async (address: string): Promise<string> => {
    const validation = validateConfig();
    const metamaskProvider = getMetaMaskProvider();
    
    if (!metamaskProvider || !validation.isProduction) {
      return '0';
    }

    try {
      // Create ethers provider and contract instance using MetaMask specifically
      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(metamaskProvider);
      const contract = new ethers.Contract(BLOCK_TOKEN_CONTRACT.address, ERC20_ABI, provider);
      
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      
      // Convert from wei to token units
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return '0';
    }
  };

  // Function to send tokens using your contract
  const sendTokensViaContract = async (to: string, amount: number): Promise<string | null> => {
    const validation = validateConfig();
    const metamaskProvider = getMetaMaskProvider();
    
    if (!metamaskProvider || !wallet || !validation.isProduction) {
      return null;
    }

    try {
      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(metamaskProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(BLOCK_TOKEN_CONTRACT.address, ERC20_ABI, signer);
      
      // Convert amount to token units (considering decimals)
      const decimals = await contract.decimals();
      const tokenAmount = ethers.parseUnits(amount.toString(), decimals);
      
      // Check if contract has a faucet function (for learning rewards)
      let tx;
      try {
        // Try using faucet function first (if your contract has one)
        tx = await contract.faucet(to, tokenAmount);
      } catch (faucetError) {
        // Fallback to regular transfer (if you're the token owner)
        tx = await contract.transfer(to, tokenAmount);
      }
      
      toast.success('🔄 Transaction sent to Monad network via MetaMask', {
        description: `Tx hash: ${tx.hash.slice(0, 10)}...`
      });
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        toast.success('✅ Tokens sent successfully!', {
          description: `${amount} BLOCK tokens transferred via MetaMask`
        });
        return tx.hash;
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error: any) {
      console.error('Token transfer error:', error);
      toast.error('❌ Token transfer failed', {
        description: error.message || 'Unknown error occurred'
      });
      return null;
    }
  };

  // Helper function to get specific wallet provider (fallback to MetaMask for existing code)
  const getMetaMaskProvider = () => {
    return getWalletProvider('metamask');
  };

  // Helper function to get specific wallet provider
  const getWalletProvider = (walletType?: 'metamask' | 'trustwallet') => {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log('🔍 No window.ethereum found');
      return null;
    }

    console.log(`🔍 Checking for ${walletType || 'any'} wallet provider...`, {
      hasEthereum: !!window.ethereum,
      isMetaMask: window.ethereum.isMetaMask,
      isTrustWallet: window.ethereum.isTrustWallet,
      hasProviders: !!window.ethereum.providers,
      providersLength: window.ethereum.providers?.length || 0
    });

    // If there are multiple providers (EIP-6963 standard)
    if (window.ethereum.providers?.length > 0) {
      console.log('🔍 Multiple providers found, searching...');
      
      if (walletType === 'metamask') {
        const metamaskProvider = window.ethereum.providers.find((provider: any) => {
          console.log('🔍 Provider:', { isMetaMask: provider.isMetaMask, name: provider.name });
          return provider.isMetaMask;
        });
        if (metamaskProvider) {
          console.log('✅ Found MetaMask in providers array');
          return metamaskProvider;
        }
      } else if (walletType === 'trustwallet') {
        const trustWalletProvider = window.ethereum.providers.find((provider: any) => {
          console.log('🔍 Provider:', { isTrustWallet: provider.isTrustWallet, name: provider.name });
          return provider.isTrustWallet;
        });
        if (trustWalletProvider) {
          console.log('✅ Found TrustWallet in providers array');
          return trustWalletProvider;
        }
      } else {
        // No preference, return first available known wallet
        const knownProvider = window.ethereum.providers.find((provider: any) => 
          provider.isMetaMask || provider.isTrustWallet
        );
        if (knownProvider) {
          console.log('✅ Found known wallet provider');
          return knownProvider;
        }
      }
    }

    // If there's only one provider, check if it matches request
    if (walletType === 'metamask' && window.ethereum.isMetaMask) {
      console.log('✅ Found MetaMask as main provider');
      return window.ethereum;
    } else if (walletType === 'trustwallet' && window.ethereum.isTrustWallet) {
      console.log('✅ Found TrustWallet as main provider');
      return window.ethereum;
    } else if (!walletType && (window.ethereum.isMetaMask || window.ethereum.isTrustWallet)) {
      console.log('✅ Found wallet as main provider');
      return window.ethereum;
    }

    // Last resort: use the main ethereum object but warn user
    console.warn(`⚠️ ${walletType || 'Preferred'} wallet not specifically detected, using default provider`);
    return window.ethereum;
  };

  // Enhanced wallet connection supporting multiple providers
  const connectWallet = async (preferredWallet?: 'metamask' | 'trustwallet'): Promise<boolean> => {
    setIsConnecting(true);
    
    console.log('🚀 Starting wallet connection process...');
    console.log('🎯 Preferred wallet:', preferredWallet || 'auto-detect');
    
    try {
      // Check for Ethereum provider
      console.log('🔍 Checking for Ethereum provider...');
      console.log('window.ethereum exists:', !!(window as any).ethereum);
      console.log('window.ethereum.isMetaMask:', (window as any).ethereum?.isMetaMask);
      console.log('window.ethereum.isTrustWallet:', (window as any).ethereum?.isTrustWallet);
      console.log('window.ethereum.providers:', (window as any).ethereum?.providers?.length || 0);
      
      if (!(window as any).ethereum) {
        console.log('❌ No Ethereum provider found');
        toast.error('Wallet not found', {
          description: 'Please install MetaMask or TrustWallet first'
        });
        return false;
      }
      
      // Detect and select the appropriate provider
      let provider = (window as any).ethereum;
      let walletName = 'Unknown Wallet';
      
      // Handle multiple providers
      if ((window as any).ethereum.providers && (window as any).ethereum.providers.length > 1) {
        console.log('🔍 Multiple providers detected, selecting based on preference...');
        
        const providers = (window as any).ethereum.providers;
        const metamaskProvider = providers.find((p: any) => p.isMetaMask);
        const trustWalletProvider = providers.find((p: any) => p.isTrustWallet);
        
        console.log('Available providers:', {
          metamask: !!metamaskProvider,
          trustwallet: !!trustWalletProvider
        });
        
        if (preferredWallet === 'metamask' && metamaskProvider) {
          provider = metamaskProvider;
          walletName = 'MetaMask';
          console.log('✅ Selected MetaMask from providers array');
        } else if (preferredWallet === 'trustwallet' && trustWalletProvider) {
          provider = trustWalletProvider;
          walletName = 'TrustWallet';
          console.log('✅ Selected TrustWallet from providers array');
        } else if (metamaskProvider && !preferredWallet) {
          // Default to MetaMask if no preference
          provider = metamaskProvider;
          walletName = 'MetaMask';
          console.log('✅ Auto-selected MetaMask as default');
        } else if (trustWalletProvider && !preferredWallet) {
          provider = trustWalletProvider;
          walletName = 'TrustWallet';
          console.log('✅ Auto-selected TrustWallet');
        } else {
          console.log('⚠️ Preferred wallet not found, using first available provider');
          provider = providers[0];
          walletName = providers[0].isMetaMask ? 'MetaMask' : 
                     providers[0].isTrustWallet ? 'TrustWallet' : 'Unknown Wallet';
        }
      } else {
        // Single provider detection
        if ((window as any).ethereum.isMetaMask) {
          walletName = 'MetaMask';
          console.log('✅ Single provider: MetaMask');
        } else if ((window as any).ethereum.isTrustWallet) {
          walletName = 'TrustWallet';
          console.log('✅ Single provider: TrustWallet');
        } else {
          walletName = 'Unknown Wallet';
          console.log('⚠️ Single provider: Unknown wallet type');
        }
      }
      
      console.log(`🦊 Requesting accounts from ${walletName}...`);
      
      // The actual connection request
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      
      console.log('✅ Accounts received:', accounts?.length || 0);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned from provider');
      }
      
      // Get additional wallet info
      console.log('📊 Getting wallet details...');
      
      const [chainId, balance] = await Promise.all([
        provider.request({ method: 'eth_chainId' }),
        provider.request({ 
          method: 'eth_getBalance', 
          params: [accounts[0], 'latest'] 
        })
      ]);
      
      const balanceInMON = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);
      
      // Get BLOCK token balance
      let blockTokenBalance = '100'; // Default mock balance
      try {
        if (chainId === MONAD_TESTNET_CONFIG.chainId) {
          const validation = validateConfig();
          if (validation.isProduction) {
            console.log('🪙 Getting real token balance...');
            const tokenBalance = await getTokenBalanceFromContract(accounts[0]);
            blockTokenBalance = tokenBalance;
          }
        }
      } catch (error) {
        console.log('📝 Using mock token balance due to error:', error);
      }

      const walletInfo: WalletInfo = {
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isConnected: true,
        balance: balanceInMON,
        blockTokenBalance,
        network: chainId === MONAD_TESTNET_CONFIG.chainId ? 'Monad Testnet' : 'Unknown Network',
        walletType: provider.isMetaMask ? 'metamask' : 
                   provider.isTrustWallet ? 'trustwallet' : 'unknown',
        walletName: walletName,
      };
      
      console.log('💾 Saving wallet info:', walletInfo);
      saveWallet(walletInfo);
      
      toast.success(`🎉 ${walletName} Connected!`, {
        description: `Connected to ${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}`
      });
      
      return true;
      
    } catch (error: any) {
      console.error('🔴 Wallet connection error:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        data: error.data
      });
      
      // Handle specific error codes with better messaging
      if (error.code === 4001) {
        console.log('👤 User rejected the connection');
        toast.info('Connection cancelled', {
          description: 'You cancelled the wallet connection request'
        });
      } else if (error.code === -32002) {
        console.log('⏳ Request already pending');
        toast.warning('Request pending', {
          description: 'Please check your wallet extension for a pending request'
        });
      } else if (error.code === -32603) {
        console.log('🔒 Internal error - possibly locked wallet');
        toast.error('Wallet locked', {
          description: 'Please unlock your wallet and try again'
        });
      } else if (error.message?.toLowerCase().includes('user rejected')) {
        console.log('👤 User rejected (via message)');
        toast.info('Connection rejected', {
          description: 'You rejected the connection request'
        });
      } else {
        console.log('❌ Unknown error occurred');
        toast.error('Connection failed', {
          description: `Error: ${error.message || 'Unknown error'}. Check console for details.`
        });
      }
      
      return false;
    } finally {
      setIsConnecting(false);
      console.log('🏁 Connection attempt completed');
    }
  };

  const disconnectWallet = () => {
    saveWallet(null);
    toast.success('Wallet Disconnected', {
      description: 'Your wallet has been safely disconnected'
    });
  };

  const switchToTestnet = async (): Promise<boolean> => {
    if (!wallet) return false;
    
    try {
      const metamaskProvider = getMetaMaskProvider();
      
      if (metamaskProvider) {
        try {
          // Try to switch to Monad testnet using MetaMask specifically
          await metamaskProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: MONAD_TESTNET_CONFIG.chainId }],
          });
          
          // Update wallet info after network switch
          const accounts = await metamaskProvider.request({
            method: 'eth_accounts',
          });
          
          const balance = await metamaskProvider.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          });
          
          const balanceInMON = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);
          
          // Get updated token balance
          let blockTokenBalance = '0';
          try {
            const validation = validateConfig();
            if (validation.isProduction) {
              blockTokenBalance = await getTokenBalanceFromContract(accounts[0]);
            } else if (validation.isMock) {
              blockTokenBalance = '100'; // Mock balance
            }
          } catch (error) {
            console.log('Could not fetch token balance after network switch:', error);
            blockTokenBalance = '100'; // Fallback to mock
          }
          
          const updatedWallet = {
            ...wallet,
            chainId: 666,
            network: 'Monad Testnet',
            balance: balanceInMON,
            blockTokenBalance,
          };
          saveWallet(updatedWallet);
          toast.success('✅ Switched to Monad Testnet via MetaMask');
          return true;
        } catch (switchError: any) {
          // If Monad testnet doesn't exist in wallet, add it
          if (switchError.code === 4902) {
            await metamaskProvider.request({
              method: 'wallet_addEthereumChain',
              params: [MONAD_TESTNET_CONFIG],
            });
            toast.success('✅ Added Monad Testnet to MetaMask');
            return true;
          } else if (switchError.code === 4001) {
            toast.info('Network switch cancelled', {
              description: 'You can switch networks manually in MetaMask'
            });
            return false;
          }
        }
      }
      
      // Mock success for development
      const updatedWallet = {
        ...wallet,
        chainId: 666,
        network: 'Monad Testnet',
      };
      saveWallet(updatedWallet);
      toast.success('Switched to Monad Testnet (Mock)');
      return true;
      
    } catch (error) {
      toast.error('Failed to switch to Monad Testnet');
      return false;
    }
  };

  const sendTokens = async (to: string, amount: number, reason: string): Promise<string | null> => {
    if (!wallet) {
      toast.error('No wallet connected');
      return null;
    }
    
    // Check if we're on Monad testnet and have a real contract
    const validation = validateConfig();
    if (wallet.network === 'Monad Testnet' && validation.isProduction) {
      // Use real contract interaction
      const txHash = await sendTokensViaContract(to, amount);
      
      if (txHash) {
        // Create transaction record
        const newTx: TokenTransaction = {
          hash: txHash,
          amount,
          to,
          timestamp: new Date(),
          status: 'pending',
          type: 'faucet',
          reason,
        };
        
        addTransaction(newTx);
        
        // Update local balance immediately for UX
        const currentBalance = parseFloat(wallet.blockTokenBalance);
        const updatedWallet = {
          ...wallet,
          blockTokenBalance: (currentBalance + amount).toString(),
        };
        saveWallet(updatedWallet);
        
        // Check transaction status after delay
        setTimeout(async () => {
          try {
            const { ethers } = await import('ethers');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const receipt = await provider.getTransactionReceipt(txHash);
            
            const updatedTxs = transactions.map(tx => 
              tx.hash === txHash ? { 
                ...tx, 
                status: receipt?.status === 1 ? 'confirmed' as const : 'failed' as const 
              } : tx
            );
            saveTransactions(updatedTxs);
          } catch (error) {
            console.error('Error checking transaction status:', error);
          }
        }, 3000);
        
        return txHash;
      }
      return null;
    }
    
    // Fallback to mock for development/testing
    try {
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      // Create transaction record
      const newTx: TokenTransaction = {
        hash: txHash,
        amount,
        to,
        timestamp: new Date(),
        status: 'pending',
        type: 'faucet',
        reason: `${reason} (Mock)`,
      };
      
      addTransaction(newTx);
      
      // Simulate transaction confirmation
      setTimeout(() => {
        const updatedTxs = transactions.map(tx => 
          tx.hash === txHash ? { ...tx, status: 'confirmed' as const } : tx
        );
        saveTransactions(updatedTxs);
        
        // Update wallet balance
        const currentBalance = parseFloat(wallet.blockTokenBalance);
        const updatedWallet = {
          ...wallet,
          blockTokenBalance: (currentBalance + amount).toString(),
        };
        saveWallet(updatedWallet);
        
        toast.success(`🪙 Received ${amount} BLOCK tokens!`, {
          description: `Mock transaction: ${txHash.slice(0, 10)}...`
        });
      }, 2000);
      
      return txHash;
      
    } catch (error) {
      toast.error('Token transfer failed');
      return null;
    }
  };

  const getTokenBalance = async (): Promise<string> => {
    if (!wallet) return '0';
    
    // Mock balance check - in production would query contract
    return wallet.blockTokenBalance;
  };

  const faucetTokens = async (amount: number, reason: string): Promise<boolean> => {
    if (!wallet) {
      toast.error('Please connect your wallet first');
      return false;
    }
    
    if (wallet.network !== 'Monad Testnet' && wallet.network !== 'Monad Testnet (Mock)') {
      toast.error('Please switch to Monad Testnet');
      return false;
    }
    
    try {
      const txHash = await sendTokens(wallet.address, amount, reason);
      
      if (txHash) {
        const networkType = wallet.network.includes('Mock') ? 'Mock' : 'Monad';
        toast.success(`🎉 Faucet Success!`, {
          description: `${amount} BLOCK tokens sent to your wallet on ${networkType} testnet`
        });
        return true;
      }
      
      return false;
    } catch (error) {
      toast.error('Faucet failed', {
        description: 'Please try again later'
      });
      return false;
    }
  };

  const getTransactionHistory = (): TokenTransaction[] => {
    return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const addTransaction = (tx: Omit<TokenTransaction, 'timestamp' | 'status'>) => {
    const newTx: TokenTransaction = {
      ...tx,
      timestamp: new Date(),
      status: 'pending',
    };
    
    const updatedTxs = [newTx, ...transactions];
    saveTransactions(updatedTxs);
  };

  const value: Web3ContextType = {
    wallet,
    isConnecting,
    transactions,
    connectWallet,
    disconnectWallet,
    switchToTestnet,
    sendTokens,
    getTokenBalance,
    faucetTokens,
    getTransactionHistory,
    addTransaction,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}