import type { FastifyInstance } from 'fastify';
import { TagService } from '../services/tag_service.js';

export async function tagRoutes(app: FastifyInstance, svc: TagService) {
  app.get('/tags', async (req) => {
    const network = (req.query as { network?: string }).network;
    return { tags: await svc.listTags(network) };
  });
}
