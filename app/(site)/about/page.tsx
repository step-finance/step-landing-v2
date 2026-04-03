import type { Metadata } from "next";

import { legacyMilestones } from "@/content/site-content";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { LegacyTimeline } from "@/components/marketing/legacy-timeline";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "About"
};

export default async function AboutPage() {
  await getValidatorSnapshot();

  return (
    <>
      <PageSection className="pb-6 pt-10">
        <div className="panel-strong p-8 lg:p-10">
          <SectionHeader
            eyebrow="ABOUT STEP"
            title="Step evolved into a validator-focused Solana brand."
            body="The previous Step app is not what this site is rebuilding. This version of Step is narrower, more resilient, and centered on validator infrastructure."
          />
        </div>
      </PageSection>
      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[0.85fr,1.15fr]">
          <div className="space-y-6">
            <div className="panel p-6">
              <p className="panel-label">What this site is</p>
              <p className="mt-4 text-base leading-7 text-ink">
                A public home for the Step validator, validator metrics, trust surfaces, and a
                roadmap toward direct non-custodial staking.
              </p>
            </div>
            <div className="panel p-6">
              <p className="panel-label">What this site is not</p>
              <p className="mt-4 text-base leading-7 text-ink">
                It is not a relaunch of the old portfolio app, not a DeFi dashboard product, and
                not a backend-heavy platform recreating the same fragility.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/validator">View Validator</ButtonLink>
              <ButtonLink href="/security" variant="secondary">
                Read Security
              </ButtonLink>
            </div>
          </div>
          <LegacyTimeline items={legacyMilestones} />
        </div>
      </PageSection>
    </>
  );
}
