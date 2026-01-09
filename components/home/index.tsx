import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppColors } from '@/lib/hooks/useAppColors';
import { useStreakStore } from '@/lib/store/useStreakStore';
import { useQuotesStore } from '@/lib/store/useQuotesStore';

import { pluralize } from '@/lib/utils/common';
import { BOTTOM_TAB_BAR_HEIGHT, BUFFER_PADDING } from '@/lib/constants/common';
import { AdvertisementWrapper } from '@/components/common/Advertisement/AdvertisementWrapper';

import { QuoteCard } from './QuoteCard';

export const Home = () => {
  const insets = useSafeAreaInsets();
  const { THEMED_BACKGROUND, THEMED_CONTENT } = useAppColors();

  const { currentStreak, updateStreak } = useStreakStore();
  const { current, previous, loadQuote } = useQuotesStore();

  useEffect(() => {
    loadQuote();
    updateStreak();
  }, []);

  return (
    <LinearGradient
      colors={[THEMED_BACKGROUND, THEMED_CONTENT]}
      className="flex-1 px-5 pt-6"
      style={{
        paddingBottom: insets.bottom + BOTTOM_TAB_BAR_HEIGHT + BUFFER_PADDING,
      }}
    >
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold text-gray-200">Daily Streak</Text>

        <View className="bg-white/80 px-3 py-1 rounded-full">
          <Text className="text-xs text-gray-700">
            🔥 {pluralize(currentStreak, 'day')}
          </Text>
        </View>
      </View>

      <View className="flex-1 justify-center">
        <QuoteCard quote={current} />

        <View className="bg-white/80 rounded-xl p-4 mt-8">
          <Text className="text-sm font-medium text-gray-800 mb-1">
            Previous Quote
          </Text>

          {previous ? (
            <Text className="text-xs text-gray-600">“{previous.text}”</Text>
          ) : (
            <Text className="text-xs text-gray-500 italic">
              Every quote leaves a trace. Read one to begin.
            </Text>
          )}
        </View>
      </View>

      <AdvertisementWrapper />
    </LinearGradient>
  );
};
