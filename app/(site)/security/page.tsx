import type { Metadata } from "next";

import { securityChecklist } from "@/content/site-content";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { DataSourceDisclosure } from "@/components/trust/data-source-disclosure";
import { SecurityChecklist } from "@/components/trust/security-checklist";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "Security"
};

export default async function SecurityPage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <>
      <PageSection className="pb-6 pt-10">
        <div className="panel-strong p-8 lg:p-10">
          <SectionHeader
            eyebrow="SECURITY + TRANSPARENCY"
            title="A narrow product surface is part of the trust model."
            body="The strongest security decision in MVP is to avoid unnecessary complexity: no old backend reuse, no custody, and no hidden data dependencies in the browser."
          />
        </div>
      </PageSection>
      <PageSection>
        <div className="grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
          <SecurityChecklist items={securityChecklist} />
          <div className="space-y-6">
            <div className="panel p-6">
              <p className="panel-label">Public accounts</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-[20px] border border-line bg-white/[0.03] p-4">
                  <p className="panel-label">Vote account</p>
                  <p className="mt-3 break-all font-mono text-sm text-ink">
                    {snapshot.validator.voteAccount}
                  </p>
                </div>
                <div className="rounded-[20px] border border-line bg-white/[0.03] p-4">
                  <p className="panel-label">Identity pubkey</p>
                  <p className="mt-3 break-all font-mono text-sm text-ink">
                    {snapshot.validator.identityPubkey}
                  </p>
                </div>
              </div>
              <ButtonLink href={snapshot.validator.explorerUrls.explorer} external className="mt-5">
                Open Vote Account
              </ButtonLink>
            </div>
            <DataSourceDisclosure sources={snapshot.sources} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
