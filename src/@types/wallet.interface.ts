/**
 * src/@types/wallet.ts

 */
export interface WalletContextType extends WalletState {
  transferMoney: (
    fromId: string, 
    toId: string, 
    amount: number, 
    metadata?: TransferMetadata 
  ) => Promise<void>;
  toggleHideBalance: () => void;
clearError: () => void;
}



export interface TransferMetadata {
  bankName?: string;
  accountName?: string;
  recipientAccount?: string;
}

export interface UserPreferences {
  hideBalance: boolean;
}

export interface WalletState {
  accounts: Account[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  preferences: UserPreferences; // Add this
}

export type TransactionCategory = "Transfer" | "Internal" | "Deposit" | "Payment" | "Savings";

export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  description?: string;
  title?: string;
  category: TransactionCategory; 
  amount: number;
  type: 'debit' | 'credit';
  runningBalance: number;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface WalletState {
  accounts: Account[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export type WalletAction =
  | { type: "SET_INITIAL_DATA"; payload: { accounts: Account[]; transactions: Transaction[] } }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "TRANSFER_START"; payload: { fromId: string; toId: string; amount: number; tx: Transaction } }
  | { type: "TRANSFER_ERROR"; payload: string }
  | { type: "TRANSFER_REVERT"; payload: { fromId: string; toId: string; amount: number; txId: string } }
  | { type: "TOGGLE_HIDE_BALANCE" };

export interface WalletContextType extends WalletState {
  transferMoney: (fromId: string, toId: string, amount: number, metadata?: TransferMetadata) => Promise<void>;
  toggleHideBalance: () => void;
  clearError: () => void;
}