import { type Address } from 'viem';
import { SUPPORTED_CHAIN } from '@/types/blockchain';

export interface ChainContracts {
  auctionFactory: Address;
}

export const CONTRACT_ADDRESSES: Record<SUPPORTED_CHAIN, ChainContracts | null> = {
  [SUPPORTED_CHAIN.ETHEREUM]: {
    auctionFactory: (process.env.NEXT_PUBLIC_ETHEREUM_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.POLYGON]: {
    auctionFactory: (process.env.NEXT_PUBLIC_POLYGON_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: {
    auctionFactory: (process.env.NEXT_PUBLIC_POLYGON_ZKEVM_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.BASE]: {
    auctionFactory: (process.env.NEXT_PUBLIC_BASE_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.BSC]: {
    auctionFactory: (process.env.NEXT_PUBLIC_BSC_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.LINERA]: null,
  [SUPPORTED_CHAIN.SOLANA]: null,

  // TESTNET
  [SUPPORTED_CHAIN.SEPOLIA]: {
    auctionFactory: (process.env.NEXT_PUBLIC_SEPOLIA_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: {
    auctionFactory: (process.env.NEXT_PUBLIC_POLYGON_ZKEVM_CARDONA_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.POLYGON_AMOY]: {
    auctionFactory: (process.env.NEXT_PUBLIC_POLYGON_AMOY_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: {
    auctionFactory: (process.env.NEXT_PUBLIC_BASE_SEPOLIA_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  [SUPPORTED_CHAIN.BSC_TESTNET]: {
    auctionFactory: (process.env.NEXT_PUBLIC_BSC_TESTNET_AUCTION_FACTORY_ADDRESS || '0x0') as Address,
  },
  
};

export function getContractAddress(chain: SUPPORTED_CHAIN): ChainContracts {
  const contracts = CONTRACT_ADDRESSES[chain];
  if (!contracts) {
    throw new Error(`No contracts configured for chain: ${chain}`);
  }
  return contracts;
}
