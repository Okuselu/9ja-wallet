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
  }
};

// import { WalletState, Transaction, Account } from '../@types/wallet';

// type WalletAction =
//   | { type: 'SET_INITIAL_DATA'; payload: { accounts: Account[]; transactions: Transaction[] } }
//   | { type: 'TRANSFER_START'; payload: { fromId: string; toId: string; amount: number; tx: Transaction } }
//   | { type: 'TRANSFER_ERROR'; payload: string }
//   | { type: 'TRANSFER_REVERT'; payload: { fromId: string; toId: string; amount: number; txId: string } };

// export const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
//   switch (action.type) {
//     case 'SET_INITIAL_DATA':
//       return { ...state, ...action.payload, loading: false };

//     case 'TRANSFER_START':
//       // Optimistically update accounts and add transaction
//       return {
//         ...state,
//         accounts: state.accounts.map(acc => {
//           if (acc.id === action.payload.fromId) return { ...acc, balance: acc.balance - action.payload.amount };
//           if (acc.id === action.payload.toId) return { ...acc, balance: acc.balance + action.payload.amount };
//           return acc;
//         }),
//         transactions: [action.payload.tx, ...state.transactions],
//       };

//     case 'TRANSFER_ERROR':
//       return { ...state, error: action.payload };

//     case 'TRANSFER_REVERT':
//       // Rollback balances and remove the failed transaction
//       return {
//         ...state,
//         accounts: state.accounts.map(acc => {
//           if (acc.id === action.payload.fromId) return { ...acc, balance: acc.balance + action.payload.amount };
//           if (acc.id === action.payload.toId) return { ...acc, balance: acc.balance - action.payload.amount };
//           return acc;
//         }),
//         transactions: state.transactions.filter(t => t.id !== action.payload.txId),
//       };

//     default:
//       return state;
//   }
// };
