# Fairdrop Auction Platform - Development Roadmap

## Phase 1: Infrastructure & Chain Configuration

### Chain Configuration Refactoring
- [ ] **Task 1**: Refactor chain configuration to use DRY principle - consolidate chains.ts, wagmi.ts, and viem.ts
  - Currently chains are defined in multiple places
  - Need single source of truth

- [ ] **Task 2**: Create centralized chain registry with chain icons, colors, and metadata
  - Include chain icons for UI
  - Add brand colors for theming
  - Store RPC endpoints, block explorers
  - Store contract addresses per chain

---

## Phase 2: Blockchain Hooks & Contract Interactions

### Reading Contract Data
- [ ] **Task 3**: Build useAuctions hook to fetch all auctions from AuctionFactory contract
  - Use `getTotalAuctions()` and `getAuctionsPaginated(offset, limit)`
  - Support pagination
  - Return auction addresses and metadata

- [ ] **Task 4**: Build useUserAuctions hook to fetch auctions created by connected wallet
  - Use `getAuctionsByOwner(address)`
  - Filter by chain
  - Show auction management options

- [ ] **Task 5**: Build useUserBids hook to fetch bids made by connected wallet
  - Query each auction contract for `getParticipantInfo(address)`
  - Return bid amount, quantity, and status
  - Include claim eligibility

- [ ] **Task 6**: Build useUserParticipations hook to get auctions user has bid on (filterable by chain)
  - Get all auctions where user has `participants[address]` entry
  - Filter by chain
  - Show participation status (active, ended, claimed)

### Writing Contract Data
- [ ] **Task 7**: Build useCreateAuction hook for creating new auctions
  - Call `createAuction()` on AuctionFactory
  - Handle token approvals if needed
  - Support both ERC20 and native tokens (zero address)
  - Return transaction status and auction address

- [ ] **Task 8**: Build useClaimTokens hook for claiming tokens after auction ends
  - Call `claim()` on Auction contract
  - Check eligibility before claiming
  - Handle refunds if user overpaid
  - Show transaction feedback

---

## Phase 3: UI Components (Stunning & Responsive)

### Card Components
- [ ] **Task 9**: Create stunning AuctionCard component with chain icons, gradients, and glass morphism
  - Display: auction name, current price, floor price, time remaining
  - Show: total supply, remaining supply, owner
  - Include chain icon and badge
  - Responsive grid layout (1 col mobile, 2-3 cols tablet, 3-4 cols desktop)
  - Hover effects, animations
  - Status badges (Active, Ended, Finalized)

- [ ] **Task 12**: Create BidCard component showing bid details, claim status, and claim button
  - Display: auction info, bid amount, quantity
  - Show: current status, claimable amount, refund amount
  - Include chain icon
  - Claim button with eligibility check
  - Transaction status feedback

### Form & Filter Components
- [ ] **Task 10**: Create AuctionFilters component with chain selector (with icons) and status filters
  - Chain dropdown with icons and names
  - Status filter (All, Active, Ended, Finalized)
  - Price range slider
  - Sort options (Newest, Ending Soon, Lowest Price, Highest Price)
  - Search by auction address or owner

- [ ] **Task 11**: Create CreateAuctionForm component with validation and token selection
  - Step 1: Basic Info (auction token, payment token)
  - Step 2: Price Configuration (start price, floor price, decrement, interval)
  - Step 3: Supply & Duration (total supply, duration)
  - Form validation with helpful error messages
  - Token selector with balance display
  - Preview card showing auction details
  - Support native token (zero address) for payment

### Action Components
- [ ] **Task 13**: Create ClaimButton component with loading states and transaction feedback
  - Check claim eligibility
  - Show loading state during transaction
  - Success/error feedback
  - Disable if already claimed
  - Show expected tokens and refund amounts

---

## Phase 4: Pages & Routes

### Main Pages
- [ ] **Task 14**: Build auctions listing page with filters and responsive grid layout
  - Use AuctionCard components
  - Use AuctionFilters for filtering/sorting
  - Pagination or infinite scroll
  - Empty state when no auctions
  - Loading skeletons

- [ ] **Task 15**: Build create auction page with step-by-step form and preview
  - Use CreateAuctionForm component
  - Multi-step wizard with progress indicator
  - Live preview of auction card
  - Connect wallet prompt if not connected
  - Success page with link to auction

- [ ] **Task 16**: Build my-auctions page showing created auctions with management actions
  - Filter by chain
  - Show auction status
  - Actions: Finalize, Cancel, Withdraw (if applicable)
  - Empty state if no auctions created

- [ ] **Task 17**: Build my-bids page showing participated auctions with claim functionality
  - Filter by chain and claim status
  - Use BidCard component
  - Show total value of bids
  - Bulk claim option (if multiple claimable)
  - Empty state if no bids placed

---

## Phase 5: Dynamic Chain Routes

- [ ] **Task 18**: Set up dynamic [chain] routes in app directory
  - Create `/app/[chain]/` directory structure
  - Set up route handlers for:
    - `/[chain]/auctions` - All auctions on that chain
    - `/[chain]/create` - Create auction on that chain
    - `/[chain]/my-auctions` - User's auctions on that chain
    - `/[chain]/my-bids` - User's bids on that chain
    - `/[chain]/auction/[id]` - Individual auction detail page
  - Validate chain parameter
  - Redirect invalid chains to home

- [ ] **Task 19**: Create chain-specific pages using dynamic routes and reusable components
  - Reuse components built in Phase 3
  - Pass chain context to hooks
  - Update header navigation for chain-specific routes
  - Add chain switcher in header

---

## Key Features Checklist

### Auction Viewing
- [x] List all auctions
- [x] Filter by chain
- [x] Filter by status
- [x] Search/sort functionality
- [x] Responsive card grid

### Auction Creation
- [x] Multi-step form
- [x] Token selection (ERC20 or native)
- [x] Price configuration
- [x] Form validation
- [x] Transaction handling

### Auction Participation
- [x] Place bids
- [x] View bid history
- [x] Claim tokens after auction ends
- [x] Receive refunds if overpaid
- [x] Filter by participation status

### User Dashboard
- [x] View created auctions
- [x] View participated auctions
- [x] Manage auctions (finalize, cancel)
- [x] Claim tokens from multiple auctions
- [x] Chain-specific filtering

### Design Requirements
- [x] Stunning, modern UI with gradients and glass morphism
- [x] Chain icons and branding
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Loading states and skeletons
- [x] Transaction feedback and error handling
- [x] Empty states with helpful CTAs

---

## Technical Notes

### Contract Addresses
- Need to deploy AuctionFactory on each supported chain
- Store addresses in centralized chain config

### Chain Support
Currently supporting:
- **Mainnet**: Ethereum, Polygon, Polygon zkEVM, Base, BSC
- **Testnet**: Sepolia, Polygon Amoy, Polygon zkEVM Cardona, Base Sepolia, BSC Testnet

### ABI Functions Used

**AuctionFactory.sol**
- `getTotalAuctions()` - Get total number of auctions
- `getAuctionsPaginated(offset, limit)` - Get paginated auctions
- `getAuctionsByOwner(address)` - Get auctions by creator
- `createAuction(...)` - Create new auction

**Auction.sol**
- `getAuctionState()` - Get current state (status, price, supply, time)
- `getCurrentPrice()` - Get current auction price
- `getParticipantInfo(address)` - Get user's bid info
- `getExpectedRefund(address)` - Calculate expected refund
- `placeBid(quantity)` - Place a bid
- `claim()` - Claim tokens after auction ends
- `finalizeAuction()` - Finalize auction (owner only)

---

## Progress Tracking

- **Phase 1**: 0/2 complete
- **Phase 2**: 0/6 complete
- **Phase 3**: 0/5 complete
- **Phase 4**: 0/4 complete
- **Phase 5**: 0/2 complete

**Total Progress**: 0/19 tasks complete
