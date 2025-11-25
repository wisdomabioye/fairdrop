/**
 * useCreateAuction Hook
 *
 * Creates a new auction using the AuctionFactory contract.
 * Handles transaction submission, confirmation, and error states.
 * Supports both ERC20 and native token payments.
 *
 * @example
 * ```tsx
 * const { createAuction, isLoading, error, txHash, auctionAddress } =
 *   useCreateAuction(SUPPORTED_CHAIN.POLYGON_AMOY);
 *
 * const handleCreate = async () => {
 *   const address = await createAuction({
 *     startPrice: parseEther('1'),
 *     floorPrice: parseEther('0.1'),
 *     priceDecrement: parseEther('0.05'),
 *     priceInterval: BigInt(300), // 5 minutes
 *     totalSupply: BigInt(1000),
 *     duration: BigInt(86400), // 24 hours
 *     auctionToken: '0x...', // Token to auction
 *     paymentToken: '0x0000000000000000000000000000000000000000', // Native token
 *   });
 *   console.log('Auction created at:', address);
 * };
 * ```
 */

import { useState, useCallback } from 'react';
import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionFactoryForChain } from './useAuctionFactory';
import { type CreateAuctionParams } from '@/lib/blockchain/contracts';

export interface UseCreateAuctionResult {
  /** Function to create a new auction */
  createAuction: (params: CreateAuctionParams) => Promise<Address>;
  /** Loading state (transaction in progress) */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Transaction hash (if transaction submitted) */
  txHash: string | null;
  /** Created auction address (if successful) */
  auctionAddress: Address | null;
  /** Reset the hook state */
  reset: () => void;
}

export function useCreateAuction(chain: SUPPORTED_CHAIN): UseCreateAuctionResult {
  const factory = useAuctionFactoryForChain(chain);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [auctionAddress, setAuctionAddress] = useState<Address | null>(null);

  const createAuction = useCallback(
    async (params: CreateAuctionParams): Promise<Address> => {
      if (!factory) {
        const err = new Error('Factory not initialized. Please connect your wallet.');
        setError(err);
        throw err;
      }

      try {
        setIsLoading(true);
        setError(null);
        setTxHash(null);
        setAuctionAddress(null);

        // Validate params
        if (params.startPrice < params.floorPrice) {
          throw new Error('Start price must be greater than or equal to floor price');
        }

        if (params.totalSupply === BigInt(0)) {
          throw new Error('Total supply must be greater than 0');
        }

        if (params.duration === BigInt(0)) {
          throw new Error('Duration must be greater than 0');
        }

        // Create auction
        const address = await factory.createAuction(params);

        setAuctionAddress(address);
        return address;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create auction');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [factory]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setTxHash(null);
    setAuctionAddress(null);
  }, []);

  return {
    createAuction,
    isLoading,
    error,
    txHash,
    auctionAddress,
    reset,
  };
}
