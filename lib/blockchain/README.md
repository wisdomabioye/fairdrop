# Blockchain Integration

This directory contains the blockchain integration layer for Fairdrop, supporting multiple chains with a clean adapter pattern.

## Architecture

```
lib/blockchain/
├── abis/                    # Contract ABIs
│   ├── Auction.ts          # Auction contract ABI
│   ├── AuctionFactory.ts   # Factory contract ABI
│   └── index.ts
├── adapters/               # Chain-specific adapters
│   ├── ethereum.ts         # Ethereum/Polygon adapter (uses viem)
│   ├── linera.ts
│   ├── polygon.ts
│   └── solana.ts
├── config/                 # Configuration
│   ├── chains.ts           # Chain configurations
│   ├── contracts.ts        # Contract addresses by chain
│   ├── viem.ts            # Viem client setup
│   └── wagmi.ts           # Wagmi configuration
├── contracts/             # Typed contract wrappers
│   ├── AuctionContract.ts
│   ├── AuctionFactoryContract.ts
│   └── index.ts
├── hooks/                 # React hooks
│   ├── useAuction.ts
│   └── useAuctionFactory.ts
├── providers/             # React providers
│   └── WagmiProvider.tsx
├── wallets/              # Wallet management
│   ├── WalletService.ts
│   └── types.ts
└── factory.ts            # Adapter factory
```

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your contract addresses:

```bash
cp .env.example .env.local
```

### 2. Add WagmiProvider to your app

Wrap your app with the `WagmiProvider`:

```tsx
// app/layout.tsx
import { WagmiProvider } from '@/lib/blockchain/providers/WagmiProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider>
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}
```

## Usage

### Using the Adapter Pattern (Existing Pattern)

```tsx
import { useBlockchain } from '@/hooks/useBlockchain';

function MyComponent() {
  const { adapter, connect, placeBid } = useBlockchain();

  const handleConnect = async () => {
    await connect();
  };

  const handleBid = async () => {
    await placeBid('1', 100); // auctionId, amount
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect Wallet</button>
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
}
```

### Using Wagmi Hooks (Recommended for React)

```tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useAuctionFactory } from '@/lib/blockchain/hooks/useAuctionFactory';
import { CONTRACT_ADDRESSES } from '@/lib/blockchain/config/contracts';
import { SUPPORTED_CHAIN } from '@/types/blockchain';

function CreateAuction() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const factory = useAuctionFactory(
    CONTRACT_ADDRESSES[SUPPORTED_CHAIN.ETHEREUM]!.auctionFactory
  );

  const handleCreateAuction = async () => {
    if (!factory) return;

    const auctionAddress = await factory.createAuction({
      startPrice: BigInt('1000000000000000000'), // 1 ETH
      floorPrice: BigInt('100000000000000000'),  // 0.1 ETH
      priceDecrement: BigInt('10000000000000000'), // 0.01 ETH
      priceInterval: BigInt(300), // 5 minutes
      totalSupply: BigInt(1000),
      duration: BigInt(86400), // 1 day
      auctionToken: '0x...',
      paymentToken: '0x...',
    });

    console.log('Auction created at:', auctionAddress);
  };

  return (
    <div>
      {!address ? (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </button>
      ) : (
        <button onClick={handleCreateAuction}>Create Auction</button>
      )}
    </div>
  );
}
```

### Using Contract Wrappers Directly

```tsx
import { useAuction } from '@/lib/blockchain/hooks/useAuction';

function AuctionDetails({ auctionAddress }: { auctionAddress: string }) {
  const auction = useAuction(auctionAddress as `0x${string}`);
  const [price, setPrice] = useState<bigint>();

  useEffect(() => {
    if (!auction) return;

    auction.getCurrentPrice().then(setPrice);
  }, [auction]);

  const handlePlaceBid = async () => {
    if (!auction) return;

    await auction.placeBid(BigInt(1)); // Buy 1 token
  };

  return (
    <div>
      <p>Current Price: {price?.toString()}</p>
      <button onClick={handlePlaceBid}>Place Bid</button>
    </div>
  );
}
```

## Contract Wrappers

### AuctionFactoryContract

Methods:
- `createAuction(params)` - Create a new auction
- `getAuction(auctionId)` - Get auction address by ID
- `getAuctionsByOwner(owner)` - Get all auctions for an owner
- `getAuctionsPaginated(offset, limit)` - Get paginated auctions
- `getTotalAuctions()` - Get total number of auctions
- `isValidAuction(address)` - Check if address is a valid auction

### AuctionContract

Read Methods:
- `getCurrentPrice()` - Get current auction price
- `getAuctionState()` - Get full auction state
- `getParticipantInfo(address)` - Get participant bid info
- `getExpectedRefund(address)` - Calculate expected refund
- `isActive()` - Check if auction is active
- `hasClaimed(address)` - Check if user has claimed

Write Methods:
- `placeBid(quantity, value?)` - Place a bid
- `claim()` - Claim tokens after auction
- `finalizeAuction()` - Finalize the auction (owner only)
- `cancelAuction()` - Cancel the auction (owner only)

## Wallet Service

The `WalletService` provides low-level wallet interactions:

```tsx
import { WalletService } from '@/lib/blockchain/wallets/WalletService';

const walletService = new WalletService();

// Connect wallet
const connection = await walletService.connect();

// Switch chain
await walletService.switchChain(137); // Polygon

// Get balance
const balance = await walletService.getBalance(address);

// Check connection
const isConnected = walletService.isConnected();
```

## Adding New Chains

1. Add chain to `SUPPORTED_CHAIN` enum in `types/blockchain.ts`
2. Add chain config to `config/chains.ts`
3. Add contract addresses to `config/contracts.ts`
4. Create or update adapter in `adapters/`
5. Update factory in `factory.ts`

## Type Safety

All contract interactions are fully typed using viem's type system. The ABIs are marked as `const` to enable TypeScript to infer exact types.

```tsx
// TypeScript knows the exact function signatures
const auction = useAuction(address);
await auction.placeBid(BigInt(1)); // ✓ Type-safe
await auction.placeBid(1); // ✗ Type error: expects bigint
```
