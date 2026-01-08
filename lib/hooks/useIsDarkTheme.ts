import { THEME } from '@/lib/constants/common';
import { useSettingsStore } from '@/context/settings/store';

export const useIsDarkTheme = () => {
  const { theme } = useSettingsStore();
  return theme === THEME.DARK;
};
