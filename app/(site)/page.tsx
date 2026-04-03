import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { faqItems, heroCopy, legacyMilestones, roadmapPhases, securityChecklist, whyStakeItems } from "@/content/site-content";
import { LineChart } from "@/components/charts/line-chart";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { HeroTerminal } from "@/components/marketing/hero-terminal";
import { LegacyTimeline } from "@/components/marketing/legacy-timeline";
import { RoadmapRail } from "@/components/marketing/roadmap-rail";
import { SnapshotGrid } from "@/components/marketing/snapshot-grid";
import { WhyStakeGrid } from "@/components/marketing/why-stake-grid";
import { ChartPanel } from "@/components/metrics/chart-panel";
import { PerformanceComparison } from "@/components/metrics/performance-comparison";
import { DataSourceDisclosure } from "@/components/trust/data-source-disclosure";
import { SecurityChecklist } from "@/components/trust/security-checklist";
import { getValidatorSnapshot } from "@/lib/validator/queries";
import { formatCompact, formatDateTime, formatPercent } from "@/lib/utils";

export const revalidate = 60;

export default async function HomePage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <>
      <PageSection className="pb-6 pt-10">
        <HeroTerminal
          snapshot={snapshot}
          headline={heroCopy.title}
          subheadline={heroCopy.body}
        />
      </PageSection>

      <PageSection id="snapshot">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="LIVE SNAPSHOT"
            title="Validator proof in the first scroll."
            body="The product is the validator. The website earns trust by surfacing public performance, freshness, and identity immediately."
          />
          <SnapshotGrid
            items={[
              {
                label: "Activated stake",
                value: `${formatCompact(snapshot.validator.activatedStakeSol)} SOL`,
                footnote: `Updated ${formatDateTime(snapshot.meta.updatedAt)}`
              },
              {
                label: "Stake rank",
                value: `#${snapshot.validator.stakeRank}`,
                footnote: "Comparison-oriented shorthand for validator shoppers"
              },
              {
                label: "Last vote",
                value: `${snapshot.validator.lastVoteSlot}`,
                footnote: "Public liveness signal"
              },
              {
                label: "Vote account",
                value: `${snapshot.validator.voteAccount.slice(0, 4)}...${snapshot.validator.voteAccount.slice(-4)}`,
                footnote: "Open explorer",
                href: snapshot.validator.explorerUrls.explorer
              }
            ]}
          />
        </div>
      </PageSection>

      <PageSection tone="frame">
        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <ChartPanel
            meta="METRICS TEASER"
            title="Live metrics, not marketing theater."
            body="The dashboard surface is intentionally part terminal, part product proof. Users should see trend context before they read a long story."
          >
            <div className="flex h-full flex-col justify-between">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Stake trend", value: `${formatCompact(snapshot.validator.activatedStakeSol)} SOL` },
                  { label: "Epoch rewards", value: `${formatCompact(snapshot.validator.recentEpochRewardsSol, 2)} SOL` },
                  { label: "Perf. vs avg", value: `${snapshot.validator.performanceVsNetworkPct.toFixed(2)} pts` }
                ].map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-line bg-white/[0.03] p-4">
                    <p className="panel-label">{item.label}</p>
                    <p className="mt-3 font-mono text-lg text-ink">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-40 rounded-[24px] border border-line bg-canvas/70 p-3">
                <LineChart points={snapshot.history.stake} color="#00F8B7" />
              </div>
            </div>
          </ChartPanel>
          <div className="space-y-6">
            <PerformanceComparison
              validator={snapshot.comparison.step}
              networkAverage={snapshot.comparison.networkAverage}
              label={snapshot.comparison.label}
            />
            <div className="panel p-6">
              <p className="panel-label">Metrics path</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">Ready for comparison-driven users</h3>
              <p className="mt-4 text-sm leading-7">
                The validator page should convert. The metrics page should satisfy skeptical stakers
                who want current data and methodology.
              </p>
              <ButtonLink href="/metrics" className="mt-6">
                View Live Metrics
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow="WHY STEP"
          title="Why delegators should care."
          body="This is a validator-first brand, so the value proposition needs to be simple, measurable, and credible."
        />
        <div className="mt-8">
          <WhyStakeGrid items={whyStakeItems} />
        </div>
      </PageSection>

      <PageSection tone="elevated">
        <div className="grid gap-8 xl:grid-cols-[0.85fr,1.15fr]">
          <SectionHeader
            eyebrow="STEP STORY"
            title="An early Solana brand, now narrowed to validator infrastructure."
            body="Step's past matters as context, not as the main product. This section should add credibility without making the site feel like a memorial."
          />
          <LegacyTimeline items={legacyMilestones} />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[1fr,1fr]">
          <div>
            <SectionHeader
              eyebrow="PUBLIC BY DEFAULT"
              title="Trust comes from visibility."
              body="Validator identity, freshness, public links, and narrow product scope should all be obvious without reading a whitepaper."
            />
            <div className="mt-8">
              <SecurityChecklist items={securityChecklist} />
            </div>
          </div>
          <div className="space-y-6">
            <DataSourceDisclosure sources={snapshot.sources} />
            <div className="panel p-6">
              <p className="panel-label">Scope clarity</p>
              <p className="mt-4 text-base leading-7 text-ink">
                This site focuses on the Step validator and validator-related tooling. It does not
                restore the previous Step portfolio app.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/security" variant="secondary">
                  View Security
                </ButtonLink>
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-[#5fffd3]"
                >
                  View Status
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection tone="frame">
        <SectionHeader
          eyebrow="ROADMAP"
          title="Direct non-custodial staking is the next layer, not the first dependency."
          body="The roadmap is staged on purpose: credibility first, wallet awareness second, and direct staking only when the UX and security model are ready."
        />
        <div className="mt-8">
          <RoadmapRail phases={roadmapPhases} />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <div>
            <SectionHeader
              eyebrow="FAQ"
              title="Clear about what exists now."
              body="The site should never accidentally imply that the old product has returned or that native staking is already live."
            />
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </PageSection>
    </>
  );
}
