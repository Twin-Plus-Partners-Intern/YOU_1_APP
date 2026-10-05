import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { UserGoalPlanDTO } from '@you-il/types';
import GoalSettingScreen from './GoalSettingScreen';
import PeriodSelectScreen from './PeriodSelectScreen';
import TimeCommitmentScreen from './TimeCommitmentScreen';

interface PostOnboardingFlowProps {
  onComplete: (goalPlan: UserGoalPlanDTO) => Promise<void> | void;
  onCancel?: () => void;
}

export const PostOnboardingFlow: React.FC<PostOnboardingFlowProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [target, setTarget] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('2026-04-01');
  const [endDate, setEndDate] = useState<string>('2026-04-30');
  const [hours, setHours] = useState<number>(2);
  const [minutes, setMinutes] = useState<number>(0);

  // Step 1 -> 2
  const handleGoalContinue = (t: string, details: string) => {
    setTarget(t);
    setAdditionalDetails(details);
    setCurrentStep(2);
  };

  // Step 2 -> 3
  const handlePeriodContinue = (sDate: string, eDate: string) => {
    setStartDate(sDate);
    setEndDate(eDate);
    setCurrentStep(3);
  };

  // Step 3 -> Complete Submission
  const handleTimeContinue = async (commitment: { hours: number; minutes: number }) => {
    setHours(commitment.hours);
    setMinutes(commitment.minutes);

    const goalPlanPayload: UserGoalPlanDTO = {
      target: target || 'Personal Goal',
      additionalDetails: additionalDetails || undefined,
      startDate,
      endDate,
      dailyCommitment: {
        hours: commitment.hours,
        minutes: commitment.minutes,
      },
    };

    try {
      setIsSubmitting(true);
      await onComplete(goalPlanPayload);
    } catch (e) {
      console.warn('Error submitting post onboarding goal plan:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <View className="flex-1 bg-neutral-1000 items-center justify-center">
        <ActivityIndicator size="large" color="#00EE00" />
      </View>
    );
  }

  if (currentStep === 2) {
    return (
      <PeriodSelectScreen
        initialStartDate={startDate}
        initialEndDate={endDate}
        onBack={() => setCurrentStep(1)}
        onContinue={handlePeriodContinue}
      />
    );
  }

  if (currentStep === 3) {
    return (
      <TimeCommitmentScreen
        initialHours={hours}
        initialMinutes={minutes}
        onBack={() => setCurrentStep(2)}
        onContinue={handleTimeContinue}
      />
    );
  }

  // Default Step 1: GoalSettingScreen
  return (
    <GoalSettingScreen
      initialTarget={target}
      initialDetails={additionalDetails}
      onBack={onCancel ? onCancel : () => {}}
      onContinue={handleGoalContinue}
    />
  );
};

export default PostOnboardingFlow;
