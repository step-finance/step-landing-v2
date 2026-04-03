import type { ChartPoint, ValidatorSnapshot } from "@/lib/validator/schema";

function createDate(offsetDays: number) {
  const value = new Date();
  value.setUTCDate(value.getUTCDate() + offsetDays);
  value.setUTCHours(12, 0, 0, 0);
  return value.toISOString();
}

function createSeries(values: number[]): ChartPoint[] {
  return values.map((value, index) => {
    const offset = index - values.length + 1;

    return {
      label: `-${Math.abs(offset) * 3}d`,
      date: createDate(offset * 3),
      value
    };
  });
}

export const mockValidatorSnapshot: ValidatorSnapshot = {
  validator: {
    name: process.env.STEP_VALIDATOR_NAME ?? "Step Validator",
    network: "Solana Mainnet",
    tagline: "Public validator infrastructure with a premium data-forward surface.",
    voteAccount:
      process.env.STEP_VOTE_ACCOUNT ?? "StepVote111111111111111111111111111111111111111",
    identityPubkey:
      process.env.STEP_IDENTITY_PUBKEY ??
      "StepNode111111111111111111111111111111111111111",
    commission: Number(process.env.STEP_VALIDATOR_COMMISSION ?? "6"),
    activatedStakeSol: 1482034,
    stakeRank: 93,
    uptime: 99.98,
    health: "healthy",
    apyEstimate: 7.18,
    recentEpochRewardsSol: 1824.62,
    performanceVsNetworkPct: 0.34,
    lastVoteSlot: 281447982,
    lastVoteAt: new Date(Date.now() - 60_000).toISOString(),
    externalStakeUrl:
      process.env.STEP_EXTERNAL_STAKE_URL ??
      "https://www.validators.app/validators/StepVote111111111111111111111111111111111111111?locale=en&network=mainnet",
    explorerUrls: {
      solscan:
        process.env.STEP_EXPLORER_SOLSCAN ??
        "https://solscan.io/account/StepVote111111111111111111111111111111111111111",
      explorer:
        process.env.STEP_EXPLORER_OFFICIAL ??
        "https://explorer.solana.com/address/StepVote111111111111111111111111111111111111111?cluster=mainnet-beta",
      validatorsApp:
        process.env.STEP_EXPLORER_VALIDATORS_APP ??
        "https://www.validators.app/validators/StepVote111111111111111111111111111111111111111?locale=en&network=mainnet"
    }
  },
  history: {
    stake: createSeries([
      1275000, 1294000, 1309000, 1321000, 1338000, 1354000, 1380000, 1406000, 1423000,
      1451000, 1469000, 1482034
    ]),
    rewards: createSeries([1540, 1584, 1620, 1596, 1648, 1662, 1698, 1712, 1734, 1760, 1791, 1824])
  },
  comparison: {
    step: 99.98,
    networkAverage: 99.64,
    label: "Voting performance"
  },
  meta: {
    updatedAt: new Date().toISOString(),
    staleAfterMinutes: 15,
    freshnessState: "live",
    isFallback: false
  },
  sources: [
    {
      label: "Step fallback dataset",
      kind: "mock",
      updatedAt: new Date().toISOString(),
      freshnessSeconds: 60
    }
  ]
};
