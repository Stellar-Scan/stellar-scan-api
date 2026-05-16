import type { Pool } from 'pg';
import { decodeCursor, encodeCursor, type Page } from '../utils/pagination.js';

export type Contract = Record<string, unknown>;

export class ContractService {
  constructor(private pool: Pool) {}

  async getById(id: string, network?: string): Promise<Contract | null> {
    const res = await this.pool.query(
      'SELECT * FROM contracts WHERE contract_id = $1 AND ($2::text IS NULL OR network = $2) LIMIT 1',
      [id, network ?? null],
    );
    return res.rows[0] ?? null;
  }

  async list(opts: { network?: string; cursor?: string; limit?: number }): Promise<Page<Contract>> {
    const offset = decodeCursor(opts.cursor);
    const limit = opts.limit ?? 20;
    const res = await this.pool.query(
      `SELECT * FROM contracts WHERE ($1::text IS NULL OR network = $1)
       ORDER BY deploy_ledger DESC OFFSET $2 LIMIT $3`,
      [opts.network ?? null, offset, limit],
    );
    const next = res.rowCount === limit ? encodeCursor(offset + limit) : undefined;
    return { items: res.rows, nextCursor: next };
  }
}
