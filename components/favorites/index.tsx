import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, FlatList, Pressable, Share } from 'react-native';

import { useAppColors } from '@/lib/hooks/useAppColors';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';
import { BOTTOM_TAB_BAR_HEIGHT, BUFFER_PADDING } from '@/lib/constants/common';
import { AdvertisementWrapper } from '@/components/common/Advertisement/AdvertisementWrapper';

export const Favorites = () => {
  const insets = useSafeAreaInsets();
  const { favorites, removeFavorite } = useFavoritesStore();
  const { THEMED_BACKGROUND, THEMED_CONTENT, BOTTOM_TAB_BAR_BACKGROUND } =
    useAppColors();

  const handleShare = async (text: string, author?: string) => {
    await Share.share({
      message: `"${text}"${author ? ` — ${author}` : ''}`,
    });
  };

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <LinearGradient
      colors={[THEMED_BACKGROUND, THEMED_CONTENT, BOTTOM_TAB_BAR_BACKGROUND]}
      className="flex-1 px-5 pt-6"
      style={{
        paddingBottom: insets.bottom + BOTTOM_TAB_BAR_HEIGHT + BUFFER_PADDING,
      }}
    >
      {/* Empty State */}
      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="heart-outline" size={64} color="#ffffff70" />
          <Text className="text-white text-base mt-4">No favorites yet</Text>
          <Text className="text-white/70 text-sm mt-1 text-center px-10">
            Like quotes you love and they’ll appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.text}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
              <Text
                className="text-xs font-semibold mb-2"
                style={{ color: THEMED_CONTENT }}
              >
                {item.category}
              </Text>

              <Text className="text-[18px] leading-7 text-gray-900 mb-3">
                “{item.text}”
              </Text>

              {item.author && (
                <Text className="text-xs text-gray-500 text-right mb-4">
                  — {item.author}
                </Text>
              )}

              {/* Actions */}
              <View className="flex-row justify-between px-1">
                <Pressable onPress={() => removeFavorite(item.text)}>
                  <Ionicons name="heart" size={22} color="#FF4D4D" />
                </Pressable>

                <Pressable onPress={() => handleShare(item.text, item.author)}>
                  <Ionicons
                    name="share-social-outline"
                    size={22}
                    color="#333"
                  />
                </Pressable>

                <Pressable onPress={() => handleCopy(item.text)}>
                  <Ionicons name="copy-outline" size={22} color="#333" />
                </Pressable>
              </View>
            </View>
          )}
        />
      )}

      <AdvertisementWrapper />
    </LinearGradient>
  );
};
