/**
 * Simplified Blockchain Provider
 *
 * Just tracks which chains are supported - no wallet management needed.
 * Wallet state is handled by wagmi/RainbowKit.
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';

interface BlockchainContextType {
  supportedChains: SUPPORTED_CHAIN[];
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

interface BlockchainProviderProps {
  chains: SUPPORTED_CHAIN[];
  children: ReactNode;
}

/**
 * Simple provider that just tracks supported chains.
 * No wallet management - that's handled by wagmi.
 *
 * @example
 * ```tsx
 * <BlockchainProvider chains={[
 *   SUPPORTED_CHAIN.ETHEREUM,
 *   SUPPORTED_CHAIN.POLYGON,
 * ]}>
 *   {children}
 * </BlockchainProvider>
 * ```
 */
export function BlockchainProvider({ chains, children }: BlockchainProviderProps) {
  return (
    <BlockchainContext.Provider value={{ supportedChains: chains }}>
      {children}
    </BlockchainContext.Provider>
  );
}

/**
 * Hook to access supported chains
 */
export function useBlockchainContext() {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchainContext must be used within a BlockchainProvider');
  }
  return context;
}

/**
 * Check if a chain is supported
 */
export function useIsSupportedChain(chain: SUPPORTED_CHAIN): boolean {
  const { supportedChains } = useBlockchainContext();
  return supportedChains.includes(chain);
}
