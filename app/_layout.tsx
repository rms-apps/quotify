import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import MobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasHydrated = useSettingsStore((state) => state.hasHydrated);

  // const initializeAdForAdMob = () => {
  //   MobileAds()
  //     .setRequestConfiguration({
  //       maxAdContentRating: MaxAdContentRating.PG,
  //       tagForChildDirectedTreatment: false,
  //       tagForUnderAgeOfConsent: false,
  //     })
  //     .then(() => {
  //       MobileAds().initialize();
  //     })
  //     .then(() => {
  //       console.log('Google Mobile AdMob SDK initialized');
  //     })
  //     .catch((error) => {
  //       console.error('Failed to initialize Google Mobile AdMob SDK', error);
  //     });
  // };

  useEffect(() => {
    if (hasHydrated) {
      SplashScreen.hideAsync();
      // initializeAdForAdMob();
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
