import React, { useReducer, useEffect } from "react";
import type {
  WalletState,
  Account,
  Transaction,
} from "../../@types/wallet.interface";
import { walletReducer } from "./Wallet.reducer"; // Fixed path
import { WalletContext } from "../../hooks/useWallet"; // Import from new home
import accountsData from "../../data/accounts.json";
import transactionsData from "../../data/transactions.json";

const initialState: WalletState = {
  accounts: [],
  transactions: [],
  loading: true,
  error: null,
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "SET_INITIAL_DATA",
      payload: {
        accounts: accountsData as Account[],
        transactions: transactionsData as Transaction[],
      },
    });
  }, []);

  const transferMoney = async (
    fromId: string,
    toId: string,
    amount: number
  ) => {
    const fromAccount = state.accounts.find((a) => a.id === fromId);
    const toAccount = state.accounts.find((a) => a.id === toId);

    if (!fromAccount || fromAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Create the transaction object for the list
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      merchant: `Transfer: ${fromAccount.name} → ${toAccount?.name}`,
      category: "Transfer",
      amount,
      type: "debit", // It's a debit from the perspective of the sender
      runningBalance: fromAccount.balance - amount,
    };

    // 1. Trigger Optimistic Update
    dispatch({
      type: "TRANSFER_START",
      payload: { fromId, toId, amount, tx: newTx },
    });

    try {
      // 2. Simulate Network Request
      await new Promise((resolve, reject) => {
        // 5% chance of failure to test our Revert logic
        setTimeout(
          () => (Math.random() > 0.05 ? resolve(true) : reject()),
          1200
        );
      });
    } catch {
      // 3. Rollback on Error
      dispatch({
        type: "TRANSFER_REVERT",
        payload: { fromId, toId, amount, txId: newTx.id },
      });
      dispatch({
        type: "TRANSFER_ERROR",
        payload: "Transaction failed. Balance has been restored.",
      });
      // Re-throw so the UI component can show a toast/alert
      throw new Error("Transaction failed");
    }
  };

  return (
    <WalletContext.Provider value={{ ...state, transferMoney }}>
      {children}
    </WalletContext.Provider>
  );
};

// import React, { useReducer, useEffect } from "react";
// import type {
//   WalletState,
//   Account,
//   Transaction,
// } from "../../@types/wallet.interface";
// import { walletReducer } from "../../context/WalletContext/Wallet.reducer";
// import { WalletContext } from "./useWallet";
// import accountsData from "../../data/accounts.json";
// import transactionsData from "../../data/transactions.json";

// const initialState: WalletState = {
//   accounts: [],
//   transactions: [],
//   loading: true,
//   error: null,
// };

// export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(walletReducer, initialState);

//   useEffect(() => {
//     const loadData = () => {
//       dispatch({
//         type: "SET_INITIAL_DATA",
//         payload: {
//           accounts: accountsData as Account[],
//           transactions: transactionsData as Transaction[],
//         },
//       });
//     };
//     loadData();
//   }, []);

//   const transferMoney = async (
//     fromId: string,
//     toId: string,
//     amount: number
//   ) => {
//     // We will implement the async logic and optimistic update here next
//   };

//   return (
//     <WalletContext.Provider value={{ ...state, transferMoney }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// `useWallet` is exported from ./useWallet to keep this file exporting only components

// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { WalletState, Account, Transaction } from '../@types/wallet';
// import { walletReducer } from './Wallet.reducer';
// import accountsData from '../data/accounts.json';
// import transactionsData from '../data/transactions.json';

// interface WalletContextType extends WalletState {
//   transferMoney: (fromId: string, toId: string, amount: number) => Promise<void>;
// }

// const WalletContext = createContext<WalletContextType | undefined>(undefined);

// const initialState: WalletState = {
//   accounts: [],
//   transactions: [],
//   loading: true,
//   error: null,
// };

// export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(walletReducer, initialState);

//   // Load initial data
//   useEffect(() => {
//     // Simulate API fetch delay
//     const timer = setTimeout(() => {
//       dispatch({
//         type: 'SET_INITIAL_DATA',
//         payload: { accounts: accountsData as Account[], transactions: transactionsData as Transaction[] }
//       });
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const transferMoney = async (fromId: string, toId: string, amount: number) => {
//     const fromAccount = state.accounts.find(a => a.id === fromId);
//     if (!fromAccount || fromAccount.balance < amount) {
//       throw new Error("Insufficient funds or invalid account");
//     }

//     const newTx: Transaction = {
//       id: `tx-${Date.now()}`,
//       date: new Date().toISOString(),
//       merchant: `Transfer to ${state.accounts.find(a => a.id === toId)?.name}`,
//       category: 'Transfer',
//       amount,
//       type: 'debit',
//       runningBalance: fromAccount.balance - amount // Simplified for demo
//     };

//     // 1. Optimistic Update
//     dispatch({ type: 'TRANSFER_START', payload: { fromId, toId, amount, tx: newTx } });

//     try {
//       // 2. Mock API Call
//       await new Promise((resolve, reject) => {
//         setTimeout(() => Math.random() > 0.05 ? resolve(true) : reject(), 1000);
//       });
//     } catch (err) {
//       // 3. Revert on failure
//       dispatch({ type: 'TRANSFER_REVERT', payload: { fromId, toId, amount, txId: newTx.id } });
//       dispatch({ type: 'TRANSFER_ERROR', payload: "Transaction failed. Please try again." });
//     }
//   };

//   return (
//     <WalletContext.Provider value={{ ...state, transferMoney }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => {
//   const context = useContext(WalletContext);
//   if (!context) throw new Error('useWallet must be used within a WalletProvider');
//   return context;
// };
