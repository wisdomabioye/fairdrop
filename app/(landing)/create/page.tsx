/**
 * Global Create Auction Page
 *
 * Allows users to create auctions on any supported chain.
 * Features:
 * - Chain selector at the top
 * - Reusable CreateAuctionForm component
 * - Wallet connection check
 * - Success redirect to created auction
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Address } from 'viem';
import { useAccount } from '@/lib/blockchain/wallets/WalletProvider';
import { ArrowLeft } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { getEnabledChains } from '@/lib/blockchain/config/registry';
import { APP_ROUTES } from '@/constants/app.route';
import { CreateAuctionForm } from '@/components/auction';
import { WalletConnectionNotice } from '@/components/shared/WalletConnectionNotice';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function CreateAuctionPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const enabledChains = getEnabledChains();

  const [selectedChain, setSelectedChain] = useState<SUPPORTED_CHAIN | undefined>(
    enabledChains[0]?.key
  );

  const handleSuccess = () => {
    // Redirect to the auction page on the selected chain
    if (selectedChain !== undefined) {
      router.push(APP_ROUTES.auctions(selectedChain));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Create Auction</h1>
        <p className="text-muted-foreground">
          Launch a new Dutch auction on any supported blockchain
        </p>
      </div>

      {/* Wallet Connection Check */}
      {!isConnected ? (
        <WalletConnectionNotice
          title="Connect Your Wallet"
          description="Please connect your wallet to create an auction."
          variant="default"
        />
      ) : (
        <>
          {/* Chain Selector */}
          <Card variant="glass" className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="chain" className="text-base font-medium">
                  Select Blockchain
                </Label>
                <Select
                  value={selectedChain?.toString()}
                  onValueChange={(value) => setSelectedChain(Number(value) as SUPPORTED_CHAIN)}
                >
                  <SelectTrigger id="chain" className="w-full">
                    <SelectValue placeholder="Choose a chain" />
                  </SelectTrigger>
                  <SelectContent>
                    {enabledChains.map((chainConfig) => (
                      <SelectItem key={chainConfig.key} value={chainConfig.key.toString()}>
                        <div className="flex items-center gap-3">
                          <img
                            src={chainConfig.ui.iconUrl}
                            alt={chainConfig.chain.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{chainConfig.chain.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {chainConfig.chain.testnet ? 'Testnet' : 'Mainnet'}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose which blockchain to deploy your auction on
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Create Auction Form */}
          {selectedChain !== undefined ? (
            <CreateAuctionForm chain={selectedChain} onSuccess={handleSuccess} />
          ) : (
            <Card variant="outline">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Please select a chain to continue</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
