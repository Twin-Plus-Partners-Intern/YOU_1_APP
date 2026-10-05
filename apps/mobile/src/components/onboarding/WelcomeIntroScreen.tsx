import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeImage } from '../common/SafeImage';
import { getJayIntroImageUrl } from '@you-il/api';
import { JayCharacter } from './JayCharacter';

interface WelcomeIntroScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export const WelcomeIntroScreen: React.FC<WelcomeIntroScreenProps> = ({ onNext, onSkip }) => {
  const introImageUrl = getJayIntroImageUrl();
  const [imageError, setImageError] = useState(false);

  return (
    <View className="flex-1 bg-neutral-1000">
      {/* Background Gradient: secondary-950 (#001800) to neutral-1000 (#000000) */}
      <LinearGradient
        colors={['#001800', '#000c00', '#000000']}
        locations={[0, 0.45, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <SafeAreaView className="flex-1">
        {/* Top Header Row with Skip Button */}
        <View className="px-6 pt-2 pb-2 flex-row justify-end items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSkip}
            hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
          >
            <Text className="text-neutral-200 font-montserrat-medium text-base">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content Container */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Main Title & Character Wrapper */}
          <View className="items-center mt-6">
            {/* Title: Jay */}
            <Text className="text-secondary-500 font-montserrat-bold text-4xl text-center tracking-tight">
              Jay
            </Text>

            {/* Jay Chibi Waving Character (Cloudinary Image with expo-image) */}
            <View className="my-6 items-center justify-center w-[260px] h-[300px]">
              {!imageError ? (
                <SafeImage
                  source={{ uri: introImageUrl }}
                  style={{ width: 260, height: 300 }}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                  transition={200}
                  onError={() => setImageError(true)}
                />
              ) : (
                <JayCharacter outfitId="outfit_green_sweater" width={260} height={300} />
              )}
            </View>

            {/* Character Dialogue Box in Monospace */}
            <View className="px-4 py-3 max-w-[320px]">
              <Text className="font-mono text-neutral-100 text-base text-center leading-6">
                {
                  "Hi there! I know planning can feel overwhelming, so I'll be your 'J' from now on."
                }
              </Text>
            </View>
          </View>

          {/* Bottom Action Button */}
          <View className="mt-8 mb-4">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onNext}
              className="w-full bg-white rounded-full py-4 items-center justify-center shadow-lg shadow-white/10"
            >
              <Text className="text-neutral-1000 font-montserrat-bold text-base">Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeIntroScreen;
