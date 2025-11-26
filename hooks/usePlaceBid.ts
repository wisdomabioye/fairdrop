/**
 * usePlaceBid Hook
 *
 * Hook for placing bids in Dutch auctions.
 * Handles bid submission, transaction tracking, and error handling.
 *
 * @example
 * ```tsx
 * const { placeBid, isPending, error, reset } =
 *   usePlaceBid(auctionAddress, SUPPORTED_CHAIN.POLYGON_AMOY);
 *
 * const handleBid = async () => {
 *   try {
 *     const hash = await placeBid(BigInt(10)); // Bid for 10 tokens
 *     console.log('Bid placed!', hash);
 *   } catch (err) {
 *     console.error('Bid failed:', err);
 *   }
 * };
 * ```
 */

import { useState, useCallback } from 'react';
import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionForChain } from './useAuction';
import { useAccount } from '@/lib/blockchain/wallets/WalletProvider';

export interface UsePlaceBidOptions {
  /** Callback when bid succeeds */
  onSuccess?: (hash: string) => void;
  /** Callback when bid fails */
  onError?: (error: Error) => void;
}

export interface UsePlaceBidResult {
  /** Place a bid for the specified quantity */
  placeBid: (quantity: bigint, value?: bigint) => Promise<string>;
  /** Whether a bid transaction is pending */
  isPending: boolean;
  /** Error from the last bid attempt */
  error: Error | null;
  /** Reset error state */
  reset: () => void;
  /** Transaction hash of the last successful bid */
  txHash: string | null;
}

export function usePlaceBid(
  auctionAddress: Address,
  chain: SUPPORTED_CHAIN,
  options: UsePlaceBidOptions = {}
): UsePlaceBidResult {
  const { onSuccess, onError } = options;
  const auction = useAuctionForChain(auctionAddress, chain);
  const { isConnected } = useAccount();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const placeBid = useCallback(
    async (quantity: bigint, value?: bigint): Promise<string> => {
      if (!isConnected) {
        const err = new Error('Wallet not connected');
        setError(err);
        onError?.(err);
        throw err;
      }

      if (!auction) {
        const err = new Error('Auction contract not initialized');
        setError(err);
        onError?.(err);
        throw err;
      }

      if (quantity <= BigInt(0)) {
        const err = new Error('Quantity must be greater than 0');
        setError(err);
        onError?.(err);
        throw err;
      }

      try {
        setIsPending(true);
        setError(null);

        // Check if auction is active
        const isActive = await auction.isActive();
        if (!isActive) {
          throw new Error('Auction is not active');
        }

        // Check remaining supply
        const state = await auction.getAuctionState();
        if (quantity > state.remainingSupply) {
          throw new Error(`Only ${state.remainingSupply.toString()} tokens remaining`);
        }

        // Place the bid
        const hash = await auction.placeBid(quantity, value);
        setTxHash(hash);
        onSuccess?.(hash);
        return hash;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to place bid');
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    [auction, isConnected, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setError(null);
    setTxHash(null);
  }, []);

  return {
    placeBid,
    isPending,
    error,
    reset,
    txHash,
  };
}
