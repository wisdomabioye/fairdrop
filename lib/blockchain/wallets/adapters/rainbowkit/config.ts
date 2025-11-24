'use client';

/**
 * RainbowKit Configuration
 *
 * Isolated configuration for RainbowKit
 * This file contains all RainbowKit-specific setup and can be easily replaced
 * if we switch to a different wallet library.
 */
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { chains, transports } from '@/lib/blockchain/config/wagmi';

export const wagmiConfig = getDefaultConfig({
  appName: 'Fairdrop',
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  chains,
  transports,
  ssr: true,
});
