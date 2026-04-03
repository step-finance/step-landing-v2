import type { Metadata } from "next";

import { LineChart } from "@/components/charts/line-chart";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChartPanel } from "@/components/metrics/chart-panel";
import { MetricCard } from "@/components/metrics/metric-card";
import { PerformanceComparison } from "@/components/metrics/performance-comparison";
import { DataFreshnessBadge } from "@/components/trust/data-freshness-badge";
import { DataSourceDisclosure } from "@/components/trust/data-source-disclosure";
import { getValidatorSnapshot } from "@/lib/validator/queries";
import { formatCompact, formatPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Metrics"
};

export const revalidate = 60;

export default async function MetricsPage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <>
      <PageSection className="pb-6 pt-10">
        <div className="panel-strong p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="METRICS TERMINAL"
              title="A dashboard-first layer for serious validator comparison."
              body="This page favors fresh data, trend context, and methodology links over generic conversion fluff."
            />
            <DataFreshnessBadge
              updatedAt={snapshot.meta.updatedAt}
              state={snapshot.meta.freshnessState}
            />
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-6 xl:grid-cols-2">
          <ChartPanel
            meta="STAKE TREND"
            title="Delegated stake trend"
            body="Stake movement is one of the clearest signals of validator momentum, trust, and consistency."
          >
            <LineChart points={snapshot.history.stake} color="#00F8B7" />
          </ChartPanel>
          <ChartPanel
            meta="REWARDS TREND"
            title="Recent epoch rewards"
            body="Rewards should be framed as recent outcomes with clear caveats, not as a guaranteed outcome."
          >
            <LineChart points={snapshot.history.rewards} color="#118AB2" />
          </ChartPanel>
        </div>
      </PageSection>

      <PageSection tone="frame">
        <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
          <PerformanceComparison
            validator={snapshot.comparison.step}
            networkAverage={snapshot.comparison.networkAverage}
            label={snapshot.comparison.label}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Commission"
              value={formatPercent(snapshot.validator.commission)}
              footnote="Core validator decision input"
            />
            <MetricCard
              label="Last vote slot"
              value={`${snapshot.validator.lastVoteSlot}`}
              footnote="Immediate liveness signal"
            />
            <MetricCard
              label="Uptime"
              value={formatPercent(snapshot.validator.uptime)}
              footnote="Operator reliability cue"
            />
            <MetricCard
              label="Activated stake"
              value={`${formatCompact(snapshot.validator.activatedStakeSol)} SOL`}
              footnote="Operational scale"
            />
          </div>
        </div>
      </PageSection>

      <PageSection>
        <DataSourceDisclosure sources={snapshot.sources} />
      </PageSection>
    </>
  );
}
