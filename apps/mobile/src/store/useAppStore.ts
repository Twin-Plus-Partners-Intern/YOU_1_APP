import { create } from 'zustand';
import { MbtiType } from '@you-il/types';

interface AppState {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  selectedMbti: MbtiType | null;
  setSelectedMbti: (mbti: MbtiType) => void;
  mascotTone: 'gentle' | 'roast';
  setMascotTone: (tone: 'gentle' | 'roast') => void;
}

export const useAppStore = create<AppState>((set) => ({
  themeMode: 'light',
  toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
  selectedMbti: 'INFP', // Default procrastinator MBTI
  setSelectedMbti: (mbti) => set({ selectedMbti: mbti }),
  mascotTone: 'roast', // Default tone for lazy/procrastinator system
  setMascotTone: (tone) => set({ mascotTone: tone }),
}));
