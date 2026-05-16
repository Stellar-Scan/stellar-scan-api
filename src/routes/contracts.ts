import type { FastifyInstance } from 'fastify';
import { ContractService } from '../services/contract_service.js';
import { contractIdParam } from '../utils/validators.js';

export async function contractRoutes(app: FastifyInstance, svc: ContractService) {
  app.get('/contracts', async (req) => {
    const q = req.query as { network?: string; cursor?: string; limit?: string };
    return svc.list({ network: q.network, cursor: q.cursor, limit: q.limit ? Number(q.limit) : 20 });
  });
  app.get('/contracts/:id', async (req, reply) => {
    const { id } = contractIdParam.parse(req.params);
    const row = await svc.getById(id, (req.query as { network?: string }).network);
    if (!row) return reply.status(404).send({ error: 'not_found' });
    return row;
  });
}
