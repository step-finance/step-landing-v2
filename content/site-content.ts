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

export type DisclosureItem = {
  title: string;
  body: string;
};

export const heroCopy = {
  eyebrow: "STEP VALIDATOR",
  title: "Delegate SOL to Step.",
  body:
    "Live vote-account data, public validator identity, and a direct delegation path on Solana mainnet.",
  ctas: [
    { href: "/validator", label: "Delegate to Step" },
    { href: "/metrics", label: "View Step metrics", variant: "secondary" as const }
  ]
};

export const whyStakeItems: ValueProp[] = [
  {
    title: "Public vote account",
    body:
      "Step shows its vote account, node identity, and explorer links before asking for delegation.",
    proof: "Verify the validator first. Delegate second.",
    accent: "accent"
  },
  {
    title: "Freshness stays visible",
    body:
      "Update timing and delayed states stay on-screen, so the Step validator page never pretends stale data is live.",
    proof: "Live, delayed, and fallback states are explicit.",
    accent: "mint"
  },
  {
    title: "Built around one validator",
    body:
      "This site is narrowly scoped to the Step validator, which keeps the surface simpler and easier to trust.",
    proof: "No app relaunch. No extra platform layer.",
    accent: "cyan"
  },
  {
    title: "Non-custodial path",
    body:
      "Delegation routes out today. Direct staking only ships if wallet control stays with the user.",
    proof: "External now. Wallet-native later.",
    accent: "amber"
  }
];

export const legacyMilestones: Milestone[] = [
  {
    year: "2021",
    title: "Early Solana brand",
    body:
      "Step became an early recognizable name in Solana."
  },
  {
    year: "2023",
    title: "Surface area cut back",
    body:
      "The product narrowed toward what could be run cleanly."
  },
  {
    year: "Now",
    title: "Step validator era",
    body:
      "Step now centers on validator ops, public data, and future non-custodial staking."
  }
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Validator site live",
    body:
      "Live Step metrics, public validator data, and external delegation with no custody surface.",
    status: "current"
  },
  {
    phase: "Phase 2",
    title: "Wallet-aware guidance",
    body:
      "Show stake context and Step-prefilled guidance before on-site transactions exist.",
    status: "next"
  },
  {
    phase: "Phase 3",
    title: "Direct non-custodial staking",
    body:
      "Add direct delegation with wallet signing, clear fees, and explicit transaction status.",
    status: "later"
  },
  {
    phase: "Phase 4",
    title: "Stake management",
    body:
      "Add stake-account views and rewards context for existing Step delegators.",
    status: "later"
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "Is the old Step app back online?",
    answer:
      "No. This site is for the Step validator, validator metrics, and future staking tooling. The old portfolio app is not being restored here."
  },
  {
    question: "Can I stake directly from this site today?",
    answer:
      "Not yet. Today the site routes delegation to external staking pages and shows the validator data needed to evaluate that step. Direct non-custodial staking is planned later."
  },
  {
    question: "Why show stale-state and source labels so prominently?",
    answer:
      "Because validator trust depends on current data. If a source slows down, the UI should say that plainly instead of acting live when it is not."
  },
  {
    question: "Does Step ever custody funds?",
    answer:
      "No. The roadmap is explicitly non-custodial. Users keep wallet control and sign their own transactions."
  }
];

export const securityChecklist: DisclosureItem[] = [
  {
    title: "Public validator identity",
    body:
      "Vote account, node identity, and explorer links are visible on the site so delegators can verify what they are using."
  },
  {
    title: "Minimal moving parts",
    body:
      "The site is static-first and avoids the old backend surface, broad auth flows, and unnecessary operational complexity."
  },
  {
    title: "Source-aware metrics",
    body:
      "Metrics carry update timestamps and source context so performance data reads like infrastructure, not promotion."
  },
  {
    title: "Non-custodial roadmap",
    body:
      "Any future staking flow should keep signing in the user wallet rather than introducing custody risk."
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
