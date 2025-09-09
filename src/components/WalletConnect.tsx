import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from 'sonner';
import MetaMaskDebugger from './MetaMaskDebugger';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Coins,
  TrendingUp,
  Clock,
  RefreshCw,
  LogOut,
  ChevronDown,
  Network,
  Zap,
  Shield
} from 'lucide-react';

export default function WalletConnect() {
  const { 
    wallet, 
    isConnecting, 
    transactions,
    connectWallet, 
    disconnectWallet, 
    switchToTestnet,
    getTransactionHistory 
  } = useWeb3();
  
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    if (showFullAddress) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'Monad Testnet':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Monad Testnet (Mock)':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Ethereum Mainnet':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  const getWalletIcon = (walletType?: string) => {
    switch (walletType) {
      case 'metamask':
        return { icon: '🦊', color: 'text-orange-500', bgColor: 'bg-orange-500/10' };
      case 'trustwallet':
        return { icon: '🛡️', color: 'text-blue-500', bgColor: 'bg-blue-500/10' };
      default:
        return { icon: '👛', color: 'text-primary', bgColor: 'bg-primary/10' };
    }
  };

  const recentTransactions = getTransactionHistory().slice(0, 3);

  if (!wallet) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-accent" />
              Connect Your Wallet
            </DialogTitle>
            <DialogDescription>
              Choose your preferred Web3 wallet to receive BLOCK tokens and interact with the blockchain.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* MetaMask Option */}
            <Card className="border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-xl">
                      🦊
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        MetaMask
                        <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-1 rounded">Popular</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">Most popular Ethereum wallet</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => connectWallet('metamask')}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect MetaMask
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* TrustWallet Option */}
            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-xl">
                      🛡️
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        TrustWallet  
                        <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">Mobile</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">Great for mobile and desktop</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => connectWallet('trustwallet')}
                    disabled={isConnecting}
                    variant="outline"
                    className="w-full border-blue-500/30 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/50"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Connect TrustWallet
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auto-Connect Option */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        Auto-Connect
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Smart</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">Automatically detect available wallet</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => connectWallet()}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Auto-Connecting...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Auto-Connect Wallet
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Debug Tools Section */}
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground bg-yellow-500/10 border border-yellow-500/20 rounded p-2">
                💡 <strong>Having trouble?</strong> Use the debug tools below to troubleshoot connection issues.
              </p>
              
              <div className="flex gap-2 justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={async () => {
                    console.log('🔍 Quick wallet test...');
                    if ((window as any).ethereum?.request) {
                      try {
                        const accounts = await (window as any).ethereum.request({ 
                          method: 'eth_requestAccounts' 
                        });
                        console.log('✅ Quick test successful:', accounts);
                        toast.success('Wallet working!', {
                          description: `Found ${accounts.length} accounts`
                        });
                      } catch (error: any) {
                        console.error('❌ Quick test failed:', error);
                        toast.error('Test failed', {
                          description: error.message || 'Check console for details'
                        });
                      }
                    } else {
                      toast.error('No wallet found', {
                        description: 'Please install a Web3 wallet first'
                      });
                    }
                  }}
                  className="text-xs"
                >
                  Quick Test
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={async () => {
                    console.log('🚨 Emergency connection attempt...');
                    if ((window as any).ethereum) {
                      try {
                        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                        connectWallet();
                      } catch (error) {
                        console.error('🚨 Emergency failed:', error);
                      }
                    }
                  }}
                  className="text-xs"
                >
                  Emergency
                </Button>
              </div>
              
              <MetaMaskDebugger />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Connected wallet display
  const walletStyle = getWalletIcon(wallet.walletType);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 ${walletStyle.bgColor} rounded-full flex items-center justify-center text-sm`}>
              {walletStyle.icon}
            </div>
            <span className="hidden sm:inline">{formatAddress(wallet.address)}</span>
            <Badge variant="secondary" className={getNetworkColor(wallet.network)}>
              {wallet.network}
            </Badge>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`w-8 h-8 ${walletStyle.bgColor} rounded-full flex items-center justify-center text-lg`}>
              {walletStyle.icon}
            </div>
            {wallet.walletName || 'Wallet'} Connected
          </DialogTitle>
          <DialogDescription>
            Your wallet is connected and ready to use.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Wallet Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Address:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullAddress(!showFullAddress)}
                    className="h-6 px-2 text-xs"
                  >
                    <ChevronDown className={`w-3 h-3 transition-transform ${showFullAddress ? 'rotate-180' : ''}`} />
                  </Button>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {formatAddress(wallet.address)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 w-6 p-0"
                  >
                    {copied ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network:</span>
                <Badge variant="secondary" className={getNetworkColor(wallet.network)}>
                  <Network className="w-3 h-3 mr-1" />
                  {wallet.network}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Balance:</span>
                <span className="text-sm font-mono">{wallet.balance} MON</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">BLOCK Tokens:</span>
                <div className="flex items-center gap-1">
                  <Coins className="w-3 h-3 text-accent" />
                  <span className="text-sm font-mono text-accent">{wallet.blockTokenBalance}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          {recentTransactions.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  {recentTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={tx.status === 'confirmed' ? 'secondary' : 'outline'}
                          className="w-2 h-2 p-0 rounded-full"
                        />
                        <span className="text-muted-foreground">{tx.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <Coins className="w-3 h-3" />
                        <span>+{tx.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {wallet.network !== 'Monad Testnet' && (
              <Button 
                onClick={switchToTestnet}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Network className="w-4 h-4 mr-2" />
                Switch Network
              </Button>
            )}
            
            <Button 
              onClick={disconnectWallet}
              variant="outline"
              size="sm"
              className="flex-1 text-red-500 border-red-500/20 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}