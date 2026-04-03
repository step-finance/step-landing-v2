import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export default async function SiteLayout({
  children
}: {
  children: ReactNode;
}) {
  const snapshot = await getValidatorSnapshot();

  return <SiteShell snapshot={snapshot}>{children}</SiteShell>;
}
