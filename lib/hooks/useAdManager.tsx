import { useCallback, useRef, useState, useEffect } from 'react';
import {
  RewardedAd,
  RewardedInterstitialAd,
  AdEventType,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

export type AdType = 'rewardedInterstitial' | 'rewarded';

export type AdProps = {
  adType: AdType;
  adId: string;
};

const getAdUnitId = ({ adType, adId }: AdProps) => {
  switch (adType) {
    case 'rewarded':
      return __DEV__ ? TestIds.REWARDED : adId;
    case 'rewardedInterstitial':
      return __DEV__ ? TestIds.REWARDED_INTERSTITIAL : adId;
    default:
      throw new Error(`Ad type: ${adType} not supported`);
  }
};

const createAd = ({ adType, adId }: AdProps) => {
  const adUnitId = getAdUnitId({ adType, adId });

  switch (adType) {
    case 'rewarded':
      return RewardedAd.createForAdRequest(adUnitId);
    case 'rewardedInterstitial':
      return RewardedInterstitialAd.createForAdRequest(adUnitId);
    default:
      throw new Error(`Ad type: ${adType} not supported`);
  }
};

export const useAdManager = ({ adType, adId }: AdProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rewardedAdRef = useRef<RewardedInterstitialAd | RewardedAd | null>(
    null,
  );
  const rewardPromiseRef = useRef<{
    resolve: (value: boolean) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const reloadAd = useCallback(() => {
    if (!rewardedAdRef.current) return;

    setIsLoading(true);
    setIsAdLoaded(false);
    setError(null);

    if (rewardedAdRef.current.loaded) return;
    rewardedAdRef.current.load();
  }, [adType]);

  useEffect(() => {
    if (rewardedAdRef.current) return;

    rewardedAdRef.current = createAd({ adType, adId });

    if (rewardedAdRef.current) {
      rewardedAdRef.current.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          setIsLoading(false);
          setIsAdLoaded(true);
        },
      );

      rewardedAdRef.current.addAdEventListener(AdEventType.CLOSED, () => {
        setIsAdLoaded(false);
        if (rewardPromiseRef.current) {
          rewardPromiseRef.current.resolve(false);
          rewardPromiseRef.current = null;
        }
        reloadAd();
      });

      rewardedAdRef.current.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          if (rewardPromiseRef.current) {
            rewardPromiseRef.current.resolve(true);
            rewardPromiseRef.current = null;
          }
        },
      );

      rewardedAdRef.current.addAdEventListener(AdEventType.ERROR, (error) => {
        console.error('Ad error:', error);
        setIsLoading(false);
        setIsAdLoaded(false);
        setError('Failed to load ad');
      });
    }

    rewardedAdRef.current.load();

    return () => {
      if (rewardedAdRef.current) {
        rewardedAdRef.current.removeAllListeners();
        rewardedAdRef.current = null;
      }
    };
  }, [adType]);

  const showAd = useCallback(async (): Promise<{
    success: boolean;
    message?: string;
  }> => {
    return new Promise((resolve, reject) => {
      if (error) {
        resolve({
          success: false,
          message: 'Ad failed to load. Please try again later.',
        });
        return;
      }

      if (!isAdLoaded) {
        resolve({
          success: false,
          message: 'Ad is not ready yet. Please wait a moment.',
        });
        return;
      }

      try {
        if (!rewardedAdRef.current) {
          resolve({
            success: false,
            message: 'Ad system is not initialized. Please try again later.',
          });
          return;
        }

        rewardPromiseRef.current = {
          resolve: (success) => {
            resolve({
              success,
              message: success ? undefined : 'Ad was closed before completion',
            });
          },
          reject: () =>
            resolve({
              success: false,
              message: 'Failed to show ad',
            }),
        };
        rewardedAdRef.current.show();
      } catch (error) {
        console.warn('Failed to show ad:', error);
        resolve({ success: false, message: 'Failed to show ad. Reloading Ad' });
        reloadAd();
      }
    });
  }, [adType, isAdLoaded, error, reloadAd]);

  return {
    error,
    isLoading,
    isAdLoaded: !isAdLoaded && !error,
    showAd,
  };
};
