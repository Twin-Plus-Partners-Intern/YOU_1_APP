import React, { useState } from 'react';
import { Image as RNImage, ImageStyle, StyleProp } from 'react-native';

let ExpoImageComponent: any = null;
try {
  // Safe optional require for expo-image cross-platform compatibility
  ExpoImageComponent = require('expo-image').Image;
} catch {
  ExpoImageComponent = null;
}

export interface SafeImageProps {
  source: { uri: string } | number;
  style?: StyleProp<ImageStyle>;
  contentFit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk';
  transition?: number;
  onError?: (error: any) => void;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  source,
  style,
  contentFit = 'contain',
  cachePolicy = 'memory-disk',
  transition = 200,
  onError,
}) => {
  const [hasError, setHasError] = useState(false);

  if (ExpoImageComponent && !hasError) {
    try {
      return (
        <ExpoImageComponent
          source={source}
          style={style}
          contentFit={contentFit}
          cachePolicy={cachePolicy}
          transition={transition}
          onError={(e: any) => {
            setHasError(true);
            if (onError) onError(e);
          }}
        />
      );
    } catch {
      // Fallback if ExpoImage throws during render
    }
  }

  // Fallback to React Native Image
  const resizeModeMap: Record<string, 'contain' | 'cover' | 'stretch' | 'center'> = {
    contain: 'contain',
    cover: 'cover',
    fill: 'stretch',
    'scale-down': 'center',
    none: 'center',
  };

  const rnSource = typeof source === 'number' ? source : { uri: source.uri };

  return (
    <RNImage
      source={rnSource}
      style={style}
      resizeMode={resizeModeMap[contentFit] || 'contain'}
      onError={(e) => {
        if (onError) onError(e);
      }}
    />
  );
};

export default SafeImage;
