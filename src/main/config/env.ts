import { config } from 'dotenv';

config();

export const env = {
  baseConfig: {
    environment: process.env.ENVIRONMENT ?? 'local',
    logLevel: process.env.LOG_LEVEL ?? 'prod',
    port: process.env.PORT ?? 8005,
  },
  database: {
    host: process.env.PG_HOST,
    port: Number.parseInt(process.env.PG_PORT ?? '') || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
  firebase: {
    credential: {
      projectId: process.env.FIREBASE_PROJECT_ID ?? '',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
      privateKey: (process.env.FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    },
  },
} as const;
