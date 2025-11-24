'use client';

/**
 * RainbowKit Adapter Export
 *
 * This is the single export point for the RainbowKit implementation.
 * To switch to a different wallet library, create a new adapter directory
 * and update WalletProvider to import from there instead.
 */

export { RainbowKitProvider } from './RainbowKitProvider';
export { RainbowKitConnectButton } from './RainbowKitConnectButton';
export { wagmiConfig } from './config';
