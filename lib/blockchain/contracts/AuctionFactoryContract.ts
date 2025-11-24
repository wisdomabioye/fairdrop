import { getContract, parseEventLogs, type PublicClient, type WalletClient, type Address, type Transport, type Chain, type Account } from 'viem';
import { AuctionFactoryABI } from '../abis';

export interface CreateAuctionParams {
  startPrice: bigint;
  floorPrice: bigint;
  priceDecrement: bigint;
  priceInterval: bigint;
  totalSupply: bigint;
  duration: bigint;
  auctionToken: Address;
  paymentToken: Address;
}

export class AuctionFactoryContract {
  private contract;

  constructor(
    private publicClient: PublicClient,
    private walletClient: WalletClient<Transport, Chain, Account> | null,
    private address: Address
  ) {
    this.contract = getContract({
      address: this.address,
      abi: AuctionFactoryABI,
      client: this.publicClient,
    });
  }

  async createAuction(params: CreateAuctionParams): Promise<Address> {
    if (!this.walletClient) {
      throw new Error('Wallet not connected');
    }

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: AuctionFactoryABI,
      functionName: 'createAuction',
      args: [
        params.startPrice,
        params.floorPrice,
        params.priceDecrement,
        params.priceInterval,
        params.totalSupply,
        params.duration,
        params.auctionToken,
        params.paymentToken,
      ],
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    // Parse the AuctionCreated event to get the auction address
    const logs = parseEventLogs({
      abi: AuctionFactoryABI,
      eventName: 'AuctionCreated',
      logs: receipt.logs,
    });

    if (logs.length > 0 && logs[0].args.auctionAddress) {
      return logs[0].args.auctionAddress;
    }

    throw new Error('Failed to get auction address from event');
  }

  async getAuction(auctionId: bigint): Promise<Address> {
    return await this.contract.read.getAuction([auctionId]) as Address;
  }

  async getAuctionsByOwner(owner: Address): Promise<Address[]> {
    return await this.contract.read.getAuctionsByOwner([owner]) as Address[];
  }

  async getAuctionsPaginated(offset: bigint, limit: bigint): Promise<Address[]> {
    return await this.contract.read.getAuctionsPaginated([offset, limit]) as Address[];
  }

  async getTotalAuctions(): Promise<bigint> {
    return await this.contract.read.getTotalAuctions() as bigint;
  }

  async isValidAuction(auctionAddress: Address): Promise<boolean> {
    return await this.contract.read.isValidAuction([auctionAddress]) as boolean;
  }

  async getPlatformFeePercent(): Promise<bigint> {
    return await this.contract.read.platformFeePercent() as bigint;
  }

  async getFeeRecipient(): Promise<Address> {
    return await this.contract.read.feeRecipient() as Address;
  }

  async getAdmin(): Promise<Address> {
    return await this.contract.read.admin() as Address;
  }
}
