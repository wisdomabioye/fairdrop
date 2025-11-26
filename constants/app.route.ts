/**
 * Centralized Routing Utilities
 *
 * Handles all chain-based URL generation with slug support.
 * Import these functions instead of manually building URLs.
 */

import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { getChainSlug, getChainFromSlug, isValidChainSlug } from '@/lib/blockchain/config/chain-slugs';

/**
 * Parse chain from URL parameter (slug format)
 */
export function parseChainParam(param: string | string[] | undefined): SUPPORTED_CHAIN | null {
  if (!param || Array.isArray(param)) return null;

  if (isValidChainSlug(param)) {
    return getChainFromSlug(param);
  }

  return null;
}

/**
 * Get chain slug for URL usage
 */
export function getChainSlugForUrl(chain: SUPPORTED_CHAIN): string {
  return getChainSlug(chain);
}

/**
 * Route Builders
 * All chain-based routes in one place
 */
export const APP_ROUTES = {
  // Landing
  home: () => '/',

  // Global
  create: () => '/create',

  // Chain-specific routes
  auctions: (chain: SUPPORTED_CHAIN) => `/${getChainSlug(chain)}/auctions`,
  createAuction: (chain: SUPPORTED_CHAIN) => `/${getChainSlug(chain)}/create`,
  myAuctions: (chain: SUPPORTED_CHAIN) => `/${getChainSlug(chain)}/my-auctions`,
  myBids: (chain: SUPPORTED_CHAIN) => `/${getChainSlug(chain)}/my-bids`,

  auctionDetail: (chain: SUPPORTED_CHAIN, auctionAddress: string) =>
    `/${getChainSlug(chain)}/auctions/${auctionAddress}`,
  doc: () => '/docs',
  api: () => '/api',
  whitepaper: () => '/whitepaper',
  about: () => '/about',
  contact: () => '/contact',
  privacy: () => '/privacy',
  cookies: () => '/cookies',
  terms: () => '/terms',

};

/**
 * Navigation items generator
 * Used in header and other nav components
 */
export function getNavigationItems(chain: SUPPORTED_CHAIN) {
  return [
    { name: 'Auctions', href: APP_ROUTES.auctions(chain) },
    { name: 'Create', href: APP_ROUTES.create() },
    { name: 'My Bids', href: APP_ROUTES.myBids(chain) },
    { name: 'My Auctions', href: APP_ROUTES.myAuctions(chain) },
  ];
}
