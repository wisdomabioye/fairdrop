/**
 * Auction Detail Page
 *
 * Comprehensive auction view with:
 * - Full auction details and statistics
 * - Bidding interface
 * - Participants list
 * - Navigation back to auctions
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Address } from 'viem';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { APP_ROUTES, parseChainParam } from '@/constants/app.route';
import { useAuctionForChain } from '@/hooks/useAuction';
import { useAccount } from '@/lib/blockchain/wallets/WalletProvider';
import { AuctionDetails, ParticipantsList, BidInput, type Participant } from '@/components/auction';
import { WalletConnectionNotice } from '@/components/shared/WalletConnectionNotice';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AuctionDetailPage() {
  const params = useParams();
  const { isConnected } = useAccount();

  const chain = parseChainParam(params.chain);
  const auctionAddress = params.address as Address;
  const chainConfig = chain ? getChainConfig(chain) : null;

  const auction = useAuctionForChain(auctionAddress, chain!);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(true);
  const [participantsError, setParticipantsError] = useState<Error | null>(null);
  const [auctionState, setAuctionState] = useState<{
    currentPrice: bigint;
    remainingSupply: bigint;
    isActive: boolean;
  } | null>(null);

  const loadParticipants = useCallback(async () => {
    if (!auction) return;

    try {
      setIsLoadingParticipants(true);
      setParticipantsError(null);

      // TODO: Implement getParticipants method or event-based fetching
      // For now, this is a placeholder. We will need to:
      // 1. Either add a getParticipants method to the contract
      // 2. Or fetch BidPlaced events and aggregate them

      // Placeholder - empty array
      setParticipants([]);
    } catch (err) {
      setParticipantsError(err instanceof Error ? err : new Error('Failed to load participants'));
      setParticipants([]);
    } finally {
      setIsLoadingParticipants(false);
    }
  }, [auction]);

  const loadAuctionState = useCallback(async () => {
    if (!auction) return;

    try {
      const [state, isActive] = await Promise.all([
        auction.getAuctionState(),
        auction.isActive(),
      ]);

      setAuctionState({
        currentPrice: state.currentPrice,
        remainingSupply: state.remainingSupply,
        isActive,
      });
    } catch (err) {
      console.error('Failed to load auction state:', err);
    }
  }, [auction]);

  useEffect(() => {
    loadParticipants();
    loadAuctionState();
  }, [loadParticipants, loadAuctionState]);

  const handleBidSuccess = async () => {
    // Refresh participants and auction state after successful bid
    await Promise.all([loadParticipants(), loadAuctionState()]);
  };

  const handleRefresh = () => {
    loadParticipants();
    loadAuctionState();
  };

  // Invalid chain
  if (!chainConfig || !chain) {
    return (
      <div className="container mx-auto py-8">
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
        <Link href={APP_ROUTES.auctions(chain)}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Auctions
          </Button>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold">Auction</h1>
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

          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Auction Details */}
        <div className="lg:col-span-2 space-y-8">
          <AuctionDetails auctionAddress={auctionAddress} chain={chain} />

          {/* Participants List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Participants</h2>
            {participantsError && (
              <Alert variant="destructive" className="mb-4">
                <p className="text-sm">{participantsError.message}</p>
              </Alert>
            )}
            <ParticipantsList
              participants={participants}
              isLoading={isLoadingParticipants}
            />
          </div>
        </div>

        {/* Right Column - Bidding Interface */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            {!isConnected ? (
              <WalletConnectionNotice
                title="Connect to Bid"
                description="Connect your wallet to place a bid on this auction."
                variant="compact"
              />
            ) : auctionState && auctionState.isActive ? (
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Place Your Bid</CardTitle>
                </CardHeader>
                <CardContent>
                  <BidInput
                    auctionAddress={auctionAddress}
                    chain={chain}
                    currentPrice={auctionState.currentPrice}
                    remainingSupply={auctionState.remainingSupply}
                    onSuccess={handleBidSuccess}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card variant="outline">
                <CardContent className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    This auction is not currently active
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
