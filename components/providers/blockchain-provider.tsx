'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { SolanaProvider } from '@/components/blockchain/solana/SolanaProvider';
import { LineraProvider } from '@/components/blockchain/linera/LineraProvider';

interface BlockchainProviderProps {
  chains: SUPPORTED_CHAIN[];
  children: ReactNode;
}

const BlockchainContext = createContext<{ supportedChains: SUPPORTED_CHAIN[] } | undefined>(undefined);

// Helper to determine if a chain is EVM-based
const EVM_CHAINS = [
  SUPPORTED_CHAIN.ETHEREUM,
  SUPPORTED_CHAIN.POLYGON,
  SUPPORTED_CHAIN.POLYGON_ZKEVM,
  SUPPORTED_CHAIN.BASE,
  SUPPORTED_CHAIN.BSC,
  SUPPORTED_CHAIN.SEPOLIA,
  SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA,
  SUPPORTED_CHAIN.POLYGON_AMOY,
  SUPPORTED_CHAIN.BASE_SEPOLIA,
  SUPPORTED_CHAIN.BSC_TESTNET,
];

function isEVMChain(chain: SUPPORTED_CHAIN): boolean {
  return EVM_CHAINS.includes(chain);
}

/**
 * BlockchainProvider that wraps the appropriate providers based on the chains array.
 *
 * @param chains - Array of blockchain chains to initialize
 *
 * Usage in root layout:
 * ```tsx
 * <BlockchainProvider chains={[
 *   SUPPORTED_CHAIN.ETHEREUM,
 *   SUPPORTED_CHAIN.POLYGON,
 *   SUPPORTED_CHAIN.SOLANA,
 * ]}>
 *   {children}
 * </BlockchainProvider>
 * ```
 */
export function BlockchainProvider({ chains, children }: BlockchainProviderProps) {
  const hasLinera = chains.includes(SUPPORTED_CHAIN.LINERA);
  const hasSolana = chains.includes(SUPPORTED_CHAIN.SOLANA);

  // Build the provider tree
  let providerTree = (
    <BlockchainContext.Provider value={{ supportedChains: chains }}>
      {children}
    </BlockchainContext.Provider>
  );

  // Wrap with Solana provider if needed
  if (hasSolana) {
    providerTree = <SolanaProvider>{providerTree}</SolanaProvider>;
  }

  // Wrap with Linera provider if needed
  if (hasLinera) {
    providerTree = <LineraProvider>{providerTree}</LineraProvider>;
  }

  return providerTree;
}


// General hook to access blockchain context
export function useBlockchainContext() {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchainContext must be used within a BlockchainProvider');
  }
  return context;
}
