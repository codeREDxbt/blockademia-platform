import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';

export default function EmailConfirmation() {
  const navigate = useNavigate();
  const { resendConfirmation } = useAuth();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      // Get the access token and other params from URL
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        setStatus('error');
        if (error === 'access_denied') {
          setMessage('Email confirmation was denied or cancelled.');
        } else if (error === 'invalid_request') {
          setMessage('Invalid confirmation link. The link may have expired.');
          setStatus('expired');
        } else {
          setMessage(errorDescription || 'Email confirmation failed.');
        }
        return;
      }

      if (accessToken) {
        try {
          // Store the tokens
          localStorage.setItem('supabase_token', accessToken);
          if (refreshToken) {
            localStorage.setItem('supabase_refresh_token', refreshToken);
          }

          setStatus('success');
          setMessage('Your email has been confirmed successfully! You can now sign in to your account.');
          
          // Redirect to login after a delay
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
        } catch (error) {
          console.error('Error confirming email:', error);
          setStatus('error');
          setMessage('An error occurred while confirming your email. Please try again.');
        }
      } else {
        setStatus('error');
        setMessage('Invalid confirmation link. Please check your email for the correct link.');
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      setMessage('Please enter your email address to resend the confirmation.');
      return;
    }

    try {
      const result = await resendConfirmation(email);
      if (result.success) {
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Failed to resend confirmation email. Please try again.');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-12 h-12 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle className="w-12 h-12 text-accent" />;
      case 'error':
      case 'expired':
        return <XCircle className="w-12 h-12 text-destructive" />;
      default:
        return <Mail className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'loading':
        return 'Confirming your email...';
      case 'success':
        return 'Email confirmed!';
      case 'error':
        return 'Confirmation failed';
      case 'expired':
        return 'Link expired';
      default:
        return 'Email confirmation';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="border border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BlockademiaLogo className="w-8 h-8" />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blockademia
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-center">
                {getStatusIcon()}
              </div>
              <CardTitle className="text-xl font-heading">{getStatusTitle()}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">{message}</p>
            </div>

            {status === 'success' && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Redirecting you to sign in...
                </p>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                >
                  Continue to Sign In
                </Button>
              </div>
            )}

            {(status === 'error' || status === 'expired') && (
              <div className="space-y-4">
                {status === 'expired' && (
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground"
                    />
                    <Button 
                      onClick={handleResendEmail}
                      className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Resend confirmation email
                    </Button>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => navigate('/auth')}
                    variant="outline"
                    className="w-full"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </div>
            )}

            {status === 'loading' && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Please wait while we confirm your email address...
                </p>
              </div>
            )}

            <div className="text-center pt-4 border-t border-border/50">
              <Button 
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}