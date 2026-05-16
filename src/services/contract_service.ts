import type { Pool } from 'pg';
import { decodeCursor, encodeCursor, type Page } from '../utils/pagination.js';

export type Contract = Record<string, unknown>;

export class ContractService {
  constructor(private pool: Pool) {}

  async getById(id: string, network?: string, withFunctions = false): Promise<Contract | null> {
    const res = await this.pool.query(
      'SELECT * FROM contracts WHERE contract_id = $1 AND ($2::text IS NULL OR network = $2) LIMIT 1',
      [id, network ?? null],
    );
    const row = res.rows[0];
    if (!row) return null;
    if (!withFunctions) return row;
    const fn = await this.pool.query(
      'SELECT name, doc, inputs, outputs FROM contract_functions WHERE contract_id = $1 AND network = $2',
      [id, row.network],
    );
    return { ...row, functions: fn.rows };
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
