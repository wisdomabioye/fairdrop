"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Address } from 'viem';
import { formatEther } from 'viem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, ArrowRight, ShoppingCart } from "lucide-react"
import { toast } from 'sonner';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuctionForChain } from '@/hooks/useAuction';
import { AuctionStatus } from '@/lib/blockchain/contracts';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { BidButton } from '@/components/auction/BidButton';
import { APP_ROUTES } from '@/constants/app.route';

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

export interface AuctionCardLargeProps {
  /** Chain to fetch auction from (defaults to POLYGON_AMOY) */
  chain?: SUPPORTED_CHAIN;
  /** Optional specific auction address to display */
  auctionAddress?: Address;
  /** Optional click handler for View Details button */
  onViewDetails?: (auctionAddress: Address) => void;
  /** Callback when bid succeeds */
  onBidSuccess?: (hash: string) => void;
}

export function AuctionCardLarge({
  chain = SUPPORTED_CHAIN.POLYGON_AMOY,
  auctionAddress: providedAddress,
  onViewDetails,
  onBidSuccess,
}: AuctionCardLargeProps = {}) {
  const router = useRouter();

  // Fetch latest auction if no specific address provided
  const { auctions, isLoading: isLoadingAuctions } = useAuctions(chain, {
    pageSize: 10,
    autoLoad: !providedAddress, // Only auto-load if no specific address provided
  });
  
  // Use provided address or first auction from list
  const auctionAddress = providedAddress || auctions[auctions.length - 1];

  // Fetch auction details
  const auction = useAuctionForChain(auctionAddress, chain);
  const chainConfig = getChainConfig(chain);
  const nativeTokenSymbol = chainConfig?.chain.nativeCurrency?.symbol || 'ETH';

  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isLoading = isLoadingAuctions || isLoadingData;

  // Handle bid success - use provided callback or default toast
  const handleBidSuccess = (hash: string) => {
    if (onBidSuccess) {
      onBidSuccess(hash);
    } else {
      toast.success('Bid placed successfully!', {
        description: `Transaction: ${hash.slice(0, 10)}...${hash.slice(-8)}`,
      });
    }
  };

  // Handle view details - use provided callback or default navigation
  const handleViewDetails = () => {
    if (!auctionAddress) return;

    if (onViewDetails) {
      onViewDetails(auctionAddress);
    } else {
      router.push(APP_ROUTES.auctionDetail(chain, auctionAddress));
    }
  };

  // Load auction data
  useEffect(() => {
    async function loadAuctionData() {
      if (!auction || !auctionAddress) return;

      try {
        setIsLoadingData(true);
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
        setIsLoadingData(false);
      }
    }

    loadAuctionData();
  }, [auction, auctionAddress]);

  // Calculate derived values
  const percentageSold = auctionData
    ? Number((BigInt(100) * (auctionData.totalSupply - auctionData.remainingSupply)) / auctionData.totalSupply)
    : 0;

  const tokensSold = auctionData
    ? auctionData.totalSupply - auctionData.remainingSupply
    : BigInt(0);

  // Show loading skeleton
  if (isLoading) {
    return <AuctionCardLargeSkeleton />;
  }

  // Show demo/empty state if no auction found
  if (!auctionAddress || !auctionData || !chainConfig) {
    return <AuctionCardLargeDemo />;
  }

  const statusInfo = getStatusInfo(auctionData.status, auctionData.isActive);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="shimmer" className="mb-4">
            <Clock className="size-3" />
            {auctionData.isActive ? 'Live Auction' : 'Auction Ended'}
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            See a <span className="text-gradient-primary">Live Auction</span> in Action
          </h2>
        </div>

        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
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
                  <CardTitle className="text-2xl">Auction</CardTitle>
                  <CardDescription className="text-base mt-2 font-mono">
                    {auctionAddress.slice(0, 10)}...{auctionAddress.slice(-8)}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={statusInfo.variant} className="text-sm px-4 py-2">
                {statusInfo.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">
                    {formatEther(auctionData.currentPrice)} {nativeTokenSymbol}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold text-gradient-accent mb-2">
                    {tokensSold.toString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Tokens Sold</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {auctionData.remainingSupply.toString()} remaining
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold text-gradient-secondary mb-2">
                    {formatTimeRemaining(auctionData.timeRemaining)}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Auction Progress</span>
                  <span className="text-sm text-muted-foreground">{percentageSold.toFixed(1)}% Complete</span>
                </div>
                <Progress value={percentageSold} indicatorVariant="gradient-aurora" size="lg" />
              </div>

              <div className="flex gap-4">
                {auctionData.isActive && auctionData.remainingSupply > BigInt(0) ? (
                  <BidButton
                    auctionAddress={auctionAddress}
                    chain={chain}
                    currentPrice={auctionData.currentPrice}
                    remainingSupply={auctionData.remainingSupply}
                    onSuccess={handleBidSuccess}
                    variant="gradient-aurora"
                    size="lg"
                    className="flex-1"
                    iconOnly={false}
                  />
                ) : (
                  <Button variant="gradient-aurora" className="flex-1" size="lg" disabled>
                    {auctionData.remainingSupply === BigInt(0) ? 'Sold Out' : 'Auction Ended'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleViewDetails}
                >
                  View Details
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Helper function to format time remaining
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

// Helper function to get status info
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

// Loading skeleton component
function AuctionCardLargeSkeleton() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
        </div>

        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-7 w-40 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                    <Skeleton className="h-10 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>

              <div className="flex gap-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// Demo/fallback component when no auctions exist
function AuctionCardLargeDemo() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="shimmer" className="mb-4">
            <Clock className="size-3" />
            Demo Preview
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            See a <span className="text-gradient-primary">Live Auction</span> in Action
          </h2>
        </div>

        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">No Active Auctions</CardTitle>
                <CardDescription className="text-base mt-2">
                  Create the first auction to see it featured here
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-sm px-4 py-2">
                Coming Soon
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">
                This section will display live auction data once auctions are created on the network.
              </p>
              <Button variant="gradient-aurora" size="lg">
                Create First Auction
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
