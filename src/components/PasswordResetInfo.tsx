import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { 
  Mail, 
  Shield, 
  ExternalLink, 
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';

export default function PasswordResetInfo() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <Card className="border border-border/50 shadow-2xl">
          <CardHeader className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <BlockademiaLogo className="w-8 h-8" />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blockademia
              </span>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl font-heading">
                Password Reset Setup Guide
              </CardTitle>
              <CardDescription>
                Configure your Supabase project to enable password reset emails
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Current Status */}
            <Alert className="border-yellow-500/50 bg-yellow-500/10">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-400">
                Email configuration required to send password reset emails
              </AlertDescription>
            </Alert>

            {/* Setup Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Setup Instructions
              </h3>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Access Supabase Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Go to your Supabase project dashboard and navigate to Authentication → Settings
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Configure SMTP Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up your SMTP provider (Gmail, SendGrid, AWS SES, etc.) for sending emails
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                      <p className="text-xs font-code text-muted-foreground">
                        For Gmail: Use App Passwords<br/>
                        Host: smtp.gmail.com<br/>
                        Port: 587<br/>
                        Secure: Enable TLS
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Test Email Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Send a test email to verify your configuration is working correctly
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Password Reset Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Once configured, users will receive password reset links via email
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading flex items-center gap-2">
                <Mail className="w-5 h-5 text-accent" />
                Quick Start Options
              </h3>
              
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => window.open('https://supabase.com/docs/guides/auth/auth-smtp', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Supabase SMTP Guide</div>
                    <div className="text-sm text-muted-foreground">Official documentation</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                >
                  <Shield className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Supabase Dashboard</div>
                    <div className="text-sm text-muted-foreground">Configure your project</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Security Information */}
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-400">
                <strong>Security Note:</strong> Password reset links expire after 1 hour and can only be used once. 
                All password resets are logged for security auditing.
              </AlertDescription>
            </Alert>

            {/* Current Functionality */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">What works now:</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Login with email/password</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Social login (Google/GitHub) - requires provider setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Account registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Profile management</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>Password reset emails (pending SMTP setup)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
