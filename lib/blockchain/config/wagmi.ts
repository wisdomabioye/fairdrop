/**
 * Wagmi Configuration
 *
 * Uses centralized registry for chain configuration.
 * To enable/disable chains, edit ENABLED_CHAINS in registry.ts
 */

import { type Chain } from 'viem';
import { createConfig } from 'wagmi';
import { getEnabledViemChains } from './registry';
import { transports } from './transports';

// Get enabled chains from registry
const enabledChains = getEnabledViemChains();

// Wagmi requires at least one chain
if (enabledChains.length === 0) {
  throw new Error('At least one chain must be enabled in registry.ts');
}

// Type assertion is safe because we've verified length > 0
export const chains = enabledChains as unknown as readonly [Chain, ...Chain[]];

// Re-export transports for convenience
export { transports };

// Create and export the config
export const config = createConfig({
  chains,
  transports,
});
