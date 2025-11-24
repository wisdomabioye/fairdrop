import { getContract, type PublicClient, type WalletClient, type Address, type Transport, type Chain, type Account } from 'viem';
import { AuctionABI } from '../abis';

export enum AuctionStatus {
  PENDING = 0,
  ACTIVE = 1,
  FINALIZED = 2,
  CANCELLED = 3,
}

export interface AuctionState {
  status: AuctionStatus;
  currentPrice: bigint;
  totalCommitted: bigint;
  remainingSupply: bigint;
  timeRemaining: bigint;
}

export interface ParticipantInfo {
  quantity: bigint;
  amountPaid: bigint;
}

export class AuctionContract {
  private contract;

  constructor(
    private publicClient: PublicClient,
    private walletClient: WalletClient<Transport, Chain, Account> | null,
    private address: Address
  ) {
    this.contract = getContract({
      address: this.address,
      abi: AuctionABI,
      client: this.publicClient,
    });
  }

  async placeBid(quantity: bigint, value?: bigint): Promise<string> {
    if (!this.walletClient) {
      throw new Error('Wallet not connected');
    }

    const currentPrice = await this.getCurrentPrice();
    const totalCost = currentPrice * quantity;

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: AuctionABI,
      functionName: 'placeBid',
      args: [quantity],
      value: value ?? totalCost,
    });

    await this.publicClient.waitForTransactionReceipt({ hash });
    return hash;
  }

  async claim(): Promise<string> {
    if (!this.walletClient) {
      throw new Error('Wallet not connected');
    }

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: AuctionABI,
      functionName: 'claim',
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return hash;
  }

  async finalizeAuction(): Promise<string> {
    if (!this.walletClient) {
      throw new Error('Wallet not connected');
    }

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: AuctionABI,
      functionName: 'finalizeAuction',
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return hash;
  }

  async cancelAuction(): Promise<string> {
    if (!this.walletClient) {
      throw new Error('Wallet not connected');
    }

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: AuctionABI,
      functionName: 'cancelAuction',
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return hash;
  }

  async withdrawProceeds(): Promise<string> {
    if (!this.walletClient) {
      throw new Error('Wallet not connected');
    }

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: AuctionABI,
      functionName: 'withdrawProceeds',
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return hash;
  }

  async getCurrentPrice(): Promise<bigint> {
    return await this.contract.read.getCurrentPrice() as bigint;
  }

  async getAuctionState(): Promise<AuctionState> {
    const [status, currentPrice, totalCommitted, remainingSupply, timeRemaining] =
      await this.contract.read.getAuctionState() as [number, bigint, bigint, bigint, bigint];

    return {
      status: status as AuctionStatus,
      currentPrice,
      totalCommitted,
      remainingSupply,
      timeRemaining,
    };
  }

  async getParticipantInfo(participant: Address): Promise<ParticipantInfo> {
    const [quantity, amountPaid] = await this.contract.read.getParticipantInfo([participant]) as [bigint, bigint];
    return { quantity, amountPaid };
  }

  async getExpectedRefund(participant: Address): Promise<bigint> {
    return await this.contract.read.getExpectedRefund([participant]) as bigint;
  }

  async isActive(): Promise<boolean> {
    return await this.contract.read.isActive() as boolean;
  }

  async hasClaimed(participant: Address): Promise<boolean> {
    return await this.contract.read.hasClaimed([participant]) as boolean;
  }

  async getStartPrice(): Promise<bigint> {
    return await this.contract.read.startPrice() as bigint;
  }

  async getFloorPrice(): Promise<bigint> {
    return await this.contract.read.floorPrice() as bigint;
  }

  async getTotalSupply(): Promise<bigint> {
    return await this.contract.read.totalSupply() as bigint;
  }

  async getTotalCommitted(): Promise<bigint> {
    return await this.contract.read.totalCommitted() as bigint;
  }

  async getStartTime(): Promise<bigint> {
    return await this.contract.read.startTime() as bigint;
  }

  async getEndTime(): Promise<bigint> {
    return await this.contract.read.endTime() as bigint;
  }

  async getOwner(): Promise<Address> {
    return await this.contract.read.owner() as Address;
  }

  async getAuctionToken(): Promise<Address> {
    return await this.contract.read.auctionToken() as Address;
  }

  async getPaymentToken(): Promise<Address> {
    return await this.contract.read.paymentToken() as Address;
  }

  async getClearingPrice(): Promise<bigint> {
    return await this.contract.read.clearingPrice() as bigint;
  }
}
