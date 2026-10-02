export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  selectedOutfitId: string;
  selectedLanguage?: string;
  createdAt: string;
}

export interface SaveOnboardingPreferencesRequest {
  selectedOutfitId: string;
  onboardingCompletedAt: string;
}

export interface OutfitItem {
  id: string;
  name: string;
  streakRequired: number;
  unlocked: boolean;
  description?: string;
}
