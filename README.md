# stellar-scan-api

> REST + GraphQL API serving indexed Soroban contract data from the Stellar Scan platform.

[![Stellar Wave](https://img.shields.io/badge/Stellar%20Wave-Wave%205-blue?style=flat-square)](https://www.drips.network/wave/stellar)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-green?style=flat-square)](.github/workflows/ci.yml)

---

## Overview

`stellar-scan-api` is a [Fastify](https://fastify.dev/) service that exposes the data produced by `stellar-scan-indexer` through both a REST API and a GraphQL endpoint. It powers the `stellar-scan-web` frontend and is designed to be consumed by any external developer tool or analytics platform.

---

## File Structure

```
stellar-scan-api/
│
├── package.json
├── tsconfig.json
├── README.md                              # This file
├── CONTRIBUTING.md
├── LICENSE
├── CODEOWNERS
├── .gitignore
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── Dockerfile
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                         # Lint, typecheck, test on every PR
│   │   └── docker.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── stellar_wave_task.md
│
├── src/
│   ├── index.ts                           # Fastify server bootstrap
│   │
│   ├── routes/                            # REST endpoints
│   │   ├── contracts.ts                   # GET /contracts, GET /contracts/:id
│   │   ├── functions.ts                   # GET /contracts/:id/functions
│   │   ├── events.ts                      # GET /contracts/:id/events
│   │   ├── deployers.ts                   # GET /deployers/:address/contracts
│   │   ├── search.ts                      # GET /search?q=...
│   │   └── health.ts                      # GET /health
│   │
│   ├── resolvers/                         # GraphQL resolvers
│   │   ├── contract.resolver.ts
│   │   ├── function.resolver.ts
│   │   ├── event.resolver.ts
│   │   └── deployer.resolver.ts
│   │
│   ├── schema/                            # GraphQL schema definitions
│   │   ├── contract.graphql
│   │   ├── function.graphql
│   │   ├── event.graphql
│   │   ├── deployer.graphql
│   │   └── index.graphql                  # Root Query / Mutation / Subscription
│   │
│   ├── middleware/
│   │   ├── auth.ts                        # Optional API key middleware
│   │   ├── rate_limit.ts                  # Per-IP rate limiting
│   │   ├── cors.ts                        # CORS configuration
│   │   └── error_handler.ts              # Centralized error formatting
│   │
│   ├── services/
│   │   ├── contract_service.ts            # Business logic for contract queries
│   │   ├── search_service.ts              # Full-text search with pg tsvector
│   │   ├── simulate_service.ts            # Proxies simulateTransaction to Stellar RPC
│   │   └── tag_service.ts                 # Contract tagging logic
│   │
│   └── utils/
│       ├── db.ts                          # Shared pg pool (reads from indexer DB)
│       ├── logger.ts
│       ├── pagination.ts                  # Cursor-based pagination helpers
│       └── validators.ts                  # Input validation schemas (zod)
│
├── tests/
│   ├── unit/
│   │   ├── contract_service.test.ts
│   │   ├── search_service.test.ts
│   │   └── pagination.test.ts
│   │
│   └── integration/
│       ├── contracts_route.test.ts        # HTTP integration tests
│       ├── graphql.test.ts               # GraphQL query tests
│       └── simulate.test.ts
│
└── docs/
    ├── rest-api.md                        # Full REST endpoint reference
    └── graphql-schema.md                  # GraphQL schema documentation
```

---

## REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/contracts` | List contracts with pagination, filter by network/tag/deployer |
| `GET` | `/contracts/:id` | Get a single contract by contract ID |
| `GET` | `/contracts/:id/functions` | List all functions of a contract |
| `GET` | `/contracts/:id/events` | Get recent events emitted by a contract |
| `GET` | `/contracts/:id/simulate` | Invoke a read function via simulateTransaction |
| `GET` | `/deployers/:address/contracts` | All contracts deployed by an address |
| `GET` | `/search?q=<query>` | Full-text search across contract names, tags, functions |
| `GET` | `/health` | Service health check |

### Example Response — `GET /contracts/:id`

```json
{
  "contract_id": "CXXXXXXXX...",
  "deployer": "GXXXXXXXX...",
  "wasm_hash": "abc123...",
  "deploy_ledger": 50123456,
  "network": "mainnet",
  "verified": true,
  "tags": ["defi", "token"],
  "functions": [
    {
      "name": "transfer",
      "doc": "Transfer tokens from sender to recipient",
      "inputs": [
        { "name": "from", "type": "Address" },
        { "name": "to", "type": "Address" },
        { "name": "amount", "type": "i128" }
      ],
      "outputs": [{ "type": "bool" }]
    }
  ]
}
```

---

## GraphQL

The GraphQL endpoint is available at `/graphql`. An interactive playground is served at `/graphql/playground` in development.

```graphql
query GetContract($id: String!) {
  contract(id: $id) {
    contractId
    deployer
    verified
    tags
    functions {
      name
      doc
      inputs { name type }
    }
  }
}
```

---

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/stellar_scan
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
PORT=3002
LOG_LEVEL=info
API_KEY_REQUIRED=false
```

---

## Running Locally

```bash
git clone https://github.com/stellar-scan/stellar-scan-api
cd stellar-scan-api
cp .env.example .env
npm install
npm run dev
```

The API will be available at `http://localhost:3002`.

---

## Stellar Wave — Open Issues

Browse: [github.com/stellar-scan/stellar-scan-api/issues](https://github.com/stellar-scan/stellar-scan-api/issues?q=label%3A%22Stellar+Wave%22)

**Points:** Trivial = 100 pts | Medium = 150 pts | High = 200 pts

---

## License

MIT — see [LICENSE](LICENSE)
