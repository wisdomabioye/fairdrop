/**
 * ParticipantsList Component
 *
 * Displays a list of auction participants with their bids.
 * Shows participant addresses, quantities, and amounts paid.
 *
 * @example
 * ```tsx
 * <ParticipantsList
 *   participants={[
 *     { address: '0x...', quantity: 10n, amountPaid: parseEther('1') },
 *   ]}
 * />
 * ```
 */

'use client';

import { type Address } from 'viem';
import { formatEther } from 'viem';
import { Users, User, Package, Coins } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/index';

export interface Participant {
  address: Address;
  quantity: bigint;
  amountPaid: bigint;
}

export interface ParticipantsListProps {
  /** List of participants */
  participants: Participant[];
  /** Loading state */
  isLoading?: boolean;
  /** Optional className */
  className?: string;
  /** Compact mode */
  compact?: boolean;
  /** Native token symbol (e.g., ETH, POL) */
  nativeTokenSymbol?: string;
}

export function ParticipantsList({
  participants,
  isLoading = false,
  className,
  compact = false,
  nativeTokenSymbol = 'ETH',
}: ParticipantsListProps) {
  if (isLoading) {
    return <ParticipantsListSkeleton compact={compact} />;
  }

  if (participants.length === 0) {
    return (
      <Card variant="outline" className={className}>
        <CardContent className={cn('py-12 text-center', compact && 'py-8')}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
            <Users className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No participants yet</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals
  const totalQuantity = participants.reduce((sum, p) => sum + p.quantity, BigInt(0));
  const totalAmount = participants.reduce((sum, p) => sum + p.amountPaid, BigInt(0));

  return (
    <Card variant="outline" className={className}>
      <CardHeader className={compact ? 'pb-3' : ''}>
        <CardTitle className={cn('flex items-center gap-2', compact && 'text-lg')}>
          <Users className={cn('w-5 h-5', compact && 'w-4 h-4')} />
          Participants ({participants.length})
        </CardTitle>
      </CardHeader>

      <CardContent className={compact ? 'pt-0' : ''}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={compact ? 'py-2' : ''}>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Address
                  </span>
                </TableHead>
                <TableHead className={cn('text-right', compact && 'py-2')}>
                  <span className="flex items-center gap-1 justify-end">
                    <Package className="w-3 h-3" />
                    Quantity
                  </span>
                </TableHead>
                <TableHead className={cn('text-right', compact && 'py-2')}>
                  <span className="flex items-center gap-1 justify-end">
                    <Coins className="w-3 h-3" />
                    Amount Paid
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant, index) => (
                <TableRow key={`${participant.address}-${index}`}>
                  <TableCell className={cn('font-mono text-xs', compact && 'py-2')}>
                    {participant.address.slice(0, 6)}...{participant.address.slice(-4)}
                  </TableCell>
                  <TableCell className={cn('text-right', compact && 'py-2')}>
                    {participant.quantity.toString()}
                  </TableCell>
                  <TableCell className={cn('text-right font-medium', compact && 'py-2')}>
                    {formatEther(participant.amountPaid)} {nativeTokenSymbol}
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="font-bold border-t-2">
                <TableCell className={compact ? 'py-2' : ''}>Total</TableCell>
                <TableCell className={cn('text-right', compact && 'py-2')}>
                  {totalQuantity.toString()}
                </TableCell>
                <TableCell className={cn('text-right', compact && 'py-2')}>
                  {formatEther(totalAmount)} {nativeTokenSymbol}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ParticipantsListSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <Card variant="outline">
      <CardHeader className={compact ? 'pb-3' : ''}>
        <Skeleton className={cn('h-6 w-48', compact && 'h-5 w-36')} />
      </CardHeader>
      <CardContent className={compact ? 'pt-0' : ''}>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
