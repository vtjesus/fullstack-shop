// src/services/authService.ts
import { AuthError, signIn, signOut, signUp, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
}

export const handleSignIn = async (username: string, password: string, refreshUser: () => Promise<void>) => {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    
    if (isSignedIn) {
      // Refresh the user context after successful sign-in
      await refreshUser();
    }

    return { isSignedIn, nextStep };
 
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const handleSignUp = async ({ username, password, email }: SignUpParams) => {
  console.log(username, password, email)
  try {
    const { isSignUpComplete, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email
        }
      }
    });
    console.log(isSignUpComplete, nextStep)
    return { isSignUpComplete, nextStep };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const handleConfirmSignUp = async (username: string, confirmationCode: string) => {
  try {
    const { isSignUpComplete } = await confirmSignUp({ username, confirmationCode });
    return isSignUpComplete;
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
