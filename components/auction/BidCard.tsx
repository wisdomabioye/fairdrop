/**
 * BidCard Component
 *
 * Displays user's bid information for an auction with:
 * - Auction details and chain icon
 * - Bid amount and quantity
 * - Current status (Active, Claimable, Claimed)
 * - Expected refund amount
 * - Claim button with eligibility check
 * - Transaction feedback
 *
 * @example
 * ```tsx
 * <BidCard
 *   auctionAddress="0x..."
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 *   userAddress={address}
 * />
 * ```
 */

'use client';

import { type Address } from 'viem';
import { formatEther } from 'viem';
import { Coins, TrendingUp, Gift, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useClaimTokens } from '@/hooks/useClaimTokens';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/index';
import { toast } from 'sonner';

export interface BidCardProps {
  /** Auction contract address */
  auctionAddress: Address;
  /** Chain the auction is on */
  chain: SUPPORTED_CHAIN;
  /** Optional className */
  className?: string;
  /** Callback after successful claim */
  onClaimSuccess?: () => void;
}

export function BidCard({
  auctionAddress,
  chain,
  className,
  onClaimSuccess,
}: BidCardProps) {
  const chainConfig = getChainConfig(chain);
  const { claim, canClaim, claimInfo, isLoading, error, txHash } = useClaimTokens(auctionAddress, chain);

  const handleClaim = async () => {
    try {
      await claim();
      toast.success('Tokens claimed successfully!', {
        description: `Transaction: ${txHash?.slice(0, 10)}...`,
      });
      onClaimSuccess?.();
    } catch (err) {
      toast.error('Failed to claim tokens', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  if (isLoading && !claimInfo) {
    return <BidCardSkeleton />;
  }

  if (!claimInfo || !chainConfig) {
    return (
      <Card variant="outline" className={cn('opacity-50', className)}>
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">No bid information found</p>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = getBidStatusInfo(claimInfo.hasClaimed, canClaim);

  return (
    <Card
      variant="elevated"
      className={cn('relative overflow-hidden', className)}
    >
      {/* Gradient accent based on chain */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
        }}
      />

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Chain Icon */}
            <div
              className="w-8 h-8 rounded-full overflow-hidden border-2 shadow-sm flex-shrink-0"
              style={{ borderColor: chainConfig.ui.color }}
            >
              <img
                src={chainConfig.ui.iconUrl}
                alt={chainConfig.chain.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <CardTitle className="text-base">Your Bid</CardTitle>
              <CardDescription className="font-mono text-xs">
                {auctionAddress.slice(0, 6)}...{auctionAddress.slice(-4)}
              </CardDescription>
            </div>
          </div>

          <Badge variant={statusInfo.variant} className="text-xs">
            {statusInfo.icon}
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bid Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Coins className="w-3 h-3" />
              <span>Quantity</span>
            </div>
            <p className="text-lg font-bold">{claimInfo.quantity.toString()}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>Amount Paid</span>
            </div>
            <p className="text-lg font-bold">{formatEther(claimInfo.amountPaid)} ETH</p>
          </div>
        </div>

        {/* Refund Information */}
        {claimInfo.expectedRefund > BigInt(0) && (
          <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Expected Refund
                </p>
                <p className="text-xs text-muted-foreground">You'll receive a refund for overpayment</p>
              </div>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">
                {formatEther(claimInfo.expectedRefund)} ETH
              </p>
            </div>
          </div>
        )}

        {/* Status Message */}
        {claimInfo.hasClaimed ? (
          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              You've already claimed your tokens
            </p>
          </div>
        ) : canClaim ? (
          <div className="flex items-center gap-2 p-3 bg-gradient-primary-soft/10 rounded-lg">
            <Gift className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">
              Your tokens are ready to claim!
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Auction is still active
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm text-destructive">{error.message}</p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleClaim}
          disabled={!canClaim || claimInfo.hasClaimed || isLoading}
          className="w-full"
          size="lg"
          style={{
            background: canClaim && !claimInfo.hasClaimed
              ? `linear-gradient(135deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`
              : undefined,
          }}
        >
          {isLoading ? (
            'Claiming...'
          ) : claimInfo.hasClaimed ? (
            'Already Claimed'
          ) : canClaim ? (
            'Claim Tokens'
          ) : (
            'Not Claimable Yet'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function BidCardSkeleton() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="h-16 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

function getBidStatusInfo(hasClaimed: boolean, canClaim: boolean): {
  label: string;
  variant: 'default' | 'secondary' | 'gradient' | 'outline';
  icon: React.ReactNode;
} {
  if (hasClaimed) {
    return {
      label: 'Claimed',
      variant: 'default',
      icon: <CheckCircle2 className="w-3 h-3" />,
    };
  }

  if (canClaim) {
    return {
      label: 'Claimable',
      variant: 'gradient',
      icon: <Gift className="w-3 h-3" />,
    };
  }

  return {
    label: 'Active',
    variant: 'secondary',
    icon: <Clock className="w-3 h-3" />,
  };
}
