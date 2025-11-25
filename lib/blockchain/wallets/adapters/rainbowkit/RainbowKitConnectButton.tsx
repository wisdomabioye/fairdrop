'use client';

/**
 * RainbowKit Connect Button
 *
 * Custom styled connect button that matches the app's theme.
 */

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChains } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Wallet, ChevronDown, Copy, ExternalLink, Power } from 'lucide-react';

export function RainbowKitConnectButton() {
  const chains = useChains();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        // Get full chain data with blockExplorers
        const fullChain = chains.find((c) => c.id === chain?.id);

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant="gradient"
                    size="default"
                    className="gap-2"
                  >
                    <Wallet className="size-4" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="destructive"
                    size="default"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {/* Chain Selector */}
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    size="default"
                    className="gap-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden lg:inline">{chain.name}</span>
                    <ChevronDown className="size-4 opacity-50" />
                  </Button>

                  {/* Account Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="gradient" size="default" className="gap-2">
                        <Wallet className="size-4" />
                        {account.displayName}
                        <ChevronDown className="size-4 opacity-70" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card w-56">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium">{account.displayName}</p>
                        {account.displayBalance && (
                          <p className="text-xs text-muted-foreground">
                            {account.displayBalance}
                          </p>
                        )}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(account.address);
                        }}
                        className="gap-2"
                      >
                        <Copy className="size-4" />
                        Copy Address
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          if (fullChain?.blockExplorers?.default?.url) {
                            window.open(
                              `${fullChain.blockExplorers.default.url}/address/${account.address}`,
                              '_blank'
                            );
                          }
                        }}
                        className="gap-2"
                        disabled={!fullChain?.blockExplorers?.default?.url}
                      >
                        <ExternalLink className="size-4" />
                        View on Explorer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={openAccountModal}
                        className="gap-2 text-destructive focus:text-destructive"
                      >
                        <Power className="size-4" />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
