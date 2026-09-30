import React, { useState } from 'react';
import { View } from 'react-native';
import { SignInScreen } from '../components/auth/SignInScreen';
import { SignUpScreen } from '../components/auth/SignUpScreen';

export default function Home() {
  const [authMode, setAuthMode] = useState<'sign-in' | 'sign-up'>('sign-in');

  return (
    <View className="flex-1 bg-neutral-1000">
      {authMode === 'sign-in' ? (
        <SignInScreen
          onNavigateToSignUp={() => setAuthMode('sign-up')}
          onSignInSuccess={() => {
            console.log('Sign in successful!');
          }}
        />
      ) : (
        <SignUpScreen
          onNavigateToSignIn={() => setAuthMode('sign-in')}
          onSignUpSuccess={() => {
            console.log('Sign up successful!');
          }}
        />
      )}
    </View>
  );
}
