import { useParams } from 'next/navigation';
import { getBlockchainAdapter } from '@/lib/blockchain/factory';
import { SUPPORTED_CHAIN } from '@/types/blockchain';

export function useBlockchain() {
    const { chain } = useParams();
    const requestedChain = chain?.toString() as string;
    const adapter = getBlockchainAdapter(requestedChain as unknown as SUPPORTED_CHAIN);

    return {
        chain,
        adapter,
        placeBid: adapter.placeBid,
        connect: adapter.connect,
        // ... unified interface
    };
}