import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FlameStepper } from './components/FlameStepper';

interface GoalSettingScreenProps {
  initialTarget?: string;
  initialDetails?: string;
  onBack: () => void;
  onContinue: (target: string, additionalDetails: string) => void;
}

export const GoalSettingScreen: React.FC<GoalSettingScreenProps> = ({
  initialTarget = '',
  initialDetails = '',
  onBack,
  onContinue,
}) => {
  const [target, setTarget] = useState(initialTarget);
  const [additionalDetails, setAdditionalDetails] = useState(initialDetails);

  const handleContinue = () => {
    onContinue(target.trim(), additionalDetails.trim());
  };

  return (
    <View className="flex-1 bg-neutral-1000">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Main Scrollable Form Content with explicit React Native Horizontal Padding */}
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 20, // 20px outer margin from left and right screen edges
              paddingBottom: 24,
              paddingTop: 8,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="w-full">
              {/* Header Flame Stepper (Step 1 of 4) */}
              <FlameStepper currentStep={1} totalSteps={4} />

              {/* Title & Subtitle */}
              <View className="items-center mt-2">
                <Text className="text-white font-montserrat-bold text-3xl text-center">
                  Set your goal
                </Text>
                <Text className="text-neutral-400 font-montserrat text-sm text-center mt-2 mb-8 px-2 leading-5">
                  Tell us what you want to achieve, and AI will build a personalized plan for you
                </Text>
              </View>

              {/* Form Fields Section */}
              <View className="w-full gap-6">
                {/* Field 1: Target */}
                <View className="w-full">
                  <Text className="text-white font-montserrat-semibold text-base mb-1">Target</Text>
                  <Text className="text-neutral-400 font-montserrat text-sm mb-2">
                    What do you want to achieve?
                  </Text>
                  <TextInput
                    value={target}
                    onChangeText={setTarget}
                    placeholder="Lose 5 kg, run 10 km, save $1,000"
                    placeholderTextColor="#737373"
                    className="w-full py-3.5 px-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 text-white font-montserrat text-base"
                  />
                </View>

                {/* Field 2: Tell Jay more */}
                <View className="w-full">
                  <Text className="text-white font-montserrat-semibold text-base mb-1">
                    Tell Jay more
                  </Text>
                  <Text className="text-neutral-400 font-montserrat text-sm mb-2">
                    Add any details that can help AI create a better plan.
                  </Text>
                  <TextInput
                    value={additionalDetails}
                    onChangeText={setAdditionalDetails}
                    placeholder="I can exercise 3 days a week and prefer running."
                    placeholderTextColor="#737373"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    className="w-full h-32 p-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 text-white font-montserrat text-base"
                  />
                </View>
              </View>
            </View>

            {/* Bottom Action Buttons Bar */}
            <View className="flex-row gap-4 w-full mt-auto pb-4 pt-6">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onBack}
                className="flex-1 border border-neutral-600 bg-transparent rounded-full py-4 items-center justify-center"
              >
                <Text className="text-white font-montserrat-semibold text-base">Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleContinue}
                className="flex-1 bg-white rounded-full py-4 items-center justify-center"
              >
                <Text className="text-black font-montserrat-semibold text-base">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default GoalSettingScreen;
