import { BlockchainAdapter, SUPPORTED_CHAIN } from '@/types/blockchain';

export class LineraAdapter implements BlockchainAdapter {
    name = SUPPORTED_CHAIN.LINERA;
    
    async disconnect(): Promise<void> {
        
    }

    async connect(): Promise<void> {
        
    }

    async placeBid(auctionId: string, amount: number): Promise<void> {
        
    }

    async getBalance(address: string): Promise<string> {
        return '0.00'
    }
}
