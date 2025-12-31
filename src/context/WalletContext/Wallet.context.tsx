import React, { useReducer, useEffect, useCallback } from "react";
import type { WalletState, Account, Transaction, TransferMetadata } from "../../@types/wallet.interface";
import { walletReducer } from "./Wallet.reducer";
import { WalletContext } from "../../hooks/useWallet";
import accountsData from "../../data/accounts.json";
import transactionsData from "../../data/transactions.json";

const PREFERENCES_KEY = "9ja-wallet-preferences";

const getInitialPreferences = () => {
  const saved = localStorage.getItem(PREFERENCES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse preferences", e);
    }
  }
  return { hideBalance: false };
};

const initialState: WalletState = {
  accounts: [],
  transactions: [],
  loading: true,
  error: null,
  preferences: getInitialPreferences(),
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // 1. Unified Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        dispatch({
          type: "SET_INITIAL_DATA",
          payload: {
            accounts: accountsData as Account[],
            transactions: transactionsData as Transaction[],
          },
        });
      } catch {
        // Fix: Removed 'err' to satisfy linter
        dispatch({ type: "SET_ERROR", payload: "Failed to load wallet data" });
      }
    };
    loadData();
  }, []);

  // 2. Sync Preferences
  useEffect(() => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(state.preferences));
  }, [state.preferences]);

  // 3. Centralized Transfer Logic
  const transferMoney = useCallback(async (
    fromId: string,
    toId: string,
    amount: number,
    metadata?: TransferMetadata 
  ) => {
    const fromAccount = state.accounts.find((a) => a.id === fromId);
    
    if (!fromAccount || fromAccount.balance < amount) {
      const errorMsg = "Insufficient funds for this transaction.";
      dispatch({ type: "TRANSFER_ERROR", payload: errorMsg });
      throw new Error(errorMsg);
    }

    const isExternal = toId === "external-target";
    const merchantLabel = isExternal 
      ? `To: ${metadata?.accountName || 'Unknown'} (${metadata?.bankName || 'External Bank'})`
      : `Internal Transfer: Main ➔ Savings`;

    const newTx: Transaction = {
      id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString(),
      merchant: merchantLabel,
      category: isExternal ? "Transfer" : "Internal", // Must match TransactionCategory
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
        setTimeout(() => (Math.random() > 0.05 ? resolve(true) : reject()), 1500);
      });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch {
      // Revert with corrected payload types
      dispatch({
        type: "TRANSFER_REVERT",
        payload: { fromId, toId, amount, txId: newTx.id },
      });
      dispatch({ type: "SET_ERROR", payload: "The bank server is unreachable. Transaction reverted." });
    }
  }, [state.accounts]);

  const toggleHideBalance = useCallback(() => {
    dispatch({ type: "TOGGLE_HIDE_BALANCE" });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        transferMoney,
        toggleHideBalance,
        clearError 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};