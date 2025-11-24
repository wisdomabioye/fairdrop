
export enum SUPPORTED_CHAIN {
    // Mainnet
    LINERA,
    ETHEREUM,
    POLYGON,
    POLYGON_ZKEVM,
    SOLANA,
    BASE,
    BSC,
    // Testnet
    POLYGON_AMOY,
    POLYGON_ZKEVM_CARDONA,
    SEPOLIA,
    BASE_SEPOLIA,
    BSC_TESTNET
}

export interface BlockchainAdapter {
    name: SUPPORTED_CHAIN;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getBalance(address: string): Promise<string>;
    placeBid(auctionId: string, amount: number): Promise<void>;
    // ... other methods
}
