import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider & {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      providers?: ExternalProvider[];
      request: (request: {
        method: string;
        params?: Array<any> | Record<string, any>;
      }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export {};
