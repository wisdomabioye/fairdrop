'use client';

/**
 * Main Wallet Provider
 *
 * This is the single entry point for wallet functionality in the app.
 * The actual wallet library (Reown AppKit, RainbowKit, etc.) is isolated
 * in the adapters directory.
 *
 * TO SWITCH WALLET LIBRARIES:
 * 1. We have to create a new adapter in ./adapters/[library-name]/
 * 2. We will implement the Provider and ConnectButton components
 * 3. And update the imports below
 * 4. The rest of the app doesn't need to change.
 */

// Current adapter: RainbowKit
// To switch to another adapter, we will update these imports below:
import { RainbowKitProvider as WalletProviderImplementation } from './adapters/rainbowkit';
import { RainbowKitConnectButton as ConnectButtonImplementation } from './adapters/rainbowkit';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <WalletProviderImplementation>{children}</WalletProviderImplementation>;
}

export function WalletConnectButton() {
  return <ConnectButtonImplementation />;
}

// Re-export wagmi hooks for convenience (these work with any wagmi-based library)
export {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useChainId,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
