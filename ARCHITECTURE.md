# Fairdrop Architecture

## Wallet & Blockchain Integration

### Stack
- **Wallet UI**: RainbowKit
- **Wallet State**: Wagmi v2
- **RPC Provider**: Alchemy (with public RPC fallback)
- **Contract Interactions**: Viem

### Configuration Files

```
lib/blockchain/config/
├── transports.ts      # Single source of truth for RPC endpoints (Alchemy URLs)
├── wagmi.ts          # Wagmi chains & config (imports transports)
├── viem.ts           # Viem public clients (imports transports)
└── contracts.ts      # Contract addresses per chain

lib/blockchain/wallets/adapters/
└── rainbowkit/
    ├── config.ts                # RainbowKit config (imports from wagmi.ts)
    ├── RainbowKitProvider.tsx   # Wallet provider
    └── RainbowKitConnectButton.tsx
```

### Usage Pattern

#### 1. Wallet Connection
```tsx
import { useAccount } from 'wagmi';
import { WalletConnectButton } from '@/lib/blockchain/wallets/WalletProvider';

function MyComponent() {
  const { address, isConnected } = useAccount();

  return (
    <>
      <WalletConnectButton />
      {isConnected && <p>Connected: {address}</p>}
    </>
  );
}
```

#### 2. Contract Interactions

**Auction Factory:**
```tsx
import { useAuctionFactoryForChain } from '@/hooks/useAuctionFactory';

const factory = useAuctionFactoryForChain(SUPPORTED_CHAIN.ETHEREUM);

// Read operations (reads from Ethereum regardless of connected wallet chain)
const auctions = await factory?.getAllAuctions();

// Write operations (requires wallet connected to Ethereum)
await factory?.createAuction(...);
```

**Auction Contract:**
```tsx
import { useAuction } from '@/hooks/useAuction';

const auction = useAuction(auctionAddress, 1); // 1 = Ethereum mainnet

// Read operations (reads from Ethereum regardless of connected wallet chain)
const state = await auction?.getAuctionState();
const price = await auction?.getCurrentPrice();

// Write operations (requires wallet connected to Ethereum)
await auction?.placeBid(quantity);
```

**Important**:
- Public client (read operations) uses the **specified chain** via `chainId` parameter
- Wallet client (write operations) uses the **connected wallet's chain**
- If you need to write to a contract, ensure the wallet is connected to the correct chain first

#### 3. Chain Switching
```tsx
import { useChainId, useSwitchChain } from 'wagmi';

const chainId = useChainId();
const { switchChain } = useSwitchChain();

const isCorrectChain = chainId === 1; // Ethereum mainnet

if (!isCorrectChain) {
  switchChain({ chainId: 1 });
}
```

### Environment Variables

```env
# Required for RainbowKit/WalletConnect
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id

# Optional for Alchemy RPC
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
```

### Benefits of This Architecture

1. **Single Source of Truth** - Wallet state managed only by wagmi
2. **No Duplication** - RPC transports defined once in `transports.ts`
3. **Simple** - Direct hooks pattern, no abstraction layers
4. **Standard** - Idiomatic wagmi/React patterns
5. **Type Safe** - Full TypeScript support
6. **Maintainable** - Less code to maintain

### Non-EVM Chains

For Solana and Linera, continue using adapters:
```tsx
import { getBlockchainAdapter } from '@/lib/blockchain/factory';

const adapter = getBlockchainAdapter(SUPPORTED_CHAIN.SOLANA);
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - TypeCheck + Build for production
- `npm run typecheck` - Run TypeScript checks
- `npm start` - Start production server
- `npm run lint` - Run ESLint
