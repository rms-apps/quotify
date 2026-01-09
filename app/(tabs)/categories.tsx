import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/categories';
import { useAppColors } from '@/lib/hooks/useAppColors';

const CategoriesScreen = () => {
  const { BOTTOM_TAB_BAR_ICON_ACTIVE } = useAppColors();

  return (
    <>
      <Header
        title="Categories"
        icon={
          <Ionicons
            size={24}
            name="grid"
            color={BOTTOM_TAB_BAR_ICON_ACTIVE}
          />
        }
      />
      <Categories />
    </>
  );
};

export default CategoriesScreen;
