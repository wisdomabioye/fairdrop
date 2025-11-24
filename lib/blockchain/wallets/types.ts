import type { ReactNode } from 'react';

/**
 * Abstraction layer for wallet connection libraries
 * This allows us to easily swap between RainbowKit, Reown AppKit, ConnectKit, etc.
 */

export interface WalletConnection {
  address: `0x${string}`;
  chainId: number;
  isConnected: boolean;
}

export interface WalletError {
  code: number;
  message: string;
}

export enum WalletErrorCode {
  USER_REJECTED = 4001,
  UNAUTHORIZED = 4100,
  UNSUPPORTED_METHOD = 4200,
  DISCONNECTED = 4900,
  CHAIN_DISCONNECTED = 4901,
}

export interface WalletProviderProps {
  children: ReactNode;
}

/**
 * Interface for wallet provider implementations
 * Any wallet library (Reown AppKit, RainbowKit, etc.) should implement this
 */
export interface WalletProviderAdapter {
  // Provider component to wrap the app
  Provider: React.FC<WalletProviderProps>;

  // Connect button component (if provided by the library)
  ConnectButton?: React.FC;
}
