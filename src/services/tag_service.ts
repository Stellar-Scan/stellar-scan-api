import type { Pool } from 'pg';

export class TagService {
  constructor(private pool: Pool) {}
  async listTags(network?: string) {
    const res = await this.pool.query(
      `SELECT DISTINCT unnest(tags) AS tag FROM contracts WHERE ($1::text IS NULL OR network = $1)`,
      [network ?? null],
    );
    return res.rows.map((r) => r.tag);
  }
}
