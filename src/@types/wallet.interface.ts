/**
 * src/@types/wallet.ts

 */
export interface WalletContextType extends WalletState {
  transferMoney: (fromId: string, toId: string, amount: number) => Promise<void>;
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

export type TransactionCategory = 
  | 'Food' 
  | 'Transport' 
  | 'Shopping' 
  | 'Utilities' 
  | 'Transfer' 
  | 'Salary' 
  | 'Entertainment' 
  | 'Miscellaneous';

export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  date: string; // ISO 8601 format
  merchant: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
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

// Action Types for our Reducer
export type WalletAction =
  | { type: 'SET_INITIAL_DATA'; payload: { accounts: Account[]; transactions: Transaction[] } }
  | { type: 'TRANSFER_START'; payload: { fromId: string; toId: string; amount: number; tx: Transaction } }
  | { type: 'TRANSFER_ERROR'; payload: string }
  | { type: 'TRANSFER_REVERT'; payload: { fromId: string; toId: string; amount: number; txId: string } }
  | { type: 'TOGGLE_HIDE_BALANCE' };