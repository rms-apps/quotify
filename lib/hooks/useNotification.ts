import { Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useSettingsStore } from '@/lib/store/useSettingsStore';

/**
 * Request notification permissions (iOS + Android 13+ safe)
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted';
  }

  return true;
}

/**
 * Schedule a daily notification at a given time
 */
export async function scheduleDailyQuoteNotification(hour = 9, minute = 0) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Avoid duplicate notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Android needs a channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-quote', {
      name: 'Daily Quote',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
    });
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✨ Your Daily Quote',
      body: 'Tap to read today’s inspiration!',
      sound: 'default',
    },
    trigger: {
      hour,
      minute,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });
}

/**
 * Cancel daily notifications (for settings toggle)
 */
async function cancelDailyQuoteNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export function useDailyNotificationEffect() {
  const isFirstRun = useRef(true);
  const { dailyNotification, hasHydrated } = useSettingsStore();

  useEffect(() => {
    // Wait until Zustand has rehydrated
    if (!hasHydrated) return;

    // Prevent running twice on first mount
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (dailyNotification) {
      console.log('Scheduling daily quote notification');
      scheduleDailyQuoteNotification(9, 0);
    } else {
      console.log('Cancelling daily quote notification');
      cancelDailyQuoteNotification();
    }
  }, [dailyNotification, hasHydrated]);
}
