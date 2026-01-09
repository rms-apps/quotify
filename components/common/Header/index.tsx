import { THEME } from '@/lib/constants/common';
import { ThemedText } from '@rms-apps/ui-themed-text';
import { useAppColors } from '@/lib/hooks/useAppColors';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SingleSidedShadowBox } from '@/components/common/SingleShadowBox';

export type HeaderProps = {
  icon: React.ReactNode;
  isRounded?: boolean;
  title: string;
  height?: number;
  disableSafeAreaTopInset?: boolean;
  handleClick?: () => void;
};

const Child = ({ title, icon, handleClick }: HeaderProps) => {
  return (
    <View style={[styles.header_container]}>
      <View className="flex flex-1 flex-row items-center gap-4">
        {icon}
        <ThemedText size="b1" weight="semibold">
          {title}
        </ThemedText>
      </View>

      {!!handleClick && (
        <View className="flex flex-1 flex-row items-center flex-end">
          <Pressable onPress={handleClick}></Pressable>
        </View>
      )}
    </View>
  );
};

export const Header = ({
  height,
  isRounded = false,
  disableSafeAreaTopInset = false,
  ...props
}: HeaderProps) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { BOTTOM_TAB_BAR_BACKROUND } = useAppColors();

  return (
    <View
      style={{
        paddingTop: disableSafeAreaTopInset ? 0 : insets.top,
        backgroundColor: BOTTOM_TAB_BAR_BACKROUND,
      }}
      className={isRounded ? 'rounded-b-2xl' : ''}
    >
      {theme === THEME.LIGHT ? (
        <SingleSidedShadowBox>{Child(props)}</SingleSidedShadowBox>
      ) : (
        Child(props)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    gap: 2,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 10,
    shadowRadius: 8,
    shadowOpacity: 0.16,
    shadowColor: 'rgba(48, 49, 53, 1)',
    shadowOffset: { width: 8, height: 2 },
  },
});
