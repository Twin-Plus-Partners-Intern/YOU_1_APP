import React, { useState } from 'react';
import { TextInput, View, Pressable, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  className?: string;
}

export function Input({
  leftIcon,
  isPassword = false,
  hasError = false,
  hasWarning = false,
  className = '',
  secureTextEntry,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Set the text visibility logic
  const isSecure = isPassword && !showPassword;

  // Border style logic based on focus, error, and warning states
  let borderStyle = 'border-neutral-700/50';
  if (hasError) {
    borderStyle = 'border-error-500';
  } else if (hasWarning) {
    borderStyle = 'border-warning-500';
  } else if (isFocused) {
    borderStyle = 'border-secondary-500'; // Pip-Boy green on focus
  }

  return (
    <View
      className={`
        w-full flex-row items-center bg-neutral-800 border rounded-2xl px-4 py-3.5
        ${borderStyle}
        ${className}
      `}
    >
      {leftIcon && <View className="mr-3">{leftIcon}</View>}

      <TextInput
        className="flex-1 text-primary-500 font-montserrat text-[16px] leading-[20px] p-0"
        placeholderTextColor="#64748B"
        secureTextEntry={isSecure}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />

      {isPassword && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          className="ml-3 active:opacity-75"
        >
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#94A3B8" />
        </Pressable>
      )}
    </View>
  );
}
