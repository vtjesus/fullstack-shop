"use client"
import { useState, FormEvent, useEffect } from 'react';
import { handleSignUp, handleConfirmSignUp, handleSignIn } from "@/lib/authService"
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from '@/context/UserContext';

export default function AuthPage() {
  const [step, setStep] = useState<'signup' | 'confirm' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useUser();

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (step === 'signup') {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        const { isSignUpComplete, nextStep } = await handleSignUp({
          username: email,
          password: password,
          email: email,
        });

        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          setEmail(email);
          setStep('confirm');
        } else if (isSignUpComplete) {
          router.push('/sign-in');
        }
      } catch (error: any) {
        console.error('Sign up error:', error);
        setError(error.message || 'Sign up failed. Please try again.');
      }
    } else if (step === 'confirm') {
      try {
        const formData = new FormData(event.target as HTMLFormElement);
        const isSignUpComplete = await handleConfirmSignUp(
          email,
          formData.get('code') as string
        );

        if (isSignUpComplete) {
          router.push(redirectUrl);
        }
      } catch (error: any) {
        console.error('Confirmation error:', error);
        setError(error.message || 'Confirmation failed. Please try again.');
      }
    } else if (step === 'signin') {
      try {
        const { isSignedIn } = await handleSignIn(email, password, refreshUser);
        if (isSignedIn) {
          await refreshUser();
          router.push(redirectUrl);
        }
      } catch (error: any) {
        console.error('Sign in error:', error);
        setError(error.message || 'Sign in failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{step === 'confirm' ? 'Confirm Sign Up' : 'Authentication'}</CardTitle>
            <CardDescription>
              {step === 'confirm' ? 'Enter the confirmation code sent to your email' : 'Sign up or sign in to your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'confirm' ? (
              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col space-y-1.5"
                >
                  <Label htmlFor="code">Confirmation Code</Label>
                  <Input id="code" name="code" type="text" placeholder="Enter confirmation code" required />
                </motion.div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="mt-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full mt-4" type="submit">
                    Confirm
                  </Button>
                </motion.div>
              </form>
            ) : (
              <Tabs defaultValue="signup" onValueChange={(value) => setStep(value as 'signup' | 'signin')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="grid w-full items-center gap-4"
                    >
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Enter your email" required 
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input 
                            id="password" 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                          />
                          <button 
                            type="button" 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" 
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              {showPassword ? <EyeOffIcon className="h-5 w-5 text-muted-foreground" /> : <EyeIcon className="h-5 w-5 text-muted-foreground" />}
                            </motion.div>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your password" 
                            required 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                          />
                          <button 
                            type="button" 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-muted-foreground" /> : <EyeIcon className="h-5 w-5 text-muted-foreground" />}
                            </motion.div>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert variant="destructive" className="mt-4">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full mt-4" type="submit">
                        Sign Up
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
                <TabsContent value="signin">
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="grid w-full items-center gap-4"
                    >
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Enter your email" required 
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input 
                            id="password" 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                          />
                          <button 
                            type="button" 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" 
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              {showPassword ? <EyeOffIcon className="h-5 w-5 text-muted-foreground" /> : <EyeIcon className="h-5 w-5 text-muted-foreground" />}
                            </motion.div>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert variant="destructive" className="mt-4">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full mt-4" type="submit">
                        Sign In
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {step === 'confirm' && (
              <Button variant="link" onClick={() => setStep('signup')}>Back to Sign Up</Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}