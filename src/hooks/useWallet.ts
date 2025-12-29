import { useContext } from 'react';
import { createContext } from 'react';
import type { WalletState } from '../../src/@types/wallet.interface';

export interface WalletContextType extends WalletState {
  transferMoney: (fromId: string, toId: string, amount: number) => Promise<void>;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};

export interface WalletContextType extends WalletState {
  transferMoney: (fromId: string, toId: string, amount: number) => Promise<void>;
}


