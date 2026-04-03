import { buildExplorerUrls } from "@/lib/validator/adapters/explorer";
import type { RpcValidatorData, ValidatorSnapshot } from "@/lib/validator/schema";

export function deriveFreshnessState(
  updatedAt: string,
  staleAfterMinutes: number,
  isFallback: boolean
) {
  if (isFallback) {
    return "fallback" as const;
  }

  const ageMinutes = (Date.now() - new Date(updatedAt).getTime()) / 60000;
  return ageMinutes > staleAfterMinutes ? ("delayed" as const) : ("live" as const);
}

export function mergeSnapshot(
  base: ValidatorSnapshot,
  rpcData: RpcValidatorData | null,
  comparisonData: {
    networkAverage: number;
    performanceVsNetworkPct: number;
    updatedAt: string;
  } | null
): ValidatorSnapshot {
  const voteAccount = process.env.STEP_VOTE_ACCOUNT ?? base.validator.voteAccount;
  const identityPubkey = process.env.STEP_IDENTITY_PUBKEY ?? base.validator.identityPubkey;
  const updatedAt = rpcData?.updatedAt ?? comparisonData?.updatedAt ?? base.meta.updatedAt;
  const next = {
    ...base,
    validator: {
      ...base.validator,
      voteAccount,
      identityPubkey,
      explorerUrls: buildExplorerUrls({ voteAccount }),
      commission: rpcData?.commission ?? base.validator.commission,
      activatedStakeSol: rpcData?.activatedStakeSol ?? base.validator.activatedStakeSol,
      stakeRank: rpcData?.stakeRank ?? base.validator.stakeRank,
      uptime: rpcData?.uptime ?? base.validator.uptime,
      health: rpcData?.health ?? base.validator.health,
      lastVoteSlot: rpcData?.lastVoteSlot ?? base.validator.lastVoteSlot,
      lastVoteAt: rpcData?.lastVoteAt ?? base.validator.lastVoteAt,
      performanceVsNetworkPct:
        comparisonData?.performanceVsNetworkPct ?? base.validator.performanceVsNetworkPct
    },
    comparison: {
      ...base.comparison,
      step: rpcData?.uptime ?? base.comparison.step,
      networkAverage: comparisonData?.networkAverage ?? base.comparison.networkAverage
    },
    meta: {
      ...base.meta,
      updatedAt,
      freshnessState: deriveFreshnessState(updatedAt, base.meta.staleAfterMinutes, false),
      isFallback: false
    },
    sources: [
      ...(rpcData
        ? [
            {
              label: "Solana RPC",
              kind: "rpc" as const,
              updatedAt: rpcData.updatedAt,
              freshnessSeconds: 60
            }
          ]
        : []),
      ...(comparisonData
        ? [
            {
              label: "Public comparison layer",
              kind: "public" as const,
              updatedAt: comparisonData.updatedAt,
              freshnessSeconds: 300
            }
          ]
        : []),
      ...base.sources.filter((source) => source.kind === "static")
    ]
  } satisfies ValidatorSnapshot;

  return next;
}
