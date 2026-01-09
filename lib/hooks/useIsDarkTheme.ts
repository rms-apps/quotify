import { THEME } from '@/lib/constants/common';
import { useSettingsStore } from '@/lib/store/useSettingsStore';

export const useIsDarkTheme = () => {
  const { theme } = useSettingsStore();
  return theme === THEME.DARK;
};
