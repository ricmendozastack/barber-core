import type { ExpoConfig } from 'expo/config';

type AppEnv = 'development' | 'qa' | 'staging' | 'production';

const APP_ENV = (process.env.APP_ENV as AppEnv) || 'development';

const ENV_CONFIG: Record<AppEnv, { name: string; bundleId: string; apiUrl: string }> = {
  development: {
    name: 'Barber-core (Dev)',
    bundleId: 'app.barbercore.dev',
    apiUrl: 'https://api-dev.barbercore.app',
  },
  qa: {
    name: 'Barber-core (QA)',
    bundleId: 'app.barbercore.qa',
    apiUrl: 'https://api-qa.barbercore.app',
  },
  staging: {
    name: 'Barber-core (Staging)',
    bundleId: 'app.barbercore.staging',
    apiUrl: 'https://api-staging.barbercore.app',
  },
  production: {
    name: 'Barber-core',
    bundleId: 'app.barbercore',
    apiUrl: 'https://api.barbercore.app',
  },
};

const current = ENV_CONFIG[APP_ENV];

const config: ExpoConfig = {
  name: current.name,
  slug: 'barber-core',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
    bundleIdentifier: current.bundleId,
  },
  android: {
    package: current.bundleId,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    APP_ENV,
    API_URL: process.env.API_URL || current.apiUrl,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
};

export default config;
