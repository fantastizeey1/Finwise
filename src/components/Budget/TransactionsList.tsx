import React from 'react';

// Define the Transaction interface
interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

// Create the TransactionItem component
const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isExpense = transaction.type === 'expense';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-medium">{transaction.title}</span>
        <span className="text-sm text-gray-500">{transaction.category}</span>
        <span className="text-xs text-gray-400">{transaction.date}</span>
      </div>
      <div className={`font-semibold ${isExpense ? 'text-red-500' : 'text-green-500'}`}>
        {isExpense ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
};

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <div className="lg:col-span-1">
      <h2 className="text-xl font-semibold mb-4">This Week</h2>
      {transactions.length > 0 ? (
        <div className="space-y-3">
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-sm text-center text-gray-500">
          No transactions this week
        </div>
      )}
    </div>
  );
};
