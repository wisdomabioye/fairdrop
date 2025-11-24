# Wallet Provider Abstraction

This directory contains an abstraction layer for wallet connection libraries, making it easy to switch between different providers (Reown AppKit, RainbowKit, ConnectKit, etc.) without changing your application code.

## Current Implementation

**Active Library:** Reown AppKit (formerly Web3Modal)
**Location:** `./adapters/reown/`

## Architecture

```
lib/blockchain/wallets/
├── WalletProvider.tsx          # Main entry point (import this in your app)
├── types.ts                    # Shared types and interfaces
├── adapters/
│   └── reown/                  # Current implementation
│       ├── config.ts           # Reown-specific configuration
│       ├── ReownProvider.tsx   # Provider component
│       ├── ReownConnectButton.tsx  # Connect button
│       └── index.ts            # Exports
```

## Usage

### 1. In Root Layout

```tsx
import { WalletProvider } from '@/lib/blockchain/wallets/WalletProvider';

export default function RootLayout({ children }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
}
```

### 2. Connect Button Component

```tsx
import { WalletConnectButton } from '@/lib/blockchain/wallets/WalletProvider';

export function Header() {
  return (
    <header>
      <WalletConnectButton />
    </header>
  );
}
```

### 3. Using Wallet Data in Components

```tsx
'use client';

import { useAccount, useConnect, useDisconnect } from '@/lib/blockchain/wallets/WalletProvider';

export function MyComponent() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return <button onClick={() => connect()}>Connect</button>;
  }

  return (
    <div>
      <p>Connected: {address}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
```

## Switching Wallet Libraries

If we want to switch from Reown AppKit to RainbowKit or another library, here's how:

### Step 1: Create New Adapter

Create a new directory: `./adapters/rainbowkit/` (or our chosen library)

Implement these files:
- `config.ts` - Library-specific configuration
- `RainbowKitProvider.tsx` - Provider component
- `RainbowKitConnectButton.tsx` - Connect button
- `index.ts` - Exports

### Step 2: Update WalletProvider

In `WalletProvider.tsx`, change the imports:

```tsx
// Before (Reown)
import { ReownProvider as WalletProviderImplementation } from './adapters/reown';
import { ReownConnectButton as ConnectButtonImplementation } from './adapters/reown';

// After (RainbowKit)
import { RainbowKitProvider as WalletProviderImplementation } from './adapters/rainbowkit';
import { RainbowKitConnectButton as ConnectButtonImplementation } from './adapters/rainbowkit';
```

### Step 3: Done!

That's all we need to do. The rest of our application code doesn't need to change. All components using `useAccount`, `WalletConnectButton`, etc. will still work automatically with the new library.

## Environment Variables

For Reown AppKit, set one of these:
```bash
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id
```

## Supported Chains

Currently configured chains:
- **Mainnets:** Ethereum, Polygon, Polygon zkEVM, Base, BSC
- **Testnets:** Sepolia, Polygon Amoy, Base Sepolia, BSC Testnet

To add more chains, update:
1. `./adapters/reown/config.ts` - Add chain to networks array
2. `app/layout.tsx` - Add to BlockchainProvider chains prop

## Benefits of This Abstraction

1. **Easy Migration** - Switch wallet libraries in minutes, not days
2. **Future-Proof** - If there is a new wallet libraries, we just have to create a new adapter
3. **Clean Codebase** - Application code doesn't know about specific libraries
4. **Type Safety** - Shared TypeScript interfaces across all adapters
5. **Testability** - Easy to mock wallet functionality in tests

## Available Adapters

- ✅ **Reown AppKit** (current) - `./adapters/reown/`
- 🚧 **RainbowKit** - Create at `./adapters/rainbowkit/`
- 🚧 **ConnectKit** - Create at `./adapters/connectkit/`
- 🚧 **Custom** - we can build ours `./adapters/custom/`
