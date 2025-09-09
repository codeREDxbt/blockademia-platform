import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
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
              Privacy Policy
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
                <a href="#information-collection" className="block text-muted-foreground hover:text-foreground transition-colors">Information Collection</a>
                <a href="#data-usage" className="block text-muted-foreground hover:text-foreground transition-colors">Data Usage</a>
                <a href="#web3-privacy" className="block text-muted-foreground hover:text-foreground transition-colors">Web3 & Blockchain</a>
                <a href="#data-protection" className="block text-muted-foreground hover:text-foreground transition-colors">Data Protection</a>
                <a href="#user-rights" className="block text-muted-foreground hover:text-foreground transition-colors">Your Rights</a>
                <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors">Contact Us</a>
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <Card className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-primary">Our Commitment to Privacy</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                At Blockademia, we believe in transparency and user control over personal data. This Privacy Policy explains how we collect, use, and protect your information while providing cutting-edge blockchain education. We are committed to following the highest standards of data protection and compliance with global privacy regulations.
              </p>
            </Card>

            {/* Information Collection */}
            <Card id="information-collection" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">Information We Collect</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading mb-3">Account Information</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Email address and username</li>
                    <li>• Profile information you choose to provide</li>
                    <li>• Course progress and completion data</li>
                    <li>• Learning preferences and settings</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Technical Information</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Device and browser information</li>
                    <li>• IP address and location data</li>
                    <li>• Usage patterns and interaction data</li>
                    <li>• Performance and error logs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading mb-3">Web3 Data</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Wallet addresses (when connected)</li>
                    <li>• Transaction data on Monad testnet</li>
                    <li>• BLOCK token balance and transactions</li>
                    <li>• Smart contract interactions</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Data Usage */}
            <Card id="data-usage" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-secondary" />
                <h2 className="font-heading text-secondary">How We Use Your Data</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading mb-3">Educational Services</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Personalized learning experiences</li>
                    <li>• Progress tracking and analytics</li>
                    <li>• Certificate generation</li>
                    <li>• Gamification features</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Platform Improvement</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Performance optimization</li>
                    <li>• Bug fixes and security updates</li>
                    <li>• Feature development</li>
                    <li>• User experience research</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Web3 Privacy */}
            <Card id="web3-privacy" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-primary">Web3 & Blockchain Privacy</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our Web3 integration is designed with privacy in mind:
                </p>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• Wallet connections are optional and user-controlled</li>
                  <li>• Blockchain data is public by nature but pseudonymous</li>
                  <li>• We don't store private keys or seed phrases</li>
                  <li>• Transaction data is limited to educational activities</li>
                  <li>• You can disconnect your wallet at any time</li>
                </ul>
              </div>
            </Card>

            {/* Data Protection */}
            <Card id="data-protection" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">Data Protection Measures</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading mb-3">Technical Safeguards</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• End-to-end encryption</li>
                    <li>• Secure data transmission (HTTPS)</li>
                    <li>• Regular security audits</li>
                    <li>• Access controls and monitoring</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Operational Safeguards</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Limited data access policies</li>
                    <li>• Employee training programs</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular backup and recovery</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* User Rights */}
            <Card id="user-rights" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-6 h-6 text-secondary" />
                <h2 className="font-heading text-secondary">Your Rights</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You have the following rights regarding your personal data:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Access & Portability</h4>
                    <p className="text-sm text-muted-foreground">Request copies of your data and transfer it to other services</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Correction & Updates</h4>
                    <p className="text-sm text-muted-foreground">Modify or update incorrect personal information</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Deletion</h4>
                    <p className="text-sm text-muted-foreground">Request permanent deletion of your account and data</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Restrictions</h4>
                    <p className="text-sm text-muted-foreground">Limit how we process your personal information</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact */}
            <Card id="contact" className="p-8 glass-glow">
              <h2 className="font-heading text-primary mb-6">Contact Our Privacy Team</h2>
              <p className="text-muted-foreground mb-4">
                Have questions about this Privacy Policy or your data? Reach out to us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href = 'mailto:privacy@blockademia.com'}
                  className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                >
                  Email Privacy Team
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