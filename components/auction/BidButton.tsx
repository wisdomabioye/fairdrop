/**
 * BidButton Component
 *
 * Quick bid button that opens a dialog with bid form.
 * Used for quick bidding from auction cards.
 *
 * @example
 * ```tsx
 * <BidButton
 *   auctionAddress="0x..."
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 *   currentPrice={parseEther("0.1")}
 *   remainingSupply={BigInt(100)}
 *   onSuccess={() => console.log('Bid placed!')}
 * />
 * ```
 */

'use client';

import { useState } from 'react';
import { type Address } from 'viem';
import { ShoppingCart } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { BidInput } from './BidInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils/index';

export interface BidButtonProps {
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
  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost' | 'gradient' | 'gradient-aurora';
  /** Show as icon only */
  iconOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export function BidButton({
  auctionAddress,
  chain,
  currentPrice,
  remainingSupply,
  onSuccess,
  onError,
  className,
  size = 'default',
  variant = 'default',
  iconOnly = false,
  disabled = false,
}: BidButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (hash: string) => {
    setIsOpen(false);
    onSuccess?.(hash);
  };

  const isSoldOut = remainingSupply === BigInt(0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled || isSoldOut}
          className={cn(className)}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <ShoppingCart className={cn('w-4 h-4', !iconOnly && 'mr-2')} />
          {!iconOnly && (isSoldOut ? 'Sold Out' : 'Place Bid')}
        </Button>
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
          <DialogDescription>
            Enter the quantity of tokens you'd like to bid for at the current price.
          </DialogDescription>
        </DialogHeader>

        <BidInput
          auctionAddress={auctionAddress}
          chain={chain}
          currentPrice={currentPrice}
          remainingSupply={remainingSupply}
          onSuccess={handleSuccess}
          onError={onError}
          compact
        />
      </DialogContent>
    </Dialog>
  );
}
