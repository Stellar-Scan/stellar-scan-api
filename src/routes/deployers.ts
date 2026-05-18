import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';

export async function deployerRoutes(app: FastifyInstance, pool: Pool) {
  app.get('/deployers/:address/contracts', async (req) => {
    const { address } = req.params as { address: string };
    const res = await pool.query(
      'SELECT * FROM contracts WHERE deployer = $1 ORDER BY deploy_ledger DESC LIMIT 100',
      [address],
    );
    const verified = res.rows.filter((r) => r.verified).length;
    return { contracts: res.rows, count: res.rowCount, verifiedCount: verified };
  });
}
