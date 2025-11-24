/**
 * useAuctionFactory Hook
 *
 * Interact with AuctionFactory contracts using wagmi.
 * Automatically connects to the user's wallet when available.
 *
 * @example
 * ```tsx
 * // Get factory by address
 * const factory = useAuctionFactory(factoryAddress);
 * const auctions = await factory?.getAllAuctions();
 *
 * // Or use the chain-based helper
 * const factory = useAuctionFactoryForChain(SUPPORTED_CHAIN.ETHEREUM);
 * await factory?.createAuction(...);
 * ```
 */

import { usePublicClient, useWalletClient } from 'wagmi';
import { AuctionFactoryContract } from '../lib/blockchain/contracts';
import { getContractAddress } from '../lib/blockchain/config/contracts';
import { SUPPORTED_CHAIN } from '../types/blockchain';
import { type Address } from 'viem';
import { useMemo } from 'react';

/**
 * Get AuctionFactory contract by address
 */
export function useAuctionFactory(factoryAddress: Address | undefined) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const factory = useMemo(() => {
    if (!publicClient || !factoryAddress) return null;

    return new AuctionFactoryContract(
      publicClient,
      walletClient || null,
      factoryAddress
    );
  }, [publicClient, walletClient, factoryAddress]);

  return factory;
}

/**
 * Get AuctionFactory contract for a specific chain
 * Convenience wrapper that looks up the factory address
 */
export function useAuctionFactoryForChain(chain: SUPPORTED_CHAIN) {
  const contracts = getContractAddress(chain);
  return useAuctionFactory(contracts.auctionFactory);
}
