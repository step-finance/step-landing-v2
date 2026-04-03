import type { Metadata } from "next";

import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "How to Stake"
};

export default async function HowToStakePage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="grid gap-8 xl:grid-cols-[0.8fr,1.2fr]">
        <SectionHeader
          eyebrow="HOW TO STAKE"
          title="Delegate to Step today through a clear external path."
          body="MVP intentionally avoids an on-site transaction flow. The current experience points users to a trusted external staking surface while keeping the validator identity and metrics here."
        />
        <div className="space-y-4">
          {[
            "Choose a Solana wallet or staking destination you already trust.",
            "Confirm the Step validator vote account and explorer links before delegating.",
            "Review commission, current validator health, and epoch timing expectations.",
            "Delegate externally today; direct non-custodial staking on this site is planned later."
          ].map((step, index) => (
            <div key={step} className="panel p-6">
              <p className="panel-label">Step {index + 1}</p>
              <p className="mt-4 text-base leading-7 text-ink">{step}</p>
            </div>
          ))}
          <ButtonLink href={snapshot.validator.externalStakeUrl} external className="mt-4">
            Delegate to Step
          </ButtonLink>
        </div>
      </div>
    </PageSection>
  );
}
