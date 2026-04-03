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
import { DataFreshnessBadge } from "@/components/trust/data-freshness-badge";
import { DataSourceDisclosure } from "@/components/trust/data-source-disclosure";
import { SecurityChecklist } from "@/components/trust/security-checklist";
import { getValidatorSnapshot } from "@/lib/validator/queries";
import { formatAddress, formatCompact, formatDateTime, formatPercent, formatRelativeTime } from "@/lib/utils";

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

      <PageSection id="snapshot" tone="frame" className="pt-4">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="VALIDATOR PROOF"
              title="The Step validator, in one screen."
              body="Stake, rank, vote activity, and public identity belong in the first scroll."
            />
            <DataFreshnessBadge
              updatedAt={snapshot.meta.updatedAt}
              state={snapshot.meta.freshnessState}
            />
          </div>
          <SnapshotGrid
            items={[
              {
                label: "Step activated stake",
                value: `${formatCompact(snapshot.validator.activatedStakeSol)} SOL`,
                footnote: `Snapshot ${formatDateTime(snapshot.meta.updatedAt)}`
              },
              {
                label: "Step rank",
                value: `#${snapshot.validator.stakeRank}`,
                footnote: "Current validator position"
              },
              {
                label: "Last vote age",
                value: formatRelativeTime(snapshot.validator.lastVoteAt),
                footnote: `${snapshot.validator.lastVoteSlot}`
              },
              {
                label: "Step vote account",
                value: formatAddress(snapshot.validator.voteAccount, 6, 6),
                footnote: "Open vote account",
                href: snapshot.validator.explorerUrls.explorer
              }
            ]}
          />
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <ChartPanel
            meta="METRICS TERMINAL"
            title="Step metrics, not landing-page theater."
            body="Recent stake movement, reward context, and validator timing should read like operating data."
          >
            <div className="flex h-full flex-col justify-between">
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  { label: "Trend window", value: "30D" },
                  { label: "Step epoch rewards", value: `${formatCompact(snapshot.validator.recentEpochRewardsSol, 2)} SOL` },
                  { label: "Step vs network", value: `${snapshot.validator.performanceVsNetworkPct.toFixed(2)} pts` },
                  { label: "Snapshot age", value: formatRelativeTime(snapshot.meta.updatedAt) }
                ].map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-line bg-white/[0.03] p-4">
                    <p className="panel-label">{item.label}</p>
                    <p className="mt-3 font-mono text-base text-ink sm:text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-44 rounded-[24px] border border-line bg-canvas/70 p-3">
                <LineChart points={snapshot.history.stake} color="#00F8B7" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                <span>{snapshot.history.stake[0]?.label ?? "Start"}</span>
                <span>Step activated stake</span>
                <span>{snapshot.history.stake.at(-1)?.label ?? "Now"}</span>
              </div>
            </div>
          </ChartPanel>
          <div className="space-y-4">
            <PerformanceComparison
              validator={snapshot.comparison.step}
              networkAverage={snapshot.comparison.networkAverage}
              label={snapshot.comparison.label}
            />
            <div className="panel p-6">
              <p className="panel-label">STEP DETAILS</p>
              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Step vote account",
                    value: formatAddress(snapshot.validator.voteAccount, 8, 8)
                  },
                  {
                    label: "Step node identity",
                    value: formatAddress(snapshot.validator.identityPubkey, 8, 8)
                  },
                  {
                    label: "Step commission",
                    value: formatPercent(snapshot.validator.commission)
                  }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-none last:pb-0">
                    <span className="text-sm text-muted">{item.label}</span>
                    <span className="font-mono text-sm text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
              <ButtonLink href="/metrics" className="mt-6 w-full">
                Open Step metrics
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow="WHY STEP"
          title="Why delegate to Step."
          body="Keep the case narrow: public validator identity, explicit freshness, simpler operations, and a non-custodial staking path."
        />
        <div className="mt-8">
          <WhyStakeGrid items={whyStakeItems} />
        </div>
      </PageSection>

      <PageSection tone="elevated" className="py-8 lg:py-10">
        <div className="grid gap-6 xl:grid-cols-[0.72fr,1.28fr]">
          <SectionHeader
            eyebrow="STEP STORY"
            title="Step, narrowed to validator work."
            body="The history still matters. The validator comes first."
          />
          <LegacyTimeline items={legacyMilestones} />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[1fr,1fr]">
          <div>
            <SectionHeader
              eyebrow="PUBLIC BY DEFAULT"
              title="Validator trust should be inspectable."
              body="Identity, freshness, source handling, and product scope should read clearly on the landing page."
            />
            <div className="mt-8">
              <SecurityChecklist items={securityChecklist} />
            </div>
          </div>
          <div className="space-y-6">
            <DataSourceDisclosure sources={snapshot.sources} />
            <div className="panel p-6">
              <p className="panel-label">WHAT THIS SITE IS</p>
              <p className="mt-4 text-base leading-7 text-ink">
                This is the Step validator site: live data, public accounts, and delegation paths.
                It is not a relaunch of the old portfolio app.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink
                  href={snapshot.validator.explorerUrls.explorer}
                  external
                  variant="secondary"
                >
                  Open vote account
                </ButtonLink>
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-[#5fffd3]"
                >
                  View ops status
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
          title="Step staking UX comes in stages."
          body="First keep the validator clear. Then add wallet-aware guidance. Then add direct non-custodial staking."
        />
        <div className="mt-6">
          <RoadmapRail phases={roadmapPhases} />
        </div>
      </PageSection>

      <PageSection className="pt-6">
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <div>
            <SectionHeader
              eyebrow="FAQ"
              title="What the Step site supports today."
              body="Step validator data and delegation are live here. Native staking UX is not."
            />
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </PageSection>
    </>
  );
}
