import React from 'react';
import { View, Image } from 'react-native';

export interface FlameStepperProps {
  currentStep?: number; // 1-indexed (1 for Onboarding 1)
  totalSteps?: number; // default 4
}

export const FlameStepper: React.FC<FlameStepperProps> = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <View
      className="flex-row items-center justify-between w-full px-2 mt-4 mb-6"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {steps.map((step, index) => {
        const isActive = step <= currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step}>
            {/* Step Icon */}
            <View className="items-center justify-center">
              <Image
                source={
                  isActive
                    ? require('../../../assets/icons/flame-active.png')
                    : require('../../../assets/icons/flame-inactive.png')
                }
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
            </View>

            {/* Horizontal Line Connector (3 bars between 4 flames) */}
            {!isLast && (
              <View
                className="flex-1 h-2.5 bg-[#1c242d] rounded-full mx-2 self-center"
                style={{
                  flex: 1,
                  height: 10,
                  backgroundColor: '#1c242d',
                  borderRadius: 9999,
                  marginHorizontal: 8,
                  alignSelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default FlameStepper;
