require('dotenv').config();

const version = require('./version.json');

const get = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env/config key: ${key}`);
  return value;
};

const constants = {
  appName: get('APP_NAME'),
  slug: get('APP_SLUG'),
  scheme: get('ANDROID_PACKAGE'),
  iosBundleId: get('IOS_BUNDLE_ID'),
  androidPackage: get('ANDROID_PACKAGE'),
  description: get('DESCRIPTION'),
  androidAppId: get('ANDROID_APP_ID'),
  iosAppId: get('IOS_APP_ID'),
  easProjectId: get('EAS_PROJECT_ID'),
};

export default {
  expo: {
    name: constants.appName,
    slug: constants.slug,
    version: version.version,
    description: constants.description,
    scheme: constants.scheme,
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    notification: {
      icon: './assets/images/notification-icon.png',
      color: '#1DA193',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: constants.iosBundleId,
      buildNumber: version.iosBuildNumber.toString(),
    },
    android: {
      versionCode: version.androidVersionCode,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: constants.androidPackage,
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-router',
      [
        'react-native-google-mobile-ads',
        {
          androidAppId: constants.androidAppId,
          iosAppId: constants.iosAppId,
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-build-properties',
      'expo-web-browser',
    ],
    experiments: {
      typedRoutes: true,
    },
    packagerOpts: {
      config: 'metro.config.js',
      sourceExts: [
        'expo.ts',
        'expo.tsx',
        'expo.js',
        'expo.jsx',
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'wasm',
        'svg',
      ],
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: constants.easProjectId,
      },
    },
    owner: 'rm-corps',
  },
};
