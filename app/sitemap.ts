import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/contributions"];

  return routes.map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date()
  }));
}
