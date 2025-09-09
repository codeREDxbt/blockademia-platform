import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Crown, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Shield,
  CheckCircle,
  Star,
  Gift,
  Zap,
  Bitcoin,
  Copy,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from 'sonner@2.0.3';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'upi' | 'card' | 'netbanking' | 'wallet' | 'crypto';
  icon: React.ReactNode;
  fees: string;
  processingTime: string;
  supported: boolean;
  popular?: boolean;
}

interface CryptoPayment {
  currency: string;
  address: string;
  amount: string;
  network?: string;
  qrCode?: string;
}

export default function PremiumPurchase() {
  const { user } = useAuth();
  const { wallet } = useWeb3();
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string>('');

  // Premium course pricing
  const pricing = {
    inr: 150,
    usd: 2,
    // Crypto prices are exclusive of taxes (18% GST)
    crypto: {
      usdt: '1.69', // Base price without tax
      eth: '0.000678', // Base price without tax  
      btc: '0.0000212', // Base price without tax
      sol: '0.127' // Base price without tax
    }
  };

  // Tax configuration for India
  const taxConfig = {
    gst: 0.18, // 18% GST on digital services
    description: 'Goods and Services Tax (GST)'
  };

  // Calculate crypto pricing with tax
  const getCryptoPricingWithTax = (cryptoAmount: string) => {
    const baseAmount = parseFloat(cryptoAmount);
    const taxAmount = baseAmount * taxConfig.gst;
    const totalAmount = baseAmount + taxAmount;
    return {
      baseAmount: baseAmount.toFixed(6),
      taxAmount: taxAmount.toFixed(6),
      totalAmount: totalAmount.toFixed(6)
    };
  };

  // Crypto payment addresses
  const cryptoAddresses = {
    eth: '0x59BFa5CBc18023aEFD441b1C3050849664BC730D',
    btc: '0x59BFa5CBc18023aEFD441b1C3050849664BC730D',
    usdt: '0x59BFa5CBc18023aEFD441b1C3050849664BC730D',
    sol: '4jW35beJbfbBcHopdEgE8KRzudVe8ovaoP9Bs6e8oPjQ'
  };

  // Payment methods available in India
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI (PhonePe, GPay, Paytm)',
      type: 'upi',
      icon: <Smartphone className="w-5 h-5" />,
      fees: 'Free',
      processingTime: 'Instant',
      supported: true,
      popular: true
    },
    {
      id: 'cards',
      name: 'Credit/Debit Cards',
      type: 'card',
      icon: <CreditCard className="w-5 h-5" />,
      fees: '2.9% + GST',
      processingTime: 'Instant',
      supported: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      type: 'netbanking',
      icon: <Shield className="w-5 h-5" />,
      fees: '₹2 + GST',
      processingTime: 'Instant',
      supported: true
    },
    {
      id: 'wallets',
      name: 'Digital Wallets',
      type: 'wallet',
      icon: <Wallet className="w-5 h-5" />,
      fees: 'Varies',
      processingTime: 'Instant',
      supported: true
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      type: 'crypto',
      icon: <Bitcoin className="w-5 h-5" />,
      fees: 'Network fees only',
      processingTime: '5-15 minutes',
      supported: true
    }
  ];

  const premiumFeatures = [
    'Access to Advanced & Premium courses',
    'Priority support and mentorship',
    'Industry project templates',
    'Advanced assessment tools',
    '1-on-1 career guidance sessions',
    'Job placement assistance',
    'Premium community access',
    'Downloadable course materials',
    'Lifetime access to purchased courses',
    'Certificate of completion'
  ];

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedAddress(label);
    toast.success(`${label} address copied!`);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    
    try {
      // Mock payment processing for different methods
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      switch (method) {
        case 'upi':
          // In production, integrate with Razorpay, PayU, or similar
          toast.success('Redirecting to UPI payment...');
          break;
        case 'cards':
          toast.success('Redirecting to card payment...');
          break;
        case 'netbanking':
          toast.success('Redirecting to net banking...');
          break;
        case 'wallets':
          toast.success('Redirecting to wallet payment...');
          break;
        default:
          toast.info('Payment method selected');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCryptoPayment = (crypto: string) => {
    const address = cryptoAddresses[crypto as keyof typeof cryptoAddresses];
    const baseAmount = pricing.crypto[crypto as keyof typeof pricing.crypto];
    const pricingBreakdown = getCryptoPricingWithTax(baseAmount);
    
    return (
      <div className="space-y-4">
        {/* Price Breakdown */}
        <div className="p-4 border rounded-lg bg-card/50">
          <h4 className="font-medium mb-3">Price Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course Price:</span>
              <span>{pricingBreakdown.baseAmount} {crypto.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{taxConfig.description} (18%):</span>
              <span>{pricingBreakdown.taxAmount} {crypto.toUpperCase()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total Amount:</span>
              <span className="text-accent">{pricingBreakdown.totalAmount} {crypto.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-4 border rounded-lg bg-card/50">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Send Exactly:</span>
            <span className="font-bold text-lg text-primary">{pricingBreakdown.totalAmount} {crypto.toUpperCase()}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Payment Address:</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-muted p-2 rounded text-xs flex-1 font-mono">
                  {address}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(address, crypto.toUpperCase())}
                >
                  {copiedAddress === crypto.toUpperCase() ? 
                    <CheckCircle className="w-4 h-4 text-accent" /> : 
                    <Copy className="w-4 h-4" />
                  }
                </Button>
              </div>
            </div>
            
            {crypto === 'sol' && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This is a Solana address. Make sure to send SOL tokens only.
                </AlertDescription>
              </Alert>
            )}
            
            {(crypto === 'usdt' || crypto === 'eth' || crypto === 'btc') && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Send {crypto.toUpperCase()} tokens to the Ethereum network address above.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Tax Information */}
        <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-500/5">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium text-blue-400">Tax Information</h4>
              <p className="text-xs text-muted-foreground">
                As per Indian regulations, 18% GST is applicable on digital services. 
                The amount above includes all applicable taxes.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border border-yellow-500/20 rounded-lg bg-yellow-500/5">
          <h4 className="font-medium mb-2">Payment Instructions:</h4>
          <ol className="text-sm space-y-1 text-muted-foreground">
            <li>1. Copy the payment address above</li>
            <li>2. Send exactly <strong>{pricingBreakdown.totalAmount} {crypto.toUpperCase()}</strong> to this address</li>
            <li>3. Keep your transaction hash for reference</li>
            <li>4. Your premium access will be activated within 15 minutes</li>
            <li>5. Contact support if you don't receive access within 1 hour</li>
          </ol>
          
          <Alert className="mt-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Important:</strong> Send the exact amount including tax ({pricingBreakdown.totalAmount} {crypto.toUpperCase()}). 
              Partial payments or payments without tax will not be processed.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Crown className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Blockademia Premium
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock advanced courses, premium features, and accelerate your blockchain career with our comprehensive premium membership.
        </p>
      </div>

      {/* Premium Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Premium Features
          </CardTitle>
          <CardDescription>
            Everything you get with Blockademia Premium
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-accent" />
            Simple Pricing
          </CardTitle>
          <CardDescription>
            One-time payment for lifetime access to premium courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">₹{pricing.inr}</div>
              <div className="text-muted-foreground">
                or ${pricing.usd} USD equivalent in cryptocurrency*
              </div>
              <div className="text-xs text-muted-foreground">
                *Cryptocurrency prices shown exclude taxes. Final amount includes 18% GST.
              </div>
            </div>
            
            {/* Crypto pricing preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {Object.entries(pricing.crypto).map(([crypto, baseAmount]) => {
                const pricingBreakdown = getCryptoPricingWithTax(baseAmount);
                return (
                  <div key={crypto} className="p-2 bg-muted/30 rounded text-center">
                    <div className="font-medium text-accent">{crypto.toUpperCase()}</div>
                    <div className="text-muted-foreground line-through text-xs">{baseAmount}</div>
                    <div className="font-medium">{pricingBreakdown.totalAmount}</div>
                  </div>
                );
              })}
            </div>
            
            <Badge variant="outline" className="text-accent border-accent">
              🎉 Launch Offer - 70% Off!
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Choose Payment Method
          </CardTitle>
          <CardDescription>
            Multiple secure payment options available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
            <TabsList className="grid w-full grid-cols-5">
              {paymentMethods.map((method) => (
                <TabsTrigger 
                  key={method.id} 
                  value={method.id}
                  disabled={!method.supported}
                >
                  <div className="flex items-center gap-1">
                    {method.icon}
                    <span className="hidden sm:inline">{method.name.split(' ')[0]}</span>
                    {method.popular && <Badge variant="outline" className="ml-1 text-xs">Popular</Badge>}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* UPI Payment */}
            <TabsContent value="upi" className="space-y-4">
              <div className="p-4 border rounded-lg bg-card/50">
                <h3 className="font-medium mb-2">UPI Payment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay instantly using your favorite UPI app - PhonePe, Google Pay, Paytm, or any other UPI app.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <div className="font-bold">₹{pricing.inr}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <div className="font-bold text-accent">Instant</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handlePayment('upi')} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Pay with UPI'}
                </Button>
              </div>
            </TabsContent>

            {/* Card Payment */}
            <TabsContent value="cards" className="space-y-4">
              <div className="p-4 border rounded-lg bg-card/50">
                <h3 className="font-medium mb-2">Credit/Debit Card</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay securely with your Visa, Mastercard, or RuPay card.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <div className="font-bold">₹{Math.round(pricing.inr * 1.029)} (incl. fees)</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <div className="font-bold text-accent">Instant</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handlePayment('cards')} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Pay with Card'}
                </Button>
              </div>
            </TabsContent>

            {/* Net Banking */}
            <TabsContent value="netbanking" className="space-y-4">
              <div className="p-4 border rounded-lg bg-card/50">
                <h3 className="font-medium mb-2">Net Banking</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay directly from your bank account using net banking.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <div className="font-bold">₹{pricing.inr + 2} (incl. fees)</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <div className="font-bold text-accent">Instant</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handlePayment('netbanking')} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Pay with Net Banking'}
                </Button>
              </div>
            </TabsContent>

            {/* Digital Wallets */}
            <TabsContent value="wallets" className="space-y-4">
              <div className="p-4 border rounded-lg bg-card/50">
                <h3 className="font-medium mb-2">Digital Wallets</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay using Paytm Wallet, Amazon Pay, or other digital wallets.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <div className="font-bold">₹{pricing.inr}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <div className="font-bold text-accent">Instant</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handlePayment('wallets')} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Pay with Wallet'}
                </Button>
              </div>
            </TabsContent>

            {/* Cryptocurrency */}
            <TabsContent value="crypto" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Cryptocurrency Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Pay with your preferred cryptocurrency. Transactions are verified on the blockchain.
                </p>
                
                <div className="p-3 border border-amber-500/20 rounded-lg bg-amber-500/5 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-amber-400 font-medium">Tax Notice</p>
                      <p className="text-xs text-muted-foreground">
                        Cryptocurrency prices are shown exclusive of taxes. 18% GST will be added to the final amount as per Indian regulations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="usdt" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="usdt">USDT</TabsTrigger>
                    <TabsTrigger value="eth">ETH</TabsTrigger>
                    <TabsTrigger value="btc">BTC</TabsTrigger>
                    <TabsTrigger value="sol">SOL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="usdt">
                    {renderCryptoPayment('usdt')}
                  </TabsContent>
                  
                  <TabsContent value="eth">
                    {renderCryptoPayment('eth')}
                  </TabsContent>
                  
                  <TabsContent value="btc">
                    {renderCryptoPayment('btc')}
                  </TabsContent>
                  
                  <TabsContent value="sol">
                    {renderCryptoPayment('sol')}
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Security & Compliance Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <div className="font-medium">Security & Compliance</div>
            <ul className="text-sm space-y-1">
              <li>• All payments are processed through secure, RBI-approved gateways</li>
              <li>• We comply with Indian government guidelines and regulations</li>
              <li>• Your payment information is encrypted and never stored</li>
              <li>• Cryptocurrency payments include 18% GST as per Indian tax laws</li>
              <li>• Full refund available within 7 days of purchase</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Support */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-medium">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              Our support team is available 24/7 to assist with your purchase
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:support@blockademia.com">
                Contact Support <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}