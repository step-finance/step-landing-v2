import type { Metadata } from "next";

import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "Terms"
};

export default async function TermsPage() {
  await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="space-y-6">
        <SectionHeader
          eyebrow="TERMS"
          title="A validator information site should stay explicit about scope."
          body="Terms should clarify that the site provides validator information, links, and later non-custodial tooling. It should not imply investment advice or custody."
        />
        <div className="panel p-6">
          <p className="text-base leading-7 text-ink">
            Information on this site is provided for informational purposes. Staking involves
            network and operational risk, and users remain responsible for their own wallet actions
            and delegation decisions.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
