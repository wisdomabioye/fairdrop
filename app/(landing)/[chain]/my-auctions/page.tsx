/**
 * My Auctions Page
 *
 * Shows auctions created by the connected user with:
 * - List of owned auctions
 * - Management actions (Finalize, Cancel, Withdraw)
 * - Auction status display
 * - Empty state if no auctions
 * - Wallet connection check
 */

'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { APP_ROUTES, parseChainParam } from '@/constants/app.route';
import { useAccount } from '@/lib/blockchain/wallets/WalletProvider';
import { useUserAuctions } from '@/hooks/useUserAuctions';
import { AuctionCard } from '@/components/auction';
import { WalletConnectionNotice } from '@/components/shared/WalletConnectionNotice';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyAuctionsPage() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const chain = parseChainParam(params.chain);
  const chainConfig = chain ? getChainConfig(chain) : null;

  const { auctions, isLoading, error, refresh } = useUserAuctions(chain!, address);

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

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold">My Auctions</h1>
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

          <Link href={APP_ROUTES.createAuction(chain!)}>
            <Button
              size="lg"
              style={{
                background: `linear-gradient(135deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Auction
            </Button>
          </Link>
        </div>

        <p className="text-muted-foreground">
          Manage your auctions on {chainConfig.chain.name}
        </p>

        {auctions.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Total: {auctions.length} auctions
          </p>
        )}
      </div>

      {/* Wallet Connection Check */}
      {!isConnected ? (
        <WalletConnectionNotice
          title="Connect Your Wallet"
          description="Please connect your wallet to view your auctions."
          variant="compact"
        />
      ) : (
        <>
          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-8">
              <p className="font-medium">Failed to load auctions</p>
              <p className="text-sm">{error.message}</p>
              <Button onClick={refresh} variant="outline" size="sm" className="mt-2">
                Try Again
              </Button>
            </Alert>
          )}

          {/* Auctions Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-xl" />
              ))}
            </div>
          ) : auctions.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Auctions Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't created any auctions on {chainConfig.chain.name}.
              </p>
              <Link href={APP_ROUTES.createAuction(chain!)}>
                <Button
                  size="lg"
                  style={{
                    background: `linear-gradient(135deg, ${chainConfig.ui.color}, ${chainConfig.ui.colorSecondary})`,
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Auction
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auctionAddress) => (
                <AuctionCard
                  key={auctionAddress}
                  auctionAddress={auctionAddress}
                  chain={chain!}
                  onClick={() => {
                    router.push(APP_ROUTES.auctionDetail(chain!, auctionAddress));
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
