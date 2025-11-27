# Fairdrop - Fair Price Discovery Through Dutch Auctions

Fairdrop is a decentralized, transparent, and market-driven auction protocol that revolutionizes how digital assets are priced and distributed. Using a descending-price (Dutch-style) model with uniform clearing, Fairdrop ensures every participant pays the same fair price discovered by true market demand.


**Smart Contracts**: [github.com/wisdomabioye/fairdrop-evm](https://github.com/wisdomabioye/fairdrop-evm)


## 🎯 Key Problems Solved

- **No Gas Wars**: Descending price model eliminates competition for transaction priority
- **No Front-Running**: Time-based pricing removes MEV exploitation opportunities
- **Fair Price Discovery**: Market-driven clearing price ensures optimal valuation
- **Equal Treatment**: Uniform clearing means everyone pays the same final price
- **No Early-Bird Penalty**: Automatic refunds ensure early participants aren't penalized
- **Transparent Process**: All bids and price changes recorded on-chain
- **Predictable Costs**: Users know maximum price before bidding

## 🚀 Core Features

- **Automated Price Reduction**: Smart contracts reduce price automatically at preset intervals
- **Uniform Clearing**: All participants pay the same final clearing price
- **Automatic Refunds**: Early bidders receive refunds for overpayment
- **MEV-Resistant**: No incentive for front-running since price only decreases
- **Multi-Payment Support**: Accepts both ERC20 tokens and native ETH
- **Whitelist Support**: Enable private sales with address whitelisting
- **Pro-Rata Allocation**: Support overbidding with proportional distribution
- **Allocation Limits**: Prevent whale dominance with per-user caps

## 🌐 Supported Chains

- ✅ **Polygon Amoy (Testnet)** - Live
- 🚧 **Polygon Mainnets, Ethereum, Base, Arbitrum, Optimism (Mainnet)** - Mainnet support coming Q1 2026
- 🚧 **Linera** - Q1 2026

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS v4
- **Wallet Integration**: RainbowKit + Wagmi v2
- **Blockchain**: Viem
- **Smart Contracts**: [fairdrop-evm](https://github.com/wisdomabioye/fairdrop-evm)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Reown (WalletConnect) Project ID
- Alchemy API key (optional, recommended)

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id

# Optional (recommended)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
# Used for connecting to Alchemy's blockchain API for reliable RPC access (optional, recommended)
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Type check + Build
npm run build

# Start production
npm start
```

## 💡 How It Works

### Example: Token Sale

**Setup**: 1,000,000 tokens, starting at $0.18, decreasing $0.01 per 10 blocks

**Users Bid**:
- User A: 10,000 tokens at $0.18 = pays $1,800
- User B: 10,000 tokens at $0.15 = pays $1,500
- User C: 10,000 tokens at $0.12 = pays $1,200

**Final clearing price**: $0.12

**Result** (everyone pays $0.12/token):
- User A: 10,000 tokens + **$600 refund**
- User B: 10,000 tokens + **$300 refund**
- User C: 10,000 tokens + **$0 refund**

No early-bird penalty. No gas wars. Fair for everyone.

## 🎯 Use Cases

### Token Projects
Fair token launches with no gas wars or front-running, uniform clearing price for all participants.

### NFT Creators
Launch collections with transparent pricing, whitelist support, and fair community distribution.

### DAOs & Communities
Distribute tokens fairly with allocation limits to prevent whale dominance.

### Real World Assets
Tokenize real estate, commodities, and carbon credits with KYC/AML compliance support.

## 🗺️ Roadmap

**Phase 1: MVP Launch (Q1 2026)** - In Progress
Smart contracts, front-end, first live auctions, multi-chain support

**Phase 2: Governance & Expansion (Q2 2026)**
DAO structure, Linera integration, RWA templates, KYC/AML framework

**Phase 3: AI & Analytics (Q3 2026)**
Smart pricing oracle, demand prediction, bid strategy AI, fraud detection

**Phase 4: Global Adoption (Q4 2026+)**
Fiat integration, white-label solutions, mobile app, institutional compliance

## 📖 Documentation

- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for blockchain integration details
- **Whitepaper**: See [FAIRDROP.md](./FAIRDROP.md) for complete protocol specification
- **Smart Contracts**: [fairdrop-evm](https://github.com/wisdomabioye/fairdrop-evm)

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - TypeCheck + Build for production
- `npm run typecheck` - Run TypeScript checks
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📞 Contact

- **Website**: www.fairdrop.io (launching Q1 2026)
- **Website**: www.fairdrop.io (coming soon)
- **Smart Contracts**: [github.com/wisdomabioye/fairdrop-evm](https://github.com/wisdomabioye/fairdrop-evm)

---

**Empowering fair and transparent markets for all participants.**
