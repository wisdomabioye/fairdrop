/**
 * AuctionCard Component
 *
 * Displays auction information in a beautiful card with:
 * - Chain icon and badge
 * - Auction status (Active, Ended, Finalized)
 * - Price information (current, floor, start)
 * - Supply information (total, remaining)
 * - Time remaining
 * - Owner address
 * - Hover effects and animations
 *
 * @example
 * ```tsx
 * <AuctionCard
 *   auctionAddress="0x..."
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 *   onClick={() => router.push(`/auction/${address}`)}
 * />
 * ```
 */

'use client';

import { useState, useEffect } from 'react';
import { type Address } from 'viem';
import { formatEther } from 'viem';
import { ExternalLink, Clock, Package, Coins, User } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionForChain } from '@/hooks/useAuction';
import { AuctionStatus } from '@/lib/blockchain/contracts';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/index';

export interface AuctionCardProps {
  /** Auction contract address */
  auctionAddress: Address;
  /** Chain the auction is on */
  chain: SUPPORTED_CHAIN;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional className */
  className?: string;
  /** Show external link icon */
  showExternalLink?: boolean;
}

interface AuctionData {
  status: AuctionStatus;
  currentPrice: bigint;
  startPrice: bigint;
  floorPrice: bigint;
  totalSupply: bigint;
  remainingSupply: bigint;
  timeRemaining: bigint;
  owner: Address;
  auctionToken: Address;
  paymentToken: Address;
  isActive: boolean;
}

export function AuctionCard({
  auctionAddress,
  chain,
  onClick,
  className,
  showExternalLink = false,
}: AuctionCardProps) {
  const auction = useAuctionForChain(auctionAddress, chain);
  const chainConfig = getChainConfig(chain);

  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadAuctionData() {
      if (!auction) return;

      try {
        setIsLoading(true);
        setError(null);

        const [state, startPrice, floorPrice, totalSupply, owner, auctionToken, paymentToken, isActive] =
          await Promise.all([
            auction.getAuctionState(),
            auction.getStartPrice(),
            auction.getFloorPrice(),
            auction.getTotalSupply(),
            auction.getOwner(),
            auction.getAuctionToken(),
            auction.getPaymentToken(),
            auction.isActive(),
          ]);

        setAuctionData({
          status: state.status,
          currentPrice: state.currentPrice,
          startPrice,
          floorPrice,
          totalSupply,
          remainingSupply: state.remainingSupply,
          timeRemaining: state.timeRemaining,
          owner,
          auctionToken,
          paymentToken,
          isActive,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load auction data'));
      } finally {
        setIsLoading(false);
      }
    }

    loadAuctionData();
  }, [auction]);

  if (isLoading) {
    return <AuctionCardSkeleton />;
  }

  if (error || !auctionData || !chainConfig) {
    return (
      <Card variant="outline" className={cn('opacity-50', className)}>
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">Failed to load auction</p>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = getStatusInfo(auctionData.status, auctionData.isActive);
  const percentageSold = Number((BigInt(100) * (auctionData.totalSupply - auctionData.remainingSupply)) / auctionData.totalSupply);

  return (
    <Card
      variant="glass"
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        'hover:shadow-xl hover:scale-[1.02] cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
        }}
      />

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Chain Icon */}
            <div
              className="w-8 h-8 rounded-full overflow-hidden border-2 shadow-sm"
              style={{ borderColor: chainConfig.ui.color }}
            >
              <img
                src={chainConfig.ui.iconUrl}
                alt={chainConfig.chain.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <CardTitle className="text-lg">
                Auction
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                {auctionAddress.slice(0, 6)}...{auctionAddress.slice(-4)}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <Badge variant={statusInfo.variant} className="text-xs">
              {statusInfo.label}
            </Badge>
            {showExternalLink && (
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Coins className="w-4 h-4" />
              Current Price
            </span>
            <span className="font-bold text-lg">
              {formatEther(auctionData.currentPrice)} ETH
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Floor Price</span>
            <span className="font-medium">{formatEther(auctionData.floorPrice)} ETH</span>
          </div>
        </div>

        {/* Supply Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Package className="w-4 h-4" />
              Supply
            </span>
            <span className="font-medium">
              {auctionData.remainingSupply.toString()} / {auctionData.totalSupply.toString()}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${percentageSold}%`,
                background: `linear-gradient(90deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">{percentageSold}% sold</p>
        </div>

        {/* Time Remaining */}
        {auctionData.isActive && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Time Remaining
            </span>
            <span className="font-medium">
              {formatTimeRemaining(auctionData.timeRemaining)}
            </span>
          </div>
        )}

        {/* Owner */}
        <div className="flex items-center justify-between text-xs pt-2 border-t">
          <span className="text-muted-foreground flex items-center gap-1">
            <User className="w-3 h-3" />
            Owner
          </span>
          <span className="font-mono">
            {auctionData.owner.slice(0, 6)}...{auctionData.owner.slice(-4)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function AuctionCardSkeleton() {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}

function getStatusInfo(status: AuctionStatus, isActive: boolean): {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'gradient';
} {
  if (isActive) {
    return { label: 'Active', variant: 'gradient' };
  }

  switch (status) {
    case AuctionStatus.PENDING:
      return { label: 'Pending', variant: 'secondary' };
    case AuctionStatus.ACTIVE:
      return { label: 'Ended', variant: 'outline' };
    case AuctionStatus.FINALIZED:
      return { label: 'Finalized', variant: 'default' };
    case AuctionStatus.CANCELLED:
      return { label: 'Cancelled', variant: 'destructive' };
    default:
      return { label: 'Unknown', variant: 'outline' };
  }
}

function formatTimeRemaining(seconds: bigint): string {
  const totalSeconds = Number(seconds);

  if (totalSeconds <= 0) {
    return 'Ended';
  }

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
