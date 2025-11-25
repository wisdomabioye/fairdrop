/**
 * Chain Registry
 *
 * Maps SUPPORTED_CHAIN enum to viem chains and adds UI metadata.
 * Single source of truth that eliminates duplication across wagmi.ts, viem.ts, and chains.ts
 */

import { type Chain } from 'viem';
import {
  mainnet,
  polygon,
  polygonZkEvm,
  base,
  bsc,
  sepolia,
  polygonAmoy,
  baseSepolia,
  bscTestnet,
} from 'viem/chains';
import { SUPPORTED_CHAIN } from '@/types/blockchain';

/**
 * Custom chain: Polygon zkEVM Cardona (not in viem/chains)
 */
export const polygonZkEvmCardona = {
  id: 2442,
  name: 'Polygon zkEVM Cardona',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.cardona.zkevm-rpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://cardona-zkevm.polygonscan.com' },
  },
  testnet: true,
} as const satisfies Chain;

/**
 * UI metadata (only things NOT in viem chains)
 */
interface ChainUIMetadata {
  /** Chain icon URL */
  iconUrl: string;
  /** Brand color */
  color: string;
  /** Secondary color for gradients */
  colorSecondary: string;
  /** AuctionFactory contract address (if deployed) */
  auctionFactoryAddress?: `0x${string}`;
}

/**
 * Chain configuration = viem chain + UI metadata
 */
export interface ChainConfig {
  /** SUPPORTED_CHAIN enum value */
  key: SUPPORTED_CHAIN;
  /** Viem chain object */
  chain: Chain;
  /** UI metadata */
  ui: ChainUIMetadata;
}

/**
 * UI metadata for each chain
 */
const CHAIN_UI: Record<SUPPORTED_CHAIN, ChainUIMetadata | null> = {
  [SUPPORTED_CHAIN.ETHEREUM]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg',
    color: '#627EEA',
    colorSecondary: '#8FA2E8',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_ETHEREUM_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.POLYGON]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    color: '#8247E5',
    colorSecondary: '#A374E8',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_POLYGON_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    color: '#8247E5',
    colorSecondary: '#A374E8',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_POLYGON_ZKEVM_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.BASE]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_base.jpg',
    color: '#0052FF',
    colorSecondary: '#4C8AFF',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_BASE_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.BSC]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_binance.jpg',
    color: '#F3BA2F',
    colorSecondary: '#F5C94D',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_BSC_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.SEPOLIA]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg',
    color: '#627EEA',
    colorSecondary: '#8FA2E8',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_SEPOLIA_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.POLYGON_AMOY]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    color: '#8247E5',
    colorSecondary: '#A374E8',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_POLYGON_AMOY_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    color: '#8247E5',
    colorSecondary: '#A374E8',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_POLYGON_ZKEVM_CARDONA_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_base.jpg',
    color: '#0052FF',
    colorSecondary: '#4C8AFF',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_BASE_SEPOLIA_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.BSC_TESTNET]: {
    iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_binance.jpg',
    color: '#F3BA2F',
    colorSecondary: '#F5C94D',
    auctionFactoryAddress: (process.env.NEXT_PUBLIC_BSC_TESTNET_AUCTION_FACTORY_ADDRESS || undefined) as `0x${string}` | undefined,
  },
  [SUPPORTED_CHAIN.LINERA]: null, // Not EVM
  [SUPPORTED_CHAIN.SOLANA]: null, // Not EVM
};

/**
 * Map SUPPORTED_CHAIN to viem chains
 */
const CHAIN_MAP: Record<SUPPORTED_CHAIN, Chain | null> = {
  [SUPPORTED_CHAIN.ETHEREUM]: mainnet,
  [SUPPORTED_CHAIN.POLYGON]: polygon,
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: polygonZkEvm,
  [SUPPORTED_CHAIN.BASE]: base,
  [SUPPORTED_CHAIN.BSC]: bsc,
  [SUPPORTED_CHAIN.SEPOLIA]: sepolia,
  [SUPPORTED_CHAIN.POLYGON_AMOY]: polygonAmoy,
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: polygonZkEvmCardona,
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: baseSepolia,
  [SUPPORTED_CHAIN.BSC_TESTNET]: bscTestnet,
  [SUPPORTED_CHAIN.LINERA]: null,
  [SUPPORTED_CHAIN.SOLANA]: null,
};

/**
 * ENABLED CHAINS CONFIGURATION
 *
 * Add/remove chains here to enable/disable them app-wide.
 * This single list controls wagmi, viem, and all UI.
 */
export const ENABLED_CHAINS: SUPPORTED_CHAIN[] = [
  SUPPORTED_CHAIN.POLYGON_AMOY,
  // Uncomment to enable more chains:
  // SUPPORTED_CHAIN.ETHEREUM,
  // SUPPORTED_CHAIN.POLYGON,
  // SUPPORTED_CHAIN.BASE,
  // SUPPORTED_CHAIN.SEPOLIA,
  // SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA,
];

/**
 * Get full chain config (viem chain + UI metadata)
 */
export function getChainConfig(chainKey: SUPPORTED_CHAIN): ChainConfig | null {
  const chain = CHAIN_MAP[chainKey];
  const ui = CHAIN_UI[chainKey];

  if (!chain || !ui) return null;

  return { key: chainKey, chain, ui };
}

/**
 * Get all enabled chain configs
 */
export function getEnabledChains(): ChainConfig[] {
  return ENABLED_CHAINS
    .map(getChainConfig)
    .filter((config): config is ChainConfig => config !== null);
}

/**
 * Get enabled viem chains (for wagmi config)
 */
export function getEnabledViemChains(): Chain[] {
  return getEnabledChains().map(config => config.chain);
}

/**
 * Get viem chain by SUPPORTED_CHAIN key
 */
export function getViemChain(chainKey: SUPPORTED_CHAIN): Chain | null {
  return CHAIN_MAP[chainKey];
}

/**
 * Get SUPPORTED_CHAIN key by viem chain ID
 */
export function getChainKeyByViemId(viemChainId: number): SUPPORTED_CHAIN | null {
  const entry = Object.entries(CHAIN_MAP).find(([_, chain]) => chain?.id === viemChainId);
  return entry ? (Number(entry[0]) as SUPPORTED_CHAIN) : null;
}

/**
 * Check if a chain is enabled
 */
export function isChainEnabled(chainKey: SUPPORTED_CHAIN): boolean {
  return ENABLED_CHAINS.includes(chainKey);
}

/**
 * Get AuctionFactory address for a chain
 */
export function getAuctionFactoryAddress(chainKey: SUPPORTED_CHAIN): `0x${string}` | null {
  return CHAIN_UI[chainKey]?.auctionFactoryAddress ?? null;
}


/**
 * Get mainnet chains (enabled ones only)
 */
export function getMainnetChains() {
  return getEnabledChains()
    .filter(config => !config.chain.testnet)
    .reduce((acc, config) => {
      acc[config.key] = config.chain;
      return acc;
    }, {} as Partial<Record<SUPPORTED_CHAIN, Chain>>);
}

/**
 * Get testnet chains (enabled ones only)
 */
export function getTestnetChains() {
  return getEnabledChains()
    .filter(config => config.chain.testnet)
    .reduce((acc, config) => {
      acc[config.key] = config.chain;
      return acc;
    }, {} as Partial<Record<SUPPORTED_CHAIN, Chain>>);
}
