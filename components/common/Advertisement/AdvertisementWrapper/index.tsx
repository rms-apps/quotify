import { Text, View } from 'react-native';
import { BUFFER_PADDING } from '@/lib/constants/common';
import { BannerAdvertisement } from '@/components/common/Advertisement/BannerAd';

export const AdvertisementWrapper = () => {
  return (
    <View
      className="h-14 rounded-xl bg-gray-100 items-center justify-center"
      style={{ marginTop: BUFFER_PADDING }}
    >
      <BannerAdvertisement adId="ca-app-pub-7132718007829523/9229398342" />
    </View>
  );
};
