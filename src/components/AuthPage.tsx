import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  Zap,
  BookOpen,
  Award
} from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';
import EmailConfirmationHandler from './EmailConfirmationHandler';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, socialLogin, resendConfirmation } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      setError('');
      await socialLogin(provider);
    } catch (error: any) {
      console.error('Social login failed:', error);
      setError(error.message || `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed. Please try again or complete OAuth setup.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setShowEmailConfirmation(false);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      console.log('AuthPage: Attempting login with email:', email);
      const result = await login(email, password);
      console.log('AuthPage: Login result:', result);
      
      if (result.success) {
        console.log('AuthPage: Login successful, navigating to home page...');
        navigate('/');
      } else {
        console.log('AuthPage: Login failed:', result.message);
        setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      
      // Check for email confirmation error specifically
      const errorMessage = err.message || '';
      
      if (errorMessage === 'EMAIL_NOT_CONFIRMED') {
        setUserEmail(email);
        setShowEmailConfirmation(true);
        setError(''); // Don't show error message when showing confirmation UI
        setSuccess('Please check your email and click the confirmation link to activate your account.');
      } else {
        setError(errorMessage || 'An error occurred. Please try again.');
        setShowEmailConfirmation(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setShowEmailConfirmation(false);

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { success, message } = await signup(name, email, password);
      if (success) {
        navigate('/');
      } else {
        setError(message || 'Failed to create account. Please try again.');
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      
      if (err.message === 'CHECK_EMAIL_CONFIRMATION') {
        setUserEmail(email);
        setShowEmailConfirmation(true);
        setSuccess('Account created! Please check your email and click the confirmation link to activate your account.');
        setError('');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!userEmail) {
      setError('Please enter your email address.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await resendConfirmation(userEmail);
      if (result.success) {
        setSuccess(result.message);
        setError('');
      } else {
        setError(result.message || 'Failed to resend confirmation email.');
        setSuccess('');
      }
    } catch (err: any) {
      setError('Failed to resend confirmation email. Please try again.');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground mb-4 p-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BlockademiaLogo className="w-12 h-12" />
                  <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Blockademia
                  </span>
                </div>
                
                <h1 className="text-4xl font-heading font-bold leading-tight">
                  Start Your
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent block">
                    Learning Journey
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join thousands of developers who are already building their future with our cutting-edge web development courses.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">100+ Courses</h3>
                    <p className="text-sm text-muted-foreground">From beginner to advanced levels</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Interactive Learning</h3>
                    <p className="text-sm text-muted-foreground">Hands-on projects and live coding</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Certificates</h3>
                    <p className="text-sm text-muted-foreground">Industry-recognized credentials</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">100+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="border border-border/50 shadow-2xl">
              <CardHeader className="space-y-1 text-center">
                <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                  <BlockademiaLogo className="w-8 h-8" />
                  <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Blockademia
                  </span>
                </div>
                <CardTitle className="text-2xl font-heading">Welcome</CardTitle>
                <CardDescription>
                  Create your account or sign in to continue learning
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Display */}
                {error && !showEmailConfirmation && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center">
                    {error}
                  </div>
                )}
                
                {/* Success Display */}
                {success && !showEmailConfirmation && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm text-center">
                    {success}
                  </div>
                )}

                {showEmailConfirmation && (
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg space-y-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Email Confirmation Required</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We sent a confirmation email to <strong>{userEmail}</strong>. Please check your inbox and click the confirmation link to activate your account.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="resend-email" className="text-sm">Email Address</Label>
                        <Input
                          id="resend-email"
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={handleResendConfirmation}
                          disabled={isLoading || !userEmail}
                          variant="outline"
                          size="sm"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        >
                          {isLoading ? 'Sending...' : 'Resend Confirmation Email'}
                        </Button>
                        
                        {/* Demo confirmation button for testing */}
                        <Button
                          onClick={() => {
                            setShowEmailConfirmation(false);
                            setSuccess('Email confirmed! You can now sign in.');
                            setError('');
                          }}
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          Simulate Confirmation (Demo)
                        </Button>
                        <Button
                          onClick={() => {
                            setShowEmailConfirmation(false);
                            setError('');
                            setSuccess('');
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground bg-muted/20 rounded p-2">
                      <strong>Tip:</strong> Check your spam folder if you don't see the email. Make sure to click the confirmation link from the same device/browser.
                    </div>
                  </div>
                )}
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  {/* Sign In Form */}
                  <TabsContent value="signin" className="space-y-4">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signin-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
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

                      <div className="flex items-center justify-between text-sm">
                        <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            id="remember-me"
                            name="remember-me"
                            className="rounded border-border" 
                          />
                          <span className="text-muted-foreground">Remember me</span>
                        </label>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                          onClick={() => navigate('/reset-password')}
                        >
                          Forgot password?
                        </Button>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Sign Up Form */}
                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10"
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

                      <div className="text-xs text-muted-foreground">
                        By creating an account, you agree to our{' '}
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs underline"
                          onClick={() => navigate('/terms-of-service')}
                        >
                          Terms of Service
                        </Button>{' '}
                        and{' '}
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs underline"
                          onClick={() => navigate('/privacy-policy')}
                        >
                          Privacy Policy
                        </Button>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Creating account...
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Social Login */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSocialLogin('github')}
                      disabled={isLoading}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                    >
                      <Chrome className="w-4 h-4 mr-2" />
                      Google
                    </Button>
                  </div>
                  
                  {/* Demo and OAuth Setup Notice */}
                  <div className="space-y-2">
                    <div className="text-xs text-center text-primary bg-primary/10 rounded-lg p-3 border border-primary/30">
                      <p>
                        <strong>Demo Mode:</strong> Try{' '}
                        <code className="bg-primary/20 px-1 rounded">demo@blockademia.com</code> / <code className="bg-primary/20 px-1 rounded">demo123</code>{' '}
                        for instant access
                      </p>
                    </div>
                    
                    <div className="text-xs text-center text-muted-foreground bg-muted/30 rounded-lg p-3 border border-border/30">
                      <p>
                        <strong>Note:</strong> If social login is blocked, try{' '}
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs underline text-primary"
                          onClick={() => window.open(window.location.href, '_blank')}
                        >
                          opening in new tab
                        </Button>
                        . OAuth setup required:{' '}
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs underline text-primary"
                          onClick={() => window.open('https://supabase.com/docs/guides/auth/social-login', '_blank')}
                        >
                          Setup guide →
                        </Button>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Stats */}
            <div className="lg:hidden grid grid-cols-3 gap-4 mt-8 text-center">
              <div>
                <div className="text-xl font-bold text-primary">50k+</div>
                <div className="text-xs text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">4.9</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
              <div>
                <div className="text-xl font-bold text-secondary">100+</div>
                <div className="text-xs text-muted-foreground">Courses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}