/**
 * Simple Auction Example
 *
 * Shows how clean and straightforward the wagmi hooks approach is
 */

'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useAuction } from '@/hooks/useAuction';
import { useAuctionFactoryForChain } from '@/hooks/useAuctionFactory';
import { WalletConnectButton } from '@/lib/blockchain/wallets/WalletProvider';
import { SUPPORTED_CHAIN } from '@/types/blockchain';

export function SimpleAuctionExample() {
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  // Wagmi hooks - simple and direct
  const { address, isConnected } = useAccount();

  // Your custom hooks
  const auctionAddress = '0x...' as `0x${string}`; // Replace with real address
  const auction = useAuction(auctionAddress);
  const factory = useAuctionFactoryForChain(SUPPORTED_CHAIN.ETHEREUM);

  const handlePlaceBid = async () => {
    if (!auction) return;

    setLoading(true);
    try {
      await auction.placeBid(BigInt(quantity));
      alert('Bid placed successfully!');
      setQuantity('');
    } catch (error) {
      console.error('Failed to place bid:', error);
      alert('Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Place a Bid</h2>

      {/* Wallet Connection */}
      <div>
        <WalletConnectButton />
        {isConnected && (
          <p className="mt-2 text-sm text-gray-600">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        )}
      </div>

      {/* Bidding Interface */}
      {isConnected && (
        <div className="space-y-3">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            onClick={handlePlaceBid}
            disabled={loading || !quantity || !auction}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Placing Bid...' : 'Place Bid'}
          </button>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500">
        <p>✅ No adapter layer needed</p>
        <p>✅ No separate wallet state management</p>
        <p>✅ Just wagmi hooks + your contract hooks</p>
      </div>
    </div>
  );
}
