/**
 * Chain Slugs
 *
 * Maps chain enums to URL-friendly slugs and vice versa.
 * Use these for cleaner URLs like /polygon-amoy/auctions instead of /80002/auctions
 */

import { SUPPORTED_CHAIN } from '@/types/blockchain';

export const CHAIN_SLUGS: Record<SUPPORTED_CHAIN, string> = {
  [SUPPORTED_CHAIN.ETHEREUM]: 'ethereum',
  [SUPPORTED_CHAIN.POLYGON]: 'polygon',
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: 'polygon-zkevm',
  [SUPPORTED_CHAIN.BASE]: 'base',
  [SUPPORTED_CHAIN.BSC]: 'bsc',
  [SUPPORTED_CHAIN.SEPOLIA]: 'sepolia',
  [SUPPORTED_CHAIN.POLYGON_AMOY]: 'polygon-amoy',
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: 'polygon-zkevm-cardona',
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: 'base-sepolia',
  [SUPPORTED_CHAIN.BSC_TESTNET]: 'bsc-testnet',
  [SUPPORTED_CHAIN.LINERA]: 'linera',
  [SUPPORTED_CHAIN.SOLANA]: 'solana',
};

// Reverse mapping: slug -> chain
export const SLUG_TO_CHAIN = Object.entries(CHAIN_SLUGS).reduce(
  (acc, [chain, slug]) => {
    acc[slug] = Number(chain) as SUPPORTED_CHAIN;
    return acc;
  },
  {} as Record<string, SUPPORTED_CHAIN>
);

/**
 * Get slug for a chain
 */
export function getChainSlug(chain: SUPPORTED_CHAIN): string {
  return CHAIN_SLUGS[chain] || chain.toString();
}

/**
 * Get chain from slug
 */
export function getChainFromSlug(slug: string): SUPPORTED_CHAIN | null {
  return SLUG_TO_CHAIN[slug] || null;
}

/**
 * Check if a slug is valid
 */
export function isValidChainSlug(slug: string): boolean {
  return slug in SLUG_TO_CHAIN;
}
