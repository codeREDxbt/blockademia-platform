import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Wallet, Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (walletType: 'metamask' | 'trust' | 'walletconnect', address: string) => void;
}

export default function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const { connectWallet, isConnecting, error, isConnected, address } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect with MetaMask browser extension',
      downloadUrl: 'https://metamask.io/download/',
      isAvailable: typeof window !== 'undefined' && window.ethereum?.isMetaMask
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Connect with Trust Wallet mobile app',
      downloadUrl: 'https://trustwallet.com/download',
      isAvailable: typeof window !== 'undefined' && window.ethereum?.isTrust
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '📱',
      description: 'Connect with any WalletConnect compatible wallet',
      downloadUrl: 'https://walletconnect.com/explorer',
      isAvailable: true
    }
  ];

  const handleWalletConnect = async (walletType: 'metamask' | 'trust' | 'walletconnect') => {
    setSelectedWallet(walletType);
    try {
      await connectWallet(walletType);
      if (isConnected && address && onConnect) {
        onConnect(walletType, address);
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  const handleClose = () => {
    setSelectedWallet(null);
    onClose();
  };

  const WalletOptionButton = ({ wallet }: { wallet: typeof walletOptions[0] }) => (
    <Button
      variant="outline"
      className={`
        w-full p-6 h-auto flex flex-col items-center space-y-3 border-2 transition-all duration-200
        ${selectedWallet === wallet.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
        ${!wallet.isAvailable ? 'opacity-50' : ''}
      `}
      onClick={() => handleWalletConnect(wallet.id as any)}
      disabled={isConnecting || !wallet.isAvailable}
    >
      <div className="flex items-center space-x-3 w-full">
        <span className="text-2xl">{wallet.icon}</span>
        <div className="flex-1 text-left">
          <div className="font-semibold text-base">{wallet.name}</div>
          <div className="text-sm text-muted-foreground">{wallet.description}</div>
        </div>
        {isConnecting && selectedWallet === wallet.id && (
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        )}
        {isConnected && selectedWallet === wallet.id && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>
    </Button>
  );

  const InstallWalletButton = ({ wallet }: { wallet: typeof walletOptions[0] }) => (
    <Button
      variant="ghost"
      size="sm"
      className="w-full mt-2 text-muted-foreground hover:text-primary"
      onClick={() => window.open(wallet.downloadUrl, '_blank')}
    >
      <ExternalLink className="w-4 h-4 mr-2" />
      Install {wallet.name}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Connection Status */}
          {isConnected && address && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Wallet Connected!</span>
              </div>
              <div className="text-sm text-green-700 mt-1">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Connection Failed</span>
              </div>
              <div className="text-sm text-red-700 mt-1">{error}</div>
            </div>
          )}

          {/* Wallet Options */}
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <div key={wallet.id}>
                <WalletOptionButton wallet={wallet} />
                {!wallet.isAvailable && wallet.id !== 'walletconnect' && (
                  <InstallWalletButton wallet={wallet} />
                )}
              </div>
            ))}
          </div>

          {/* Info Text */}
          <div className="text-sm text-muted-foreground text-center pt-4 border-t">
            <p>
              By connecting a wallet, you agree to Blockademia's{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isConnecting}
            >
              Cancel
            </Button>
            {isConnected && (
              <Button
                onClick={handleClose}
                className="flex-1"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}