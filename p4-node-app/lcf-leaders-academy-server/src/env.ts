import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

// Define schema for environment variables
const envSchema = z.object({
  PORT: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.string(),
  LOG_ERRORS: z.string(),
  DEV_DATABASE_URL: z.string().min(1),
  PROD_DATABASE_URL: z.string().min(1),
  HOST_NAME: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  EMAIL_SERVER_HOST: z.string().min(1),
  EMAIL_SERVER_PORT: z.string().min(1),
  EMAIL_SERVER_USER: z.string().min(1),
  EMAIL_SERVER_PASSWORD: z.string().min(1),
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().min(1),
  CLOUDFLARE_BUCKET_NAME: z.string().min(1),
  RESEND_AUDIENCE_ID: z.string().min(1),
});

// Validate environment variables
const env = envSchema.parse(process.env);

export { env };
