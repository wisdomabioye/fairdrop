/**
 * Centralized Transport Configuration
 *
 * Single source of truth for RPC transports with Alchemy support.
 * Used by both viem and wagmi configurations.
 */
import { http } from 'viem';
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

// Get Alchemy API key from environment
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

/**
 * Transports configuration with Alchemy support
 * Falls back to public RPC if no Alchemy key is provided
 */
export const transports = {
  // Alchemy-supported chains
  [mainnet.id]: alchemyApiKey
    ? http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),
  [polygon.id]: alchemyApiKey
    ? http(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),
  [polygonZkEvm.id]: alchemyApiKey
    ? http(`https://polygonzkevm-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),
  [base.id]: alchemyApiKey
    ? http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),
  [sepolia.id]: alchemyApiKey
    ? http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),
  [polygonAmoy.id]: alchemyApiKey
    ? http(`https://polygon-amoy.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),
  [baseSepolia.id]: alchemyApiKey
    ? http(`https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`)
    : http(),

  // Public RPC for chains not supported by Alchemy
  [bsc.id]: http(),
  [bscTestnet.id]: http(),

  // Custom chains
  [2442]: http(), // Polygon zkEVM Cardona
};
