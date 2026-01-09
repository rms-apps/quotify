import { Ionicons } from '@expo/vector-icons';
import { Favorites } from '@/components/favorites';
import { Header } from '@/components/common/Header';
import { useAppColors } from '@/lib/hooks/useAppColors';

const FavoritesScreen = () => {
  const { BOTTOM_TAB_BAR_ICON_ACTIVE } = useAppColors();

  return (
    <>
      <Header
        title="Favorites"
        icon={
          <Ionicons size={24} name="heart" color={BOTTOM_TAB_BAR_ICON_ACTIVE} />
        }
      />
      <Favorites />
    </>
  );
};

export default FavoritesScreen;
