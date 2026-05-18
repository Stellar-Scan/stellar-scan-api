import { z } from 'zod';

export const contractIdParam = z.object({ id: z.string().min(1) });
export const searchQuery = z.object({ q: z.string().min(1), limit: z.coerce.number().max(100).default(20) });
