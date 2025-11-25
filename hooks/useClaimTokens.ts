/**
 * useClaimTokens Hook
 *
 * Claims tokens from an auction after it ends.
 * Checks eligibility before claiming and handles transaction states.
 * Also handles refunds if user overpaid.
 *
 * @example
 * ```tsx
 * const { claim, canClaim, isLoading, error, txHash } =
 *   useClaimTokens(auctionAddress, SUPPORTED_CHAIN.POLYGON_AMOY);
 *
 * const handleClaim = async () => {
 *   if (!canClaim) {
 *     alert('Cannot claim yet');
 *     return;
 *   }
 *   await claim();
 * };
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { type Address } from 'viem';
import { useAccount } from 'wagmi';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionForChain } from './useAuction';

export interface ClaimInfo {
  /** Whether the user can claim */
  canClaim: boolean;
  /** Whether the user has already claimed */
  hasClaimed: boolean;
  /** Expected refund amount */
  expectedRefund: bigint;
  /** Quantity of tokens to receive */
  quantity: bigint;
  /** Amount paid */
  amountPaid: bigint;
}

export interface UseClaimTokensResult {
  /** Function to claim tokens */
  claim: () => Promise<string>;
  /** Whether the user can claim */
  canClaim: boolean;
  /** Claim eligibility and info */
  claimInfo: ClaimInfo | null;
  /** Loading state (checking eligibility or transaction in progress) */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Transaction hash (if transaction submitted) */
  txHash: string | null;
  /** Refresh claim info */
  refresh: () => Promise<void>;
  /** Reset the hook state */
  reset: () => void;
}

export function useClaimTokens(
  auctionAddress: Address | undefined,
  chain: SUPPORTED_CHAIN
): UseClaimTokensResult {
  const { address: userAddress } = useAccount();
  const auction = useAuctionForChain(auctionAddress, chain);

  const [claimInfo, setClaimInfo] = useState<ClaimInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const checkClaimEligibility = useCallback(async () => {
    if (!auction || !userAddress) {
      setClaimInfo(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch all claim-related data in parallel
      const [participantInfo, hasClaimed, isActive, expectedRefund] = await Promise.all([
        auction.getParticipantInfo(userAddress),
        auction.hasClaimed(userAddress),
        auction.isActive(),
        auction.getExpectedRefund(userAddress),
      ]);

      const canClaim =
        !isActive &&
        !hasClaimed &&
        participantInfo.quantity > BigInt(0);

      setClaimInfo({
        canClaim,
        hasClaimed,
        expectedRefund,
        quantity: participantInfo.quantity,
        amountPaid: participantInfo.amountPaid,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to check claim eligibility'));
      setClaimInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [auction, userAddress]);

  const claim = useCallback(async (): Promise<string> => {
    if (!auction) {
      const err = new Error('Auction not initialized. Please connect your wallet.');
      setError(err);
      throw err;
    }

    if (!claimInfo?.canClaim) {
      const err = new Error('Cannot claim tokens. Check eligibility.');
      setError(err);
      throw err;
    }

    try {
      setIsLoading(true);
      setError(null);
      setTxHash(null);

      const hash = await auction.claim();
      setTxHash(hash);

      // Refresh claim info after successful claim
      await checkClaimEligibility();

      return hash;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to claim tokens');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [auction, claimInfo, checkClaimEligibility]);

  const refresh = useCallback(async () => {
    await checkClaimEligibility();
  }, [checkClaimEligibility]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setTxHash(null);
    setClaimInfo(null);
  }, []);

  // Auto-check eligibility on mount and when dependencies change
  useEffect(() => {
    if (auction && userAddress) {
      checkClaimEligibility();
    }
  }, [auction, userAddress, checkClaimEligibility]);

  return {
    claim,
    canClaim: claimInfo?.canClaim ?? false,
    claimInfo,
    isLoading,
    error,
    txHash,
    refresh,
    reset,
  };
}
