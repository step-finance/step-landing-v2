import type { Metadata } from "next";

import { faqItems } from "@/content/site-content";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { MetricCard } from "@/components/metrics/metric-card";
import { StickyStakeBar } from "@/components/metrics/sticky-stake-bar";
import { ValidatorIdentityCard } from "@/components/metrics/validator-identity-card";
import { DataSourceDisclosure } from "@/components/trust/data-source-disclosure";
import { getValidatorSnapshot } from "@/lib/validator/queries";
import { formatCompact, formatPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Validator"
};

export const revalidate = 60;

export default async function ValidatorPage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <>
      <PageSection className="pb-6 pt-10">
        <ValidatorIdentityCard
          name={snapshot.validator.name}
          voteAccount={snapshot.validator.voteAccount}
          identityPubkey={snapshot.validator.identityPubkey}
          commission={formatPercent(snapshot.validator.commission)}
          healthLabel={snapshot.validator.health}
          externalStakeUrl={snapshot.validator.externalStakeUrl}
          explorerUrls={snapshot.validator.explorerUrls}
        />
      </PageSection>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Activated stake"
            value={`${formatCompact(snapshot.validator.activatedStakeSol)} SOL`}
            footnote="Operational scale and social proof"
          />
          <MetricCard
            label="Est. APY"
            value={formatPercent(snapshot.validator.apyEstimate)}
            footnote="Estimate, not a promise"
          />
          <MetricCard
            label="Performance vs network"
            value={`${snapshot.validator.performanceVsNetworkPct.toFixed(2)} pts`}
            footnote="Current comparison context"
          />
          <MetricCard
            label="Recent epoch rewards"
            value={`${formatCompact(snapshot.validator.recentEpochRewardsSol, 2)} SOL`}
            footnote="Recent realized reward context"
          />
          <MetricCard
            label="Stake rank"
            value={`#${snapshot.validator.stakeRank}`}
            footnote="Quick validator comparison cue"
          />
          <MetricCard
            label="Explorer path"
            value="validators.app"
            footnote="Open profile"
            href={snapshot.validator.explorerUrls.validatorsApp}
          />
        </div>
      </PageSection>

      <PageSection tone="elevated">
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <SectionHeader
            eyebrow="TRANSPARENCY"
            title="Identity, freshness, and source clarity are part of the conversion path."
            body="This page is intentionally simple: show who the validator is, show how it is performing, and route delegation cleanly."
          />
          <DataSourceDisclosure sources={snapshot.sources} />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[0.85fr,1.15fr]">
          <SectionHeader
            eyebrow="QUESTIONS"
            title="MVP keeps the staking promise narrow."
            body="Today this page helps users evaluate and delegate to Step through trusted external paths. Native wallet flows can come later."
          />
          <FAQAccordion items={faqItems.slice(0, 3)} />
        </div>
        <StickyStakeBar
          href={snapshot.validator.externalStakeUrl}
          statusLabel="MVP uses external delegation links while the direct non-custodial flow is still being prepared."
        />
      </PageSection>
    </>
  );
}
