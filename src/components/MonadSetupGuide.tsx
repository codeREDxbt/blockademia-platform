import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Terminal,
  Wallet,
  Code,
  Network,
  Coins,
  Settings
} from 'lucide-react';
import { BLOCKCHAIN_CONFIG, DEPLOYMENT_CHECKLIST, SETUP_GUIDE, validateConfig } from '../config/blockchain';

export default function MonadSetupGuide() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const validation = validateConfig();

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const contractTemplate = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockademiaToken is ERC20, Ownable {
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18; // 100 tokens
    mapping(address => uint256) public lastFaucetTime;
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    constructor() ERC20("Blockademia Token", "BLOCK") {
        _mint(msg.sender, 1000000 * 10**18); // 1M initial supply
    }

    function faucet() external {
        require(
            block.timestamp >= lastFaucetTime[msg.sender] + FAUCET_COOLDOWN,
            "Faucet cooldown not met"
        );
        
        lastFaucetTime[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);
    }

    function faucet(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}`;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🚀 Monad Testnet Integration Guide
        </h1>
        <p className="text-muted-foreground">
          Step-by-step guide to integrate your BLOCK token on Monad testnet
        </p>
      </div>

      {/* Configuration Status */}
      <Alert className={
        validation.isProduction ? 'border-accent' : 
        validation.isMock ? 'border-primary' : 
        'border-yellow-500'
      }>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <div className="font-medium">
              Configuration Status: {
                validation.isProduction ? '✅ Production Ready' :
                validation.isMock ? '🔧 Development Mode' :
                '⚠️ Needs Setup'
              }
            </div>
            
            {validation.isProduction && (
              <div className="text-sm text-accent">
                ✅ Real Monad testnet contract configured
              </div>
            )}
            
            {validation.isMock && (
              <div className="text-sm text-primary">
                🔧 Using mock contract for development and testing
              </div>
            )}
            
            {validation.warnings && validation.warnings.length > 0 && (
              <ul className="text-sm space-y-1 text-muted-foreground">
                {validation.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            )}
            
            {!validation.isValid && (
              <ul className="text-sm space-y-1 text-yellow-600">
                {validation.issues.map((issue, index) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            )}
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
          <TabsTrigger value="config">Configure</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-accent" />
                Monad Testnet Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                    <span className="text-sm">Chain ID</span>
                    <Badge variant="outline">{BLOCKCHAIN_CONFIG.MONAD_TESTNET.chainId}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                    <span className="text-sm">RPC URL</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(BLOCKCHAIN_CONFIG.MONAD_TESTNET.rpcUrl, 'rpc')}
                    >
                      {copiedText === 'rpc' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                    <span className="text-sm">Explorer</span>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={BLOCKCHAIN_CONFIG.MONAD_TESTNET.blockExplorer} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                    <span className="text-sm">Currency</span>
                    <Badge variant="outline">{BLOCKCHAIN_CONFIG.MONAD_TESTNET.nativeCurrency.symbol}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SETUP_GUIDE.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      {step.link && (
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                          <a href={step.link} target="_blank" rel="noopener noreferrer">
                            Visit {step.link.includes('faucet') ? 'Faucet' : 'Link'} <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contract Tab */}
        <TabsContent value="contract" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-accent" />
                Sample BLOCK Token Contract
              </CardTitle>
              <CardDescription>
                Ready-to-deploy ERC-20 contract with faucet functionality for learning rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto font-mono">
                    <code>{contractTemplate}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(contractTemplate, 'contract')}
                  >
                    {copiedText === 'contract' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="font-medium">Contract Features:</div>
                      <ul className="text-sm space-y-1">
                        <li>• 🪙 ERC-20 standard token</li>
                        <li>• 🚰 Public faucet with 24h cooldown</li>
                        <li>• 👑 Owner-only mint function for rewards</li>
                        <li>• 🔒 1M initial token supply</li>
                        <li>• ⏰ 100 tokens per faucet claim</li>
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deploy Tab */}
        <TabsContent value="deploy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Deployment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-card/50">
                  <h4 className="font-medium mb-2">Option 1: Using Remix IDE</h4>
                  <ol className="text-sm space-y-2 text-muted-foreground">
                    <li>1. Open <a href="https://remix.ethereum.org" target="_blank" rel="noopener noreferrer" className="text-accent underline">Remix IDE</a></li>
                    <li>2. Create new file: BlockademiaToken.sol</li>
                    <li>3. Paste the contract code above</li>
                    <li>4. Compile with Solidity 0.8.0+</li>
                    <li>5. Connect MetaMask to Monad testnet</li>
                    <li>6. Deploy to Monad testnet</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg bg-card/50">
                  <h4 className="font-medium mb-2">Option 2: Using Hardhat</h4>
                  <div className="space-y-2">
                    <div className="bg-muted/50 p-3 rounded font-mono text-sm">
                      npm install @openzeppelin/contracts
                    </div>
                    <div className="bg-muted/50 p-3 rounded font-mono text-sm">
                      npx hardhat compile
                    </div>
                    <div className="bg-muted/50 p-3 rounded font-mono text-sm">
                      npx hardhat run scripts/deploy.js --network monad-testnet
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Coins className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Make sure you have MON tokens in your wallet for gas fees. 
                  Visit the Monad testnet faucet first!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Config Tab */}
        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Update Configuration
              </CardTitle>
              <CardDescription>
                Update your contract address in the configuration file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">1. Open configuration file:</label>
                  <div className="bg-muted/50 p-3 rounded font-mono text-sm mt-1">
                    /config/blockchain.ts
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">2. Update contract address:</label>
                  <div className="bg-muted/50 p-3 rounded font-mono text-sm mt-1">
                    address: 'YOUR_TOKEN_CONTRACT_ADDRESS_HERE' → address: '0x...'
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">3. Current configuration:</label>
                  <div className="bg-muted/50 p-3 rounded text-sm mt-1">
                    <div>
                      Address: <span className="font-mono">{BLOCK_TOKEN_CONTRACT.address}</span>
                      {validation.isMock && <Badge variant="outline" className="ml-2 text-xs">Mock</Badge>}
                      {validation.isProduction && <Badge variant="default" className="ml-2 text-xs">Production</Badge>}
                    </div>
                    <div>Symbol: <span className="font-mono">{BLOCK_TOKEN_CONTRACT.symbol}</span></div>
                    <div>Decimals: <span className="font-mono">{BLOCK_TOKEN_CONTRACT.decimals}</span></div>
                  </div>
                </div>
              </div>

              <Alert className={
                validation.isProduction ? 'border-accent' : 
                validation.isMock ? 'border-primary' : 
                'border-yellow-500'
              }>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Status: {
                    validation.isProduction ? '✅ Production contract configured!' :
                    validation.isMock ? '🔧 Development mode - replace with your contract address for production' :
                    '⚠️ Please update your contract address'
                  }
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Tab */}
        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-accent" />
                Testing Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Testing Checklist:</h4>
                  <div className="space-y-2">
                    {DEPLOYMENT_CHECKLIST.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-muted-foreground" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-accent/5">
                  <h4 className="font-medium mb-2">Next Steps:</h4>
                  <ol className="text-sm space-y-1 text-muted-foreground">
                    <li>1. Connect your wallet to the platform</li>
                    <li>2. Switch to Monad testnet</li>
                    <li>3. Complete a lesson to test token rewards</li>
                    <li>4. Check your wallet for received BLOCK tokens</li>
                    <li>5. Verify transactions on Monad explorer</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}