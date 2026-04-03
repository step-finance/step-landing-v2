export type ValueProp = {
  title: string;
  body: string;
  proof: string;
  accent: "accent" | "mint" | "cyan" | "amber" | "orange";
};

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  body: string;
  status: "current" | "next" | "later";
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type DocCard = {
  href: string;
  title: string;
  body: string;
  cta: string;
};

export type DisclosureItem = {
  title: string;
  body: string;
};

export const heroCopy = {
  eyebrow: "STEP VALIDATOR",
  title: "Stake with a validator built for Solana's next chapter.",
  body:
    "Step now focuses on validator infrastructure, public performance data, and a cleaner path to non-custodial staking.",
  ctas: [
    { href: "/validator", label: "Stake with Step" },
    { href: "/metrics", label: "View Live Metrics", variant: "secondary" as const }
  ]
};

export const whyStakeItems: ValueProp[] = [
  {
    title: "Public data over vague claims",
    body:
      "Every headline metric is timestamped, source-aware, and paired with public explorer links.",
    proof: "Freshness, source labels, and explorer verification built in.",
    accent: "accent"
  },
  {
    title: "Validator-first focus",
    body:
      "This site is intentionally narrow: one validator, one trust story, and one conversion path.",
    proof: "No dependency on the old broken app or backend.",
    accent: "mint"
  },
  {
    title: "Built to degrade gracefully",
    body:
      "Static-first rendering and cached snapshots keep the site useful even when external data slows down.",
    proof: "Last-known-good data and delayed-state handling are part of the UI.",
    accent: "cyan"
  },
  {
    title: "Roadmap without custody risk",
    body:
      "Direct staking can come later, but only as a non-custodial flow that respects wallet ownership.",
    proof: "External delegation first, direct staking only when the surface is ready.",
    accent: "amber"
  }
];

export const legacyMilestones: Milestone[] = [
  {
    year: "2021",
    title: "Early Solana brand momentum",
    body:
      "Step established itself as an early recognizable name in the Solana ecosystem."
  },
  {
    year: "2023",
    title: "Operational simplification",
    body:
      "The focus shifted away from broad app surface area and toward what can be run reliably."
  },
  {
    year: "Now",
    title: "Validator-focused Step",
    body:
      "The brand now centers on public validator infrastructure, trust, and future non-custodial staking."
  }
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Marketing + external delegation",
    body:
      "Live validator metrics, trusted links out, and staking guidance with no custody surface.",
    status: "current"
  },
  {
    phase: "Phase 2",
    title: "Wallet-aware guidance",
    body:
      "Connect a wallet to see stake context and validator-prefilled guidance without transaction execution.",
    status: "next"
  },
  {
    phase: "Phase 3",
    title: "Direct non-custodial staking",
    body:
      "Transaction building and wallet signing on-site with transparent fees and clear risk boundaries.",
    status: "later"
  },
  {
    phase: "Phase 4",
    title: "Stake management",
    body:
      "Rewards visibility, stake account actions, and management tools for existing Step delegators.",
    status: "later"
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "Is the old Step app back online?",
    answer:
      "No. This website focuses on the Step validator, validator metrics, and future staking-related tooling. It does not restore the previous portfolio app."
  },
  {
    question: "Can I stake directly from this site today?",
    answer:
      "Not yet. MVP uses clear external delegation paths and staking guides. Direct non-custodial staking is planned for a later phase."
  },
  {
    question: "Why show stale-state and source labels so prominently?",
    answer:
      "Validator trust depends on data quality. If live sources slow down, the site should say so plainly instead of pretending everything is current."
  },
  {
    question: "Does Step ever custody funds?",
    answer:
      "No. The roadmap is explicitly non-custodial. Users keep control of their wallet and sign their own transactions."
  }
];

export const securityChecklist: DisclosureItem[] = [
  {
    title: "Public validator identity",
    body:
      "Vote account, identity, and explorer links are shown directly on the site to reduce ambiguity."
  },
  {
    title: "Minimal moving parts",
    body:
      "The website is static-first and does not depend on the previous backend or a broad authenticated app surface."
  },
  {
    title: "Source-aware metrics",
    body:
      "Displayed stats include update timestamps, freshness policy, and a methodology page for interpretation."
  },
  {
    title: "Non-custodial roadmap",
    body:
      "Future staking flows are intended to use user wallets for signing rather than introducing custody risk."
  }
];

export const docsCards: DocCard[] = [
  {
    href: "/docs/how-to-stake",
    title: "How to stake with Step",
    body:
      "A practical guide to external delegation in MVP and what to expect before direct staking exists.",
    cta: "Read the guide"
  },
  {
    href: "/docs/rewards-and-risks",
    title: "Rewards and risks",
    body:
      "Understand commission, rewards timing, activation delays, and why APY is always an estimate.",
    cta: "Understand staking"
  },
  {
    href: "/docs/metrics-methodology",
    title: "Metrics methodology",
    body:
      "See where validator data comes from, how often it refreshes, and when the UI marks data as delayed.",
    cta: "Review methodology"
  }
];

export const statusFeeds = [
  {
    title: "Validator snapshot pipeline",
    status: "Operational",
    detail: "Snapshot data is cached and served with last-known-good fallback."
  },
  {
    title: "Primary Solana RPC",
    status: "Ready",
    detail: "Configured through server env for runtime fetches and future staking support."
  },
  {
    title: "External delegation paths",
    status: "MVP",
    detail: "Wallet-native staking is intentionally deferred until the UX and security surface are ready."
  }
];
