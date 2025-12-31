import type { WalletState, WalletAction } from "../../@types/wallet.interface";

export const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return { ...state, ...action.payload, loading: false };

    case "SET_ERROR":
    case "TRANSFER_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "TRANSFER_START": {
      const { fromId, toId, amount, tx } = action.payload;
      return {
        ...state,
        accounts: state.accounts.map((acc) => {
          if (acc.id === fromId) return { ...acc, balance: acc.balance - amount };
          if (acc.id === toId) return { ...acc, balance: acc.balance + amount };
          return acc;
        }),
        transactions: [tx, ...state.transactions],
      };
    }

    case "TRANSFER_REVERT": {
      const { fromId, toId, amount, txId } = action.payload;
      return {
        ...state,
        accounts: state.accounts.map((acc) => {
          if (acc.id === fromId) return { ...acc, balance: acc.balance + amount };
          if (acc.id === toId) return { ...acc, balance: acc.balance - amount };
          return acc;
        }),
        transactions: state.transactions.filter((t) => t.id !== txId),
      };
    }

    case "TOGGLE_HIDE_BALANCE":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          hideBalance: !state.preferences.hideBalance,
        },
      };

    default:
      return state;
  }
};