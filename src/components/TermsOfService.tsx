import { ArrowLeft, Scale, BookOpen, CreditCard, Shield, AlertTriangle, Gavel } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            size="sm"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mt-2">Last updated: January 2025</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="p-6 glass-glow sticky top-8">
              <h3 className="font-heading mb-4 text-accent">Table of Contents</h3>
              <nav className="space-y-2 text-sm">
                <a href="#acceptance" className="block text-muted-foreground hover:text-foreground transition-colors">Acceptance of Terms</a>
                <a href="#services" className="block text-muted-foreground hover:text-foreground transition-colors">Our Services</a>
                <a href="#user-accounts" className="block text-muted-foreground hover:text-foreground transition-colors">User Accounts</a>
                <a href="#payment-terms" className="block text-muted-foreground hover:text-foreground transition-colors">Payment Terms</a>
                <a href="#web3-terms" className="block text-muted-foreground hover:text-foreground transition-colors">Web3 & Blockchain</a>
                <a href="#prohibited-conduct" className="block text-muted-foreground hover:text-foreground transition-colors">Prohibited Conduct</a>
                <a href="#liability" className="block text-muted-foreground hover:text-foreground transition-colors">Limitation of Liability</a>
                <a href="#changes" className="block text-muted-foreground hover:text-foreground transition-colors">Changes to Terms</a>
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <Card className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-primary">Welcome to Blockademia</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") govern your use of Blockademia's educational platform, including our courses, Web3 features, and blockchain-based reward system. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </Card>

            {/* Acceptance */}
            <Card id="acceptance" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  By creating an account, accessing our platform, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
                </p>
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-primary">Age Requirement:</strong> You must be at least 16 years old to use Blockademia. Users under 18 must have parental consent.
                  </p>
                </div>
              </div>
            </Card>

            {/* Services */}
            <Card id="services" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-secondary" />
                <h2 className="font-heading text-secondary">Our Services</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading mb-3">Educational Content</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Interactive courses on blockchain technology and web development</li>
                    <li>• Hands-on coding projects and practical exercises</li>
                    <li>• Progress tracking and performance analytics</li>
                    <li>• Digital certificates upon course completion</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Web3 Features</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• MetaMask wallet integration</li>
                    <li>• BLOCK testnet token rewards system</li>
                    <li>• Blockchain-based achievement tracking</li>
                    <li>• Monad testnet integration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading mb-3">Premium Services</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Advanced course content and projects</li>
                    <li>• Priority support and mentorship</li>
                    <li>• Exclusive community access</li>
                    <li>• Enhanced certification features</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* User Accounts */}
            <Card id="user-accounts" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-primary">User Accounts & Responsibilities</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading mb-3">Account Security</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• You are responsible for maintaining account confidentiality</li>
                    <li>• Use strong, unique passwords for your account</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• You are liable for all activities under your account</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Account Information</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Provide accurate and complete registration information</li>
                    <li>• Keep your contact information up to date</li>
                    <li>• Do not create multiple accounts</li>
                    <li>• Do not share or transfer your account</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Payment Terms */}
            <Card id="payment-terms" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">Payment Terms</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading mb-3">Premium Subscriptions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                      <h4 className="font-heading mb-2">Indian Payments</h4>
                      <p className="text-sm text-muted-foreground">₹150 INR with all major payment methods supported. GST included and compliant with Indian regulations.</p>
                    </div>
                    <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                      <h4 className="font-heading mb-2">Cryptocurrency</h4>
                      <p className="text-sm text-muted-foreground">Accept various cryptocurrencies with automatic conversion. Blockchain transaction fees apply.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Billing Policies</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Payments are processed securely through certified providers</li>
                    <li>• Subscriptions auto-renew unless cancelled</li>
                    <li>• Refunds available within 14 days of purchase</li>
                    <li>• All prices include applicable taxes</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Web3 Terms */}
            <Card id="web3-terms" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-secondary" />
                <h2 className="font-heading text-secondary">Web3 & Blockchain Terms</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-destructive">Important Notice:</strong> BLOCK tokens are testnet tokens with no monetary value. They are for educational and gamification purposes only.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Blockchain Interactions</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• All blockchain interactions are on testnets only</li>
                    <li>• You are responsible for wallet security and management</li>
                    <li>• Blockchain transactions are irreversible</li>
                    <li>• We do not control blockchain network performance</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Token Usage</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• BLOCK tokens are earned through course completion</li>
                    <li>• Tokens can be used for platform features and rewards</li>
                    <li>• Tokens have no cash value and cannot be exchanged</li>
                    <li>• Token balances may be reset during platform updates</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Prohibited Conduct */}
            <Card id="prohibited-conduct" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="font-heading text-destructive">Prohibited Conduct</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The following activities are strictly prohibited:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-heading mb-2">Platform Misuse</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Attempting to hack or exploit the platform</li>
                      <li>• Sharing account credentials</li>
                      <li>• Creating fake accounts or profiles</li>
                      <li>• Interfering with other users' experience</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading mb-2">Content Violations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Posting harmful or offensive content</li>
                      <li>• Sharing copyrighted material without permission</li>
                      <li>• Spamming or sending unsolicited messages</li>
                      <li>• Impersonating others</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Liability */}
            <Card id="liability" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">Limitation of Liability</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, Blockademia shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
                <div className="p-4 bg-muted/20 border border-border rounded-lg">
                  <h4 className="font-heading mb-2">Educational Purpose Disclaimer</h4>
                  <p className="text-sm text-muted-foreground">
                    Our courses and content are for educational purposes only. While we strive for accuracy, we do not guarantee that the information will be error-free or suitable for your specific needs.
                  </p>
                </div>
              </div>
            </Card>

            {/* Changes */}
            <Card id="changes" className="p-8 glass-glow">
              <h2 className="font-heading text-primary mb-6">Changes to These Terms</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We may update these Terms periodically to reflect changes in our services or legal requirements. We will notify you of significant changes through:
                </p>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• Email notifications to your registered address</li>
                  <li>• Platform notifications when you log in</li>
                  <li>• Updates to this page with revised dates</li>
                </ul>
                <p className="text-muted-foreground">
                  Continued use of our services after changes constitutes acceptance of the new Terms.
                </p>
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-8 glass-glow">
              <h2 className="font-heading text-primary mb-6">Questions About These Terms?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href = 'mailto:legal@blockademia.com'}
                  className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                >
                  Email Legal Team
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Contact Form
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}