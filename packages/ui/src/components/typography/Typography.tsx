import React from 'react';
import { Text, TextProps } from 'react-native';

export type TypographyVariant =
  'h1' | 'h2' | 'h3' | 'h4' | 'heading' | 'large' | 'medium' | 'small' | 'extra-small';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  singleLine?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Typography({
  variant = 'medium',
  singleLine = false,
  className = '',
  children,
  ...props
}: TypographyProps) {
  // Map variant to styling classes
  const stylesMap: Record<TypographyVariant, { multi: string; single: string }> = {
    h1: {
      multi: 'text-[40px] leading-[44px] font-montserrat-bold',
      single: 'text-[40px] leading-[40px] font-montserrat-bold',
    },
    h2: {
      multi: 'text-[36px] leading-[40px] font-montserrat-bold',
      single: 'text-[36px] leading-[36px] font-montserrat-bold',
    },
    h3: {
      multi: 'text-[32px] leading-[36px] font-montserrat-bold',
      single: 'text-[32px] leading-[32px] font-montserrat-bold',
    },
    h4: {
      multi: 'text-[28px] leading-[32px] font-montserrat-bold',
      single: 'text-[28px] leading-[28px] font-montserrat-bold',
    },
    heading: {
      multi: 'text-[24px] leading-[30px] font-montserrat-bold',
      single: 'text-[24px] leading-[24px] font-montserrat-bold',
    },
    large: {
      multi: 'text-[20px] leading-[26px] font-montserrat-semibold',
      single: 'text-[20px] leading-[20px] font-montserrat-semibold',
    },
    medium: {
      multi: 'text-[16px] leading-[24px] font-montserrat',
      single: 'text-[16px] leading-[16px] font-montserrat',
    },
    small: {
      multi: 'text-[14px] leading-[20px] font-montserrat-semibold',
      single: 'text-[14px] leading-[14px] font-montserrat-semibold',
    },
    'extra-small': {
      multi: 'text-[12px] leading-[16px] font-montserrat-semibold',
      single: 'text-[12px] leading-[12px] font-montserrat-semibold',
    },
  };

  const selectedStyle = singleLine ? stylesMap[variant].single : stylesMap[variant].multi;

  return (
    <Text
      className={`${selectedStyle} text-primary-500 ${className}`}
      numberOfLines={singleLine ? 1 : props.numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
}
