/**
 * BidInput Component
 *
 * Reusable input component for placing bids with:
 * - Quantity input with validation
 * - Current price display
 * - Total cost calculation
 * - Remaining supply check
 * - Integration with usePlaceBid hook
 *
 * @example
 * ```tsx
 * <BidInput
 *   auctionAddress="0x..."
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 *   currentPrice={parseEther("0.1")}
 *   remainingSupply={BigInt(100)}
 *   onSuccess={(hash) => console.log('Bid placed!', hash)}
 * />
 * ```
 */

'use client';

import { useState } from 'react';
import { type Address } from 'viem';
import { formatEther } from 'viem';
import { ShoppingCart, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { usePlaceBid } from '@/hooks/usePlaceBid';
import { getViemChain } from '@/lib/blockchain/config/registry';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/index';

export interface BidInputProps {
  /** Auction contract address */
  auctionAddress: Address;
  /** Chain the auction is on */
  chain: SUPPORTED_CHAIN;
  /** Current price per token */
  currentPrice: bigint;
  /** Remaining supply */
  remainingSupply: bigint;
  /** Optional success callback */
  onSuccess?: (hash: string) => void;
  /** Optional error callback */
  onError?: (error: Error) => void;
  /** Optional className */
  className?: string;
  /** Compact mode (smaller size) */
  compact?: boolean;
  /** Show full form or just input */
  variant?: 'full' | 'inline';
}

export function BidInput({
  auctionAddress,
  chain,
  currentPrice,
  remainingSupply,
  onSuccess,
  onError,
  className,
  compact = false,
  variant = 'full',
}: BidInputProps) {
  const [quantity, setQuantity] = useState('');

  // Get native token symbol for the selected chain
  const viemChain = getViemChain(chain);
  const nativeTokenSymbol = viemChain?.nativeCurrency?.symbol || 'ETH';

  const { placeBid, isPending, reset } = usePlaceBid(auctionAddress, chain, {
    onSuccess: (hash) => {
      setQuantity('');
      toast.success('Bid placed successfully!', {
        description: `Transaction: ${hash.slice(0, 10)}...${hash.slice(-8)}`,
      });
      onSuccess?.(hash);
    },
    onError: (err) => {
      toast.error('Bid failed', {
        description: err.message,
      });
      onError?.(err);
    },
  });

  const quantityBigInt = quantity ? BigInt(quantity) : BigInt(0);
  const totalCost = quantityBigInt * currentPrice;
  const isValidQuantity = quantityBigInt > BigInt(0) && quantityBigInt <= remainingSupply;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();

    if (!isValidQuantity) {
      toast.error('Invalid quantity', {
        description: 'Please enter a valid quantity within available supply',
      });
      return;
    }

    try {
      await placeBid(quantityBigInt);
    } catch (err) {
      // Error is handled by the hook callbacks
    }
  };

  const handleQuantityChange = (value: string) => {
    // Only allow positive integers
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity(value);
      reset();
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <Input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          disabled={isPending || remainingSupply === BigInt(0)}
          className={cn(compact && 'h-8 text-sm')}
        />
        <Button
          type="submit"
          disabled={!isValidQuantity || isPending}
          size={compact ? 'sm' : 'default'}
        >
          {isPending ? 'Bidding...' : 'Bid'}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Quantity Input */}
      <div className="space-y-2">
        <label className={cn('block font-medium', compact ? 'text-sm' : 'text-base')}>
          Quantity
        </label>
        <Input
          type="text"
          placeholder={`Max: ${remainingSupply.toString()}`}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          disabled={isPending || remainingSupply === BigInt(0)}
          className={cn(compact && 'h-9 text-sm')}
        />
        <p className="text-xs text-muted-foreground">
          {remainingSupply.toString()} tokens available
        </p>
      </div>

      {/* Price Information */}
      <div className={cn('space-y-2 p-3 rounded-lg bg-muted/50', compact && 'p-2')}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Coins className={cn('w-4 h-4', compact && 'w-3 h-3')} />
            Current Price
          </span>
          <span className="font-medium">{formatEther(currentPrice)} {nativeTokenSymbol}</span>
        </div>

        {quantityBigInt > BigInt(0) && (
          <div className="flex items-center justify-between text-sm font-bold border-t pt-2">
            <span className="flex items-center gap-1">
              <ShoppingCart className={cn('w-4 h-4', compact && 'w-3 h-3')} />
              Total Cost
            </span>
            <span>{formatEther(totalCost)} {nativeTokenSymbol}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isValidQuantity || isPending || remainingSupply === BigInt(0)}
        className="w-full"
        size={compact ? 'default' : 'lg'}
      >
        {isPending ? (
          'Placing Bid...'
        ) : remainingSupply === BigInt(0) ? (
          'Sold Out'
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Place Bid
          </>
        )}
      </Button>
    </form>
  );
}
