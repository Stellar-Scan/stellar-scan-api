export class SimulateService {
  constructor(private rpcUrl: string) {}
  async simulate(contractId: string, functionName: string, args: unknown[] = []) {
    const res = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'simulateTransaction',
        params: { contractId, function: functionName, args },
      }),
    });
    return res.json();
  }
}
