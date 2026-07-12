import Constants from 'expo-constants';
import { z } from 'zod';

const envSchema = z.object({
  APP_ENV: z.enum(['development', 'qa', 'staging', 'production']),
  API_URL: z.string().url(),
  SENTRY_DSN: z.string().optional(),
});

export const ENV = envSchema.parse(Constants.expoConfig?.extra);
