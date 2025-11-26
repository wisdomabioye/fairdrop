/**
 * AuctionDetails Component
 *
 * Comprehensive display of auction information including:
 * - Status and timeline
 * - Price information (current, start, floor)
 * - Supply information
 * - Token details
 * - Owner information
 *
 * @example
 * ```tsx
 * <AuctionDetails
 *   auctionAddress="0x..."
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 * />
 * ```
 */

'use client';

import { useState, useEffect } from 'react';
import { type Address } from 'viem';
import { formatEther } from 'viem';
import { Clock, Coins, Package, User, Calendar, TrendingDown } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctionForChain } from '@/hooks/useAuction';
import { AuctionStatus } from '@/lib/blockchain/contracts';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/index';

export interface AuctionDetailsProps {
  /** Auction contract address */
  auctionAddress: Address;
  /** Chain the auction is on */
  chain: SUPPORTED_CHAIN;
  /** Optional className */
  className?: string;
}

interface AuctionData {
  status: AuctionStatus;
  currentPrice: bigint;
  startPrice: bigint;
  floorPrice: bigint;
  totalSupply: bigint;
  remainingSupply: bigint;
  totalCommitted: bigint;
  timeRemaining: bigint;
  owner: Address;
  auctionToken: Address;
  paymentToken: Address;
  isActive: boolean;
}

export function AuctionDetails({ auctionAddress, chain, className }: AuctionDetailsProps) {
  const auction = useAuctionForChain(auctionAddress, chain);
  const chainConfig = getChainConfig(chain);

  // Get native token symbol for the selected chain
  const nativeTokenSymbol = chainConfig?.chain.nativeCurrency?.symbol || 'ETH';

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
          totalCommitted: state.totalCommitted,
          timeRemaining: state.timeRemaining,
          owner,
          auctionToken,
          paymentToken,
          isActive,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load auction details'));
      } finally {
        setIsLoading(false);
      }
    }

    loadAuctionData();
  }, [auction]);

  if (isLoading) {
    return <AuctionDetailsSkeleton />;
  }

  if (error || !auctionData || !chainConfig) {
    return (
      <Card variant="outline" className={className}>
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">Failed to load auction details</p>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = getStatusInfo(auctionData.status, auctionData.isActive);
  const percentageSold = Number(
    (BigInt(100) * (auctionData.totalSupply - auctionData.remainingSupply)) / auctionData.totalSupply
  );
  const priceDecayPercent = auctionData.startPrice > BigInt(0)
    ? Number((BigInt(100) * (auctionData.startPrice - auctionData.currentPrice)) / auctionData.startPrice)
    : 0;

  return (
    <Card variant="glass" className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Chain Icon */}
            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-sm"
              style={{ borderColor: chainConfig.ui.color }}
            >
              <img
                src={chainConfig.ui.iconUrl}
                alt={chainConfig.chain.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <CardTitle className="text-2xl">Auction Details</CardTitle>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                {auctionAddress.slice(0, 10)}...{auctionAddress.slice(-8)}
              </p>
            </div>
          </div>

          <Badge variant={statusInfo.variant} className="text-sm">
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Information */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Coins className="w-4 h-4" />
            Price Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Current Price</span>
              <span className="text-lg font-bold">{formatEther(auctionData.currentPrice)} {nativeTokenSymbol}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Start Price</p>
                <p className="font-medium">{formatEther(auctionData.startPrice)} {nativeTokenSymbol}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Floor Price</p>
                <p className="font-medium">{formatEther(auctionData.floorPrice)} {nativeTokenSymbol}</p>
              </div>
            </div>

            {priceDecayPercent > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="w-4 h-4" />
                <span>Price has decreased by {priceDecayPercent.toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Supply Information */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Supply
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Remaining / Total</span>
              <span className="font-medium">
                {auctionData.remainingSupply.toString()} / {auctionData.totalSupply.toString()}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${percentageSold}%`,
                  background: `linear-gradient(90deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{percentageSold.toFixed(1)}% sold</span>
              <span>{formatEther(auctionData.totalCommitted)} {nativeTokenSymbol} committed</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Time Information */}
        {auctionData.isActive && (
          <>
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time Remaining
              </h3>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">
                  {formatTimeRemaining(auctionData.timeRemaining)}
                </p>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Contract Information */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Contract Information
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3" />
                Owner
              </span>
              <span className="font-mono">
                {auctionData.owner.slice(0, 6)}...{auctionData.owner.slice(-4)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Auction Token</span>
              <span className="font-mono">
                {auctionData.auctionToken.slice(0, 6)}...{auctionData.auctionToken.slice(-4)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Payment Token</span>
              <span className="font-mono">
                {auctionData.paymentToken.slice(0, 6)}...{auctionData.paymentToken.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AuctionDetailsSkeleton() {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
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
    return `${days}d ${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
