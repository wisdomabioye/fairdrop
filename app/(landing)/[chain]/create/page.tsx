/**
 * Chain-Specific Create Auction Page
 *
 * Pre-selects the chain from URL parameter.
 * Reuses the same CreateAuctionForm component.
 */

'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { type Address } from 'viem';
import { useAccount } from '@/lib/blockchain/wallets/WalletProvider';
import { ArrowLeft } from 'lucide-react';
import { getChainConfig } from '@/lib/blockchain/config/registry';
import { APP_ROUTES, parseChainParam } from '@/constants/app.route';
import { CreateAuctionForm } from '@/components/auction';
import { WalletConnectionNotice } from '@/components/shared/WalletConnectionNotice';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function ChainCreateAuctionPage() {
  const router = useRouter();
  const params = useParams();
  const { isConnected } = useAccount();

  const chain = parseChainParam(params.chain);
  const chainConfig = chain ? getChainConfig(chain) : null;

  const handleSuccess = (auctionAddress: Address) => {
    // Redirect to the auctions page for this chain
    if (chain) {
      router.push(APP_ROUTES.auctions(chain));
    }
  };

  // Invalid chain
  if (!chainConfig || !chain) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Alert variant="destructive">
          <p className="font-medium">Invalid Chain</p>
          <p className="text-sm">The selected chain is not supported.</p>
          <Link href="/create">
            <Button variant="outline" size="sm" className="mt-4">
              Go to Create Page
            </Button>
          </Link>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href={APP_ROUTES.auctions(chain)}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Auctions
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">Create Auction</h1>
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
          Launch a new Dutch auction on {chainConfig.chain.name}
        </p>
      </div>

      {/* Wallet Connection Check */}
      {!isConnected ? (
        <WalletConnectionNotice
          title="Connect Your Wallet"
          description="Please connect your wallet to create an auction."
          variant="default"
        />
      ) : chain ? (
        <CreateAuctionForm chain={chain} onSuccess={handleSuccess} />
      ) : null}
    </div>
  );
}
