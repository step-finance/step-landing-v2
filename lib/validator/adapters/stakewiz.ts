import { getValidatorConfig } from "@/lib/validator/config";
import type { StakewizValidatorData } from "@/lib/validator/schema";

type StakewizValidatorResponse = {
  apy_estimate?: number | null;
  skip_rate?: number | null;
  credit_ratio?: number | null;
  vote_success?: number | null;
  uptime?: number | null;
  updated_at?: string | null;
};

export async function getStakewizValidatorData(): Promise<StakewizValidatorData | null> {
  const { voteAccount } = getValidatorConfig();
  const response = await fetch(`https://api.stakewiz.com/validator/${voteAccount}`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error("StakeWiz request failed");
  }

  const data = (await response.json()) as StakewizValidatorResponse;

  return {
    estimatedApy: data.apy_estimate ?? null,
    skipRate: data.skip_rate ?? null,
    votingRate: data.credit_ratio ?? data.vote_success ?? null,
    uptime30d: data.uptime ?? null,
    updatedAt: data.updated_at ?? null
  };
}
