
export enum SUPPORTED_CHAIN {
    LINERA,
    ETHEREUM,
    POLYGON,
    SOLANA
}

export interface BlockchainAdapter {
    name: SUPPORTED_CHAIN;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getBalance(address: string): Promise<string>;
    placeBid(auctionId: string, amount: number): Promise<void>;
    // ... other methods
}
