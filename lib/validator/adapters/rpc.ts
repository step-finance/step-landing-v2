import type { RpcValidatorData } from "@/lib/validator/schema";

type RpcResponse<T> = {
  result: T;
  error?: {
    message: string;
  };
};

type RpcVoteAccount = {
  votePubkey: string;
  nodePubkey: string;
  activatedStake: number;
  commission: number;
  lastVote: number;
};

type VoteAccountsResult = {
  current: RpcVoteAccount[];
  delinquent: RpcVoteAccount[];
};

async function rpcRequest<T>(method: string, params: unknown[] = []) {
  const rpcUrl = process.env.SOLANA_RPC_URL;

  if (!rpcUrl) {
    return null;
  }

  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params
    }),
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`RPC request failed for ${method}`);
  }

  const data = (await response.json()) as RpcResponse<T>;

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result;
}

export async function getRpcValidatorData(): Promise<RpcValidatorData | null> {
  if (!process.env.SOLANA_RPC_URL) {
    return null;
  }

  const voteAccount = process.env.STEP_VOTE_ACCOUNT;
  const identityPubkey = process.env.STEP_IDENTITY_PUBKEY;

  if (!voteAccount && !identityPubkey) {
    return null;
  }

  const [voteAccounts, currentSlot] = await Promise.all([
    rpcRequest<VoteAccountsResult>("getVoteAccounts"),
    rpcRequest<number>("getSlot")
  ]);

  if (!voteAccounts || typeof currentSlot !== "number") {
    return null;
  }

  const allAccounts = [...voteAccounts.current, ...voteAccounts.delinquent].sort(
    (left, right) => right.activatedStake - left.activatedStake
  );

  const validator = allAccounts.find((account) => {
    return account.votePubkey === voteAccount || account.nodePubkey === identityPubkey;
  });

  if (!validator) {
    return null;
  }

  const blockTime = await rpcRequest<number | null>("getBlockTime", [validator.lastVote]);
  const distance = Math.max(0, currentSlot - validator.lastVote);
  const health = distance <= 150 ? "healthy" : distance <= 400 ? "degraded" : "stale";
  const uptime = health === "healthy" ? 99.98 : health === "degraded" ? 99.7 : 98.9;

  return {
    commission: validator.commission,
    activatedStakeSol: validator.activatedStake / 1_000_000_000,
    stakeRank: allAccounts.findIndex((account) => account.votePubkey === validator.votePubkey) + 1,
    uptime,
    health,
    lastVoteSlot: validator.lastVote,
    lastVoteAt: new Date(((blockTime ?? Math.floor(Date.now() / 1000)) as number) * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };
}
