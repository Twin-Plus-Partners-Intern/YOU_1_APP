import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from '@sentry/react-native';
import { GlobalErrorBoundary } from '../components/ErrorBoundary';
import '../global.css';

// Initialize Sentry with Expo Router instrumentation
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN || 'https://examplePublicKey@o0.ingest.sentry.io/0',
  integrations: [
    Sentry.expoRouterIntegration(),
  ],
});

// Prevent splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Ignore errors */
});

function RootLayout() {
  useEffect(() => {
    // Hide splash screen after root layout is mounted
    SplashScreen.hideAsync().catch(() => {
      /* Ignore errors */
    });
  }, []);

  return (
    <GlobalErrorBoundary>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4f46e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#f8fafc',
          }
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'YOU-IL AI Goal Manager',
            headerShown: false,
          }} 
        />
      </Stack>
    </GlobalErrorBoundary>
  );
}

// Wrap the root layout with Sentry to capture navigation traces and errors
export default Sentry.wrap(RootLayout);
