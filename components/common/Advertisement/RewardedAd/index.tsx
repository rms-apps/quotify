import { ThemedButton } from '@/components/common/Themed/ThemedButton';
import { useAdManager } from '@/lib/hooks/useAdManager';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type RewardedAdProps = {
  adId: string;
};

export const RewardedAd = ({ adId }: RewardedAdProps) => {
  const { error, isLoading, isAdLoaded, showAd } = useAdManager({
    adId,
    adType: 'rewarded',
  });

  useEffect(() => {
    // If needed, you can trigger the ad to reload here
  }, []); // You can also add dependencies here if needed

  const handleShowAd = async () => {
    const result = await showAd();
  };

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading ad...</Text>}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      <ThemedButton title="Show Rewarded Ad" onPress={handleShowAd} />

      {!isLoading && !error && <Text>Ad is not loaded yet. Please wait.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
  },
});
