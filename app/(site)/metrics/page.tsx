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
              title="A validator dashboard, not a decorative chart page."
              body="Use this view to read stake trend, reward context, freshness, and current spread versus the network baseline."
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
            body="Stake movement is one of the clearest live signals of validator trust and consistency."
          >
            <div className="flex h-full flex-col">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Window", value: "30D" },
                  { label: "Current stake", value: `${formatCompact(snapshot.validator.activatedStakeSol)} SOL` },
                  { label: "Updated", value: snapshot.meta.updatedAt ? "Live snapshot" : "Cached" }
                ].map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-line bg-white/[0.03] p-3">
                    <p className="panel-label">{item.label}</p>
                    <p className="mt-2 font-mono text-sm text-ink">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-full">
                <LineChart points={snapshot.history.stake} color="#00F8B7" />
              </div>
            </div>
          </ChartPanel>
          <ChartPanel
            meta="REWARDS TREND"
            title="Recent epoch rewards"
            body="Rewards belong here as recent outcomes, with caveats, not as a guarantee."
          >
            <div className="flex h-full flex-col">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Epoch signal", value: `${formatCompact(snapshot.validator.recentEpochRewardsSol, 2)} SOL` },
                  { label: "Est. APY", value: formatPercent(snapshot.validator.apyEstimate) },
                  { label: "Method", value: "Snapshot + trend" }
                ].map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-line bg-white/[0.03] p-3">
                    <p className="panel-label">{item.label}</p>
                    <p className="mt-2 font-mono text-sm text-ink">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-full">
                <LineChart points={snapshot.history.rewards} color="#118AB2" />
              </div>
            </div>
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
