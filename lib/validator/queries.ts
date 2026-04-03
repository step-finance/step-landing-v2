import { unstable_cache } from "next/cache";

import { getPublicComparisonData } from "@/lib/validator/adapters/public-stats";
import { getRpcValidatorData } from "@/lib/validator/adapters/rpc";
import { getLastKnownSnapshot, rememberSnapshot } from "@/lib/validator/cache";
import { mockValidatorSnapshot } from "@/lib/validator/mock";
import type { ValidatorSnapshot } from "@/lib/validator/schema";
import { deriveFreshnessState, mergeSnapshot } from "@/lib/validator/transform";

const getSnapshotInternal = unstable_cache(
  async (): Promise<ValidatorSnapshot> => {
    try {
      const [rpcData, comparisonData] = await Promise.all([
        getRpcValidatorData(),
        getPublicComparisonData()
      ]);

      const snapshot = mergeSnapshot(mockValidatorSnapshot, rpcData, comparisonData);
      rememberSnapshot(snapshot);
      return snapshot;
    } catch {
      const lastKnown = getLastKnownSnapshot();

      if (lastKnown) {
        return {
          ...lastKnown,
          meta: {
            ...lastKnown.meta,
            isFallback: true,
            freshnessState: deriveFreshnessState(
              lastKnown.meta.updatedAt,
              lastKnown.meta.staleAfterMinutes,
              true
            )
          }
        };
      }

      return {
        ...mockValidatorSnapshot,
        meta: {
          ...mockValidatorSnapshot.meta,
          isFallback: true,
          freshnessState: "fallback"
        }
      };
    }
  },
  ["step-validator-snapshot"],
  { revalidate: 60 }
);

export async function getValidatorSnapshot() {
  return getSnapshotInternal();
}

export async function getValidatorHistory() {
  const snapshot = await getValidatorSnapshot();

  return {
    stake: snapshot.history.stake,
    rewards: snapshot.history.rewards,
    meta: snapshot.meta
  };
}
