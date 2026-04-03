import type { Metadata } from "next";

import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "Privacy"
};

export default async function PrivacyPage() {
  await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="space-y-6">
        <SectionHeader
          eyebrow="PRIVACY"
          title="A lightweight privacy baseline for a mostly static site."
          body="MVP privacy policy should stay simple: analytics should be minimal, wallet connections are not live yet, and public validator links do not require user accounts."
        />
        <div className="panel p-6">
          <p className="text-base leading-7 text-ink">
            This site is designed to avoid unnecessary personal data collection. If lightweight
            analytics are enabled, they should be used to understand page performance and conversion
            flow, not to build broad behavioral profiles.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
