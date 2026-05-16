import { z } from 'zod';

export const configSchema = z.object({
  DATABASE_URL: z.string(),
  STELLAR_RPC_URL: z.string().url(),
  PORT: z.coerce.number().default(3002),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  API_KEY_REQUIRED: z.coerce.boolean().default(false),
  API_KEY: z.string().optional(),
});

export type ApiConfig = z.infer<typeof configSchema>;
export const loadConfig = (env = process.env) => configSchema.parse(env);
