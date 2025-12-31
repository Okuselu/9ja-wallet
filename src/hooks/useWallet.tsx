import { createContext, useContext } from 'react';
// We import the interface, so we MUST NOT declare it again below
import type { WalletContextType } from '../@types/wallet.interface'; 

// Use the imported type in the generic <...>
export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};