export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export type ContributionItem = {
  period: string;
  title: string;
  body: string;
  proof: string;
};

export type ReferenceItem = {
  source: string;
  year: string;
  title: string;
  body: string;
  href: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const heroCopy = {
  eyebrow: "STEP VALIDATOR",
  title: "Delegate SOL to Step.",
  body:
    "A long-running Solana validator backed by one of the ecosystem's early teams."
};

export const contributionPreview = {
  eyebrow: "CONTRIBUTIONS",
  title: "Step's contributions to Solana.",
  body:
    "Step has been building on Solana since early 2021 across product, data, media, events, and education.",
  tags: ["Portfolio dashboard", "Analytics + API", "Crossroads", "SolanaFloor", "Allstars Academy", "RWAs / Remora"]
};

export const contributionHighlights: ContributionItem[] = [
  {
    period: "2021 onward",
    title: "Portfolio dashboard",
    body:
      "Step's original product gave Solana users a single place to track wallets, LP positions, farming positions, NFTs, and onchain activity when the ecosystem was still fragmented.",
    proof:
      "CoinDesk covered Step in April 2021 as a Solana dashboard born out of the Solana hackathon."
  },
  {
    period: "2021 onward",
    title: "Analytics and portfolio API",
    body:
      "Step expanded beyond a wallet UI into analytics and developer data, including portfolio and position APIs for Solana wallets.",
    proof:
      "Step's Portfolio API covered token balances, yield assets, NFTs, farms, DEXs, staking, lending, vaults, and margin."
  },
  {
    period: "2022 onward",
    title: "SolanaFloor",
    body:
      "Step expanded into ecosystem media through SolanaFloor, pairing product work with reporting, research, and broader Solana coverage.",
    proof:
      "CoinDesk covered the SolanaFloor acquisition in 2022 as part of Step's expansion into media and ecosystem coverage."
  },
  {
    period: "2023 onward",
    title: "Solana Crossroads",
    body:
      "Step built one of the most visible in-person Solana conferences, bringing teams, founders, and community members together around the ecosystem roadmap.",
    proof:
      "Crossroads has been presented as a major event in the ecosystem for over three years, with the 2025 edition planned for 2,000+ attendees in Istanbul."
  },
  {
    period: "2023 onward",
    title: "Solana Allstars Academy",
    body:
      "Step backed local education and community growth through Allstars Academy, pushing Solana onboarding and product education far beyond crypto-native hubs.",
    proof:
      "Allstars had hosted 1,240 events in 98 cities across 6 countries, engaging 128,000+ attendees as of July 2025."
  },
  {
    period: "2025 onward",
    title: "Remora Markets / RWAs",
    body:
      "Step expanded into real-world assets through Remora Markets, a Solana venue for tokenized stocks and metals. It entered the same tokenized-equity lane as xStocks, with Ondo arriving on Solana later.",
    proof:
      "Remora's own site positioned it around tokenized stocks on Solana, and January 2026 coverage highlighted metals including gold, silver, platinum, palladium, and copper."
  }
];

export const contributionMilestones: Milestone[] = [
  {
    year: "Early 2021",
    title: "Early Solana dashboard",
    body:
      "Step emerged in the early Solana product wave and quickly became one of the more visible consumer brands around wallet and portfolio tracking."
  },
  {
    year: "2021",
    title: "Analytics + aggregation",
    body:
      "The product expanded from portfolio views into aggregation, analytics, and developer-facing data for wallets and onchain positions."
  },
  {
    year: "2022",
    title: "SolanaFloor acquisition",
    body:
      "Step added SolanaFloor, extending the brand from dashboards and analytics into media, NFT data, and ecosystem coverage."
  },
  {
    year: "2023-2025",
    title: "Crossroads + Allstars",
    body:
      "Crossroads and Allstars turned Step into more than a product brand, with recurring conferences, meetups, and education programs across multiple countries."
  },
  {
    year: "2025 onward",
    title: "Remora Markets",
    body:
      "Step's product footprint also extended into RWAs through Remora Markets, bringing tokenized stocks and later onchain metals to Solana."
  },
  {
    year: "Now",
    title: "Validator-focused site",
    body:
      "The public site is much smaller today, but the validator sits on top of years of product, media, and community work across Solana."
  }
];

export const contributionReferences: ReferenceItem[] = [
  {
    source: "CoinDesk",
    year: "Apr 2021",
    title: "Step dashboard funding round",
    body:
      "CoinDesk described Step as a trading dashboard born out of the Solana hackathon and covered its early 2021 fundraise.",
    href: "https://www.coindesk.com/business/2021/04/13/solana-dashboard-step-finance-raises-2m-from-alameda-research-3-commas/"
  },
  {
    source: "CoinDesk",
    year: "Jun 2021",
    title: "DEX aggregation coverage",
    body:
      "CoinDesk covered Step's work aggregating Solana DEX liquidity and positioning itself as a single entry point for portfolios on Solana.",
    href: "https://www.coindesk.com/markets/2021/06/16/step-finance-to-aggregate-solanas-decentralized-exchanges-onto-dashboard/"
  },
  {
    source: "CoinDesk",
    year: "Jul 2022",
    title: "SolanaFloor acquisition",
    body:
      "CoinDesk covered Step's acquisition of SolanaFloor as an expansion from DeFi data into NFT data insights and broader ecosystem coverage.",
    href: "https://www.coindesk.com/business/2022/07/28/step-finance-acquires-solanafloor-to-provide-defi-nft-data-insights/"
  },
  {
    source: "X / @SolanaCrossroad",
    year: "Current",
    title: "Crossroads",
    body:
      "Crossroads has been presented as a major recurring Solana event, with the 2025 edition planned for 2,000+ attendees in Istanbul.",
    href: "https://x.com/SolanaCrossroad"
  },
  {
    source: "X / @AllstarsAC",
    year: "Current",
    title: "Allstars Academy",
    body:
      "Allstars reports 1,240 events in 98 cities across 6 countries and 128,000+ attendees as of July 2025.",
    href: "https://x.com/AllstarsAC"
  },
  {
    source: "Remora Markets",
    year: "2025",
    title: "Official site",
    body:
      "Remora described itself as a Solana platform for tokenized stocks with non-custodial ownership, proof-of-reserves, and Solana wallet and DeFi integration.",
    href: "https://remoramarkets.xyz/"
  },
  {
    source: "BlockNews",
    year: "Jan 2026",
    title: "Copper RWA traction",
    body:
      "January 2026 coverage highlighted Remora's tokenized copper product and noted that copper had been largely absent from onchain markets.",
    href: "https://blocknews.com/solana-based-rwas-show-early-copper-accumulation-as-on-chain-demand-builds/"
  },
  {
    source: "X / @RemoraMarkets",
    year: "Current",
    title: "Remora Markets on X",
    body:
      "Public account for product updates and launch communications around Remora Markets.",
    href: "https://x.com/RemoraMarkets"
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "Is the old Step app back online?",
    answer:
      "No. The site is focused on the Step validator. The old portfolio dashboard is not live here."
  },
  {
    question: "Can I stake directly from this site today?",
    answer:
      "Not yet. The site links out to public validator pages for delegation and does not custody funds."
  },
  {
    question: "Where does the live validator data come from?",
    answer:
      "The live metrics come from free public Solana RPC. If the source is unavailable, the page marks the live data unavailable."
  },
  {
    question: "Why is the site so much simpler now?",
    answer:
      "The site now focuses on the validator. Step's broader product and ecosystem history is on the Contributions page."
  },
  {
    question: "Where can I see what Step built beyond the validator?",
    answer:
      "The Contributions page covers Step's earlier dashboard, analytics, SolanaFloor, Crossroads, and Allstars work."
  }
];
