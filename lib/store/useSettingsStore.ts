import { create } from 'zustand';
import { SETTINGS } from '@/lib/constants/common';
import { THEME, Theme } from '@rms-apps/ui-utils';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  theme: Theme;
  hasHydrated: boolean;
  isSoundEnabled: boolean;

  toggleTheme: () => void;
  toggleSound: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => {
      return {
        hasHydrated: false,
        theme: SETTINGS.DEFAULT_THEME,
        isSoundEnabled: SETTINGS.DEFAULT_SOUND_ENABLED,
        isOnboardingCompleted: SETTINGS.DEFAULT_ONBOARDING_STATE,

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
          })),

        toggleSound: () =>
          set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),

        setHasHydrated: (value) => set({ hasHydrated: value }),
      };
    },
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
