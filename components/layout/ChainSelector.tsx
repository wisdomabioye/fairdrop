/**
 * ChainSelector Component
 *
 * Dropdown to select and switch between chains.
 * Persists selection in localStorage and uses URL-friendly slugs.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { getEnabledChains } from '@/lib/blockchain/config/registry';
import { parseChainParam, getChainSlugForUrl } from '@/constants/app.route';
import { isValidChainSlug } from '@/lib/blockchain/config/chain-slugs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/index';

const STORAGE_KEY = 'fairdrop_selected_chain';

export function ChainSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const enabledChains = getEnabledChains();

  // Get selected chain from URL or localStorage
  const getInitialChain = (): SUPPORTED_CHAIN => {
    // Try to get from URL first (for /[chain]/* routes)
    const pathSlug = pathname?.split('/')[1];
    const chainFromUrl = parseChainParam(pathSlug);

    if (chainFromUrl) {
      const chainConfig = enabledChains.find(c => c.key === chainFromUrl);
      if (chainConfig) return chainFromUrl;
    }

    // Try localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const chainFromStorage = Number(stored) as SUPPORTED_CHAIN;
        const chainConfig = enabledChains.find(c => c.key === chainFromStorage);
        if (chainConfig) return chainFromStorage;
      }
    }

    // Default to first enabled chain
    return enabledChains[0]?.key || SUPPORTED_CHAIN.POLYGON_AMOY;
  };

  const [selectedChain, setSelectedChain] = useState<SUPPORTED_CHAIN>(getInitialChain);
  const selectedChainConfig = enabledChains.find(c => c.key === selectedChain);

  // Update localStorage when chain changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, selectedChain.toString());
    }
  }, [selectedChain]);

  // Sync with URL changes
  useEffect(() => {
    const pathSlug = pathname?.split('/')[1];
    const chainFromUrl = parseChainParam(pathSlug);

    if (chainFromUrl) {
      const chainConfig = enabledChains.find(c => c.key === chainFromUrl);
      if (chainConfig && chainFromUrl !== selectedChain) {
        setSelectedChain(chainFromUrl);
      }
    }
  }, [pathname, enabledChains, selectedChain]);

  const handleChainChange = (chain: SUPPORTED_CHAIN) => {
    setSelectedChain(chain);

    // If we're on a chain-specific route, update it
    if (pathname) {
      const pathParts = pathname.split('/');
      const firstPart = pathParts[1];

      // Check if first part is a chain slug
      if (isValidChainSlug(firstPart)) {
        // Replace the chain slug in the URL
        pathParts[1] = getChainSlugForUrl(chain);
        const newPath = pathParts.join('/');
        router.push(newPath);
      }
      // If on /create, stay there (it's chain-agnostic)
    }
  };

  if (!selectedChainConfig) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'gap-2 border-border/50 hover:border-primary/50',
            'transition-all duration-200 hover:shadow-sm',
            'bg-gradient-to-r from-background to-background/80',
            'hover:from-primary/5 hover:to-secondary/5'
          )}
        >
          <div className="relative">
            <img
              src={selectedChainConfig.ui.iconUrl}
              alt={selectedChainConfig.chain.name}
              className="w-5 h-5 rounded-full ring-1 ring-border/50"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <span className="hidden sm:inline font-medium">
            {selectedChainConfig.chain.name}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] glass-card p-1">
        {enabledChains.map((chainConfig) => {
          const isSelected = selectedChain === chainConfig.key;
          return (
            <DropdownMenuItem
              key={chainConfig.key}
              onClick={() => handleChainChange(chainConfig.key)}
              className={cn(
                'gap-3 cursor-pointer rounded-lg p-3 transition-all duration-200',
                'hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10',
                isSelected && 'bg-gradient-to-r from-primary/5 to-secondary/5',
                isSelected && 'border border-primary/20'
              )}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chainConfig.ui.iconUrl}
                  alt={chainConfig.chain.name}
                  className="w-8 h-8 rounded-full ring-1 ring-border/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {chainConfig.chain.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {chainConfig.chain.testnet ? 'Testnet' : 'Mainnet'}
                </p>
              </div>
              {isSelected && (
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Hook to get the currently selected chain
 */
export function useSelectedChain(): SUPPORTED_CHAIN {
  const pathname = usePathname();
  const enabledChains = getEnabledChains();

  // Try URL first
  const pathSlug = pathname?.split('/')[1];
  const chainFromUrl = parseChainParam(pathSlug);

  if (chainFromUrl) {
    const chainConfig = enabledChains.find(c => c.key === chainFromUrl);
    if (chainConfig) return chainFromUrl;
  }

  // Try localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const chainFromStorage = Number(stored) as SUPPORTED_CHAIN;
      const chainConfig = enabledChains.find(c => c.key === chainFromStorage);
      if (chainConfig) return chainFromStorage;
    }
  }

  // Default
  return enabledChains[0]?.key || SUPPORTED_CHAIN.POLYGON_AMOY;
}
