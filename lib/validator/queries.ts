import { getJitoValidatorData } from "@/lib/validator/adapters/jito";
import { getRpcValidatorData } from "@/lib/validator/adapters/rpc";
import { getStakewizValidatorData } from "@/lib/validator/adapters/stakewiz";
import { getPublicRpcUrl, getValidatorConfig } from "@/lib/validator/config";
import type { ValidatorSnapshot } from "@/lib/validator/schema";
function getFreshnessState(updatedAt: string | null, staleAfterMinutes: number) {
  if (!updatedAt) {
    return "unavailable" as const;
  }

  const ageMinutes = (Date.now() - new Date(updatedAt).getTime()) / 60000;
  return ageMinutes > staleAfterMinutes ? ("delayed" as const) : ("live" as const);
}

export async function getValidatorSnapshot() {
  const config = getValidatorConfig();
  const staleAfterMinutes = 15;
  const baseSnapshot: ValidatorSnapshot = {
    validator: {
      name: config.name,
      network: config.network,
      tagline: config.tagline,
      voteAccount: config.voteAccount,
      identityPubkey: config.identityPubkey,
      estimatedApy: null,
      jitoApy: null,
      skipRate: null,
      votingRate: null,
      uptime30d: null,
      commission: null,
      mevCommission: config.mevCommission,
      activatedStakeSol: null,
      stakeRank: null,
      firstStakeEpoch: config.firstStakeEpoch,
      ageEpochs: null,
      ageHuman: null,
      health: "unavailable",
      lastVoteSlot: null,
      lastVoteAt: null,
      externalStakeUrl: config.externalStakeUrl,
      explorerUrls: config.explorerUrls
    },
    meta: {
      updatedAt: null,
      staleAfterMinutes,
      freshnessState: "unavailable",
      liveDataAvailable: false
    },
    sources: [
      {
        label: "Public Solana RPC",
        kind: "rpc",
        updatedAt: null,
        freshnessSeconds: 60,
        href: getPublicRpcUrl()
      },
      {
        label: "StakeWiz",
        kind: "stakewiz",
        updatedAt: null,
        freshnessSeconds: 300,
        href: `https://api.stakewiz.com/validator/${config.voteAccount}`
      },
      {
        label: "Jito",
        kind: "jito",
        updatedAt: null,
        freshnessSeconds: 300,
        href: `https://kobe.mainnet.jito.network/api/v1/validators/${config.voteAccount}`
      }
    ]
  };

  const [rpcResult, stakewizResult, jitoResult] = await Promise.allSettled([
    getRpcValidatorData(),
    getStakewizValidatorData(),
    getJitoValidatorData()
  ]);

  const rpcData = rpcResult.status === "fulfilled" ? rpcResult.value : null;
  const stakewizData = stakewizResult.status === "fulfilled" ? stakewizResult.value : null;
  const jitoData = jitoResult.status === "fulfilled" ? jitoResult.value : null;
  const jitoApy =
    rpcData &&
    jitoData &&
    rpcData.activatedStakeSol > 0 &&
    rpcData.epochDurationSeconds &&
    rpcData.epochDurationSeconds > 0
      ? (((jitoData.mevRewardsLamports / 1_000_000_000) *
          (1 - jitoData.mevCommissionBps / 10_000)) /
          rpcData.activatedStakeSol) *
        ((365.25 * 24 * 60 * 60) / rpcData.epochDurationSeconds) *
        100
      : null;

  if (!rpcData && !stakewizData) {
    return baseSnapshot;
  }

  return {
    validator: {
      ...baseSnapshot.validator,
      estimatedApy: stakewizData?.estimatedApy ?? null,
      jitoApy,
      skipRate: stakewizData?.skipRate ?? null,
      votingRate: stakewizData?.votingRate ?? null,
      uptime30d: stakewizData?.uptime30d ?? null,
      commission: rpcData?.commission ?? baseSnapshot.validator.commission,
      mevCommission: rpcData?.mevCommission ?? baseSnapshot.validator.mevCommission,
      activatedStakeSol: rpcData?.activatedStakeSol ?? baseSnapshot.validator.activatedStakeSol,
      stakeRank: rpcData?.stakeRank ?? baseSnapshot.validator.stakeRank,
      ageEpochs: rpcData?.ageEpochs ?? baseSnapshot.validator.ageEpochs,
      ageHuman: rpcData?.ageHuman ?? baseSnapshot.validator.ageHuman,
      health: rpcData?.health ?? baseSnapshot.validator.health,
      lastVoteSlot: rpcData?.lastVoteSlot ?? baseSnapshot.validator.lastVoteSlot,
      lastVoteAt: rpcData?.lastVoteAt ?? baseSnapshot.validator.lastVoteAt
    },
    meta: {
      updatedAt: rpcData?.updatedAt ?? stakewizData?.updatedAt ?? null,
      staleAfterMinutes,
      freshnessState: getFreshnessState(rpcData?.updatedAt ?? stakewizData?.updatedAt ?? null, staleAfterMinutes),
      liveDataAvailable: Boolean(rpcData)
    },
    sources: [
      {
        ...baseSnapshot.sources[0],
        updatedAt: rpcData?.updatedAt ?? null
      },
      {
        ...baseSnapshot.sources[1],
        updatedAt: stakewizData?.updatedAt ?? null
      },
      {
        ...baseSnapshot.sources[2],
        updatedAt: rpcData?.updatedAt ?? null
      }
    ]
  };
}
