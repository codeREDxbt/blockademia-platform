import { ArrowLeft, Cookie, Settings, Eye, Shield, ToggleLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CookiePolicy() {
  const navigate = useNavigate();
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always enabled
    analytics: true,
    marketing: false,
    personalization: true
  });

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to localStorage or API
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings));
    alert('Cookie preferences saved successfully!');
  };

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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mt-2">Last updated: January 2025</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Cookie Settings Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 glass-glow sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-accent" />
                <h3 className="font-heading text-accent">Cookie Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Essential</p>
                    <p className="text-xs text-muted-foreground">Required for site functionality</p>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Analytics</p>
                    <p className="text-xs text-muted-foreground">Help us improve the platform</p>
                  </div>
                  <Switch 
                    checked={cookieSettings.analytics}
                    onCheckedChange={(checked) => setCookieSettings(prev => ({ ...prev, analytics: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Marketing</p>
                    <p className="text-xs text-muted-foreground">Personalized advertisements</p>
                  </div>
                  <Switch 
                    checked={cookieSettings.marketing}
                    onCheckedChange={(checked) => setCookieSettings(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Personalization</p>
                    <p className="text-xs text-muted-foreground">Customized content and recommendations</p>
                  </div>
                  <Switch 
                    checked={cookieSettings.personalization}
                    onCheckedChange={(checked) => setCookieSettings(prev => ({ ...prev, personalization: checked }))}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="w-full mt-6 bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                size="sm"
              >
                Save Preferences
              </Button>
              
              <div className="mt-4 pt-4 border-t border-border">
                <nav className="space-y-2 text-sm">
                  <a href="#what-are-cookies" className="block text-muted-foreground hover:text-foreground transition-colors">What are Cookies?</a>
                  <a href="#types-of-cookies" className="block text-muted-foreground hover:text-foreground transition-colors">Types of Cookies</a>
                  <a href="#how-we-use" className="block text-muted-foreground hover:text-foreground transition-colors">How We Use Cookies</a>
                  <a href="#third-party" className="block text-muted-foreground hover:text-foreground transition-colors">Third-Party Cookies</a>
                  <a href="#manage-cookies" className="block text-muted-foreground hover:text-foreground transition-colors">Managing Cookies</a>
                </nav>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <Card className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-primary">Understanding Our Cookie Usage</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                This Cookie Policy explains how Blockademia uses cookies and similar technologies to enhance your learning experience, analyze platform usage, and provide personalized content. We believe in transparency about our data collection practices.
              </p>
            </Card>

            {/* What are Cookies */}
            <Card id="what-are-cookies" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">What are Cookies?</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences, track your activities, and provide a more personalized experience.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <h4 className="font-heading mb-2 text-primary">Session Cookies</h4>
                    <p className="text-sm text-muted-foreground">Temporary cookies that expire when you close your browser. Used for navigation and security.</p>
                  </div>
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <h4 className="font-heading mb-2 text-accent">Persistent Cookies</h4>
                    <p className="text-sm text-muted-foreground">Stored on your device for a longer period. Used for remembering your preferences and login status.</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Types of Cookies */}
            <Card id="types-of-cookies" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <ToggleLeft className="w-6 h-6 text-secondary" />
                <h2 className="font-heading text-secondary">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6">
                <div className="grid gap-6">
                  <div className="p-6 bg-card/50 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <h3 className="font-heading">Essential Cookies (Required)</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      These cookies are necessary for the website to function and cannot be disabled.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• User authentication and session management</li>
                      <li>• Security and fraud prevention</li>
                      <li>• Shopping cart and course enrollment</li>
                      <li>• Load balancing and performance optimization</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-card/50 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <h3 className="font-heading">Analytics Cookies (Optional)</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Help us understand how users interact with our platform to improve the learning experience.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Course completion rates and learning patterns</li>
                      <li>• Platform usage statistics and popular content</li>
                      <li>• Error tracking and performance monitoring</li>
                      <li>• User journey analysis and feature adoption</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-card/50 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <h3 className="font-heading">Personalization Cookies (Optional)</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Customize your learning experience based on your preferences and progress.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Course recommendations and suggested learning paths</li>
                      <li>• UI theme preferences and accessibility settings</li>
                      <li>• Language and localization preferences</li>
                      <li>• Gamification and achievement tracking</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-card/50 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <h3 className="font-heading">Marketing Cookies (Optional)</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Used to deliver relevant advertisements and measure their effectiveness.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Targeted course recommendations</li>
                      <li>• Social media integration and sharing</li>
                      <li>• Email marketing optimization</li>
                      <li>• Affiliate and partnership tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* How We Use Cookies */}
            <Card id="how-we-use" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-primary">How We Use Cookies</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading mb-3">Learning Experience Enhancement</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Remember your course progress and bookmarks</li>
                    <li>• Maintain your login session across visits</li>
                    <li>• Save your quiz answers and code submissions</li>
                    <li>• Personalize the dashboard based on your activity</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Platform Optimization</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Analyze which courses and features are most popular</li>
                    <li>• Identify technical issues and improve performance</li>
                    <li>• Test new features with different user groups</li>
                    <li>• Optimize content delivery and loading times</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading mb-3">Web3 Integration</h3>
                  <ul className="text-muted-foreground space-y-2 ml-4">
                    <li>• Remember your wallet connection preferences</li>
                    <li>• Track BLOCK token earnings and transactions</li>
                    <li>• Store blockchain interaction history</li>
                    <li>• Maintain Web3 authentication state</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Third-Party Cookies */}
            <Card id="third-party" className="p-8 glass-glow">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-accent">Third-Party Cookies</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We work with trusted third-party services that may set their own cookies:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Analytics Services</h4>
                    <p className="text-sm text-muted-foreground">Google Analytics for usage tracking and performance monitoring</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Payment Processors</h4>
                    <p className="text-sm text-muted-foreground">Secure payment handling for premium subscriptions</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Content Delivery</h4>
                    <p className="text-sm text-muted-foreground">CDN services for faster content loading</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-heading mb-2">Social Media</h4>
                    <p className="text-sm text-muted-foreground">Social login and sharing features</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Managing Cookies */}
            <Card id="manage-cookies" className="p-8 glass-glow">
              <h2 className="font-heading text-primary mb-6">Managing Your Cookie Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading mb-3">Platform Controls</h3>
                  <p className="text-muted-foreground mb-3">
                    Use the cookie settings panel on this page to control which types of cookies you allow. Your preferences will be saved and respected across all visits.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading mb-3">Browser Controls</h3>
                  <p className="text-muted-foreground mb-3">
                    Most browsers allow you to manage cookies through their settings:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="text-sm">
                      <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and site data
                    </div>
                    <div className="text-sm">
                      <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                    </div>
                    <div className="text-sm">
                      <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                    </div>
                    <div className="text-sm">
                      <strong>Edge:</strong> Settings → Site permissions → Cookies and site data
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-primary">Note:</strong> Disabling essential cookies may affect platform functionality and your learning experience.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-8 glass-glow">
              <h2 className="font-heading text-primary mb-6">Questions About Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our cookie usage or need help managing your preferences:
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