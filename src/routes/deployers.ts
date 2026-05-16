import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';

export async function deployerRoutes(app: FastifyInstance, pool: Pool) {
  app.get('/deployers/:address/contracts', async (req) => {
    const { address } = req.params as { address: string };
    const res = await pool.query(
      'SELECT * FROM contracts WHERE deployer = $1 ORDER BY deploy_ledger DESC LIMIT 100',
      [address],
    );
    return { contracts: res.rows, count: res.rowCount };
  });
}
