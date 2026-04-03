import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/validator",
    "/metrics",
    "/about",
    "/security",
    "/faq",
    "/docs",
    "/docs/how-to-stake",
    "/docs/rewards-and-risks",
    "/docs/metrics-methodology",
    "/status",
    "/legal/privacy",
    "/legal/terms"
  ];

  return routes.map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date()
  }));
}
