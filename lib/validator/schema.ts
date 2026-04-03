export type DataSourceKind = "rpc" | "public" | "static" | "mock" | "composite";
export type ValidatorHealth = "healthy" | "degraded" | "stale";
export type FreshnessState = "live" | "delayed" | "fallback";

export type ChartPoint = {
  label: string;
  date: string;
  value: number;
};

export type ValidatorSource = {
  label: string;
  kind: DataSourceKind;
  updatedAt: string;
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
    commission: number;
    activatedStakeSol: number;
    stakeRank: number;
    uptime: number;
    health: ValidatorHealth;
    apyEstimate: number;
    recentEpochRewardsSol: number;
    performanceVsNetworkPct: number;
    lastVoteSlot: number;
    lastVoteAt: string;
    externalStakeUrl: string;
    explorerUrls: {
      solscan: string;
      explorer: string;
      validatorsApp: string;
    };
  };
  history: {
    stake: ChartPoint[];
    rewards: ChartPoint[];
  };
  comparison: {
    step: number;
    networkAverage: number;
    label: string;
  };
  meta: {
    updatedAt: string;
    staleAfterMinutes: number;
    freshnessState: FreshnessState;
    isFallback: boolean;
  };
  sources: ValidatorSource[];
};

export type RpcValidatorData = {
  commission: number;
  activatedStakeSol: number;
  stakeRank: number;
  uptime: number;
  health: ValidatorHealth;
  lastVoteSlot: number;
  lastVoteAt: string;
  updatedAt: string;
};
