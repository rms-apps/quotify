import { Ionicons } from '@expo/vector-icons';
import { QuoteCategory } from '@/lib/api/quotes';
import { useLocalSearchParams } from 'expo-router';
import { Header } from '@/components/common/Header';
import { QuotesFeed } from '@/components/quotesFeed';
import { useAppColors } from '@/lib/hooks/useAppColors';

const FeedScreen = () => {
  const { BOTTOM_TAB_BAR_ICON_ACTIVE } = useAppColors();
  const { category = 'Motivational' } = useLocalSearchParams();

  return (
    <>
      <Header
        title="Quote Feed"
        icon={
          <Ionicons
            size={24}
            name="chatbubble-ellipses"
            color={BOTTOM_TAB_BAR_ICON_ACTIVE}
          />
        }
      />

      <QuotesFeed category={category as QuoteCategory} />
    </>
  );
};

export default FeedScreen;
