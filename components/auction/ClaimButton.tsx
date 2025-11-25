/**
 * ClaimButton Component
 *
 * Reusable button for claiming tokens from auctions with:
 * - Automatic eligibility checking
 * - Loading states during transaction
 * - Success/error feedback via toasts
 * - Disabled state if already claimed
 * - Shows expected tokens and refund amounts
 *
 * @example
 * ```tsx
 * <ClaimButton
 *   auctionAddress="0x..."
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 *   onSuccess={() => console.log('Claimed!')}
 * />
 * ```
 */

'use client';

import { type Address, formatEther } from 'viem';
import type { VariantProps } from 'class-variance-authority';
import { Gift, Loader2, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useClaimTokens } from '@/hooks/useClaimTokens';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/index';

export interface ClaimButtonProps extends Omit<React.ComponentProps<'button'>, 'onClick' | 'disabled' | 'children' | 'onError'>, VariantProps<typeof buttonVariants> {
  /** Auction contract address */
  auctionAddress: Address | undefined;
  /** Chain the auction is on */
  chain: SUPPORTED_CHAIN;
  /** Success callback */
  onSuccess?: () => void;
  /** Error callback */
  onError?: (error: Error) => void;
  /** Show details in button text */
  showDetails?: boolean;
  /** Custom button text */
  customText?: string;
}

export function ClaimButton({
  auctionAddress,
  chain,
  onSuccess,
  onError,
  showDetails = false,
  customText,
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ClaimButtonProps) {
  const { claim, canClaim, claimInfo, isLoading } = useClaimTokens(auctionAddress, chain);

  const handleClaim = async () => {
    if (!canClaim || !claimInfo) {
      toast.error('Cannot claim tokens yet', {
        description: claimInfo?.hasClaimed
          ? 'You have already claimed your tokens'
          : 'Auction is still active or you have no bid',
      });
      return;
    }

    try {
      const hash = await claim();

      toast.success('Tokens claimed successfully!', {
        description: (
          <div className="space-y-1">
            <p>Quantity: {claimInfo.quantity.toString()} tokens</p>
            {claimInfo.expectedRefund > BigInt(0) && (
              <p>Refund: {formatEther(claimInfo.expectedRefund)} ETH</p>
            )}
            <p className="text-xs font-mono">Tx: {hash.slice(0, 10)}...</p>
          </div>
        ),
      });

      onSuccess?.();
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Failed to claim tokens');

      toast.error('Failed to claim tokens', {
        description: errorObj.message,
      });

      onError?.(errorObj);
    }
  };

  const isDisabled = !canClaim || claimInfo?.hasClaimed || isLoading || !auctionAddress;

  const getButtonText = () => {
    if (customText) return customText;

    if (isLoading) {
      return 'Claiming...';
    }

    if (!auctionAddress) {
      return 'No Auction Selected';
    }

    if (!claimInfo) {
      return 'Loading...';
    }

    if (claimInfo.hasClaimed) {
      return 'Already Claimed';
    }

    if (!canClaim) {
      return 'Not Claimable Yet';
    }

    if (showDetails && claimInfo.quantity > BigInt(0)) {
      return `Claim ${claimInfo.quantity.toString()} Tokens`;
    }

    return 'Claim Tokens';
  };

  const getButtonIcon = () => {
    if (isLoading) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }

    if (claimInfo?.hasClaimed) {
      return <CheckCircle2 className="w-4 h-4" />;
    }

    return <Gift className="w-4 h-4" />;
  };

  return (
    <Button
      onClick={handleClaim}
      disabled={isDisabled}
      variant={variant}
      size={size}
      className={cn('gap-2', className)}
      {...props}
    >
      {getButtonIcon()}
      {getButtonText()}
    </Button>
  );
}

/**
 * ClaimButtonWithInfo - Enhanced version with claim details display
 */
export interface ClaimButtonWithInfoProps extends ClaimButtonProps {
  /** Show claim information above button */
  showInfo?: boolean;
}

export function ClaimButtonWithInfo({
  showInfo = true,
  ...props
}: ClaimButtonWithInfoProps) {
  const { claimInfo, canClaim } = useClaimTokens(props.auctionAddress, props.chain);

  return (
    <div className="space-y-3">
      {showInfo && claimInfo && (
        <div className="p-3 bg-muted rounded-lg space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tokens to Claim:</span>
            <span className="font-medium">{claimInfo.quantity.toString()}</span>
          </div>

          {claimInfo.expectedRefund > BigInt(0) && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Refund:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {formatEther(claimInfo.expectedRefund)} ETH
              </span>
            </div>
          )}

          {!canClaim && !claimInfo.hasClaimed && (
            <p className="text-xs text-muted-foreground">
              Auction is still active. You can claim when it ends.
            </p>
          )}

          {claimInfo.hasClaimed && (
            <p className="text-xs text-primary flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              You've already claimed your tokens
            </p>
          )}
        </div>
      )}

      <ClaimButton {...props} />
    </div>
  );
}
