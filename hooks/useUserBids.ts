/**
 * useUserBids Hook
 *
 * Fetches all bids made by a user across auctions on a specific chain.
 * Queries each auction contract for participant info and claim status.
 *
 * @example
 * ```tsx
 * const { address } = useAccount();
 * const { bids, isLoading, error, refresh } =
 *   useUserBids(SUPPORTED_CHAIN.POLYGON_AMOY, address);
 *
 * // Display user's bids
 * bids.forEach(bid => {
 *   console.log(`Auction: ${bid.auctionAddress}`);
 *   console.log(`Bid: ${bid.quantity} tokens for ${bid.amountPaid}`);
 *   console.log(`Can claim: ${bid.canClaim}, Already claimed: ${bid.hasClaimed}`);
 * });
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionFactoryForChain } from './useAuctionFactory';
import { AuctionContract } from '@/lib/blockchain/contracts';
import { usePublicClient, useWalletClient } from 'wagmi';
import { getViemChain } from '@/lib/blockchain/config/registry';

export interface UserBid {
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
  /** Owner of the auction */
  auctionOwner: Address;
  /** Auction token address */
  auctionToken: Address;
  /** Payment token address */
  paymentToken: Address;
}

export interface UseUserBidsOptions {
  /** Auto-load on mount and when address changes */
  autoLoad?: boolean;
  /** List of specific auction addresses to check (if not provided, queries all user auctions) */
  auctionAddresses?: Address[];
}

export interface UseUserBidsResult {
  /** List of user's bids */
  bids: UserBid[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Manually refresh the bids */
  refresh: () => Promise<void>;
}

export function useUserBids(
  chain: SUPPORTED_CHAIN,
  userAddress: Address | undefined,
  options: UseUserBidsOptions = {}
): UseUserBidsResult {
  const { autoLoad = true, auctionAddresses } = options;

  const factory = useAuctionFactoryForChain(chain);
  const publicClient = usePublicClient({ chainId: getViemChain(chain)?.id });
  const { data: walletClient } = useWalletClient();

  const [bids, setBids] = useState<UserBid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadUserBids = useCallback(async () => {
    if (!factory || !userAddress || !publicClient) {
      setBids([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get auction addresses to check
      let auctionsToCheck: Address[];
      if (auctionAddresses && auctionAddresses.length > 0) {
        auctionsToCheck = auctionAddresses;
      } else {
        // Get all auctions from factory
        const total = await factory.getTotalAuctions();
        if (total === BigInt(0)) {
          setBids([]);
          setIsLoading(false);
          return;
        }
        auctionsToCheck = await factory.getAuctionsPaginated(BigInt(0), total);
      }

      // Query each auction for user's participation
      const bidPromises = auctionsToCheck.map(async (auctionAddress) => {
        try {
          const auction = new AuctionContract(publicClient, walletClient || null, auctionAddress);

          // Get participant info
          const participantInfo = await auction.getParticipantInfo(userAddress);

          // Skip if user hasn't bid in this auction
          if (participantInfo.quantity === BigInt(0)) {
            return null;
          }

          // Get additional info in parallel
          const [expectedRefund, hasClaimed, isActive, auctionOwner, auctionToken, paymentToken] =
            await Promise.all([
              auction.getExpectedRefund(userAddress),
              auction.hasClaimed(userAddress),
              auction.isActive(),
              auction.getOwner(),
              auction.getAuctionToken(),
              auction.getPaymentToken(),
            ]);

          // User can claim if auction is not active and hasn't claimed yet
          const canClaim = !isActive && !hasClaimed && participantInfo.quantity > BigInt(0);

          return {
            auctionAddress,
            quantity: participantInfo.quantity,
            amountPaid: participantInfo.amountPaid,
            expectedRefund,
            canClaim,
            hasClaimed,
            auctionOwner,
            auctionToken,
            paymentToken,
          } as UserBid;
        } catch (err) {
          // Skip auctions that error (might be invalid or not deployed)
          console.warn(`Failed to fetch bid info for auction ${auctionAddress}:`, err);
          return null;
        }
      });

      const results = await Promise.all(bidPromises);
      const validBids = results.filter((bid): bid is UserBid => bid !== null);

      setBids(validBids);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load user bids'));
      setBids([]);
    } finally {
      setIsLoading(false);
    }
  }, [factory, userAddress, publicClient, walletClient, auctionAddresses]);

  const refresh = useCallback(async () => {
    await loadUserBids();
  }, [loadUserBids]);

  // Auto-load on mount and when dependencies change
  useEffect(() => {
    if (autoLoad && factory && userAddress && publicClient) {
      loadUserBids();
    }
  }, [autoLoad, factory, userAddress, publicClient, loadUserBids]);

  return {
    bids,
    isLoading,
    error,
    refresh,
  };
}
