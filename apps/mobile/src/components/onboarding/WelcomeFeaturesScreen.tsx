import React from 'react';
import { OnboardingStep2 } from './OnboardingStep2';

interface WelcomeFeaturesScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export const WelcomeFeaturesScreen: React.FC<WelcomeFeaturesScreenProps> = ({ onNext, onSkip }) => {
  return <OnboardingStep2 onNext={onNext} onSkip={onSkip} />;
};

export default WelcomeFeaturesScreen;
