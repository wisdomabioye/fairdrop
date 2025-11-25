/**
 * useAuctionFactory Hook
 *
 * Interact with AuctionFactory contracts using wagmi.
 * Automatically connects to the user's wallet when available.
 *
 * @example
 * ```tsx
 * // Get factory by address and chainId
 * const factory = useAuctionFactory(factoryAddress, 1); // Ethereum mainnet
 * const auctions = await factory?.getAllAuctions();
 *
 * // Or use the chain-based helper (recommended)
 * const factory = useAuctionFactoryForChain(SUPPORTED_CHAIN.ETHEREUM);
 * await factory?.createAuction(...);
 * ```
 */

import { usePublicClient, useWalletClient } from 'wagmi';
import { AuctionFactoryContract } from '../lib/blockchain/contracts';
import { getContractAddress } from '../lib/blockchain/config/contracts';
import { SUPPORTED_CHAIN } from '../types/blockchain';
import { chainConfig, testnetChainConfig } from '../lib/blockchain/config/chains';
import { type Address } from 'viem';
import { useMemo } from 'react';

/**
 * Get AuctionFactory contract by address and chainId
 *
 * @param factoryAddress - The factory contract address
 * @param chainId - The viem chain ID (e.g., 1 for Ethereum, 137 for Polygon)
 */
export function useAuctionFactory(factoryAddress: Address | undefined, chainId: number) {
  // Get public client for the SPECIFIC chain (not the connected wallet's chain)
  const publicClient = usePublicClient({ chainId });
  // Wallet client uses the connected wallet's chain (for write operations)
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
 * Convenience wrapper that looks up the factory address and chain ID
 *
 * This is the RECOMMENDED way to use the hook as it handles chain mapping automatically.
 */
export function useAuctionFactoryForChain(chain: SUPPORTED_CHAIN) {
  const contracts = getContractAddress(chain);

  // Get the viem chain object to extract chainId
  const viemChain = chainConfig[chain as keyof typeof chainConfig] ||
                    testnetChainConfig[chain as keyof typeof testnetChainConfig];

  if (!viemChain) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  return useAuctionFactory(contracts.auctionFactory, viemChain.id);
}
