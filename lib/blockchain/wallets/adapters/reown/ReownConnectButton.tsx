'use client';

/**
 * Reown AppKit Connect Button
 *
 * This is a thin wrapper around Reown's connect button.
 */

import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';

export function ReownConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  return (
    <button
      onClick={() => open()}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
}
