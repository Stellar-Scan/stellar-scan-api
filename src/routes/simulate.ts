import type { FastifyInstance } from 'fastify';
import { SimulateService } from '../services/simulate_service.js';

export async function simulateRoutes(app: FastifyInstance, svc: SimulateService) {
  app.get('/contracts/:id/simulate', async (req) => {
    const { id } = req.params as { id: string };
    const fn = (req.query as { fn?: string }).fn ?? 'version';
    return svc.simulate(id, fn);
  });
}
