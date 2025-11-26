/**
 * My Bids Page
 *
 * Shows user's bids and participations with:
 * - List of bids using BidCard
 * - Claim functionality
 * - Filter by claim status
 * - Total value of bids
 * - Empty state if no bids
 * - Wallet connection check
 */

'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Wallet } from 'lucide-react';
import Link from 'next/link';
import { formatEther } from 'viem';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { APP_ROUTES, parseChainParam } from '@/constants/app.route';
import { useAccount } from '@/lib/blockchain/wallets/WalletProvider';
import { useUserParticipations, type ParticipationFilter } from '@/hooks/useUserParticipations';
import { BidCard } from '@/components/auction';
import { WalletConnectionNotice } from '@/components/shared/WalletConnectionNotice';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MyBidsPage() {
  const params = useParams();
  const { address, isConnected } = useAccount();

  const chain = parseChainParam(params.chain);
  const chainConfig = chain ? getChainConfig(chain) : null;

  const [filter, setFilter] = useState<ParticipationFilter>('all');

  const { participations, allParticipations, isLoading, error, refresh } = useUserParticipations(
    chain!,
    address,
    { filter }
  );

  // Calculate total value of bids
  const totalValue = useMemo(() => {
    return allParticipations.reduce((sum, bid) => sum + bid.amountPaid, BigInt(0));
  }, [allParticipations]);

  // Count claimable bids
  const claimableCount = useMemo(() => {
    return allParticipations.filter(bid => bid.canClaim && !bid.hasClaimed).length;
  }, [allParticipations]);

  // Invalid chain
  if (!chainConfig) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive">
          <p className="font-medium">Invalid Chain</p>
          <p className="text-sm">The selected chain is not supported.</p>
          <Link href="/">
            <Button variant="outline" size="sm" className="mt-4">
              Go to Home
            </Button>
          </Link>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href={APP_ROUTES.auctions(chain!)}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Auctions
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">My Bids</h1>
          <Badge
            variant="outline"
            className="flex items-center gap-2"
            style={{ borderColor: chainConfig.ui.color }}
          >
            <img
              src={chainConfig.ui.iconUrl}
              alt={chainConfig.chain.name}
              className="w-4 h-4 rounded-full"
            />
            {chainConfig.chain.name}
          </Badge>
        </div>

        <p className="text-muted-foreground">
          View and claim tokens from your auction participations
        </p>
      </div>

      {/* Wallet Connection Check */}
      {!isConnected ? (
        <WalletConnectionNotice
          title="Connect Your Wallet"
          description="Please connect your wallet to view your bids."
          variant="compact"
        />
      ) : (
        <>
          {/* Stats Cards */}
          {allParticipations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card variant="glass">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">Total Bids</p>
                  <p className="text-2xl font-bold">{allParticipations.length}</p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                  <p className="text-2xl font-bold">{formatEther(totalValue)} ETH</p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">Claimable</p>
                  <p className="text-2xl font-bold text-primary">{claimableCount}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-8">
              <p className="font-medium">Failed to load bids</p>
              <p className="text-sm">{error.message}</p>
              <Button onClick={refresh} variant="outline" size="sm" className="mt-2">
                Try Again
              </Button>
            </Alert>
          )}

          {/* Filter Tabs */}
          <Tabs value={filter} onValueChange={(v) => setFilter(v as ParticipationFilter)} className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="ended">Ended</TabsTrigger>
              <TabsTrigger value="claimable">Claimable</TabsTrigger>
              <TabsTrigger value="claimed">Claimed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Bids Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[350px] rounded-xl" />
              ))}
            </div>
          ) : participations.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Wallet className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {allParticipations.length === 0 ? 'No Bids Yet' : `No ${filter} Bids`}
              </h3>
              <p className="text-muted-foreground mb-6">
                {allParticipations.length === 0
                  ? `You haven't participated in any auctions on ${chainConfig.chain.name}.`
                  : `You don't have any ${filter} bids to display.`}
              </p>
              {allParticipations.length === 0 && (
                <Link href={APP_ROUTES.auctions(chain!)}>
                  <Button
                    size="lg"
                    style={{
                      background: `linear-gradient(135deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
                    }}
                  >
                    Browse Auctions
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participations.map((participation) => (
                <BidCard
                  key={participation.auctionAddress}
                  auctionAddress={participation.auctionAddress}
                  chain={chain!}
                  onClaimSuccess={() => {
                    refresh();
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
