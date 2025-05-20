// types/transactions.ts

export interface TransactionFormData {
  merchant: string;
  account: string;
  category: string;
  date: string;
  amount: number;
}

export type Transaction = {
  id: string;
  merchant: string;
  account: string;
  category: string;
  date: string;
  amount: number;
};

export type NewTransaction = Omit<Transaction, 'id'>;
