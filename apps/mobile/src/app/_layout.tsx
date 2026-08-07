import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
