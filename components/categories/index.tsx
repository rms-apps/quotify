import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { QuoteCategory } from '@/lib/api/quotes';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppColors } from '@/lib/hooks/useAppColors';
import { BOTTOM_TAB_BAR_HEIGHT } from '@/lib/constants/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GitaIcon from '@/assets/images/png/categories/gita.png';
import LifeIcon from '@/assets/images/png/categories/life.png';
import WisdomIcon from '@/assets/images/png/categories/wisdom.png';
import SuccessIcon from '@/assets/images/png/categories/success.png';
import MotivationalIcon from '@/assets/images/png/categories/motivational.png';
import { CategoryCard, CategoryCardItem } from './CategoryCard';

const categories: CategoryCardItem[] = [
  {
    name: 'Gita',
    colors: ['#2E3192', '#1BFFFF'],
    icon: GitaIcon,
    description: 'Wisdom from the Bhagavad Gita',
  },
  {
    name: 'Motivational',
    colors: ['#FF512F', '#F09819'],
    icon: MotivationalIcon,
    description: 'Quotes to inspire and energize you',
  },
  {
    name: 'Wisdom',
    colors: ['#4776E6', '#8E54E9'],
    icon: WisdomIcon,
    description: 'Timeless insights for thoughtful living',
  },
  {
    name: 'Success',
    colors: ['#11998E', '#38EF7D'],
    icon: SuccessIcon,
    description: 'Guidance for achieving your goals',
  },
  {
    name: 'Life',
    colors: ['#fc4a1a', '#f7b733'],
    icon: LifeIcon,
    description: 'Reflections and lessons from everyday life',
  },
];

export const Categories = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { THEMED_BACKGROUND, THEMED_CONTENT, BOTTOM_TAB_BAR_BACKGROUND } =
    useAppColors();

  const handleShow = (category: QuoteCategory) => {
    setTimeout(() => {
      router.push(`/feed?category=${category}`);
    }, 500);
  };

  return (
    <LinearGradient
      colors={[THEMED_BACKGROUND, THEMED_CONTENT, BOTTOM_TAB_BAR_BACKGROUND]}
      className="flex-1 px-5"
      style={{
        paddingBottom: insets.bottom + BOTTOM_TAB_BAR_HEIGHT,
      }}
    >
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(i) => i.name}
        contentContainerClassName="flex flex-col gap-4 pt-6"
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={() => handleShow(item.name)} />
        )}
      />
    </LinearGradient>
  );
};
