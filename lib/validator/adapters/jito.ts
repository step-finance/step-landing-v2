import { getValidatorConfig } from "@/lib/validator/config";
import type { JitoValidatorData } from "@/lib/validator/schema";

type JitoValidatorEpoch = {
  mev_rewards?: number | null;
  mev_commission_bps?: number | null;
};

export async function getJitoValidatorData(): Promise<JitoValidatorData | null> {
  const { voteAccount } = getValidatorConfig();
  const response = await fetch(`https://kobe.mainnet.jito.network/api/v1/validators/${voteAccount}`, {
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error("Jito validator request failed");
  }

  const data = (await response.json()) as JitoValidatorEpoch[];
  const latest = data.find((item) => typeof item.mev_rewards === "number");

  if (!latest || typeof latest.mev_rewards !== "number") {
    return null;
  }

  return {
    mevRewardsLamports: latest.mev_rewards,
    mevCommissionBps: latest.mev_commission_bps ?? 0
  };
}
