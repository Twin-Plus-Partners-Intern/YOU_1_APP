import React from 'react';
import { Pressable, ActivityIndicator, View, PressableProps } from 'react-native';
import { Typography } from '../typography/Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'subtle';
export type ButtonShape = 'capsule' | 'circle';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label?: string;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Button({
  label,
  variant = 'primary',
  shape = 'capsule',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) {
  // Base classes for different shapes
  const shapeStyles = {
    capsule: 'flex-row items-center justify-center py-3.5 px-6 rounded-full',
    circle: 'w-12 h-12 rounded-full items-center justify-center',
  };

  // Variant background and border styles
  const variantStyles = {
    primary: 'bg-primary-500 border border-transparent active:bg-neutral-200',
    secondary: 'bg-secondary-500 border border-transparent active:bg-secondary-400',
    outline: 'bg-transparent border border-primary-500 active:bg-primary-500/10',
    subtle: 'bg-neutral-600 border border-transparent active:bg-neutral-500',
  };

  // Text color based on variants
  const textStyles = {
    primary: 'text-neutral-900 font-montserrat-bold',
    secondary: 'text-neutral-900 font-montserrat-bold',
    outline: 'text-primary-500 font-montserrat-semibold',
    subtle: 'text-primary-500 font-montserrat-semibold',
  };

  // Loading spinner color
  const spinnerColor = variant === 'primary' || variant === 'secondary' ? '#090D16' : '#FFFFFF';

  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      className={`
        ${shapeStyles[shape]}
        ${variantStyles[variant]}
        ${isDisabled ? 'opacity-40' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {leftIcon && <View>{leftIcon}</View>}

          {shape === 'capsule' && label && (
            <Typography variant="medium" className={textStyles[variant]}>
              {label}
            </Typography>
          )}

          {rightIcon && <View>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
}
