import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GlobalErrorBoundary } from '../components/ErrorBoundary';
import '../global.css';

// Prevent splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Ignore errors */
});

export default function RootLayout() {
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
