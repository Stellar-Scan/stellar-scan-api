import type { Pool } from 'pg';

export class SearchService {
  constructor(private pool: Pool) {}
  async search(q: string, limit = 20) {
    const res = await this.pool.query(
      `SELECT contract_id, network, name, tags, ts_rank(search_vector, plainto_tsquery('english', $1)) AS rank
       FROM contracts WHERE search_vector @@ plainto_tsquery('english', $1)
       ORDER BY rank DESC LIMIT $2`,
      [q, limit],
    );
    return res.rows;
  }
}
