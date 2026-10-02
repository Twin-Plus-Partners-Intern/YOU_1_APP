import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SplashScreenProps {
  onFinish?: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, durationMs = 1800 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, durationMs);
    return () => clearTimeout(timer);
  }, [onFinish, durationMs]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Top Ambient Green Glow Gradient */}
      <LinearGradient
        colors={['rgba(0, 85, 0, 0.55)', 'rgba(0, 35, 0, 0.25)', 'rgba(0, 0, 0, 0)']}
        locations={[0, 0.3, 0.75]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 420 }}
      />

      {/* Dead-Center Container */}
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View className="items-center justify-center shadow-lg shadow-secondary-500/30">
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 112, height: 112, borderRadius: 28 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
