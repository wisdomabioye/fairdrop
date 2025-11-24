import { 
  mainnet as ethereum,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  polygon, 
  polygonZkEvm, 
  polygonZkEvmCardona, 
  polygonAmoy, 
  sepolia
} from 'viem/chains';
import { SUPPORTED_CHAIN } from '@/types/blockchain';



export const chainConfig = {
  [SUPPORTED_CHAIN.ETHEREUM]: ethereum,
  [SUPPORTED_CHAIN.POLYGON]: polygon,
  [SUPPORTED_CHAIN.POLYGON_ZKEVM]: polygonZkEvm,
  [SUPPORTED_CHAIN.BASE]: base,
  [SUPPORTED_CHAIN.BSC]: bsc,
} as const;

export const testnetChainConfig = {
  [SUPPORTED_CHAIN.SEPOLIA]: sepolia,
  [SUPPORTED_CHAIN.POLYGON_ZKEVM_CARDONA]: polygonZkEvmCardona,
  [SUPPORTED_CHAIN.POLYGON_AMOY]: polygonAmoy,
  [SUPPORTED_CHAIN.BASE_SEPOLIA]: baseSepolia,
  [SUPPORTED_CHAIN.BSC_TESTNET]: bscTestnet,
} as const;

export function getChainById(chainId: keyof typeof chainConfig) {
  return chainConfig[chainId];
}

export function getTestnetChainById(chainId: keyof typeof testnetChainConfig) {
  return testnetChainConfig[chainId];
}
