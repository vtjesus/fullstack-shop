"use client"
import React from 'react';
import { Amplify } from 'aws-amplify';
import output from "@/amplify_outputs.json"
import { Authenticator, ThemeProvider, Theme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(output);

const theme: Theme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: 'hsl(var(--background))' },
          80: { value: 'hsl(var(--primary))' },
          90: { value: 'hsl(var(--primary-foreground))' },
          100: { value: 'hsl(var(--primary))' },
        },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: 'hsl(var(--primary))' },
          _hover: {
            backgroundColor: { value: 'hsl(var(--primary-foreground))' },
          },
          _active: {
            backgroundColor: { value: 'hsl(var(--primary))' },
          },
        },
      },
    },
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator className=' '>
        {({ signOut, user }) => (
          <main className="bg-background text-foreground bg-red-400">
            <h1 className="text-primary">Hello {user?.username}</h1>
            <button onClick={signOut} className="bg-primary text-primary-foreground hover:bg-primary-foreground">Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}