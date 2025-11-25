/**
 * AuctionFilters Component
 *
 * Provides filtering and sorting options for auction listings:
 * - Chain selector with icons
 * - Status filter (All, Active, Ended, Finalized)
 * - Sort options (Newest, Ending Soon, Lowest Price, Highest Price)
 * - Search by address or owner
 *
 * @example
 * ```tsx
 * <AuctionFilters
 *   selectedChain={chain}
 *   onChainChange={setChain}
 *   selectedStatus={status}
 *   onStatusChange={setStatus}
 *   sortBy={sortBy}
 *   onSortChange={setSortBy}
 *   searchQuery={query}
 *   onSearchChange={setQuery}
 * />
 * ```
 */

'use client';

import { Filter, Search, ArrowUpDown } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { getEnabledChains } from '@/lib/blockchain/config/registry';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/index';

export type AuctionStatusFilter = 'all' | 'active' | 'ended' | 'finalized';
export type AuctionSortOption = 'newest' | 'ending_soon' | 'price_low' | 'price_high';

export interface AuctionFiltersProps {
  /** Selected chain */
  selectedChain?: SUPPORTED_CHAIN;
  /** Chain change handler */
  onChainChange?: (chain: SUPPORTED_CHAIN | undefined) => void;
  /** Selected status filter */
  selectedStatus?: AuctionStatusFilter;
  /** Status change handler */
  onStatusChange?: (status: AuctionStatusFilter) => void;
  /** Current sort option */
  sortBy?: AuctionSortOption;
  /** Sort change handler */
  onSortChange?: (sort: AuctionSortOption) => void;
  /** Search query */
  searchQuery?: string;
  /** Search change handler */
  onSearchChange?: (query: string) => void;
  /** Optional className */
  className?: string;
  /** Show chain filter */
  showChainFilter?: boolean;
  /** Show search */
  showSearch?: boolean;
}

export function AuctionFilters({
  selectedChain,
  onChainChange,
  selectedStatus = 'all',
  onStatusChange,
  sortBy = 'newest',
  onSortChange,
  searchQuery = '',
  onSearchChange,
  className,
  showChainFilter = true,
  showSearch = true,
}: AuctionFiltersProps) {
  const enabledChains = getEnabledChains();

  const statusOptions: { value: AuctionStatusFilter; label: string }[] = [
    { value: 'all', label: 'All Auctions' },
    { value: 'active', label: 'Active' },
    { value: 'ended', label: 'Ended' },
    { value: 'finalized', label: 'Finalized' },
  ];

  const sortOptions: { value: AuctionSortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'ending_soon', label: 'Ending Soon' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
  ];

  return (
    <Card variant="glass" className={cn('', className)}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search */}
          {showSearch && onSearchChange && (
            <div className="space-y-2">
              <Label htmlFor="search" className="flex items-center gap-2 text-sm">
                <Search className="w-4 h-4" />
                Search
              </Label>
              <Input
                id="search"
                type="text"
                placeholder="Search by auction or owner address..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Filter and Sort Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chain Filter */}
            {showChainFilter && onChainChange && (
              <div className="space-y-2">
                <Label htmlFor="chain" className="flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4" />
                  Chain
                </Label>
                <Select
                  value={selectedChain?.toString() ?? 'all'}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      onChainChange(undefined);
                    } else {
                      onChainChange(Number(value) as SUPPORTED_CHAIN);
                    }
                  }}
                >
                  <SelectTrigger id="chain">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Chains</SelectItem>
                    {enabledChains.map((chainConfig) => (
                      <SelectItem
                        key={chainConfig.key}
                        value={chainConfig.key.toString()}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={chainConfig.ui.iconUrl}
                            alt={chainConfig.chain.name}
                            className="w-4 h-4 rounded-full"
                          />
                          <span>{chainConfig.chain.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter */}
            {onStatusChange && (
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => onStatusChange(value as AuctionStatusFilter)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort */}
            {onSortChange && (
              <div className="space-y-2">
                <Label htmlFor="sort" className="flex items-center gap-2 text-sm">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort By
                </Label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => onSortChange(value as AuctionSortOption)}
                >
                  <SelectTrigger id="sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedChain !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {enabledChains.find(c => c.key === selectedChain)?.chain.name}
              </Badge>
            )}
            {selectedStatus !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                {statusOptions.find(s => s.value === selectedStatus)?.label}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Search: {searchQuery.slice(0, 10)}...
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
