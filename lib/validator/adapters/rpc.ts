import { getPublicRpcUrl, getValidatorConfig } from "@/lib/validator/config";
import { formatDurationApprox } from "@/lib/utils";
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

type RpcEpochInfo = {
  epoch: number;
  absoluteSlot: number;
};

type RpcEpochSchedule = {
  slotsPerEpoch: number;
};

type RpcPerformanceSample = {
  numSlots: number;
  samplePeriodSecs: number;
};

async function rpcRequest<T>(method: string, params: unknown[] = []) {
  const rpcUrl = getPublicRpcUrl();

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
  const { voteAccount, identityPubkey, firstStakeEpoch, mevCommission } = getValidatorConfig();

  const [voteAccounts, epochInfo, epochSchedule, performanceSamples] = await Promise.all([
    rpcRequest<VoteAccountsResult>("getVoteAccounts"),
    rpcRequest<RpcEpochInfo>("getEpochInfo"),
    rpcRequest<RpcEpochSchedule>("getEpochSchedule"),
    rpcRequest<RpcPerformanceSample[]>("getRecentPerformanceSamples", [1])
  ]);

  if (!voteAccounts || typeof epochInfo?.absoluteSlot !== "number" || typeof epochInfo?.epoch !== "number") {
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
  const distance = Math.max(0, epochInfo.absoluteSlot - validator.lastVote);
  const health = distance <= 150 ? "healthy" : distance <= 400 ? "degraded" : "stale";
  const ageEpochs = Math.max(1, epochInfo.epoch - firstStakeEpoch + 1);
  const sample = performanceSamples?.[0];
  const secondsPerSlot =
    sample && sample.numSlots > 0 ? sample.samplePeriodSecs / sample.numSlots : null;
  const epochDurationSeconds =
    secondsPerSlot && typeof epochSchedule?.slotsPerEpoch === "number"
      ? epochSchedule.slotsPerEpoch * secondsPerSlot
      : null;
  const ageHuman =
    epochDurationSeconds
      ? formatDurationApprox(ageEpochs * epochDurationSeconds)
      : null;

  return {
    commission: validator.commission,
    mevCommission,
    activatedStakeSol: validator.activatedStake / 1_000_000_000,
    stakeRank: allAccounts.findIndex((account) => account.votePubkey === validator.votePubkey) + 1,
    ageEpochs,
    ageHuman,
    epochDurationSeconds,
    health,
    lastVoteSlot: validator.lastVote,
    lastVoteAt: new Date(((blockTime ?? Math.floor(Date.now() / 1000)) as number) * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };
}
