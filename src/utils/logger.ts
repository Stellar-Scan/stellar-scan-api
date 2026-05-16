import pino from 'pino';
export const logger = (level: string) => pino({ level });
