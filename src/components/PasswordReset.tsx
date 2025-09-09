import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  Mail,
  Shield
} from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';

export default function PasswordReset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, updatePassword } = useAuth();
  
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Check if we have reset tokens in URL
  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const type = searchParams.get('type');
    
    if (accessToken && refreshToken && type === 'recovery') {
      // Store tokens and switch to reset step
      localStorage.setItem('supabase_token', accessToken);
      localStorage.setItem('supabase_refresh_token', refreshToken);
      setStep('reset');
      
      // Clean URL
      window.history.replaceState({}, document.title, '/reset-password');
    }
  }, [searchParams]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;

    try {
      const result = await resetPassword(email);
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        toast.success('Password reset email sent!');
      } else {
        toast.error(result.message);
        // If it's likely an email configuration issue
        if (result.message.includes('Failed to send') || result.message.includes('SMTP')) {
          setTimeout(() => {
            navigate('/reset-password/info');
          }, 2000);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const result = await updatePassword(password);
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        toast.success('Password updated successfully!');
        setTimeout(() => {
          navigate('/auth');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
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
                {step === 'request' ? 'Reset Password' : 'Create New Password'}
              </CardTitle>
              <CardDescription>
                {step === 'request' 
                  ? 'Enter your email address and we\'ll send you a link to reset your password.'
                  : 'Enter your new password below. Make sure it\'s strong and memorable.'
                }
              </CardDescription>
            </div>

            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {message && (
              <Alert className={messageType === 'success' ? 'border-green-500/50 bg-green-500/10' : 'border-destructive/50 bg-destructive/10'}>
                {messageType === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Shield className="h-4 w-4 text-destructive" />
                )}
                <AlertDescription className={messageType === 'success' ? 'text-green-400' : 'text-destructive'}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {step === 'request' ? (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending Reset Email...
                    </div>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Reset Email
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Remember your password?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm underline text-primary hover:text-primary/80"
                      onClick={() => navigate('/auth')}
                    >
                      Sign in here
                    </Button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="pl-10 pr-10"
                      minLength={8}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="pl-10 pr-10"
                      minLength={8}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>At least 8 characters long</li>
                    <li>Include numbers and letters</li>
                    <li>Use a mix of uppercase and lowercase</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Updating Password...
                    </div>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Security Information */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Security Note</h4>
                  <p className="text-xs text-muted-foreground">
                    {step === 'request' 
                      ? 'Password reset links expire after 1 hour for security. If you don\'t receive an email, check your spam folder.'
                      : 'Your password is encrypted and stored securely. We never store passwords in plain text.'
                    }
                  </p>
                  {step === 'request' && (
                    <Button 
                      variant="link" 
                      size="sm"
                      className="p-0 h-auto text-xs text-primary hover:text-primary/80"
                      onClick={() => navigate('/reset-password/info')}
                    >
                      Email not working? Setup guide →
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}