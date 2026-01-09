import * as Notifications from 'expo-notifications';

export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyQuoteNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync(); // avoid duplicates

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✨ Your Daily Quote',
      body: 'Tap to read today’s inspiration!',
      sound: true,
    },
    trigger: {
      hour: 9, // 9 AM
      minute: 0,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });
}
