/**
 * Blockchain Factory
 * For non-EVM chains (Solana, Linera), we use the adapters below.
 */

import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { LineraAdapter } from './adapters/linera';
import { SolanaAdapter } from './adapters/solana';

export function getBlockchainAdapter(chain: SUPPORTED_CHAIN) {
    switch (chain) {
        // EVM Chains - Use wagmi hooks instead!
        case SUPPORTED_CHAIN.ETHEREUM:
        case SUPPORTED_CHAIN.POLYGON:
        case SUPPORTED_CHAIN.POLYGON_ZKEVM:
        case SUPPORTED_CHAIN.BASE:
        case SUPPORTED_CHAIN.BSC:
        case SUPPORTED_CHAIN.SEPOLIA:
        case SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA:
        case SUPPORTED_CHAIN.POLYGON_AMOY:
        case SUPPORTED_CHAIN.BASE_SEPOLIA:
        case SUPPORTED_CHAIN.BSC_TESTNET:
            throw new Error(
                `EVM chains (${chain}) should use wagmi hooks instead of adapters. ` +
                `Use useAuctionFactory() or useAuction() from @/hooks`
            );

        case SUPPORTED_CHAIN.LINERA:
            return new LineraAdapter();

        case SUPPORTED_CHAIN.SOLANA:
            return new SolanaAdapter();
    }
}