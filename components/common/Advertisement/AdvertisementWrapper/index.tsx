import { Text, View } from 'react-native';
import { BUFFER_PADDING } from '@/lib/constants/common';

export const AdvertisementWrapper = () => {
  return (
    <View
      className="h-14 rounded-xl bg-gray-100 items-center justify-center"
      style={{ marginTop: BUFFER_PADDING }}
    >
      <Text className="text-xs text-gray-400">Ad Banner</Text>
    </View>
  );
};
