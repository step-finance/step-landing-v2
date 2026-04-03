import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/validator",
    "/metrics",
    "/about",
    "/faq",
    "/status",
    "/legal/privacy",
    "/legal/terms"
  ];

  return routes.map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date()
  }));
}
