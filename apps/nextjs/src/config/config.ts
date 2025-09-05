import { isDev } from '@/shared/environment';

export const config = {
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as string,
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  API_SUBSCRIPTION_URL: process.env.NEXT_PUBLIC_API_SUBSCRIPTION_URL as string,
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  FIREBASE_DATABASE_URL: process.env
    .NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  FIREBASE_STORAGE_BUCKET: process.env
    .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  FIREBASE_MESSAGING_SENDER_ID: process.env
    .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  FIREBASE_APPID: process.env.NEXT_PUBLIC_FIREBASE_APPID as string,
  FIREBASE_MEASUREMENT_ID: process.env
    .NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
} as const;

if (isDev() && process.env.NODE_ENV !== 'test') {
  console.groupCollapsed('config');
  console.log(config);
  console.groupEnd();
}
