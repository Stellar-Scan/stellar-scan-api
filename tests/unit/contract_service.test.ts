import { describe, expect, it } from 'vitest';
import { ContractService } from '../../src/services/contract_service.js';

describe('ContractService', () => {
  it('is constructible', () => {
    expect(new ContractService({ query: async () => ({ rows: [], rowCount: 0 }) } as never)).toBeTruthy();
  });
});
