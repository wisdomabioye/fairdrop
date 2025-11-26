/**
 * useAuction Hook
 *
 * Interact with Auction contracts using wagmi.
 * Automatically connects to the user's wallet when available.
 *
 * @example
 * ```tsx
 * // By chainId
 * const auction = useAuction(auctionAddress, 1); // Ethereum mainnet
 *
 * // Or use the chain-based helper (recommended)
 * const auction = useAuctionForChain(auctionAddress, SUPPORTED_CHAIN.ETHEREUM);
 *
 * // Read operations
 * const state = await auction?.getAuctionState();
 * const price = await auction?.getCurrentPrice();
 *
 * // Write operations (requires connected wallet)
 * await auction?.placeBid(quantity);
 * ```
 */

import { AuctionContract } from '../lib/blockchain/contracts';
import { SUPPORTED_CHAIN } from '../types/blockchain';
import { usePublicClient, useWalletClient } from '@/lib/blockchain/wallets/WalletProvider';
import { getViemChain } from '../lib/blockchain/config/registry';
import { type Address } from 'viem';
import { useMemo } from 'react';

/**
 * Get Auction contract instance
 *
 * @param auctionAddress - The auction contract address
 * @param chainId - The viem chain ID (e.g., 1 for Ethereum, 137 for Polygon)
 */
export function useAuction(auctionAddress: Address | undefined, chainId: number) {
  // Get public client for the SPECIFIC chain (not the connected wallet's chain)
  const publicClient = usePublicClient({ chainId });
  // Wallet client uses the connected wallet's chain (for write operations)
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
 * Get Auction contract for a specific chain
 * Convenience wrapper that extracts the chain ID from SUPPORTED_CHAIN enum
 *
 * This is the RECOMMENDED way to use the hook as it handles chain mapping automatically.
 *
 * @param auctionAddress - The auction contract address
 * @param chain - The supported chain enum value
 */
export function useAuctionForChain(auctionAddress: Address | undefined, chain: SUPPORTED_CHAIN) {
  // Get the viem chain object from registry
  const viemChain = getViemChain(chain);

  if (!viemChain) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  return useAuction(auctionAddress, viemChain.id);
}
