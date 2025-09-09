import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface EmailConfirmationHandlerProps {
  email: string;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

export default function EmailConfirmationHandler({ 
  email: initialEmail, 
  onClose, 
  onSuccess 
}: EmailConfirmationHandlerProps) {
  const { resendConfirmation } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const handleResendConfirmation = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await resendConfirmation(email);
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        if (onSuccess) {
          onSuccess(result.message);
        }
      } else {
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (err: any) {
      setMessage('Failed to resend confirmation email. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoConfirmation = () => {
    setMessage('Email confirmed! You can now sign in with your credentials.');
    setMessageType('success');
    if (onSuccess) {
      onSuccess('Email confirmed! You can now sign in.');
    }
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const getMessageIcon = () => {
    switch (messageType) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Mail className="w-4 h-4 text-blue-500" />;
    }
  };

  const getMessageStyles = () => {
    switch (messageType) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-500';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-500';
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
    }
  };

  return (
    <Card className="border-accent/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-accent">
          <Mail className="w-5 h-5" />
          Email Confirmation Required
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          We sent a confirmation email to <strong>{initialEmail}</strong>. 
          Please check your inbox and click the confirmation link to activate your account.
        </p>

        {message && (
          <div className={`p-3 rounded-lg border text-sm flex items-center gap-2 ${getMessageStyles()}`}>
            {getMessageIcon()}
            {message}
          </div>
        )}
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="confirmation-email" className="text-sm">Email Address</Label>
            <Input
              id="confirmation-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleResendConfirmation}
              disabled={isLoading || !email}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Confirmation Email
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={handleDemoConfirmation}
                variant="outline"
                size="sm"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Demo: Mark as Confirmed
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="flex-1 text-muted-foreground"
              >
                Try Signing In Again
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/20 rounded p-2">
          <strong>💡 Tips:</strong>
          <ul className="mt-1 space-y-1 ml-4 list-disc">
            <li>Check your spam/junk folder</li>
            <li>Make sure to click the confirmation link from the same device/browser</li>
            <li>If you don't receive the email after 5 minutes, try resending</li>
            <li>For testing, use the "Demo: Mark as Confirmed" button</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}