/**
 * Blockchain Hooks
 *
 * Exports all blockchain-related hooks for easy importing.
 */

// Auction hooks
export { useAuction, useAuctionForChain } from './useAuction';
export { useAuctionFactory, useAuctionFactoryForChain } from './useAuctionFactory';

// Reading contract data
export { useAuctions } from './useAuctions';
export type { UseAuctionsOptions, UseAuctionsResult } from './useAuctions';

export { useUserAuctions } from './useUserAuctions';
export type { UseUserAuctionsOptions, UseUserAuctionsResult } from './useUserAuctions';

export { useUserBids } from './useUserBids';
export type { UserBid, UseUserBidsOptions, UseUserBidsResult } from './useUserBids';

export { useUserParticipations } from './useUserParticipations';
export type {
  ParticipationFilter,
  AuctionParticipation,
  UseUserParticipationsOptions,
  UseUserParticipationsResult,
} from './useUserParticipations';

// Writing contract data
export { useCreateAuction } from './useCreateAuction';
export type { UseCreateAuctionResult } from './useCreateAuction';

export { useClaimTokens } from './useClaimTokens';
export type { ClaimInfo, UseClaimTokensResult } from './useClaimTokens';
