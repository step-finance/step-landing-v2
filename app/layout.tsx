import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { getAbsoluteUrl, siteConfig } from "@/lib/site-config";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: siteConfig.themeColor
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.shareTitle,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.organizationName, url: siteConfig.domain }],
  creator: siteConfig.organizationName,
  publisher: siteConfig.organizationName,
  keywords: [
    "Step Validator",
    "Step Finance",
    "Solana validator",
    "SOL staking",
    "Solana delegation",
    "Step contributions"
  ],
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: getAbsoluteUrl("/")
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "512x512" },
      { url: siteConfig.icon, type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    shortcut: [siteConfig.icon]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name
  },
  openGraph: {
    title: siteConfig.shareTitle,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [
      {
        url: getAbsoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "Step Validator"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.shareTitle,
    description: siteConfig.description,
    images: [getAbsoluteUrl(siteConfig.ogImage)]
  }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizationName,
    url: siteConfig.domain,
    logo: getAbsoluteUrl("/icon"),
    sameAs: siteConfig.socials.map((social) => social.href)
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName
    }
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
