import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../typography/Typography';

export type BannerType = 'warning' | 'error';

export interface ConflictBannerProps extends ViewProps {
  title: string;
  description: string;
  type?: BannerType;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function ConflictBanner({
  title,
  description,
  type = 'warning',
  onClose,
  actionLabel,
  onAction,
  className = '',
  ...props
}: ConflictBannerProps) {
  // Styles for backgrounds, borders, and text colors based on severity type
  const bgStyle = type === 'error' ? 'bg-error-500/10' : 'bg-warning-500/10';
  const borderStyle = type === 'error' ? 'border-error-500' : 'border-warning-500';
  const textStyle = type === 'error' ? 'text-error-500' : 'text-warning-500';
  const iconName = type === 'error' ? 'alert-circle' : 'alert-triangle';

  return (
    <View
      className={`
        w-full p-4 border rounded-2xl flex-col gap-3
        ${bgStyle}
        ${borderStyle}
        ${className}
      `}
      {...props}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 flex-row items-start gap-3">
          <Feather name={iconName} size={22} className={textStyle} />

          <View className="flex-1 flex-col gap-1">
            <Typography variant="large" className={`font-montserrat-bold ${textStyle}`}>
              {title}
            </Typography>
            <Typography variant="small" className="text-neutral-300 font-montserrat leading-[18px]">
              {description}
            </Typography>
          </View>
        </View>

        {onClose && (
          <Pressable onPress={onClose} className="ml-2 p-1 active:opacity-60">
            <Feather name="x" size={18} color="#94A3B8" />
          </Pressable>
        )}
      </View>

      {actionLabel && onAction && (
        <View className="flex-row justify-end mt-1">
          <Pressable
            onPress={onAction}
            className={`px-4 py-2 border rounded-full bg-transparent ${borderStyle} active:opacity-75`}
          >
            <Typography variant="small" className={`font-montserrat-semibold ${textStyle}`}>
              {actionLabel}
            </Typography>
          </Pressable>
        </View>
      )}
    </View>
  );
}
