import React from 'react';

export interface transactions {
  icon: React.ReactNode;
  title: string;
  date: string;
  amount: number;
}

// Transaction Item Component
const TransactionItem: React.FC<transactions> = ({ icon, title, date, amount }) => {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-100">
      <div className="flex items-center">
        <div className="bg-gray-200 p-2 rounded-full mr-3">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
      <p className="text-red-500 font-medium">-N{amount.toLocaleString()}</p>
    </div>
  );
};

const Thisweek: React.FC<{ transactions: transactions[] }> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm mt-6">
      <h2 className="p-4 text-lg font-medium border-b border-gray-100">This Week</h2>
      <div>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            icon={transaction.icon}
            title={transaction.title}
            date={transaction.date}
            amount={transaction.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default Thisweek;
