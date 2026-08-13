/// <reference types="nativewind/types" />
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyle = 'flex-row items-center justify-center py-3.5 px-6 rounded-2xl active:opacity-80 transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-lg shadow-indigo-600/20',
    secondary: 'bg-slate-900 dark:bg-slate-100 border border-transparent shadow-lg shadow-slate-900/10',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700',
  };

  const textStyles = {
    primary: 'text-white font-semibold text-base tracking-wide',
    secondary: 'text-white dark:text-slate-900 font-semibold text-base tracking-wide',
    outline: 'text-slate-800 dark:text-slate-200 font-medium text-base tracking-wide',
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`${baseStyle} ${variantStyles[variant]} ${isDisabled ? 'opacity-50' : ''} ${className}`}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator 
          color={variant === 'outline' ? '#4f46e5' : '#ffffff'} 
          className="mr-2" 
          size="small"
        />
      )}
      <Text className={textStyles[variant]}>{label}</Text>
    </TouchableOpacity>
  );
}
