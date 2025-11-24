'use client'

/**
 * Reown AppKit Adapter Export
 *
 * This is the single export point for the Reown AppKit implementation.
 * To switch to a different wallet library, we will create a new adapter directory
 * and update WalletProvider to import from there instead.
 */

export { ReownProvider } from './ReownProvider';
export { ReownConnectButton } from './ReownConnectButton';
export { wagmiConfig } from './config';
