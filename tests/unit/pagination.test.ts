import { describe, expect, it } from 'vitest';
import { decodeCursor, encodeCursor } from '../../src/utils/pagination.js';

describe('pagination', () => {
  it('round trips cursor', () => {
    const c = encodeCursor(40);
    expect(decodeCursor(c)).toBe(40);
  });
});
