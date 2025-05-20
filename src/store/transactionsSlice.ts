import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@/types/transactions';

type TransactionsState = {
  items: Transaction[];
};

const initialTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Spotify',
    account: 'GTBank',
    category: 'Subscription',
    date: 'Apr 15, 2025',
    amount: -3000,
  },
  {
    id: '2',
    merchant: 'Amazon',
    account: 'Zenith Bank',
    category: 'Shopping',
    date: 'Apr 20, 2025',
    amount: -7000,
  },
  {
    id: '3',
    merchant: 'Udemy',
    account: 'Opay',
    category: 'Education',
    date: 'Apr 22, 2025',
    amount: -9000,
  },
  {
    id: '4',
    merchant: 'Salary Payment',
    account: 'Opay',
    category: 'Income',
    date: 'Apr 25, 2025',
    amount: 15000,
  },
  {
    id: '5',
    merchant: 'Netflix',
    account: 'GTBank',
    category: 'Entertainment',
    date: 'Apr 26, 2025',
    amount: -4500,
  },
  {
    id: '6',
    merchant: 'Jumia',
    account: 'Zenith Bank',
    category: 'Shopping',
    date: 'Apr 27, 2025',
    amount: -6200,
  },
  {
    id: '7',
    merchant: 'Freelance Payment',
    account: 'GTBank',
    category: 'Income',
    date: 'Apr 28, 2025',
    amount: 10000,
  },
  {
    id: '8',
    merchant: 'PHCN Bill',
    account: 'Opay',
    category: 'Utilities',
    date: 'Apr 29, 2025',
    amount: -2500,
  },
  {
    id: '9',
    merchant: 'KFC',
    account: 'Zenith Bank',
    category: 'Food',
    date: 'Apr 30, 2025',
    amount: -3500,
  },
];

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: { items: initialTransactions } as TransactionsState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(tx => tx.id !== action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.items.findIndex(tx => tx.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, removeTransaction, updateTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
