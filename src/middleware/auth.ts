import type { FastifyRequest } from 'fastify';
import type { ApiConfig } from '../config.js';

export function requireApiKey(cfg: ApiConfig) {
  return async (req: FastifyRequest) => {
    if (!cfg.API_KEY_REQUIRED) return;
    const key = req.headers['x-api-key'];
    if (key !== cfg.API_KEY) {
      const err = new Error('unauthorized');
      (err as { statusCode?: number }).statusCode = 401;
      throw err;
    }
  };
}
