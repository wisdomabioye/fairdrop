/**
 * Fairdrop Constants
 * Centralized source of truth for project information
 * Based on FAIRDROP.md whitepaper
 */

export const FAIRDROP = {
  // Brand Information
  name: "Fairdrop",
  slug: "fairdrop",
  tagline: "Fair Price Discovery for Everyone",
  title: "Fairdrop | Decentralized Auction Protocol",

  // Descriptions
  description:
    "A decentralized, transparent, and market-driven auction protocol designed to revolutionize how digital assets and products are priced and distributed.",
  shortDescription:
    "Decentralized auction protocol with fair price discovery through descending-price mechanics.",

  // Executive Summary
  summary:
    "Fairdrop is a decentralized, transparent, and market-driven auction protocol designed to revolutionize how digital assets and products are priced and distributed. By using a descending-price (Dutch-style) model with uniform clearing, Fairdrop ensures that every participant pays the same fair price discovered by true market demand.",

  // Keywords
  keywords: [
    "decentralized auction",
    "Dutch auction",
    "price discovery",
    "blockchain",
    "fair pricing",
    "token sale",
    "NFT auction",
    "Web3",
    "smart contracts",
  ],

  // Contact Information
  contact: {
    email: "xpldevelopers@gmail.com",
    website: "www.fairdrop.io",
  },

  // Core Features
  features: [
    {
      title: "Automated Price Reduction",
      description: "Smart contracts reduce price automatically at preset intervals.",
    },
    {
      title: "Uniform Clearing",
      description: "All participants pay the same final clearing price, ensuring fairness.",
    },
    {
      title: "Dynamic Floor Price",
      description: "Prevents undervaluation while maintaining market flexibility.",
    },
    {
      title: "Transparency",
      description: "Every bid, price change, and sale event is recorded on-chain.",
    },
    {
      title: "Cross-Asset Compatibility",
      description: "Works for tokens, NFTs, digital collectibles, and real-world products.",
    },
  ],

  // Revenue Model
  revenue: {
    transactionFee: {
      min: 1,
      max: 3,
      unit: "percent",
      description: "Transaction fee on each successful auction",
    },
    models: [
      "Subscription model for enterprise and business clients",
      "Advanced analytics dashboards for pricing insights",
      "White-label integration for brands and Web3 projects",
    ],
  },

  // Roadmap
  roadmap: [
    {
      phase: "Phase 1: MVP Launch",
      timeline: "Q1 2026",
      milestones: [
        "Smart contract deployment",
        "Front-end launch",
        "First live auction",
      ],
    },
    {
      phase: "Phase 2: Ecosystem Expansion",
      timeline: "Q2 2026",
      milestones: [
        "Integration with NFT marketplaces",
        "Token project partnerships",
      ],
    },
    {
      phase: "Phase 3: Governance Integration",
      timeline: "Q3 2026",
      milestones: [
        "DAO structure for protocol upgrades",
        "Community voting implementation",
      ],
    },
    {
      phase: "Phase 4: Analytics & AI",
      timeline: "Q4 2026",
      milestones: [
        "AI-driven price optimization",
        "Buyer sentiment tracking",
      ],
    },
    {
      phase: "Phase 5: Global Expansion",
      timeline: "2027",
      milestones: [
        "Multi-chain support",
        "Fiat on/off ramp integration",
      ],
    },
  ],

  // Vision
  vision:
    "To become the universal standard for transparent, fair, and automated price discovery. By merging blockchain automation with data-driven insights, Fairdrop envisions a decentralized global marketplace where price discovery is efficient, fair, and open to all participants.",

  // Use Case Example
  exampleUseCase: {
    scenario: "Token Sale",
    totalTokens: 1_000_000,
    startingPrice: 0.18,
    priceDecrement: 0.01,
    decrementInterval: "10 blocks",
    finalClearingPrice: 0.12,
    description:
      "In a hypothetical launch of 1,000,000 tokens, Fairdrop begins pricing at $0.18 per token, decreasing by $0.01 every 10 blocks until demand equals supply. When the final clearing price reaches $0.12, all participants pay this amount, ensuring fair market valuation and equal treatment.",
  },

  // Metadata
  meta: {
    version: "2025 Edition",
    status: "Beta",
    blockchain: "Multi-chain (planned)",
    license: "Proprietary",
  },
} as const

// Type exports for better TypeScript support
export type FairdropFeature = (typeof FAIRDROP.features)[number]
export type FairdropRoadmapPhase = (typeof FAIRDROP.roadmap)[number]
