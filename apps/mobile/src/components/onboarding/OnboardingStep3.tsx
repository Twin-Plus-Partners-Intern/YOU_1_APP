import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { JayCharacter } from './JayCharacter';
import { OutfitItem } from '@you-il/types';
import Svg, { Path } from 'react-native-svg';

interface OnboardingStep3Props {
  onComplete: (selectedOutfitId: string) => void;
  onSkip: () => void;
  initialOutfitId?: string;
}

// Green Flame SVG Icon for streak requirement
const GreenFlameIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="#00EE00">
    <Path d="M12 23c4.97 0 9-3.58 9-8 0-4.17-3.11-7.07-6.28-10.02C13.68 3.99 12.83 3.01 12.4 2a.5.5 0 0 0-.91 0c-.43 1.01-1.28 1.99-2.32 2.98C6.11 7.93 3 10.83 3 15c0 4.42 4.03 8 9 8z" />
  </Svg>
);

export const OUTFIT_OPTIONS: OutfitItem[] = [
  {
    id: 'outfit_green_sweater',
    name: 'Casual Green',
    streakRequired: 0,
    unlocked: true,
  },
  {
    id: 'outfit_blue_beanie',
    name: 'Winter Beanie',
    streakRequired: 14,
    unlocked: true,
  },
  {
    id: 'outfit_black_hoodie',
    name: 'Streetwear Black',
    streakRequired: 28,
    unlocked: true,
  },
  {
    id: 'outfit_red_festival',
    name: 'Festival Red',
    streakRequired: 32,
    unlocked: true,
  },
];

export const OnboardingStep3: React.FC<OnboardingStep3Props> = ({
  onComplete,
  onSkip,
  initialOutfitId = 'outfit_black_hoodie',
}) => {
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>(initialOutfitId);

  const handleContinue = () => {
    onComplete(selectedOutfitId);
  };

  return (
    <View className="flex-1 bg-neutral-1000">
      {/* Background Gradient */}
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

        {/* Main Scrollable Content */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="mt-2">
            {/* Header Titles */}
            <View className="items-center">
              <Text className="text-white font-montserrat-bold text-3xl text-center">
                Style <Text className="text-secondary-500">Jay</Text> your way
              </Text>
              <Text className="text-primary-300 font-montserrat-medium text-sm text-center mt-2 px-4 leading-5">
                Complete daily goals to unlock awesome outfits. Make Jay uniquely yours!
              </Text>
            </View>

            {/* Big Preview Card Container */}
            <View className="mt-6 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 items-center justify-center relative overflow-hidden shadow-2xl min-h-[300px]">
              {/* Background Decorative Subtle Watermark Pattern */}
              <View className="absolute -right-10 -top-10 opacity-10">
                <Text className="font-montserrat-bold text-9xl text-white">J</Text>
              </View>

              {/* Main Jay Outfit Preview */}
              <JayCharacter outfitId={selectedOutfitId} width={220} height={250} />

              {/* Monospace Speech Bubble */}
              <View className="mt-2 py-1 px-3 rounded-full bg-neutral-950/80 border border-neutral-800">
                <Text className="font-mono text-neutral-100 text-sm text-center">
                  Ready to go, mate?
                </Text>
              </View>
            </View>

            {/* Horizontal FlatList of Outfit Cards */}
            <View className="mt-6">
              <FlatList
                horizontal
                data={OUTFIT_OPTIONS}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 4, gap: 12 }}
                renderItem={({ item }) => {
                  const isSelected = selectedOutfitId === item.id;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => setSelectedOutfitId(item.id)}
                      className={`w-28 h-40 rounded-2xl p-2 items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-white border-2 border-white shadow-lg'
                          : 'bg-neutral-900 border border-neutral-800'
                      }`}
                    >
                      {/* Thumbnail Character */}
                      <View className="items-center justify-center mt-1">
                        <JayCharacter outfitId={item.id} width={70} height={95} />
                      </View>

                      {/* Flame Streak Indicator */}
                      <View className="flex-row items-center gap-1.5 pb-1">
                        <GreenFlameIcon />
                        <Text
                          className={`font-montserrat-semibold text-xs ${
                            isSelected ? 'text-neutral-1000 font-bold' : 'text-neutral-200'
                          }`}
                        >
                          {item.streakRequired}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>

          {/* Bottom Action Button */}
          <View className="mt-6 mb-4">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleContinue}
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

export default OnboardingStep3;
