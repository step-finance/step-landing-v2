export type DataSourceKind = "rpc" | "stakewiz" | "jito";
export type ValidatorHealth = "healthy" | "degraded" | "stale" | "unavailable";
export type FreshnessState = "live" | "delayed" | "unavailable";

export type ValidatorSource = {
  label: string;
  kind: DataSourceKind;
  updatedAt: string | null;
  freshnessSeconds: number;
  href?: string;
};

export type ValidatorSnapshot = {
  validator: {
    name: string;
    network: string;
    tagline: string;
    voteAccount: string;
    identityPubkey: string;
    estimatedApy: number | null;
    jitoApy: number | null;
    skipRate: number | null;
    votingRate: number | null;
    uptime30d: number | null;
    commission: number | null;
    mevCommission: number | null;
    activatedStakeSol: number | null;
    stakeRank: number | null;
    firstStakeEpoch: number;
    ageEpochs: number | null;
    ageHuman: string | null;
    health: ValidatorHealth;
    lastVoteSlot: number | null;
    lastVoteAt: string | null;
    externalStakeUrl: string;
    explorerUrls: {
      solscan: string;
      explorer: string;
      validatorsApp: string;
    };
  };
  meta: {
    updatedAt: string | null;
    staleAfterMinutes: number;
    freshnessState: FreshnessState;
    liveDataAvailable: boolean;
  };
  sources: ValidatorSource[];
};

export type RpcValidatorData = {
  commission: number;
  mevCommission: number;
  activatedStakeSol: number;
  stakeRank: number;
  ageEpochs: number;
  ageHuman: string | null;
  epochDurationSeconds: number | null;
  health: ValidatorHealth;
  lastVoteSlot: number;
  lastVoteAt: string;
  updatedAt: string;
};

export type StakewizValidatorData = {
  estimatedApy: number | null;
  skipRate: number | null;
  votingRate: number | null;
  uptime30d: number | null;
  updatedAt: string | null;
};

export type JitoValidatorData = {
  mevRewardsLamports: number;
  mevCommissionBps: number;
};
