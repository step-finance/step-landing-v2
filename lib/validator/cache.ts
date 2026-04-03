import type { ValidatorSnapshot } from "@/lib/validator/schema";

let lastKnownSnapshot: ValidatorSnapshot | null = null;

export function rememberSnapshot(snapshot: ValidatorSnapshot) {
  lastKnownSnapshot = snapshot;
}

export function getLastKnownSnapshot() {
  return lastKnownSnapshot;
}
