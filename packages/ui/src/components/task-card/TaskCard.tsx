import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../typography/Typography';
import { Badge, BadgeColor } from '../badge/Badge';

export interface TaskCardProps extends ViewProps {
  title: string;
  time: string;
  category: string;
  categoryColor?: BadgeColor;
  duration: string;
  frequency: string;
  status?: 'draft' | 'active';
  completed?: boolean;
  onToggleComplete?: (completed: boolean) => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export function TaskCard({
  title,
  time,
  category,
  categoryColor = 'info',
  duration,
  frequency,
  status = 'active',
  completed = false,
  onToggleComplete,
  theme = 'dark',
  className = '',
  ...props
}: TaskCardProps) {
  const isDraft = status === 'draft';

  // Base background and border styling depending on the theme
  const bgStyles =
    theme === 'dark'
      ? 'bg-neutral-800 border border-neutral-700/50'
      : 'bg-white border border-neutral-200';

  // Left accent bar colors
  const borderAccentColors: Record<BadgeColor, string> = {
    primary: 'border-l-primary-500',
    secondary: 'border-l-secondary-500',
    success: 'border-l-success-500',
    warning: 'border-l-warning-500',
    error: 'border-l-error-500',
    info: 'border-l-info-500',
    neutral: 'border-l-neutral-600',
  };

  // Text color styles
  const titleColorStyle = theme === 'dark' ? 'text-primary-500' : 'text-neutral-800';
  const metaColorStyle = theme === 'dark' ? 'text-neutral-300' : 'text-neutral-500';

  // Checkbox styles
  const checkboxBg = completed
    ? theme === 'dark'
      ? 'bg-secondary-500'
      : 'bg-success-500'
    : theme === 'dark'
      ? 'bg-neutral-700'
      : 'bg-neutral-100';

  const checkboxCheckColor = completed
    ? theme === 'dark'
      ? '#090D16' // Pip-boy dark background contrast
      : '#FFFFFF'
    : 'transparent';

  return (
    <View
      className={`
        flex-row items-center justify-between p-4 rounded-2xl border-l-[6px]
        ${bgStyles}
        ${borderAccentColors[categoryColor]}
        ${isDraft ? 'opacity-50' : 'opacity-100'}
        ${className}
      `}
      {...props}
    >
      <View className="flex-1 flex-col gap-2.5">
        {/* Header containing Time & Draft Badge */}
        <View className="flex-row items-center gap-2">
          <Typography variant="extra-small" className={metaColorStyle}>
            {time}
          </Typography>
          {isDraft && (
            <Badge label="DRAFT" color="neutral" variant="subtle" className="px-1.5 py-0.5" />
          )}
        </View>

        {/* Task Title */}
        <Typography variant="large" className={`font-montserrat-bold ${titleColorStyle}`}>
          {title}
        </Typography>

        {/* Categories & Metadata row */}
        <View className="flex-row flex-wrap items-center gap-1.5">
          <Badge label={category} color={categoryColor} variant="subtle" />
          <Badge label={frequency} color="neutral" variant="subtle" />
          <Badge label={duration} color="neutral" variant="subtle" />
        </View>
      </View>

      {/* Completion Checkbox */}
      <Pressable
        onPress={() => onToggleComplete?.(!completed)}
        className={`w-10 h-10 rounded-full items-center justify-center ml-4 active:scale-95 ${checkboxBg}`}
      >
        <Feather name="check" size={20} color={checkboxCheckColor} />
      </Pressable>
    </View>
  );
}
