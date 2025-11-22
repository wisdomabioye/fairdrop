'use client';

import { useParams } from 'next/navigation';
import { LineraProvider } from '../blockchain/linera/LineraProvider';
import { EthereumProvider } from '../blockchain/ethereum/EthereumProvider';
import { SolanaProvider } from '../blockchain/solana/SolanaProvider';
import { SUPPORTED_CHAIN } from '@/types/blockchain';


export function BlockchainProvider({ children }: { children: React.ReactNode }) {
    const { chain } = useParams();
    const requestedChain = chain?.toString() as unknown as SUPPORTED_CHAIN;

    switch(requestedChain) {
      case SUPPORTED_CHAIN.LINERA:
        return <LineraProvider>{children}</LineraProvider>;
      case SUPPORTED_CHAIN.ETHEREUM:
      case SUPPORTED_CHAIN.POLYGON:
        return <EthereumProvider chain={requestedChain}>{children}</EthereumProvider>;
      case SUPPORTED_CHAIN.SOLANA:
        return <SolanaProvider>{children}</SolanaProvider>;
      default:
        return <>{children}</>;
    }
}