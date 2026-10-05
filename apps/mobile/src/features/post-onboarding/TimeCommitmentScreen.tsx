import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FlameStepper } from './components/FlameStepper';

interface TimeCommitmentScreenProps {
  initialHours?: number;
  initialMinutes?: number;
  onBack: () => void;
  onContinue: (commitment: { hours: number; minutes: number }) => void;
}

export const TimeCommitmentScreen: React.FC<TimeCommitmentScreenProps> = ({
  initialHours = 2,
  initialMinutes = 0,
  onBack,
  onContinue,
}) => {
  const [selectedHours, setSelectedHours] = useState<number>(initialHours);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(initialMinutes);

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = [0, 15, 30, 45];

  const handleContinue = () => {
    onContinue({
      hours: selectedHours,
      minutes: selectedMinutes,
    });
  };

  // Helper to get surrounding values for 3D wheel effect
  const getHourNeighbor = (offset: number) => {
    const val = selectedHours + offset;
    if (val >= 0 && val <= 23) return val;
    return null;
  };

  const getMinuteNeighbor = (offset: number) => {
    const currentIndex = minutesList.indexOf(selectedMinutes);
    const targetIndex = currentIndex + offset;
    if (targetIndex >= 0 && targetIndex < minutesList.length) {
      return minutesList[targetIndex];
    }
    return null;
  };

  return (
    <View className="flex-1 bg-neutral-1000">
      <SafeAreaView className="flex-1 px-4">
        {/* Header Flame Stepper (Step 3 of 4) */}
        <View className="pt-2">
          <FlameStepper currentStep={3} totalSteps={4} />
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 24,
            paddingTop: 8,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Title & Subtitle */}
            <View className="items-center mt-2">
              <Text className="text-white font-montserrat-bold text-3xl text-center">
                Daily time commitment
              </Text>
              <Text className="text-neutral-400 font-montserrat-medium text-sm text-center mt-2 px-6 leading-5">
                How much time do you want to spend on your goal each day?
              </Text>
            </View>

            {/* Main Wheel Card Container */}
            <View className="mt-8 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl min-h-[340px] justify-center">
              {/* Columns Header Row */}
              <View className="flex-row justify-around border-b border-neutral-800/60 pb-3 mb-4">
                <Text className="text-neutral-400 font-montserrat-medium text-base text-center w-1/2">
                  Hour
                </Text>
                <Text className="text-neutral-400 font-montserrat-medium text-base text-center w-1/2">
                  Minute
                </Text>
              </View>

              {/* Wheel Picker Rows */}
              <View className="flex-row justify-around items-center">
                {/* Hours Column */}
                <View className="items-center justify-center w-1/2 gap-3">
                  {/* -2 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getHourNeighbor(-2) === null}
                    onPress={() =>
                      getHourNeighbor(-2) !== null && setSelectedHours(getHourNeighbor(-2)!)
                    }
                    className="h-8 items-center justify-center opacity-25"
                  >
                    <Text className="text-neutral-500 font-montserrat-medium text-base">
                      {getHourNeighbor(-2) !== null ? getHourNeighbor(-2) : ''}
                    </Text>
                  </TouchableOpacity>

                  {/* -1 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getHourNeighbor(-1) === null}
                    onPress={() =>
                      getHourNeighbor(-1) !== null && setSelectedHours(getHourNeighbor(-1)!)
                    }
                    className="h-10 items-center justify-center opacity-60"
                  >
                    <Text className="text-neutral-400 font-montserrat-semibold text-2xl">
                      {getHourNeighbor(-1) !== null ? getHourNeighbor(-1) : ''}
                    </Text>
                  </TouchableOpacity>

                  {/* Active Selected Hour */}
                  <View className="h-14 items-center justify-center border-y border-neutral-800/80 w-full">
                    <Text className="text-white font-montserrat-bold text-5xl">
                      {selectedHours}
                    </Text>
                  </View>

                  {/* +1 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getHourNeighbor(1) === null}
                    onPress={() =>
                      getHourNeighbor(1) !== null && setSelectedHours(getHourNeighbor(1)!)
                    }
                    className="h-10 items-center justify-center opacity-60"
                  >
                    <Text className="text-neutral-400 font-montserrat-semibold text-2xl">
                      {getHourNeighbor(1) !== null ? getHourNeighbor(1) : ''}
                    </Text>
                  </TouchableOpacity>

                  {/* +2 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getHourNeighbor(2) === null}
                    onPress={() =>
                      getHourNeighbor(2) !== null && setSelectedHours(getHourNeighbor(2)!)
                    }
                    className="h-8 items-center justify-center opacity-25"
                  >
                    <Text className="text-neutral-500 font-montserrat-medium text-base">
                      {getHourNeighbor(2) !== null ? getHourNeighbor(2) : ''}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Minutes Column */}
                <View className="items-center justify-center w-1/2 gap-3">
                  {/* -2 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getMinuteNeighbor(-2) === null}
                    onPress={() =>
                      getMinuteNeighbor(-2) !== null && setSelectedMinutes(getMinuteNeighbor(-2)!)
                    }
                    className="h-8 items-center justify-center opacity-25"
                  >
                    <Text className="text-neutral-500 font-montserrat-medium text-base">
                      {getMinuteNeighbor(-2) !== null ? getMinuteNeighbor(-2) : ''}
                    </Text>
                  </TouchableOpacity>

                  {/* -1 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getMinuteNeighbor(-1) === null}
                    onPress={() =>
                      getMinuteNeighbor(-1) !== null && setSelectedMinutes(getMinuteNeighbor(-1)!)
                    }
                    className="h-10 items-center justify-center opacity-60"
                  >
                    <Text className="text-neutral-400 font-montserrat-semibold text-2xl">
                      {getMinuteNeighbor(-1) !== null ? getMinuteNeighbor(-1) : ''}
                    </Text>
                  </TouchableOpacity>

                  {/* Active Selected Minute */}
                  <View className="h-14 items-center justify-center border-y border-neutral-800/80 w-full">
                    <Text className="text-white font-montserrat-bold text-5xl">
                      {selectedMinutes}
                    </Text>
                  </View>

                  {/* +1 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getMinuteNeighbor(1) === null}
                    onPress={() =>
                      getMinuteNeighbor(1) !== null && setSelectedMinutes(getMinuteNeighbor(1)!)
                    }
                    className="h-10 items-center justify-center opacity-60"
                  >
                    <Text className="text-neutral-400 font-montserrat-semibold text-2xl">
                      {getMinuteNeighbor(1) !== null ? getMinuteNeighbor(1) : ''}
                    </Text>
                  </TouchableOpacity>

                  {/* +2 Offset */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={getMinuteNeighbor(2) === null}
                    onPress={() =>
                      getMinuteNeighbor(2) !== null && setSelectedMinutes(getMinuteNeighbor(2)!)
                    }
                    className="h-8 items-center justify-center opacity-25"
                  >
                    <Text className="text-neutral-500 font-montserrat-medium text-base">
                      {getMinuteNeighbor(2) !== null ? getMinuteNeighbor(2) : ''}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Navigation Buttons Bar */}
          <View className="flex-row gap-4 mt-8 mb-4">
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
      </SafeAreaView>
    </View>
  );
};

export default TimeCommitmentScreen;
