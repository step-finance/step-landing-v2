import type { Metadata } from "next";

import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { getValidatorSnapshot } from "@/lib/validator/queries";
import { formatPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rewards and Risks"
};

export default async function RewardsAndRisksPage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="grid gap-8 xl:grid-cols-[0.85fr,1.15fr]">
        <SectionHeader
          eyebrow="REWARDS + RISKS"
          title="Staking rewards are real, but they are not guarantees."
          body="The site should explain staking clearly: commission affects returns, activation takes time, APY is estimated, and direct custody should remain with the user."
        />
        <div className="space-y-4">
          <div className="panel p-6">
            <p className="panel-label">Commission</p>
            <p className="mt-4 text-base leading-7 text-ink">
              Step currently advertises a commission of {formatPercent(snapshot.validator.commission)}.
              This is one of the clearest levers users can compare across validators.
            </p>
          </div>
          <div className="panel p-6">
            <p className="panel-label">Estimated APY</p>
            <p className="mt-4 text-base leading-7 text-ink">
              APY should be treated as an estimate derived from recent network conditions and epoch
              performance. It must never be framed like a guarantee.
            </p>
          </div>
          <div className="panel p-6">
            <p className="panel-label">Operational risk</p>
            <p className="mt-4 text-base leading-7 text-ink">
              Validator performance matters. That is why the site exposes liveness, freshness, and
              public identity instead of relying on vague marketing claims.
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
