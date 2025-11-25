/**
 * useAuctions Hook
 *
 * Fetches all auctions from AuctionFactory contract with pagination support.
 * Returns auction addresses and provides utilities for pagination.
 *
 * @example
 * ```tsx
 * const { auctions, totalAuctions, isLoading, error, loadMore, hasMore } =
 *   useAuctions(SUPPORTED_CHAIN.POLYGON_AMOY, { pageSize: 10 });
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionFactoryForChain } from './useAuctionFactory';

export interface UseAuctionsOptions {
  /** Number of auctions to fetch per page */
  pageSize?: number;
  /** Auto-load on mount */
  autoLoad?: boolean;
}

export interface UseAuctionsResult {
  /** List of auction addresses */
  auctions: Address[];
  /** Total number of auctions in the factory */
  totalAuctions: bigint | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Load more auctions */
  loadMore: () => Promise<void>;
  /** Whether there are more auctions to load */
  hasMore: boolean;
  /** Refresh/reload from start */
  refresh: () => Promise<void>;
}

export function useAuctions(
  chain: SUPPORTED_CHAIN,
  options: UseAuctionsOptions = {}
): UseAuctionsResult {
  const { pageSize = 20, autoLoad = true } = options;

  const factory = useAuctionFactoryForChain(chain);

  const [auctions, setAuctions] = useState<Address[]>([]);
  const [totalAuctions, setTotalAuctions] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(BigInt(0));

  const hasMore = totalAuctions !== null && BigInt(auctions.length) < totalAuctions;

  const loadAuctions = useCallback(async (fromStart: boolean = false) => {
    if (!factory) {
      setError(new Error('Factory not initialized'));
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const currentOffset = fromStart ? BigInt(0) : offset;

      // Fetch total count and paginated auctions in parallel
      const [total, paginatedAuctions] = await Promise.all([
        factory.getTotalAuctions(),
        factory.getAuctionsPaginated(currentOffset, BigInt(pageSize))
      ]);

      setTotalAuctions(total);

      if (fromStart) {
        setAuctions(paginatedAuctions);
        setOffset(BigInt(paginatedAuctions.length));
      } else {
        setAuctions(prev => [...prev, ...paginatedAuctions]);
        setOffset(prev => prev + BigInt(paginatedAuctions.length));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load auctions'));
    } finally {
      setIsLoading(false);
    }
  }, [factory, offset, pageSize]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    await loadAuctions(false);
  }, [hasMore, isLoading, loadAuctions]);

  const refresh = useCallback(async () => {
    setAuctions([]);
    setOffset(BigInt(0));
    await loadAuctions(true);
  }, [loadAuctions]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad && factory && auctions.length === 0) {
      loadAuctions(true);
    }
  }, [autoLoad, factory]); // Intentionally omit auctions and loadAuctions to only load once

  return {
    auctions,
    totalAuctions,
    isLoading,
    error,
    loadMore,
    hasMore,
    refresh,
  };
}
