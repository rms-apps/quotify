import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { fetchAllQuotes, Quote, QuoteCategory } from '@/lib/api/quotes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BOTTOM_TAB_BAR_HEIGHT, BUFFER_PADDING } from '@/lib/constants/common';
import { useAppColors } from '@/lib/hooks/useAppColors';
import { FeedQuote } from './FeedQuote';

export type QuotesFeedProps = {
  category: QuoteCategory;
  description?: string;
};

export const QuotesFeed = ({ category, description }: QuotesFeedProps) => {
  const insets = useSafeAreaInsets();
  const { THEMED_BACKGROUND, THEMED_CONTENT, BOTTOM_TAB_BAR_BACKGROUND } =
    useAppColors();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allQuotes = fetchAllQuotes(category);
    setQuotes(allQuotes);
    setLoading(false);
  }, [category]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1DA193" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[THEMED_BACKGROUND, THEMED_CONTENT, BOTTOM_TAB_BAR_BACKGROUND]}
      className="flex-1 pt-6 px-5"
      style={{
        paddingBottom: insets.bottom + BOTTOM_TAB_BAR_HEIGHT + BUFFER_PADDING,
      }}
    >
      <View className="mb-6">
        <Text className="text-white text-xl font-bold">{category} Quotes</Text>
        {description && (
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
            {description}
          </Text>
        )}
      </View>

      {/* Quote Feed */}
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FeedQuote quote={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </LinearGradient>
  );
};
