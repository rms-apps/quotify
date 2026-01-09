import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/lib/constants/colors';
import { ThemeProvider } from '@rms-apps/ui-utils';
import { useAppColors } from '@/lib/hooks/useAppColors';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { BOTTOM_TAB_BAR_HEIGHT } from '@/lib/constants/common';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BannerAdvertisement } from '@/components/common/Advertisement/BannerAd';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { theme } = useSettingsStore();

  return (
    <ThemeProvider theme={theme} palette={Colors}>
      <InnerTabLayout insets={insets} />
    </ThemeProvider>
  );
}

function InnerTabLayout({ insets }: { insets: EdgeInsets }) {
  const {
    BACKGROUND_PRIMARY,
    BOTTOM_TAB_BAR_BACKGROUND,
    BOTTOM_TAB_BAR_ICON_ACTIVE,
    BOTTOM_TAB_BAR_ICON_INACTIVE,
  } = useAppColors();

  return (
    <>
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 2,
            marginBottom: 2,
          },
          tabBarItemStyle: {
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarStyle: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: BOTTOM_TAB_BAR_BACKGROUND,
            borderTopWidth: 0,
            zIndex: 99999,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            height: BOTTOM_TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          },
          tabBarActiveTintColor: BOTTOM_TAB_BAR_ICON_ACTIVE,
          tabBarInactiveTintColor: BOTTOM_TAB_BAR_ICON_INACTIVE,
          // NOTE: Helps in removing white flicker that happens
          // when Stack is used in combination with Tabs of expo
          sceneStyle: { backgroundColor: BACKGROUND_PRIMARY },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={20} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={20} name="heart" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={20} name="grid" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="feed"
          options={{
            title: 'Quotes Feed',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={20} name="chatbubble-ellipses" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={20} name="settings" color={color} />
            ),
          }}
        />
      </Tabs>

      {/* <BannerAdvertisement adId="" /> */}
    </>
  );
}
