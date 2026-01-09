import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StreakState {
  currentStreak: number;
  lastOpenedDate: string | null;
  maxStreak: number;
  hasHydrated: boolean;

  updateStreak: () => void;
  setHasHydrated: (value: boolean) => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      maxStreak: 0,
      lastOpenedDate: null,
      hasHydrated: false,

      updateStreak: () => {
        const today = getToday();
        const { lastOpenedDate, currentStreak, maxStreak } = get();

        if (lastOpenedDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const newStreak =
          lastOpenedDate === yesterdayStr ? currentStreak + 1 : 1;

        set({
          currentStreak: newStreak,
          maxStreak: Math.max(maxStreak, newStreak),
          lastOpenedDate: today,
        });
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'streak-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
