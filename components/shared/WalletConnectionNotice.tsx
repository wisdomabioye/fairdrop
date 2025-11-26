/**
 * WalletConnectionNotice Component
 *
 * Beautiful wallet connection prompt with connect button.
 */

'use client';

import { Wallet, Sparkles } from 'lucide-react';
import { WalletConnectButton } from '@/lib/blockchain/wallets/WalletProvider';
import { Card, CardContent } from '@/components/ui/card';

export interface WalletConnectionNoticeProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'compact';
}

export function WalletConnectionNotice({
  title = 'Connect Your Wallet',
  description = 'Please connect your wallet to view and interact with your auctions.',
  variant = 'default',
}: WalletConnectionNoticeProps) {
  if (variant === 'compact') {
    return (
      <Card variant="glass" className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <WalletConnectButton />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl blur-xl" />

      {/* Content */}
      <Card variant="glass" className="relative border-primary/20">
        <CardContent className="py-12">
          <div className="text-center max-w-md mx-auto">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 relative">
              <Wallet className="w-10 h-10 text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground mb-8">{description}</p>

            {/* Connect Button */}
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>

            {/* Helper text */}
            <p className="text-xs text-muted-foreground mt-6">
              Secure connection powered by RainbowKit
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
