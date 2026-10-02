import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeImage } from '../common/SafeImage';
import { getJayOutfits, JayOutfitItem } from '@you-il/api';
import { JayCharacter } from './JayCharacter';
import Svg, { Path } from 'react-native-svg';

interface WelcomeOutfitScreenProps {
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

export const WelcomeOutfitScreen: React.FC<WelcomeOutfitScreenProps> = ({
  onComplete,
  onSkip,
  initialOutfitId = 'outfit_black',
}) => {
  const outfits: JayOutfitItem[] = getJayOutfits();

  // Find initial outfit or default to first outfit (outfit_black)
  const defaultSelected = outfits.find((o) => o.id === initialOutfitId) || outfits[0] || outfits[0];

  const [selectedOutfit, setSelectedOutfit] = useState<JayOutfitItem>(defaultSelected);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleContinue = () => {
    onComplete(selectedOutfit.id);
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
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
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="mt-1">
            {/* Header Titles */}
            <View className="items-center">
              <Text className="text-white font-montserrat-bold text-3xl text-center">
                Style <Text className="text-secondary-500">Jay</Text> your way
              </Text>
              <Text className="text-primary-300 font-montserrat-medium text-sm text-center mt-1.5 px-4 leading-5">
                Complete daily goals to unlock awesome outfits. Make Jay uniquely yours!
              </Text>
            </View>

            {/* Big Preview Card Container */}
            <View className="mt-4 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 items-center justify-center relative overflow-hidden shadow-2xl min-h-[240px]">
              {/* Background Decorative Watermark Pattern */}
              <View className="absolute -right-8 -top-8 opacity-10">
                <Text className="font-montserrat-bold text-8xl text-white">J</Text>
              </View>

              {/* Main Selected Outfit Image using SafeImage */}
              <View className="w-[180px] h-[200px] items-center justify-center">
                {!imageErrorMap[selectedOutfit.id] ? (
                  <SafeImage
                    source={{ uri: selectedOutfit.imageUrl }}
                    style={{ width: 180, height: 200 }}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                    transition={200}
                    onError={() => handleImageError(selectedOutfit.id)}
                  />
                ) : (
                  <JayCharacter outfitId={selectedOutfit.id} width={180} height={200} />
                )}
              </View>

              {/* Monospace Speech Bubble */}
              <View className="mt-1.5 py-1 px-3 rounded-full bg-neutral-950/80 border border-neutral-800">
                <Text className="font-mono text-neutral-100 text-xs text-center">
                  Ready to go, mate?
                </Text>
              </View>
            </View>

            {/* Horizontal FlatList of Outfit Cards */}
            <View className="mt-4">
              <FlatList
                horizontal
                data={outfits}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 4, gap: 10 }}
                renderItem={({ item }) => {
                  const isSelected = selectedOutfit.id === item.id;
                  const hasError = imageErrorMap[item.id];

                  return (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => setSelectedOutfit(item)}
                      className={`w-24 h-36 rounded-2xl p-2 items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-white border-2 border-white shadow-lg'
                          : 'bg-neutral-900 border border-neutral-800'
                      }`}
                    >
                      {/* Thumbnail Image using SafeImage */}
                      <View className="w-[68px] h-[80px] items-center justify-center mt-1">
                        {!hasError ? (
                          <SafeImage
                            source={{ uri: item.imageUrl }}
                            style={{ width: 68, height: 80 }}
                            contentFit="contain"
                            cachePolicy="memory-disk"
                            transition={150}
                            onError={() => handleImageError(item.id)}
                          />
                        ) : (
                          <JayCharacter outfitId={item.id} width={60} height={75} />
                        )}
                      </View>

                      {/* Flame Streak Indicator */}
                      <View className="flex-row items-center gap-1 pb-0.5">
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
          <View className="mt-5 mb-4">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleContinue}
              className="w-full bg-white rounded-full py-3.5 items-center justify-center shadow-lg shadow-white/10"
            >
              <Text className="text-neutral-1000 font-montserrat-bold text-base">Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeOutfitScreen;
