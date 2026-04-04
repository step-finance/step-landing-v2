import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    host: siteConfig.domain,
    sitemap: `${siteConfig.domain}/sitemap.xml`
  };
}
