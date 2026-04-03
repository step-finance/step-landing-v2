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
import { formatCompact, formatPercent, formatRelativeTime } from "@/lib/utils";

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
          lastVoteLabel={formatRelativeTime(snapshot.validator.lastVoteAt)}
          externalStakeUrl={snapshot.validator.externalStakeUrl}
          explorerUrls={snapshot.validator.explorerUrls}
        />
      </PageSection>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Activated stake"
            value={`${formatCompact(snapshot.validator.activatedStakeSol)} SOL`}
            footnote="Current activated stake"
          />
          <MetricCard
            label="Est. APY"
            value={formatPercent(snapshot.validator.apyEstimate)}
            footnote="Estimate, not a promise"
          />
          <MetricCard
            label="Performance vs network"
            value={`${snapshot.validator.performanceVsNetworkPct.toFixed(2)} pts`}
            footnote="Spread versus network baseline"
          />
          <MetricCard
            label="Recent epoch rewards"
            value={`${formatCompact(snapshot.validator.recentEpochRewardsSol, 2)} SOL`}
            footnote="Recent realized reward signal"
          />
          <MetricCard
            label="Stake rank"
            value={`#${snapshot.validator.stakeRank}`}
            footnote="Current rank by activated stake"
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
            title="Identity, freshness, and source clarity belong in the staking path."
            body="This page stays narrow on purpose: show the validator, show current performance, and route delegation cleanly."
          />
          <DataSourceDisclosure sources={snapshot.sources} />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[0.85fr,1.15fr]">
          <SectionHeader
            eyebrow="QUESTIONS"
            title="The staking promise stays narrow in MVP."
            body="Today this page helps users evaluate the validator and delegate through external staking paths. Wallet-native flows come later."
          />
          <FAQAccordion items={faqItems.slice(0, 3)} />
        </div>
        <StickyStakeBar
          href={snapshot.validator.externalStakeUrl}
          statusLabel="Current flow: evaluate Step here, then open an external delegation page."
        />
      </PageSection>
    </>
  );
}
