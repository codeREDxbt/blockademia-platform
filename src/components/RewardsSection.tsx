import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { useWeb3 } from '../contexts/Web3Context';
import { validateConfig } from '../config/blockchain';
import { 
  Coins, 
  Trophy, 
  ShoppingCart, 
  Star, 
  Gift, 
  Crown,
  Zap,
  Target,
  TrendingUp,
  Award,
  Flame,
  Gem
} from 'lucide-react';

export default function RewardsSection() {
  const { userProgress, marketplaceItems, purchaseItem, faucetTokens, faucetToWallet, getWeb3Integration } = useGame();
  const { isAuthenticated } = useAuth();
  const { wallet, faucetTokens: web3FaucetTokens } = useWeb3();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const web3Info = getWeb3Integration();
  const configValidation = validateConfig();

  if (!isAuthenticated) {
    return (
      <section id="rewards" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🎁 Rewards & Marketplace
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sign in to unlock our gamified learning experience with XP, tokens, and exclusive rewards!
            </p>
            <Button size="lg" className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent">
              Sign In to Start Earning
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const handlePurchase = (itemId: string) => {
    const success = purchaseItem(itemId);
    if (success) {
      setSelectedItem(null);
    }
  };

  const handleTestFaucet = async () => {
    if (web3Info.canReceiveTokens) {
      const success = await faucetToWallet(50, 'Test faucet bonus');
      if (success) {
        return;
      }
    }
    faucetTokens(50, 'Test faucet bonus');
  };

  return (
    <section id="rewards" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎁 Rewards & Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn BLOCK tokens through learning, level up your skills, and redeem exclusive rewards in our marketplace!
          </p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass border-accent/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                Level {userProgress?.level || 1}
              </div>
              <div className="text-sm text-muted-foreground">
                {userProgress?.xpToNextLevel || 1000} XP to next level
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">
                {userProgress?.blocktokens || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                BLOCK Tokens
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-secondary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary mb-1">
                {userProgress?.coursesCompleted.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Courses Completed
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {userProgress?.achievements.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Achievements
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="glass mb-12">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Level Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {userProgress?.totalXP || 0} total XP earned
                </p>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                Level {userProgress?.level || 1}
              </Badge>
            </div>
            <Progress 
              value={userProgress ? (userProgress.xp / (userProgress.xp + userProgress.xpToNextLevel)) * 100 : 0} 
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{userProgress?.xp || 0} XP</span>
              <span>{userProgress?.xpToNextLevel || 1000} XP to next level</span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="faucet" className="flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Token Faucet
            </TabsTrigger>
          </TabsList>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceItems.map((item) => (
                <Card key={item.id} className="glass hover:glass-glow transition-all group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{item.icon}</div>
                      <Badge variant={item.type === 'special' ? 'default' : 'secondary'}>
                        {item.cost} BLOCK
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          variant={item.type === 'special' ? 'default' : 'outline'}
                          disabled={!item.available || (userProgress?.blocktokens || 0) < item.cost}
                        >
                          {(userProgress?.blocktokens || 0) >= item.cost ? (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Purchase
                            </>
                          ) : (
                            `Need ${item.cost - (userProgress?.blocktokens || 0)} more tokens`
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-2xl">{item.icon}</span>
                            {item.name}
                          </DialogTitle>
                          <DialogDescription>
                            {item.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                            <span>Cost:</span>
                            <Badge variant="outline">{item.cost} BLOCK tokens</Badge>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                            <span>Your Balance:</span>
                            <Badge variant={((userProgress?.blocktokens || 0) >= item.cost) ? 'default' : 'destructive'}>
                              {userProgress?.blocktokens || 0} BLOCK tokens
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handlePurchase(item.id)}
                              disabled={(userProgress?.blocktokens || 0) < item.cost}
                              className="flex-1"
                            >
                              Confirm Purchase
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProgress?.achievements.map((achievement) => (
                <Card key={achievement.id} className="glass border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline" className="text-primary">
                        +{achievement.xpReward} XP
                      </Badge>
                      <Badge variant="outline" className="text-accent">
                        +{achievement.tokenReward} BLOCK
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Unlocked {achievement.unlockedAt.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              )) || (
                <div className="col-span-full text-center py-12">
                  <Trophy className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Achievements Yet</h3>
                  <p className="text-muted-foreground">Complete courses and reach milestones to unlock achievements!</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Token Faucet Tab */}
          <TabsContent value="faucet" className="mt-8">
            <div className="max-w-2xl mx-auto">
              <Card className="glass">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Gem className="w-8 h-8 text-accent" />
                    BLOCK Token Faucet
                  </CardTitle>
                  <CardDescription>
                    Earn BLOCK tokens by completing courses and reaching new levels!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Token Earning Rules */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      How to Earn BLOCK Tokens
                    </h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span>Level Up</span>
                        </div>
                        <Badge variant="outline">100 BLOCK</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-accent" />
                          <span>Complete Course</span>
                        </div>
                        <Badge variant="outline">100 BLOCK</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-secondary" />
                          <span>Unlock Achievement</span>
                        </div>
                        <Badge variant="outline">25-500 BLOCK</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-primary" />
                          <span>Daily Learning Streak</span>
                        </div>
                        <Badge variant="outline">25 BLOCK</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Web3 Integration Status */}
                  <div className="border-t pt-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        Web3 Integration
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${web3Info.hasWallet ? 'bg-accent' : 'bg-muted-foreground'}`} />
                            <span className="text-sm">Wallet Connected</span>
                          </div>
                          <Badge variant={web3Info.hasWallet ? 'default' : 'outline'}>
                            {web3Info.hasWallet ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${web3Info.canReceiveTokens ? 'bg-accent' : 'bg-yellow-500'}`} />
                            <span className="text-sm">Testnet Ready</span>
                          </div>
                          <Badge variant={web3Info.canReceiveTokens ? 'default' : 'secondary'}>
                            {web3Info.canReceiveTokens ? 'Ready' : 'Switch Network'}
                          </Badge>
                        </div>

                        {wallet && (
                          <div className="p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                            <div className="text-sm font-medium mb-1">Connected Wallet</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                            </div>
                            <div className="text-xs text-accent mt-1">
                              Balance: {wallet.blockTokenBalance} BLOCK
                              {configValidation.isMock && <span className="text-muted-foreground"> (Mock)</span>}
                              {configValidation.isProduction && <span className="text-accent"> (Real)</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Test Faucet */}
                  <div className="border-t pt-6">
                    <div className="text-center space-y-4">
                      <h4 className="font-medium text-muted-foreground">
                        {web3Info.canReceiveTokens ? 
                          (configValidation.isProduction ? 'Real Token Faucet' : 'Mock Token Faucet') : 
                          'Development Test Faucet'
                        }
                      </h4>
                      <Button 
                        onClick={handleTestFaucet}
                        variant="outline"
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        {web3Info.canReceiveTokens ? 'Send 50 Tokens to Wallet' : 'Get 50 Test Tokens'}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        {web3Info.canReceiveTokens 
                          ? (configValidation.isProduction 
                              ? 'Real BLOCK tokens will be sent to your wallet on Monad testnet'
                              : 'Mock tokens will be sent to your wallet for testing'
                            )
                          : 'Connect wallet and switch to Monad testnet for Web3 rewards'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Current Balance */}
                  <div className="text-center p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                    <Coins className="w-12 h-12 text-accent mx-auto mb-2" />
                    <div className="text-3xl font-bold text-accent mb-1">
                      {userProgress?.blocktokens || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      BLOCK Tokens Available
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
