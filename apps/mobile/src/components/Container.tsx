import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  contentContainerClassName?: string;
}

export function Container({
  children,
  scrollable = false,
  className = '',
  contentContainerClassName = '',
}: ContainerProps) {
  const baseStyle = 'flex-1 bg-slate-50 dark:bg-slate-950';

  const content = scrollable ? (
    <ScrollView 
      className="flex-1"
      contentContainerClassName={`p-6 ${contentContainerClassName}`}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 p-6 ${contentContainerClassName}`}>
      {children}
    </View>
  );

  return (
    <SafeAreaView className={`${baseStyle} ${className}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
