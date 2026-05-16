import type { FastifyInstance } from 'fastify';
import { SearchService } from '../services/search_service.js';
import { searchQuery } from '../utils/validators.js';

export async function searchRoutes(app: FastifyInstance, svc: SearchService) {
  app.get('/search', async (req) => {
    const { q, limit } = searchQuery.parse(req.query);
    return { results: await svc.search(q, limit) };
  });
}
