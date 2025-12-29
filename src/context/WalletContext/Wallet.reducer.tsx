import type { WalletState, WalletAction } from "../../@types/wallet.interface";

export const walletReducer = (
  state: WalletState,
  action: WalletAction
): WalletState => {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return { ...state, ...action.payload, loading: false };

    case "TRANSFER_START":
      return {
        ...state,
        accounts: state.accounts.map((acc) => {
          if (acc.id === action.payload.fromId)
            return { ...acc, balance: acc.balance - action.payload.amount };
          if (acc.id === action.payload.toId)
            return { ...acc, balance: acc.balance + action.payload.amount };
          return acc;
        }),
        transactions: [action.payload.tx, ...state.transactions],
      };

    case "TRANSFER_ERROR":
      return { ...state, error: action.payload };

    case "TRANSFER_REVERT":
      return {
        ...state,
        accounts: state.accounts.map((acc) => {
          if (acc.id === action.payload.fromId)
            return { ...acc, balance: acc.balance + action.payload.amount };
          if (acc.id === action.payload.toId)
            return { ...acc, balance: acc.balance - action.payload.amount };
          return acc;
        }),
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload.txId
        ),
      };

    default:
      return state;

  case 'TOGGLE_HIDE_BALANCE': {
  const newState = {
    ...state,
    preferences: {
      ...state.preferences,
      hideBalance: !state.preferences.hideBalance,
    },
  };
    localStorage.setItem('9ja-wallet-preferences', JSON.stringify(newState.preferences));
  
  return newState;
   }
  }
};
