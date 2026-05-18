import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';

export async function functionRoutes(app: FastifyInstance, pool: Pool) {
  app.get('/contracts/:id/functions', async (req, reply) => {
    const { id } = req.params as { id: string };
    const network = (req.query as { network?: string }).network;
    const res = await pool.query(
      'SELECT name, doc, inputs, outputs FROM contract_functions WHERE contract_id = $1 AND ($2::text IS NULL OR network = $2)',
      [id, network ?? null],
    );
    if (!res.rowCount) return reply.status(404).send({ error: 'not_found' });
    return { functions: res.rows };
  });
}
