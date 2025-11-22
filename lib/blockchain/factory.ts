import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { EthereumAdapter } from './adapters/ethereum';
import { LineraAdapter } from './adapters/linera';
import { SolanaAdapter } from './adapters/solana';

export function getBlockchainAdapter(chain: SUPPORTED_CHAIN) {

    switch (chain) {
        case SUPPORTED_CHAIN.ETHEREUM:
        case SUPPORTED_CHAIN.POLYGON:
            return new EthereumAdapter();

        case SUPPORTED_CHAIN.LINERA:
            return new LineraAdapter();

        case SUPPORTED_CHAIN.SOLANA:
            return new SolanaAdapter();
    }
}