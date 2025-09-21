import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import WalletConnectModal from './WalletConnectModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface WalletButtonProps {
  onWalletConnect?: (walletType: 'metamask' | 'trust' | 'walletconnect', address: string) => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  showDropdown?: boolean;
}

export default function WalletButton({ 
  onWalletConnect, 
  variant = 'default', 
  size = 'default',
  showDropdown = true 
}: WalletButtonProps) {
  const { 
    isConnected, 
    address, 
    chainId, 
    walletType, 
    disconnectWallet, 
    isConnecting 
  } = useWallet();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnect = () => {
    setIsModalOpen(true);
  };

  const handleModalConnect = (walletType: 'metamask' | 'trust' | 'walletconnect', address: string) => {
    setIsModalOpen(false);
    if (onWalletConnect) {
      onWalletConnect(walletType, address);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // You could add a toast notification here
    }
  };

  const openEtherscan = () => {
    if (address && chainId) {
      const baseUrl = chainId === 1 
        ? 'https://etherscan.io'
        : chainId === 11155111 
        ? 'https://sepolia.etherscan.io'
        : chainId === 137
        ? 'https://polygonscan.com'
        : 'https://etherscan.io';
      
      window.open(`${baseUrl}/address/${address}`, '_blank');
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getWalletIcon = () => {
    switch (walletType) {
      case 'metamask':
        return '🦊';
      case 'trust':
        return '🛡️';
      case 'walletconnect':
        return '📱';
      default:
        return '💳';
    }
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 11155111:
        return 'Sepolia';
      case 137:
        return 'Polygon';
      default:
        return `Chain ${chainId}`;
    }
  };

  // If not connected, show connect button
  if (!isConnected) {
    return (
      <>
        <Button
          onClick={handleConnect}
          variant={variant}
          size={size}
          disabled={isConnecting}
          className="flex items-center space-x-2"
        >
          <Wallet className="w-4 h-4" />
          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </Button>
        
        <WalletConnectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConnect={handleModalConnect}
        />
      </>
    );
  }

  // If connected and showDropdown is false, show simple connected button
  if (!showDropdown) {
    return (
      <Button
        variant={variant}
        size={size}
        className="flex items-center space-x-2"
      >
        <span>{getWalletIcon()}</span>
        <span>{formatAddress(address!)}</span>
      </Button>
    );
  }

  // If connected and showDropdown is true, show dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className="flex items-center space-x-2"
        >
          <span>{getWalletIcon()}</span>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{formatAddress(address!)}</span>
            {chainId && (
              <span className="text-xs text-muted-foreground">
                {getNetworkName(chainId)}
              </span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <div className="text-sm font-medium">Connected Wallet</div>
          <div className="text-xs text-muted-foreground capitalize">
            {walletType} • {chainId && getNetworkName(chainId)}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={openEtherscan} className="cursor-pointer">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleDisconnect} 
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}