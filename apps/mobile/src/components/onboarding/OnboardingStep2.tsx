import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface OnboardingStep2Props {
  onNext: () => void;
  onSkip: () => void;
}

// Small Jay Avatar for Chat Bubble
const MiniJayAvatar = () => (
  <View className="w-8 h-8 rounded-full bg-secondary-900 border border-secondary-500/40 items-center justify-center overflow-hidden">
    <Svg width={24} height={24} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" fill="#FFDFC4" />
      <Path d="M20 40 C15 15, 85 15, 80 40 Z" fill="#4A3525" />
      <Circle cx="40" cy="48" r="7" fill="#2E4034" />
      <Circle cx="60" cy="48" r="7" fill="#2E4034" />
      <Circle cx="38" cy="46" r="2.5" fill="#FFFFFF" />
      <Circle cx="58" cy="46" r="2.5" fill="#FFFFFF" />
      <Circle cx="40" cy="48" r="14" fill="none" stroke="#A3A3A3" strokeWidth="2.5" />
      <Circle cx="60" cy="48" r="14" fill="none" stroke="#A3A3A3" strokeWidth="2.5" />
    </Svg>
  </View>
);

export const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ onNext, onSkip }) => {
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

        {/* Content Container */}
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
            {/* Title: Planning Fast & Automatically with just a sentence */}
            <Text className="text-white font-montserrat-bold text-2xl leading-9 text-left">
              Planning <Text className="text-secondary-500">Fast</Text> &{' '}
              <Text className="text-secondary-500">Automatically</Text>
              {'\n'}with just a sentence
            </Text>

            {/* Chat Bubble Section */}
            <View className="mt-6 gap-3">
              {/* User Prompt Bubble (White pill rounded-full) */}
              <View className="self-end bg-white rounded-3xl px-5 py-3.5 max-w-[90%] shadow-md">
                <Text className="text-neutral-1000 font-montserrat-medium text-sm leading-5">
                  I want to get all English grammar in 14 days
                </Text>
              </View>

              {/* Jay Response Bubble */}
              <View className="flex-row items-center gap-2 self-start mt-1">
                <MiniJayAvatar />
                <View className="bg-white rounded-2xl px-4 py-2.5 shadow-md">
                  <Text className="text-neutral-1000 font-montserrat-medium text-sm">
                    Okay! I'll break it down.
                  </Text>
                </View>
              </View>
            </View>

            {/* Calendar Demo Component */}
            <View className="mt-6 bg-neutral-900 border border-neutral-800/80 rounded-3xl p-4 shadow-xl">
              {/* Calendar Month Header */}
              <View className="flex-row items-center justify-between px-2 pb-3 border-b border-neutral-800/50">
                <TouchableOpacity activeOpacity={0.7} className="p-1">
                  <ChevronLeft size={20} color="#D4D4D4" />
                </TouchableOpacity>
                <Text className="text-white font-montserrat-bold text-base">April 2026</Text>
                <TouchableOpacity activeOpacity={0.7} className="p-1">
                  <ChevronRight size={20} color="#D4D4D4" />
                </TouchableOpacity>
              </View>

              {/* Days of Week Header */}
              <View className="flex-row justify-between pt-3 pb-2 px-1">
                {['SUN', 'MON', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => (
                  <Text
                    key={i}
                    className="text-neutral-400 font-montserrat-medium text-[11px] text-center w-9"
                  >
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar Grid Row 1 */}
              <View className="flex-row justify-between items-center py-2 px-1">
                <View className="w-9 items-center">
                  <Text className="text-neutral-400 font-montserrat text-sm">31</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">1</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1" />
                </View>
                {/* Active Day 2 Pill */}
                <View className="w-9 items-center">
                  <View className="bg-white rounded-full w-9 h-13 py-2 items-center justify-center shadow-md">
                    <Text className="text-neutral-1000 font-montserrat-bold text-base">2</Text>
                    <View className="w-1.5 h-1.5 rounded-full bg-information-500 mt-1" />
                  </View>
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">3</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">4</Text>
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">5</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-information-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">6</Text>
                  <View className="flex-row gap-0.5 mt-1">
                    <View className="w-1.5 h-1.5 rounded-full bg-information-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  </View>
                </View>
              </View>

              {/* Calendar Grid Row 2 */}
              <View className="flex-row justify-between items-center py-2 px-1">
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">7</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-information-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">8</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">9</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">10</Text>
                  <View className="flex-row gap-0.5 mt-1">
                    <View className="w-1.5 h-1.5 rounded-full bg-information-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-warning-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-error-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  </View>
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">11</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-information-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">12</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1" />
                </View>
                <View className="w-9 items-center">
                  <Text className="text-neutral-200 font-montserrat text-sm">13</Text>
                  <View className="flex-row gap-0.5 mt-1">
                    <View className="w-1.5 h-1.5 rounded-full bg-information-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-warning-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-error-500" />
                    <View className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Action Button */}
          <View className="mt-6 mb-4">
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

export default OnboardingStep2;
