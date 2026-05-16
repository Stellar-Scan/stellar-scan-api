import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(err: FastifyError, _req: FastifyRequest, reply: FastifyReply) {
  reply.status(err.statusCode ?? 500).send({
    error: err.name,
    message: err.message,
  });
}
