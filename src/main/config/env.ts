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
    port: parseInt(process.env.PG_PORT ?? '') || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
  validations: {
    nameMatchSimilarity: parseInt(process.env.NAME_MATCH_SIMILARITY ?? '') || 80,
  },
  transparencyPortal: {
    apiKey: process.env.TRANSPARENCY_PORTAL_API_KEY,
  },
  twoCaptcha: {
    apiKey: process.env.TWOCAPTCHA_API_KEY,
  },
  puppeteer: {
    headless: process.env.PUPPETEER_HEADLESS === 'false' ? false : 'new',
  },
} as const;
