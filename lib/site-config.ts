export const siteConfig = {
  name: "Step Validator",
  description:
    "Step validator on Solana with public data and delegation links.",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://step.finance",
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
