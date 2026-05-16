import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';

export async function healthRoutes(app: FastifyInstance, pool: Pool) {
  app.get('/health', async () => {
    await pool.query('SELECT 1');
    return { status: 'ok', service: 'stellar-scan-api' };
  });
}
