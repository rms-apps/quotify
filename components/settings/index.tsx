import { cn } from '@rms-apps/ui-utils';
import Constants from 'expo-constants';
import { Fragment, useState } from 'react';
import { Footer } from '@rms-apps/ui-footer';
import { ThemedView } from '@rms-apps/ui-themed-view';
import { ThemedText } from '@rms-apps/ui-themed-text';
import { View, Linking, FlatList } from 'react-native';
import { InfoModal } from '@/components/common/InfoModal';
import { ThemedButton } from '@rms-apps/ui-themed-button';
import { ThemedSwitch } from '@rms-apps/ui-themed-switch';
import { ThemedDivider } from '@rms-apps/ui-themed-divider';
import { useIsDarkTheme } from '@/lib/hooks/useIsDarkTheme';
import { useSettingsStore } from '@/context/settings/store';
import { BOTTOM_TAB_BAR_HEIGHT } from '@/lib/constants/common';
import {
  HELP_AND_SUPPORT_SECTIONS,
  TERMS_AND_CONDITIONS_SECTIONS,
} from './constants';

export const Settings = () => {
  const isDarkThemeEnabled = useIsDarkTheme();

  const { isSoundEnabled, toggleSound, toggleTheme } = useSettingsStore();

  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const toggleHelpModal = () => {
    setIsHelpModalVisible((prev) => !prev);
  };

  const toggleTermsModal = () => {
    setIsTermsModalVisible((prev) => !prev);
  };

  const openAboutUs = () => {
    Linking.openURL('https://rishi-mishra.vercel.app/').catch((err) =>
      console.error('Failed to open About Us URL:', err),
    );
  };

  const settingsRows = [
    {
      id: 'version',
      leftContent: <ThemedText size="b2">App Version</ThemedText>,
      rightContent: (
        <ThemedText size="b3" variant="secondary">
          {Constants.expoConfig?.version}
        </ThemedText>
      ),
    },
    {
      id: 'themeMode',
      leftContent: <ThemedText size="b2">Dark Mode</ThemedText>,
      rightContent: (
        <ThemedSwitch value={isDarkThemeEnabled} onValueChange={toggleTheme} />
      ),
    },
    {
      id: 'enableSound',
      leftContent: <ThemedText size="b2">Enable Sound</ThemedText>,
      rightContent: (
        <ThemedSwitch value={isSoundEnabled} onValueChange={toggleSound} />
      ),
    },
    {
      id: 'helpAndSupport',
      leftContent: <ThemedText size="b2">Help & Support</ThemedText>,
      rightContent: (
        <ThemedButton
          title="Contact Us"
          size="small"
          themedTextProps={{ size: 'b3' }}
          variant={isDarkThemeEnabled ? 'secondary' : 'primary'}
          onPress={toggleHelpModal}
        />
      ),
    },
    {
      id: 'termsAndConditions',
      leftContent: <ThemedText size="b2">Terms and Conditions</ThemedText>,
      rightContent: (
        <ThemedButton
          title="View Details"
          size="small"
          themedTextProps={{ size: 'b3' }}
          variant={isDarkThemeEnabled ? 'secondary' : 'primary'}
          onPress={toggleTermsModal}
        />
      ),
    },
    // {
    //   id: 'createdBy',
    //   leftContent: <ThemedText size="b2">Created By</ThemedText>,
    //   rightContent: (
    //     <ThemedButton
    //       title="Rishi Mishra"
    //       size="small"
    //       themedTextProps={{ size: 'b3' }}
    //       variant={isDarkThemeEnabled ? 'secondary' : 'primary'}
    //       onPress={openAboutUs}
    //     />
    //   ),
    // },
    {
      id: 'aboutUs',
      leftContent: <ThemedText size="b2">About Us</ThemedText>,
      rightContent: (
        <ThemedButton
          title="Learn More"
          size="small"
          themedTextProps={{ size: 'b3' }}
          variant={isDarkThemeEnabled ? 'secondary' : 'primary'}
          onPress={openAboutUs}
        />
      ),
    },
  ];

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        bounces={false}
        data={settingsRows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: BOTTOM_TAB_BAR_HEIGHT + 12, // add extra padding so content doesn't hide behind footer
        }}
        renderItem={({ item, index }) => {
          const className =
            item?.leftContent && item?.rightContent
              ? 'justify-between'
              : item?.rightContent
                ? 'justify-end'
                : '';
          return (
            <Fragment key={item.id}>
              <View className="flex flex-col mx-3">
                <View
                  className={cn(
                    'flex-row py-[18px] px-[12px] items-center',
                    settingsRows.length - 1 === index && 'p-4 pb-0',
                    className,
                  )}
                >
                  {item?.leftContent && item.leftContent}
                  {item?.rightContent && item.rightContent}
                </View>

                {index < settingsRows.length - 1 && (
                  <ThemedDivider size="97%" />
                )}
              </View>
            </Fragment>
          );
        }}
        // ListFooterComponent={<Footer inline />}
      />

      <Footer inline={false} bottomTabBarHeight={BOTTOM_TAB_BAR_HEIGHT} />

      <InfoModal
        title="Help And Support"
        sections={HELP_AND_SUPPORT_SECTIONS}
        visible={isHelpModalVisible}
        onClose={toggleHelpModal}
      />

      <InfoModal
        title="Terms And Conditions"
        sections={TERMS_AND_CONDITIONS_SECTIONS}
        visible={isTermsModalVisible}
        onClose={toggleTermsModal}
      />
    </ThemedView>
  );
};
