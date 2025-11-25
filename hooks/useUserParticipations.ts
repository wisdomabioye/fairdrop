/**
 * useUserParticipations Hook
 *
 * Fetches auctions where the user has participated (placed bids).
 * Returns auction addresses with participation status and filtering options.
 *
 * @example
 * ```tsx
 * const { address } = useAccount();
 * const { participations, isLoading, error } =
 *   useUserParticipations(SUPPORTED_CHAIN.POLYGON_AMOY, address, {
 *     filter: 'claimable' // Only show auctions where user can claim
 *   });
 * ```
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useUserBids } from './useUserBids';
import { AuctionStatus } from '@/lib/blockchain/contracts';

export type ParticipationFilter = 'all' | 'active' | 'ended' | 'claimable' | 'claimed';

export interface AuctionParticipation {
  /** Address of the auction contract */
  auctionAddress: Address;
  /** Quantity of tokens bid for */
  quantity: bigint;
  /** Amount paid for the bid */
  amountPaid: bigint;
  /** Expected refund amount */
  expectedRefund: bigint;
  /** Whether the user can claim tokens */
  canClaim: boolean;
  /** Whether the user has already claimed */
  hasClaimed: boolean;
  /** Status label for UI */
  status: 'active' | 'ended' | 'claimed';
}

export interface UseUserParticipationsOptions {
  /** Auto-load on mount and when address changes */
  autoLoad?: boolean;
  /** Filter participations by status */
  filter?: ParticipationFilter;
  /** Specific auction addresses to check */
  auctionAddresses?: Address[];
}

export interface UseUserParticipationsResult {
  /** List of user's participations */
  participations: AuctionParticipation[];
  /** All participations (unfiltered) */
  allParticipations: AuctionParticipation[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Manually refresh the participations */
  refresh: () => Promise<void>;
  /** Current filter */
  currentFilter: ParticipationFilter;
}

export function useUserParticipations(
  chain: SUPPORTED_CHAIN,
  userAddress: Address | undefined,
  options: UseUserParticipationsOptions = {}
): UseUserParticipationsResult {
  const { autoLoad = true, filter = 'all', auctionAddresses } = options;

  // Use useUserBids to get the raw data
  const { bids, isLoading, error, refresh } = useUserBids(chain, userAddress, {
    autoLoad,
    auctionAddresses,
  });

  // Transform bids into participations
  const allParticipations = useMemo<AuctionParticipation[]>(() => {
    return bids.map(bid => {
      let status: 'active' | 'ended' | 'claimed';
      if (bid.hasClaimed) {
        status = 'claimed';
      } else if (bid.canClaim) {
        status = 'ended';
      } else {
        status = 'active';
      }

      return {
        auctionAddress: bid.auctionAddress,
        quantity: bid.quantity,
        amountPaid: bid.amountPaid,
        expectedRefund: bid.expectedRefund,
        canClaim: bid.canClaim,
        hasClaimed: bid.hasClaimed,
        status,
      };
    });
  }, [bids]);

  // Apply filter
  const participations = useMemo(() => {
    if (filter === 'all') {
      return allParticipations;
    }

    return allParticipations.filter(participation => {
      switch (filter) {
        case 'active':
          return participation.status === 'active';
        case 'ended':
          return participation.status === 'ended';
        case 'claimable':
          return participation.canClaim && !participation.hasClaimed;
        case 'claimed':
          return participation.hasClaimed;
        default:
          return true;
      }
    });
  }, [allParticipations, filter]);

  return {
    participations,
    allParticipations,
    isLoading,
    error,
    refresh,
    currentFilter: filter,
  };
}
