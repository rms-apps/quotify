import { Text, View } from 'react-native';
import { BUFFER_PADDING } from '@/lib/constants/common';
import { TestIds } from 'react-native-google-mobile-ads';
import { BannerAdvertisement } from '@/components/common/Advertisement/BannerAd';

export const AdvertisementWrapper = () => {
  return (
    <View
      className="h-14 rounded-xl bg-gray-100 items-center justify-center"
      style={{ marginTop: BUFFER_PADDING }}
    >
      <BannerAdvertisement adId={TestIds.ADAPTIVE_BANNER} />
    </View>
  );
};
