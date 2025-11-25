/**
 * Viem Clients Configuration
 *
 * Uses centralized registry for chain configuration.
 * Automatically creates public clients for all EVM chains.
 */

import { createPublicClient, createWalletClient, custom, type PublicClient, type WalletClient } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { transports } from './transports';
import { getViemChain as getViemChainFromRegistry } from './registry';

/**
 * Create public clients for all supported EVM chains
 */
function createPublicClients(): Record<SUPPORTED_CHAIN, PublicClient | null> {
  const clients: Partial<Record<SUPPORTED_CHAIN, PublicClient | null>> = {};

  // Iterate through all SUPPORTED_CHAIN values
  for (const chainKey of Object.values(SUPPORTED_CHAIN)) {
    if (typeof chainKey === 'number') {
      const chain = getViemChainFromRegistry(chainKey);

      if (chain) {
        const transport = transports[chain.id as keyof typeof transports];
        clients[chainKey] = createPublicClient({
          chain,
          transport: transport ?? undefined,
        });
      } else {
        clients[chainKey] = null;
      }
    }
  }

  return clients as Record<SUPPORTED_CHAIN, PublicClient | null>;
}

export const publicClients = createPublicClients();

/**
 * Get public client for a chain
 */
export function getPublicClient(chainKey: SUPPORTED_CHAIN): PublicClient {
  const client = publicClients[chainKey];
  if (!client) {
    throw new Error(`Public client not available for chain: ${chainKey}`);
  }
  return client;
}

/**
 * Get viem chain by SUPPORTED_CHAIN key
 */
export function getViemChain(chainKey: SUPPORTED_CHAIN) {
  const viemChain = getViemChainFromRegistry(chainKey);
  if (!viemChain) {
    throw new Error(`Viem chain not supported: ${chainKey}`);
  }
  return viemChain;
}

/**
 * Create wallet client for a chain
 */
export function getWalletClient(chainKey: SUPPORTED_CHAIN, account: `0x${string}`): WalletClient {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Ethereum wallet found');
  }

  const viemChain = getViemChain(chainKey);

  return createWalletClient({
    account,
    chain: viemChain,
    transport: custom(window.ethereum),
  });
}
