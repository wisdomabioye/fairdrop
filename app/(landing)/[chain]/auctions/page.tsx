/**
 * Auctions Listing Page
 *
 * Shows all auctions on a specific chain with:
 * - Filters (status, sort)
 * - Search functionality
 * - Responsive grid layout
 * - Pagination/infinite scroll
 * - Empty states
 * - Loading skeletons
 */

'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { APP_ROUTES, parseChainParam } from '@/constants/app.route';
import { useAuctions } from '@/hooks/useAuctions';
import { AuctionCard, AuctionFilters, type AuctionStatusFilter, type AuctionSortOption } from '@/components/auction';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionsPage() {
  const params = useParams();
  const router = useRouter();

  const chain = parseChainParam(params.chain);
  const chainConfig = chain ? getChainConfig(chain) : null;

  const [statusFilter, setStatusFilter] = useState<AuctionStatusFilter>('all');
  const [sortBy, setSortBy] = useState<AuctionSortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const { auctions, totalAuctions, isLoading, error, loadMore, hasMore } = useAuctions(chain!, {
    pageSize: 12,
  });

  // Filter auctions based on search
  const filteredAuctions = useMemo(() => {
    if (!searchQuery) return auctions;
    const query = searchQuery.toLowerCase();
    return auctions.filter(address => address.toLowerCase().includes(query));
  }, [auctions, searchQuery]);

  // Invalid chain
  if (!chainConfig) {
    return (
      <div className="container mx-auto py-8 px-4">
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold">Auctions</h1>
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
          Browse and participate in Dutch auctions on {chainConfig.chain.name}
        </p>

        {totalAuctions !== null && (
          <p className="text-sm text-muted-foreground mt-2">
            Total: {totalAuctions.toString()} auctions
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mb-8">
        <AuctionFilters
          selectedStatus={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showChainFilter={false}
        />
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-8">
          <p className="font-medium">Failed to load auctions</p>
          <p className="text-sm">{error.message}</p>
        </Alert>
      )}

      {/* Auctions Grid */}
      {isLoading && auctions.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-xl" />
          ))}
        </div>
      ) : filteredAuctions.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Auctions Found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'No auctions match your search.'
              : 'Be the first to create an auction on this chain!'}
          </p>
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
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auctionAddress) => (
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

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <Button
                onClick={loadMore}
                disabled={isLoading}
                variant="outline"
                size="lg"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
