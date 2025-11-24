/**
 * useAuction Hook
 *
 * Interact with Auction contracts using wagmi.
 * Automatically connects to the user's wallet when available.
 *
 * @example
 * ```tsx
 * const auction = useAuction(auctionAddress);
 *
 * // Read operations
 * const state = await auction?.getAuctionState();
 * const price = await auction?.getCurrentPrice();
 *
 * // Write operations (requires connected wallet)
 * await auction?.placeBid(quantity);
 * ```
 */

import { usePublicClient, useWalletClient } from 'wagmi';
import { AuctionContract } from '../lib/blockchain/contracts';
import { type Address } from 'viem';
import { useMemo } from 'react';

/**
 * Get Auction contract instance
 */
export function useAuction(auctionAddress: Address | undefined) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const auction = useMemo(() => {
    if (!publicClient || !auctionAddress) return null;

    return new AuctionContract(
      publicClient,
      walletClient || null,
      auctionAddress
    );
  }, [publicClient, walletClient, auctionAddress]);

  return auction;
}
