import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore, useOnboardingStore, goalService } from '@you-il/api';
import { UserGoalPlanDTO } from '@you-il/types';
import { SignInScreen } from '../components/auth/SignInScreen';
import { SignUpScreen } from '../components/auth/SignUpScreen';
import {
  SplashScreen,
  WelcomeIntroScreen,
  WelcomeFeaturesScreen,
  WelcomeOutfitScreen,
  JayCharacter,
} from '../components/onboarding';
import { PostOnboardingFlow } from '../features/post-onboarding';

export type RootStackParamList =
  | 'Splash'
  | 'WelcomeIntro'
  | 'WelcomeFeatures'
  | 'WelcomeOutfit'
  | 'SignUp'
  | 'SignIn'
  | 'PostOnboarding'
  | 'Dashboard';

export const RootNavigator: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<RootStackParamList>('Splash');
  const [isSplashTimerDone, setIsSplashTimerDone] = useState<boolean>(false);
  const [userGoalPlan, setUserGoalPlan] = useState<UserGoalPlanDTO | null>(null);

  const {
    isAuthenticated,
    user,
    isInitializing: isAuthInitializing,
    loadSession,
    signOut,
    useMock,
  } = useAuthStore();

  const {
    hasCompletedOnboarding,
    selectedOutfitId,
    isInitializing: isOnboardingInitializing,
    loadOnboardingState,
    completeOnboarding,
    clearAllStorageDev,
  } = useOnboardingStore();

  // Load session & onboarding status on startup
  useEffect(() => {
    const initApp = async () => {
      await Promise.all([loadSession(), loadOnboardingState()]);
    };
    initApp();
  }, [loadSession, loadOnboardingState]);

  // 1. QUẢN LÝ TRẠNG THÁI KHỞI ĐỘNG (APP BOOTSTRAP STATE)
  const isLoading = isAuthInitializing || isOnboardingInitializing || !isSplashTimerDone;

  // Xử lý khi SplashScreen hoàn tất 1.5s timer
  const handleSplashFinish = () => {
    setIsSplashTimerDone(true);
    if (isAuthenticated) {
      setCurrentRoute('Dashboard');
    } else if (hasCompletedOnboarding) {
      setCurrentRoute('SignIn');
    } else {
      setCurrentRoute('WelcomeIntro');
    }
  };

  // 3. XỬ LÝ SỰ KIỆN HOÀN THÀNH ONBOARDING (Bấm nút "Continue" ở Step 3 hoặc "Skip" ở bất cứ đâu)
  const handleCompleteOrSkipOnboarding = async (outfitId?: string) => {
    try {
      // Ghi trực tiếp vào AsyncStorage key @has_completed_onboarding
      await AsyncStorage.setItem('@has_completed_onboarding', 'true');
      // Đồng bộ state Zustand
      await completeOnboarding(outfitId || selectedOutfitId);
    } catch (e) {
      console.warn('Error persisting onboarding state:', e);
    }
    // Bắt buộc điều hướng sang SignUpScreen theo yêu cầu
    setCurrentRoute('SignUp');
  };

  // Xử lý sau khi hoàn thành POST-AUTH ONBOARDING (Goal Plan 3 bước)
  const handlePostOnboardingComplete = async (plan: UserGoalPlanDTO) => {
    setUserGoalPlan(plan);
    try {
      await goalService.createUserGoalPlan(plan);
    } catch (e) {
      console.warn('Failed to submit goal plan:', e);
    }
    setCurrentRoute('Dashboard');
  };

  // 4. CẤU HÌNH RESET DỮ LIỆU ĐỂ TEST (DEV ONLY): Xóa sạch AsyncStorage & phát lại Onboarding
  const handleDevResetStorage = async () => {
    try {
      await AsyncStorage.clear();
      await clearAllStorageDev();
    } catch (e) {
      console.warn('Error clearing AsyncStorage:', e);
    }
    setIsSplashTimerDone(false);
    setUserGoalPlan(null);
    setCurrentRoute('Splash');
  };

  // =========================================================================
  // LAYER 1: BOOTSTRAP / SPLASH SCREEN (Welcome 0)
  // Nếu isLoading === true: Luôn giữ ở màn hình SplashScreen
  // =========================================================================
  if (isLoading || currentRoute === 'Splash') {
    return <SplashScreen onFinish={handleSplashFinish} durationMs={1500} />;
  }

  // =========================================================================
  // POST-AUTH ONBOARDING FLOW (Triggered right after Sign In / Sign Up)
  // =========================================================================
  if (currentRoute === 'PostOnboarding') {
    return (
      <PostOnboardingFlow
        onComplete={handlePostOnboardingComplete}
        onCancel={() => setCurrentRoute('Dashboard')}
      />
    );
  }

  // =========================================================================
  // LAYER 4: AUTHENTICATED APP STACK (Dashboard / MainTabs)
  // Nếu isAuthenticated === true
  // =========================================================================
  if (isAuthenticated && user) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-1000">
        <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
          {/* Header & Character Preview */}
          <View className="items-center py-6 border-b border-neutral-800">
            <View className="mb-2">
              <JayCharacter outfitId={selectedOutfitId} width={120} height={140} />
            </View>

            <Text className="text-secondary-500 font-montserrat-bold text-3xl text-center">
              YOU-1 Dashboard
            </Text>
            <Text className="text-primary-400 font-montserrat-medium text-base text-center mt-2">
              Welcome back, {user.fullName || user.email}!
            </Text>
            {useMock ? (
              <View className="bg-secondary-900/60 border border-secondary-500 px-3 py-1 rounded-full mt-3">
                <Text className="text-secondary-500 font-montserrat-semibold text-xs">
                  ⚡ MOCK API ACTIVE
                </Text>
              </View>
            ) : null}
          </View>

          {/* Profile Details */}
          <View className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mt-6 gap-3 shadow-md">
            <Text className="text-primary-500 font-montserrat-bold text-lg">User Profile Info</Text>
            <View className="flex-row justify-between border-b border-neutral-800 pb-2">
              <Text className="text-primary-400 font-montserrat">User ID:</Text>
              <Text className="text-secondary-500 font-montserrat-semibold">{user.id}</Text>
            </View>
            <View className="flex-row justify-between border-b border-neutral-800 pb-2">
              <Text className="text-primary-400 font-montserrat">Email:</Text>
              <Text className="text-primary-500 font-montserrat-semibold">{user.email}</Text>
            </View>
            <View className="flex-row justify-between border-b border-neutral-800 pb-2">
              <Text className="text-primary-400 font-montserrat">Selected Outfit:</Text>
              <Text className="text-secondary-500 font-montserrat-semibold">
                {selectedOutfitId}
              </Text>
            </View>
          </View>

          {/* User Goal Plan Summary if available */}
          {userGoalPlan ? (
            <View className="bg-neutral-900 border border-secondary-500/50 rounded-2xl p-5 mt-4 gap-2 shadow-md">
              <Text className="text-secondary-500 font-montserrat-bold text-lg">
                🎯 Post-Auth Goal Plan
              </Text>
              <Text className="text-white font-montserrat-semibold">
                Target: {userGoalPlan.target}
              </Text>
              {userGoalPlan.additionalDetails ? (
                <Text className="text-neutral-300 font-montserrat-small">
                  Details: {userGoalPlan.additionalDetails}
                </Text>
              ) : null}
              <Text className="text-neutral-400 font-montserrat-small">
                Period: {userGoalPlan.startDate} ~ {userGoalPlan.endDate}
              </Text>
              <Text className="text-neutral-400 font-montserrat-small">
                Commitment: {userGoalPlan.dailyCommitment.hours}h{' '}
                {userGoalPlan.dailyCommitment.minutes}m / day
              </Text>
            </View>
          ) : null}

          {/* Dev Helper & SignOut Actions */}
          <View className="gap-3 mt-8">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCurrentRoute('PostOnboarding')}
              className="bg-secondary-500 rounded-full py-3.5 items-center justify-center shadow-sm"
            >
              <Text className="text-black font-montserrat-bold text-base">
                🎯 Replay Post-Auth Onboarding
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => signOut()}
              className="bg-error-500 rounded-full py-4 items-center justify-center shadow-sm"
            >
              <Text className="text-white font-montserrat-bold text-base">Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleDevResetStorage}
              className="bg-neutral-800 border border-secondary-500/40 rounded-full py-3.5 items-center justify-center"
            >
              <Text className="text-secondary-500 font-montserrat-semibold text-sm">
                🔄 DEV: Clear Storage & Replay Pre-Auth Onboarding
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================================
  // LAYER 2: PRE-AUTH ONBOARDING STACK
  // Nếu !hasCompletedOnboarding: BẮT BUỘC hiển thị Pre-Auth Onboarding Stack
  // =========================================================================
  if (!hasCompletedOnboarding) {
    if (currentRoute === 'WelcomeFeatures') {
      return (
        <WelcomeFeaturesScreen
          onNext={() => setCurrentRoute('WelcomeOutfit')}
          onSkip={() => handleCompleteOrSkipOnboarding()}
        />
      );
    }
    if (currentRoute === 'WelcomeOutfit') {
      return (
        <WelcomeOutfitScreen
          initialOutfitId={selectedOutfitId}
          onComplete={(outfitId) => handleCompleteOrSkipOnboarding(outfitId)}
          onSkip={() => handleCompleteOrSkipOnboarding()}
        />
      );
    }
    // Mặc định màn 1: WelcomeIntroScreen (Welcome 1)
    return (
      <WelcomeIntroScreen
        onNext={() => setCurrentRoute('WelcomeFeatures')}
        onSkip={() => handleCompleteOrSkipOnboarding()}
      />
    );
  }

  // =========================================================================
  // LAYER 3: AUTH STACK
  // Nếu hasCompletedOnboarding === true VÀ !isAuthenticated
  // initialRouteName = "SignIn" (SignInScreen) / SignUpScreen
  // =========================================================================
  const renderDevResetFloatingButton = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleDevResetStorage}
      className="bg-neutral-900/90 border border-secondary-500/50 py-2 px-3 rounded-full self-center my-2 shadow-sm"
    >
      <Text className="text-secondary-500 font-montserrat-medium text-xs">
        🔄 DEV: Reset Storage to Test Onboarding
      </Text>
    </TouchableOpacity>
  );

  if (currentRoute === 'SignUp') {
    return (
      <View className="flex-1">
        <SignUpScreen
          onNavigateToSignIn={() => setCurrentRoute('SignIn')}
          onSignUpSuccess={() => setCurrentRoute('PostOnboarding')}
        />
        <View className="absolute bottom-2 left-0 right-0 items-center pointer-events-auto">
          {renderDevResetFloatingButton()}
        </View>
      </View>
    );
  }

  // Mặc định initialRouteName="SignIn": SignInScreen
  return (
    <View className="flex-1">
      <SignInScreen
        onNavigateToSignUp={() => setCurrentRoute('SignUp')}
        onSignInSuccess={() => setCurrentRoute('PostOnboarding')}
      />
      <View className="absolute bottom-2 left-0 right-0 items-center pointer-events-auto">
        {renderDevResetFloatingButton()}
      </View>
    </View>
  );
};

export default RootNavigator;
