import React from 'react';
import { View } from 'react-native';
import { Typography } from '../typography/Typography';
import { Input, InputProps } from './Input';

export interface FormFieldProps extends InputProps {
  label?: string;
  error?: string;
  warning?: string;
  containerClassName?: string;
}

export function FormField({
  label,
  error,
  warning,
  containerClassName = '',
  ...props
}: FormFieldProps) {
  const hasError = !!error;
  const hasWarning = !!warning && !error; // Error takes precedence

  return (
    <View className={`w-full flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <Typography variant="small" className="text-neutral-300 font-montserrat-semibold ml-1">
          {label}
        </Typography>
      )}

      <Input hasError={hasError} hasWarning={hasWarning} {...props} />

      {error ? (
        <Typography variant="extra-small" className="text-error-500 font-montserrat ml-1 mt-0.5">
          {error}
        </Typography>
      ) : warning ? (
        <Typography variant="extra-small" className="text-warning-500 font-montserrat ml-1 mt-0.5">
          {warning}
        </Typography>
      ) : null}
    </View>
  );
}
