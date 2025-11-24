import { createPublicClient, createWalletClient, custom, type PublicClient, type WalletClient } from 'viem';
import {
  mainnet as ethereum,
  bsc,
  bscTestnet,
  polygon,
  polygonZkEvm,
  polygonZkEvmCardona,
  polygonAmoy,
  sepolia,
  base,
  baseSepolia
} from 'viem/chains';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { transports } from './transports';

export const publicClients: Record<SUPPORTED_CHAIN, PublicClient | null> = {
  [SUPPORTED_CHAIN.ETHEREUM]: createPublicClient({
    chain: ethereum,
    transport: transports[ethereum.id],
  }),
  [SUPPORTED_CHAIN.POLYGON]: createPublicClient({
    chain: polygon,
    transport: transports[polygon.id],
  }),
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: createPublicClient({
    chain: polygonZkEvm,
    transport: transports[polygonZkEvm.id],
  }),
  [SUPPORTED_CHAIN.BASE]: createPublicClient({
    chain: base,
    transport: transports[base.id],
  }) as PublicClient,
  [SUPPORTED_CHAIN.BSC]: createPublicClient({
    chain: bsc,
    transport: transports[bsc.id],
  }),

  [SUPPORTED_CHAIN.LINERA]: null,
  [SUPPORTED_CHAIN.SOLANA]: null,

  // Testnet
  [SUPPORTED_CHAIN.SEPOLIA]: createPublicClient({
    chain: sepolia,
    transport: transports[sepolia.id],
  }),
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: createPublicClient({
    chain: polygonZkEvmCardona,
    transport: transports[2442], // Cardona chain ID
  }),
  [SUPPORTED_CHAIN.POLYGON_AMOY]: createPublicClient({
    chain: polygonAmoy,
    transport: transports[polygonAmoy.id],
  }),
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: createPublicClient({
    chain: baseSepolia,
    transport: transports[baseSepolia.id],
  }) as PublicClient,
  [SUPPORTED_CHAIN.BSC_TESTNET]: createPublicClient({
    chain: bscTestnet,
    transport: transports[bscTestnet.id],
  }),
};

export function getPublicClient(chain: SUPPORTED_CHAIN): PublicClient {
  const client = publicClients[chain];
  if (!client) {
    throw new Error(`Public client not available for chain: ${chain}`);
  }
  return client;
}

// Map of all EVM chains
export const evmChains = {
  [SUPPORTED_CHAIN.ETHEREUM]: ethereum,
  [SUPPORTED_CHAIN.POLYGON]: polygon,
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: polygonZkEvm,
  [SUPPORTED_CHAIN.BASE]: base,
  [SUPPORTED_CHAIN.BSC]: bsc,
  [SUPPORTED_CHAIN.SEPOLIA]: sepolia,
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: polygonZkEvmCardona,
  [SUPPORTED_CHAIN.POLYGON_AMOY]: polygonAmoy,
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: baseSepolia,
  [SUPPORTED_CHAIN.BSC_TESTNET]: bscTestnet,
} as const;

export function getViemChain(chain: SUPPORTED_CHAIN) {
  const viemChain = evmChains[chain as keyof typeof evmChains];
  if (!viemChain) {
    throw new Error(`Viem chain not supported: ${chain}`);
  }
  return viemChain;
}

export function getWalletClient(chain: keyof typeof evmChains, account: `0x${string}`): WalletClient {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Ethereum wallet found');
  }

  const viemChain = evmChains[chain];
  if (!viemChain) {
    throw new Error(`Wallet client not supported for chain: ${chain}`);
  }

  return createWalletClient({
    account,
    chain: viemChain,
    transport: custom(window.ethereum),
  });
}
