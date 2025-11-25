import { createConfig } from 'wagmi';
import {
  // mainnet,
  // polygon,
  // polygonZkEvm,
  // base,
  // bsc,
  // sepolia,
  polygonAmoy,
  // baseSepolia,
  // bscTestnet,
} from 'wagmi/chains';
import { transports } from './transports';

// Define custom chains
export const polygonZkEvmCardona = {
  id: 2442,
  name: 'Polygon zkEVM Cardona',
  iconUrl: 'https://amoy.polygonscan.com/assets/poly/images/svg/logos/token-light.svg?v=25.11.3.0',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.cardona.zkevm-rpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://cardona-zkevm.polygonscan.com' },
  },
  testnet: true,
} as const;

// Wagmi chains configuration
export const chains = [
  // mainnet,
  // polygon,
  // polygonZkEvm,
  // base,
  // bsc,
  // sepolia,
  // polygonZkEvmCardona,
  polygonAmoy,
  // baseSepolia,
  // bscTestnet,
] as const;

// Re-export transports for convenience
export { transports };

// Create and export the config (for legacy compatibility)
export const config = createConfig({
  chains,
  transports,
});
