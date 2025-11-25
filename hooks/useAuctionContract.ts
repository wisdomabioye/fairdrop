/**
 * Auction Contract Hook (Direct Wagmi Approach)
 *
 * This is a simpler, more idiomatic approach that uses wagmi hooks directly
 * without the adapter pattern.
 */

import { useMemo } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { AuctionContract, AuctionFactoryContract } from '@/lib/blockchain/contracts';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { getAuctionFactoryAddress } from '@/lib/blockchain/config/registry';
import type { Address } from 'viem';

/**
 * Hook to interact with auction factory contract
 * @param chain The blockchain to use
 */
export function useAuctionFactory(chain: SUPPORTED_CHAIN) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const factory = useMemo(() => {
    if (!publicClient) return null;

    const factoryAddress = getAuctionFactoryAddress(chain);
    if (!factoryAddress) {
      throw new Error(`No factory address configured for chain: ${chain}`);
    }

    return new AuctionFactoryContract(
      publicClient,
      walletClient || null,
      factoryAddress
    );
  }, [publicClient, walletClient, chain]);

  return factory;
}

/**
 * Hook to interact with a specific auction contract
 * @param auctionAddress The auction contract address
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

/**
 * Hook to place a bid on an auction
 * Usage:
 * ```tsx
 * const { placeBid, isLoading } = usePlaceBid(auctionAddress);
 * await placeBid(quantity);
 * ```
 */
export function usePlaceBid(auctionAddress: Address | undefined) {
  const auction = useAuction(auctionAddress);

  const placeBid = async (quantity: bigint) => {
    if (!auction) {
      throw new Error('Auction not initialized');
    }

    return await auction.placeBid(quantity);
  };

  return { placeBid };
}

/**
 * Example: Get all auctions for a chain
 * Usage:
 * ```tsx
 * const factory = useAuctionFactory(SUPPORTED_CHAIN.ETHEREUM);
 * const auctions = await factory?.getAllAuctions();
 * ```
 */
