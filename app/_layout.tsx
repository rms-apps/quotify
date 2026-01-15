import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { requestNotificationPermissions } from '@/lib/hooks/useNotification';
import MobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import '../global.css';

SplashScreen.preventAutoHideAsync();

/**
 * REQUIRED: How notifications behave when received
 * Call once (importing this file is enough)
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: false,
  }),
});

export default function RootLayout() {
  const hasHydrated = useSettingsStore((state) => state.hasHydrated);

  const initializeAdForAdMob = () => {
    MobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      })
      .then(() => {
        MobileAds().initialize();
      })
      .then(() => {
        console.log('Google Mobile AdMob SDK initialized');
      })
      .catch((error) => {
        console.error('Failed to initialize Google Mobile AdMob SDK', error);
      });
  };

  useEffect(() => {
    if (hasHydrated) {
      SplashScreen.hideAsync();
      requestNotificationPermissions();
      initializeAdForAdMob();
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}
