import type { ContractService } from '../services/contract_service.js';

export const contractResolver = (svc: ContractService) => ({
  Query: {
    contract: (_: unknown, { id }: { id: string }) => svc.getById(id),
  },
});
