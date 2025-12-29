import React, { useReducer, useEffect } from "react";
import type {
  WalletState,
  Account,
  Transaction,
} from "../../@types/wallet.interface";
import { walletReducer } from "./Wallet.reducer";
import { WalletContext } from "../../hooks/useWallet";
import accountsData from "../../data/accounts.json";
import transactionsData from "../../data/transactions.json";

// FIX: Added preferences to the initialState to satisfy the WalletState interface
const initialState: WalletState = {
  accounts: [],
  transactions: [],
  loading: true,
  error: null,
  preferences: {
    hideBalance: false, // Default state
  },
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    // Simulate initial data fetch
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

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      merchant: `Transfer: ${fromAccount.name} → ${toAccount?.name || 'External'}`,
      category: "Transfer",
      amount,
      type: "debit",
      runningBalance: fromAccount.balance - amount,
    };

    dispatch({
      type: "TRANSFER_START",
      payload: { fromId, toId, amount, tx: newTx },
    });

    try {
      await new Promise((resolve, reject) => {
        setTimeout(
          () => (Math.random() > 0.05 ? resolve(true) : reject()),
          1200
        );
      });
    } catch {
      dispatch({
        type: "TRANSFER_REVERT",
        payload: { fromId, toId, amount, txId: newTx.id },
      });
      dispatch({
        type: "TRANSFER_ERROR",
        payload: "Transaction failed. Balance has been restored.",
      });
      throw new Error("Transaction failed");
    }
  };

  // Function to toggle the privacy setting
  const toggleHideBalance = () => {
    dispatch({ type: 'TOGGLE_HIDE_BALANCE' });
  };

  return (
    <WalletContext.Provider 
      value={{ 
        ...state, 
        transferMoney, 
        toggleHideBalance 
      }}
    >
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
