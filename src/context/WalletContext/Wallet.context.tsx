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

const getInitialPreferences = () => {
  const saved = localStorage.getItem("9ja-wallet-preferences");
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
  preferences: {
    hideBalance: false,
    ...getInitialPreferences(),
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

useEffect(() => {
  const loadData = async () => {
    // Simulate initial data fetch
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    dispatch({
      type: "SET_INITIAL_DATA",
      payload: {
        accounts: accountsData as Account[],
        transactions: transactionsData as Transaction[],
      },
    });
  };
  loadData();
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
      merchant: `Transfer: ${fromAccount.name} → ${
        toAccount?.name || "External"
      }`,
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
    dispatch({ type: "TOGGLE_HIDE_BALANCE" });
  };

  return (
    <WalletContext.Provider
      value={{
        ...state,
        transferMoney,
        toggleHideBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
