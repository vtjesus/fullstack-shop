"use client"
import React, { useState, FormEvent } from 'react';
import { signUp, signIn } from 'aws-amplify/auth';

function AuthComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      alert('Sign up successful! Please check your email for verification.');
      setIsSignUp(false);
    } catch (error) {
      console.error('Error signing up:', error);
      alert((error as Error).message);
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn({ username, password });
      alert('Sign in successful!');
    } catch (error) {
      console.error('Error signing in:', error);
      alert((error as Error).message);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
}

export default AuthComponent;