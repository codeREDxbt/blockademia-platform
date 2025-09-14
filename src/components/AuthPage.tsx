import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OAuthHandler } from '../utils/OAuthHandler';
import { DirectOAuth } from '../utils/DirectOAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ArrowLeft, Mail, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';

export default function AuthPage() {
	const [formLoading, setFormLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [activeTab, setActiveTab] = useState('signin');
	const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const navigate = useNavigate();
	const { login, signup, socialLogin, resendConfirmation, user, isLoading, refreshSession } = useAuth();

	// Handle OAuth callback with new handler
	useEffect(() => {
		const handleOAuthCallback = async () => {
			// First validate OAuth configuration
			const configValidation = OAuthHandler.validateConfiguration();
			if (!configValidation.isValid) {
				console.warn('OAuth configuration issues:', configValidation.issues);
				setError(`OAuth setup issues: ${configValidation.issues.join(', ')}`);
				return;
			}
			
			if (OAuthHandler.isOAuthCallback()) {
				console.log('AuthPage: OAuth callback detected, processing...');
				setSuccess('Processing Google authentication...');
				setError('');
				
				const result = await OAuthHandler.handleCallback();
				
				if (result.success) {
					console.log('AuthPage: OAuth callback successful');
					setSuccess('Authentication successful! Redirecting...');
					// Give the auth context a moment to update
					setTimeout(() => {
						if (!user) {
							// Force a session refresh
							refreshSession();
						}
					}, 1000);
				} else {
					console.error('AuthPage: OAuth callback failed:', result.error);
					setError(result.error || 'OAuth authentication failed');
					setSuccess('');
				}
			}
		};
		
		handleOAuthCallback();
	}, []);

	useEffect(() => {
		console.log('AuthPage: Auth state changed', { 
			isLoading, 
			user: !!user, 
			userEmail: user?.email,
			profileComplete: user?.profile?.profile_complete,
			currentPath: window.location.pathname,
			searchParams: window.location.search
		});
		
		if (!isLoading && user) {
			console.log('AuthPage: User authenticated, navigating to home');
			// Clear any URL parameters before navigating
			window.history.replaceState({}, document.title, '/auth');
			navigate('/');
		}
	}, [user, isLoading, navigate]);

	const handleSocialLogin = async (provider: 'google' | 'github') => {
		try {
			setFormLoading(true);
			setError('');
			await socialLogin(provider);
		} catch (error: any) {
			setError(error.message || `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed.`);
		} finally {
			setFormLoading(false);
		}
	};

	const handleDirectOAuth = async () => {
		try {
			setFormLoading(true);
			setError('');
			setSuccess('Starting direct Google authentication...');
			await DirectOAuth.initiateGoogleAuth();
		} catch (error: any) {
			setError(error.message || 'Direct Google login failed.');
			setSuccess('');
		} finally {
			setFormLoading(false);
		}
	};

	const handleTestAuth = async () => {
		try {
			setFormLoading(true);
			setError('');
			setSuccess('Creating test authentication...');
			const result = await DirectOAuth.createTestUser();
			if (result.success) {
				setSuccess('Test authentication successful! Redirecting...');
				setTimeout(() => navigate('/'), 2000);
			} else {
				setError(result.error || 'Test authentication failed');
				setSuccess('');
			}
		} catch (error: any) {
			setError(error.message || 'Test authentication failed.');
			setSuccess('');
		} finally {
			setFormLoading(false);
		}
	};

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormLoading(true);
		setError('');
		setSuccess('');
		setShowEmailConfirmation(false);
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		try {
			const result = await login(email, password);
			if (result?.success) {
				navigate('/');
			} else {
				setError('Invalid credentials.');
			}
		} catch (err: any) {
			const errorMessage = err.message || '';
			if (errorMessage === 'EMAIL_NOT_CONFIRMED') {
				setUserEmail(email);
				setShowEmailConfirmation(true);
				setError('');
				setSuccess('Please check your email and click the confirmation link.');
			} else {
				setError(errorMessage || 'An error occurred.');
				setShowEmailConfirmation(false);
			}
		} finally {
			setFormLoading(false);
		}
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormLoading(true);
		setError('');
		setSuccess('');
		setShowEmailConfirmation(false);
		const formData = new FormData(e.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		try {
			const result = await signup(name, email, password);
			if (result?.success) {
				navigate('/');
			} else {
				setError('Failed to create account.');
			}
		} catch (err: any) {
			if (err.message === 'CHECK_EMAIL_CONFIRMATION') {
				setUserEmail(email);
				setShowEmailConfirmation(true);
				setSuccess('Account created! Please check your email and click the confirmation link.');
				setError('');
			} else {
				setError(err.message || 'An error occurred.');
			}
		} finally {
			setFormLoading(false);
		}
	};

	const handleResendConfirmation = async () => {
		if (!userEmail) {
			setError('Please enter your email address.');
			return;
		}
		setFormLoading(true);
		setError('');
		setSuccess('');
		try {
			const result = await resendConfirmation(userEmail);
			if (result.success) {
				setSuccess(result.message);
				setError('');
			} else {
				setError(result.message);
				setSuccess('');
			}
		} catch (err: any) {
			setError('Failed to resend confirmation email.');
			setSuccess('');
		} finally {
			setFormLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4">
			<div className="w-full max-w-6xl">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Branding Side */}
					<div className="hidden lg:block space-y-8">
						<Button variant="ghost" onClick={() => navigate('/')} className="mb-4 p-0">
							<ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
						</Button>
						<div className="flex items-center gap-3">
							<BlockademiaLogo className="w-12 h-12" />
							<span className="text-2xl font-bold">Blockademia</span>
						</div>
						<h1 className="text-4xl font-bold">Start Your <span className="block">Learning Journey</span></h1>
						<p className="text-lg">Join thousands of developers building their future.</p>
					</div>
					{/* Auth Forms Side */}
					<div className="w-full max-w-md mx-auto lg:mx-0">
						<Card className="border shadow-2xl">
							<CardHeader className="text-center">
								<div className="flex items-center justify-center gap-2 mb-4">
									<BlockademiaLogo className="w-8 h-8" />
									<span className="text-xl font-bold">Blockademia</span>
								</div>
								<CardTitle className="text-2xl">Welcome</CardTitle>
								<CardDescription>Create your account or sign in to continue</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{error && !showEmailConfirmation && (
									<div className="p-3 bg-red-100 border border-red-200 rounded text-red-700 text-sm text-center space-y-2">
										<div>{error}</div>
										{error.includes('session failed') && (
											<Button 
												onClick={async () => {
													setError('');
													setSuccess('Retrying authentication...');
													try {
														await refreshSession();
													} catch (err) {
														setError('Retry failed. Please try logging in again.');
														setSuccess('');
													}
												}}
												size="sm"
												variant="outline"
												className="mt-2"
											>
												Retry Authentication
											</Button>
										)}
									</div>
								)}
								{success && !showEmailConfirmation && (
									<div className="p-3 bg-green-100 border border-green-200 rounded text-green-700 text-sm text-center">{success}</div>
								)}
								{showEmailConfirmation && (
									<div className="p-4 bg-yellow-100 border border-yellow-300 rounded space-y-4">
										<div className="flex items-center gap-2 text-yellow-700">
											<Mail className="w-4 h-4" />
											<span className="font-medium">Email Confirmation Required</span>
										</div>
										<p className="text-sm">We sent a confirmation email to <strong>{userEmail}</strong>. Please check your inbox.</p>
										<Input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Enter your email" className="mt-1" />
										<Button onClick={handleResendConfirmation} disabled={formLoading || !userEmail} variant="outline" size="sm">
											{formLoading ? 'Sending...' : 'Resend Confirmation Email'}
										</Button>
									</div>
								)}
								<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
									<TabsList className="grid w-full grid-cols-2">
										<TabsTrigger value="signin">Sign In</TabsTrigger>
										<TabsTrigger value="signup">Sign Up</TabsTrigger>
									</TabsList>
									<TabsContent value="signin" className="space-y-4">
										<form onSubmit={handleSignIn} className="space-y-4">
											<div className="space-y-2">
												<Label htmlFor="signin-email">Email</Label>
												<Input id="signin-email" name="email" type="email" placeholder="Enter your email" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="signin-password">Password</Label>
												<Input id="signin-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required />
												<Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
												</Button>
											</div>
											<Button type="submit" className="w-full" disabled={formLoading}>
												{formLoading ? 'Signing in...' : 'Sign In'}
											</Button>
										</form>
									</TabsContent>
									<TabsContent value="signup" className="space-y-4">
										<form onSubmit={handleSignUp} className="space-y-4">
											<div className="space-y-2">
												<Label htmlFor="signup-name">Full Name</Label>
												<Input id="signup-name" name="name" type="text" placeholder="Enter your full name" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="signup-email">Email</Label>
												<Input id="signup-email" name="email" type="email" placeholder="Enter your email" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="signup-password">Password</Label>
												<Input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" required />
												<Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
												</Button>
											</div>
											<Button type="submit" className="w-full" disabled={formLoading}>
												{formLoading ? 'Creating account...' : 'Create Account'}
											</Button>
										</form>
									</TabsContent>
								</Tabs>
								<div className="space-y-4">
									<div className="relative">
										<Separator className="w-full" />
										<div className="relative flex justify-center text-xs uppercase">
											<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<Button variant="outline" className="w-full" onClick={() => handleSocialLogin('github')} disabled={formLoading}>
											<Github className="w-4 h-4 mr-2" /> GitHub
										</Button>
										<Button variant="outline" className="w-full" onClick={() => handleSocialLogin('google')} disabled={formLoading}>
											<Chrome className="w-4 h-4 mr-2" /> Google
										</Button>
									</div>
									
									{/* Alternative OAuth methods for debugging */}
									<div className="space-y-2 pt-4 border-t">
										<p className="text-xs text-muted-foreground text-center">Alternative Methods (Debug)</p>
										<Button variant="outline" className="w-full" onClick={handleDirectOAuth} disabled={formLoading}>
											<Chrome className="w-4 h-4 mr-2" /> Direct Google OAuth
										</Button>
										<Button variant="outline" className="w-full bg-yellow-50 hover:bg-yellow-100" onClick={handleTestAuth} disabled={formLoading}>
											🔧 Test Authentication (Debug)
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
