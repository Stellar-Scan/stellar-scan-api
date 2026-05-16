import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';

export async function eventRoutes(app: FastifyInstance, pool: Pool) {
  app.get('/contracts/:id/events', async (req) => {
    const { id } = req.params as { id: string };
    const limit = Number((req.query as { limit?: string }).limit ?? 50);
    const res = await pool.query(
      'SELECT * FROM contract_events WHERE contract_id = $1 ORDER BY ledger DESC LIMIT $2',
      [id, limit],
    );
    return { events: res.rows };
  });
}
