import React from 'react';
import { View, ViewProps } from 'react-native';
import { Typography } from '../typography/Typography';

export type BadgeColor =
  'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';

export interface BadgeProps extends ViewProps {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  label,
  color = 'primary',
  variant = 'solid',
  className = '',
  ...props
}: BadgeProps) {
  // Styles for background and borders based on Color & Variant
  const colorStyles: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
      solid: 'bg-primary-500 border border-transparent',
      subtle: 'bg-primary-500/10 border border-transparent',
      outline: 'bg-transparent border border-primary-500',
    },
    secondary: {
      solid: 'bg-secondary-500 border border-transparent',
      subtle: 'bg-secondary-500/15 border border-transparent',
      outline: 'bg-transparent border border-secondary-500',
    },
    success: {
      solid: 'bg-success-500 border border-transparent',
      subtle: 'bg-success-500/15 border border-transparent',
      outline: 'bg-transparent border border-success-500',
    },
    warning: {
      solid: 'bg-warning-500 border border-transparent',
      subtle: 'bg-warning-500/15 border border-transparent',
      outline: 'bg-transparent border border-warning-500',
    },
    error: {
      solid: 'bg-error-500 border border-transparent',
      subtle: 'bg-error-500/15 border border-transparent',
      outline: 'bg-transparent border border-error-500',
    },
    info: {
      solid: 'bg-info-500 border border-transparent',
      subtle: 'bg-info-500/15 border border-transparent',
      outline: 'bg-transparent border border-info-500',
    },
    neutral: {
      solid: 'bg-neutral-600 border border-transparent',
      subtle: 'bg-neutral-700/50 border border-transparent',
      outline: 'bg-transparent border border-neutral-600',
    },
  };

  // Text color styling
  const textStyles: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
      solid: 'text-neutral-900 font-montserrat-bold',
      subtle: 'text-primary-500 font-montserrat-semibold',
      outline: 'text-primary-500 font-montserrat-semibold',
    },
    secondary: {
      solid: 'text-neutral-900 font-montserrat-bold',
      subtle: 'text-secondary-500 font-montserrat-semibold',
      outline: 'text-secondary-500 font-montserrat-semibold',
    },
    success: {
      solid: 'text-neutral-900 font-montserrat-bold',
      subtle: 'text-success-500 font-montserrat-semibold',
      outline: 'text-success-500 font-montserrat-semibold',
    },
    warning: {
      solid: 'text-neutral-900 font-montserrat-bold',
      subtle: 'text-warning-500 font-montserrat-semibold',
      outline: 'text-warning-500 font-montserrat-semibold',
    },
    error: {
      solid: 'text-primary-500 font-montserrat-bold',
      subtle: 'text-error-500 font-montserrat-semibold',
      outline: 'text-error-500 font-montserrat-semibold',
    },
    info: {
      solid: 'text-primary-500 font-montserrat-bold',
      subtle: 'text-info-500 font-montserrat-semibold',
      outline: 'text-info-500 font-montserrat-semibold',
    },
    neutral: {
      solid: 'text-primary-500 font-montserrat-semibold',
      subtle: 'text-neutral-300 font-montserrat',
      outline: 'text-neutral-300 font-montserrat',
    },
  };

  return (
    <View
      className={`
        px-3 py-1 rounded-full items-center justify-center
        ${colorStyles[color][variant]}
        ${className}
      `}
      {...props}
    >
      <Typography variant="extra-small" className={textStyles[color][variant]}>
        {label}
      </Typography>
    </View>
  );
}
