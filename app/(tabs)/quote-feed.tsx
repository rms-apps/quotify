import { Quotes } from '@/components/quotes';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common/Header';
import { useAppColors } from '@/lib/hooks/useAppColors';

const QuoteFeedScreen = () => {
  const { BOTTOM_TAB_BAR_ICON_ACTIVE } = useAppColors();

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
      <Quotes />
    </>
  );
};

export default QuoteFeedScreen;
