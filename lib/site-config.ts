export const siteConfig = {
  name: "Step Validator",
  description:
    "Premium validator infrastructure for Solana with live public metrics, transparent operations, and a clean path to non-custodial staking.",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://step.finance",
  network: "Solana Mainnet",
  nav: [
    { href: "/", label: "Home" },
    { href: "/validator", label: "Validator" },
    { href: "/metrics", label: "Metrics" },
    { href: "/docs", label: "Docs" },
    { href: "/security", label: "Security" },
    { href: "/about", label: "About" }
  ],
  socials: [
    { href: "https://x.com/stepfinance_", label: "X" },
    { href: "https://github.com/step-finance", label: "GitHub" },
    { href: "https://discord.gg/stepfinance", label: "Discord" }
  ]
};

export function getAbsoluteUrl(path = "/") {
  return new URL(path, siteConfig.domain).toString();
}
