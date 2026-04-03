import type { Metadata } from "next";

import { statusFeeds } from "@/content/site-content";
import { statusIncidents } from "@/content/status/incidents";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { StatusPanel } from "@/components/trust/status-panel";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "Status"
};

export default async function StatusPage() {
  await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="space-y-8">
        <SectionHeader
          eyebrow="STATUS"
          title="Public operations notes help trust travel farther."
          body="The status page should make it easy to understand snapshot health, data freshness, and any notable changes to the validator-related experience."
        />
        <StatusPanel feeds={statusFeeds} incidents={statusIncidents} />
      </div>
    </PageSection>
  );
}
