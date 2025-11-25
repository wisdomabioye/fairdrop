/**
 * useUserAuctions Hook
 *
 * Fetches auctions created by a specific user address.
 * Useful for displaying user's created auctions in dashboard/profile.
 *
 * @example
 * ```tsx
 * const { address } = useAccount();
 * const { auctions, isLoading, error, refresh } =
 *   useUserAuctions(SUPPORTED_CHAIN.POLYGON_AMOY, address);
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionFactoryForChain } from './useAuctionFactory';

export interface UseUserAuctionsOptions {
  /** Auto-load on mount and when address changes */
  autoLoad?: boolean;
  /** Refresh interval in milliseconds (0 to disable) */
  refreshInterval?: number;
}

export interface UseUserAuctionsResult {
  /** List of auction addresses owned by the user */
  auctions: Address[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Manually refresh the auctions */
  refresh: () => Promise<void>;
}

export function useUserAuctions(
  chain: SUPPORTED_CHAIN,
  userAddress: Address | undefined,
  options: UseUserAuctionsOptions = {}
): UseUserAuctionsResult {
  const { autoLoad = true, refreshInterval = 0 } = options;

  const factory = useAuctionFactoryForChain(chain);

  const [auctions, setAuctions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadUserAuctions = useCallback(async () => {
    if (!factory || !userAddress) {
      setAuctions([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const userAuctions = await factory.getAuctionsByOwner(userAddress);
      setAuctions(userAuctions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load user auctions'));
      setAuctions([]);
    } finally {
      setIsLoading(false);
    }
  }, [factory, userAddress]);

  const refresh = useCallback(async () => {
    await loadUserAuctions();
  }, [loadUserAuctions]);

  // Auto-load on mount and when dependencies change
  useEffect(() => {
    if (autoLoad && factory && userAddress) {
      loadUserAuctions();
    }
  }, [autoLoad, factory, userAddress, loadUserAuctions]);

  // Auto-refresh interval
  useEffect(() => {
    if (refreshInterval > 0 && factory && userAddress) {
      const interval = setInterval(() => {
        loadUserAuctions();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, factory, userAddress, loadUserAuctions]);

  return {
    auctions,
    isLoading,
    error,
    refresh,
  };
}
