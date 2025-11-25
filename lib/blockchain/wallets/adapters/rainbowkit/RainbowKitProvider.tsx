'use client';

/**
 * RainbowKit Provider
 *
 * This wraps RainbowKit and provides wallet connection UI.
 * To switch to a different library, create a new adapter in this directory
 * and update the WalletProvider.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider as RKProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { wagmiConfig } from './config';
import type { WalletProviderProps } from '../../types';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function RainbowKitProvider({ children }: WalletProviderProps) {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>
        <RKProvider
          theme={theme === 'dark' ? darkTheme() : lightTheme()}
        >
          {children}
        </RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
