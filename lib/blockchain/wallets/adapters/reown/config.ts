'use client';

/**
 * Reown AppKit Configuration
 *
 * Isolated configuration for Reown AppKit (formerly Web3Modal)
 * This file contains all Reown-specific setup and we can easily replace it
 * if we switch to a different wallet library (RainbowKit, ConnectKit, etc.)
 */
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  mainnet,
  polygon,
  polygonZkEvm,
  base,
  bsc,
  sepolia,
  polygonAmoy,
  baseSepolia,
  bscTestnet,
  polygonZkEvmCardona,
} from '@reown/appkit/networks';

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId) {
  console.warn('NEXT_PUBLIC_REOWN_PROJECT_ID is not set');
}

// Define networks
// Mainnets and Testnets
const networks = [
  mainnet,
  polygon,
  polygonZkEvm,
  base,
  bsc,
  sepolia,
  polygonZkEvmCardona,
  polygonAmoy,
  baseSepolia,
  bscTestnet,
];

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: projectId!,
  ssr: true,
});

// Create AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [polygonZkEvmCardona, polygonAmoy],
  projectId: projectId!,
  metadata: {
    name: 'Fairdrop',
    description: 'Fair Price Discovery for Everyone',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://fairdrop.io',
    icons: [typeof window !== 'undefined' ? `${window.location.origin}/icon.png` : 'https://fairdrop.io/icon.png'],
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
