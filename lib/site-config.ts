export const siteConfig = {
  name: "Step Validator",
  shortName: "Step",
  organizationName: "Step Finance",
  shareTitle: "Stake With the Step Validator on Solana",
  description:
    "Live validator performance, direct delegation, and Step's contributions across the Solana ecosystem.",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://step.finance",
  themeColor: "#04070C",
  icon: "/brand/step/favicon.svg",
  ogImage: "/brand/step/social-card.svg",
  network: "Solana Mainnet",
  nav: [
    { href: "/#top", label: "Home" },
    { href: "/contributions", label: "Contributions" },
    { href: "/#faq", label: "FAQ" }
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
