import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingState } from '@you-il/types';

const ONBOARDING_STORAGE_KEY = '@onboarding_preferences';
const HAS_COMPLETED_ONBOARDING_KEY = '@has_completed_onboarding';

// Safe storage helper with memory fallback
const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const val = await AsyncStorage.getItem(key);
      if (val !== null) return val;
    } catch {
      // Ignore native module null error
    }
    try {
      const g = globalThis as unknown as {
        localStorage?: { getItem: (k: string) => string | null };
      };
      if (g.localStorage) {
        return g.localStorage.getItem(key);
      }
    } catch {
      // Ignore
    }
    if (typeof globalThis !== 'undefined') {
      const memMap = (globalThis as Record<string, unknown>).__SAFE_MEM_STORAGE__ as
        Record<string, string> | undefined;
      return memMap?.[key] || null;
    }
    return null;
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof globalThis !== 'undefined') {
      const target = globalThis as Record<string, unknown>;
      if (!target.__SAFE_MEM_STORAGE__) {
        target.__SAFE_MEM_STORAGE__ = {};
      }
      (target.__SAFE_MEM_STORAGE__ as Record<string, string>)[key] = value;
    }
    try {
      const g = globalThis as unknown as {
        localStorage?: { setItem: (k: string, v: string) => void };
      };
      if (g.localStorage) {
        g.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Ignore
    }
  },

  removeItem: async (key: string): Promise<void> => {
    if (typeof globalThis !== 'undefined') {
      const target = globalThis as Record<string, unknown>;
      if (target.__SAFE_MEM_STORAGE__) {
        delete (target.__SAFE_MEM_STORAGE__ as Record<string, string>)[key];
      }
    }
    try {
      const g = globalThis as unknown as { localStorage?: { removeItem: (k: string) => void } };
      if (g.localStorage) {
        g.localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },

  clearAll: async (): Promise<void> => {
    if (typeof globalThis !== 'undefined') {
      (globalThis as Record<string, unknown>).__SAFE_MEM_STORAGE__ = {};
    }
    try {
      const g = globalThis as unknown as { localStorage?: { clear: () => void } };
      if (g.localStorage) {
        g.localStorage.clear();
      }
    } catch {
      // Ignore
    }
    try {
      await AsyncStorage.clear();
    } catch {
      // Ignore
    }
  },
};

export interface OnboardingStoreState {
  hasCompletedOnboarding: boolean;
  selectedOutfitId: string;
  isInitializing: boolean;

  // Actions
  completeOnboarding: (outfitId?: string) => Promise<void>;
  setSelectedOutfit: (outfitId: string) => void;
  loadOnboardingState: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  clearAllStorageDev: () => Promise<void>;
}

export const DEFAULT_OUTFIT_ID = 'outfit_black';

export const useOnboardingStore = create<OnboardingStoreState>((set, get) => ({
  hasCompletedOnboarding: false,
  selectedOutfitId: DEFAULT_OUTFIT_ID,
  isInitializing: true,

  setSelectedOutfit: (outfitId: string) => {
    set({ selectedOutfitId: outfitId });
  },

  completeOnboarding: async (outfitId?: string) => {
    const activeOutfitId = outfitId || get().selectedOutfitId || DEFAULT_OUTFIT_ID;
    const data: OnboardingState = {
      hasCompletedOnboarding: true,
      selectedOutfitId: activeOutfitId,
      createdAt: new Date().toISOString(),
    };

    set({
      hasCompletedOnboarding: true,
      selectedOutfitId: activeOutfitId,
    });

    try {
      await safeStorage.setItem(HAS_COMPLETED_ONBOARDING_KEY, 'true');
      await safeStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage write error
    }
  },

  loadOnboardingState: async () => {
    set({ isInitializing: true });
    try {
      const completedFlag = await safeStorage.getItem(HAS_COMPLETED_ONBOARDING_KEY);
      const raw = await safeStorage.getItem(ONBOARDING_STORAGE_KEY);
      let selectedOutfit = DEFAULT_OUTFIT_ID;

      if (raw) {
        try {
          const parsed = JSON.parse(raw) as OnboardingState;
          if (parsed.selectedOutfitId) {
            selectedOutfit = parsed.selectedOutfitId;
          }
        } catch {
          // Ignore
        }
      }

      const isCompleted = completedFlag === 'true';

      set({
        hasCompletedOnboarding: isCompleted,
        selectedOutfitId: selectedOutfit,
        isInitializing: false,
      });
      return;
    } catch {
      // Ignore parse error
    }
    set({
      hasCompletedOnboarding: false,
      selectedOutfitId: DEFAULT_OUTFIT_ID,
      isInitializing: false,
    });
  },

  resetOnboarding: async () => {
    set({
      hasCompletedOnboarding: false,
      selectedOutfitId: DEFAULT_OUTFIT_ID,
    });
    try {
      await safeStorage.setItem(HAS_COMPLETED_ONBOARDING_KEY, 'false');
      await safeStorage.removeItem(ONBOARDING_STORAGE_KEY);
    } catch {
      // Ignore
    }
  },

  clearAllStorageDev: async () => {
    set({
      hasCompletedOnboarding: false,
      selectedOutfitId: DEFAULT_OUTFIT_ID,
    });
    try {
      await safeStorage.clearAll();
    } catch {
      // Ignore
    }
  },
}));
