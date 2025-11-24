'use client';

/**
 * Reown AppKit Provider
 *
 * This wraps Reown AppKit (formerly Web3Modal) and provides wallet connection UI.
 * To switch to a different library (RainbowKit, ConnectKit, etc.),
 * we will create a new adapter in this directory and update the WalletProvider.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiAdapter } from './config';
import type { WalletProviderProps } from '../../types';

const queryClient = new QueryClient();

export function ReownProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
