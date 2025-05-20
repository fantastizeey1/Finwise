import React from 'react';

export interface BudgetExpense {
  icon: React.ReactNode;
  category: string;
  amount: number;
  progress: number;
}

const BudgetExpenseItem: React.FC<BudgetExpense> = ({ icon, category, amount, progress }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="bg-blue-500 p-2 rounded-md mr-3 text-white">{icon}</div>
          <p className="font-medium">{category}</p>
        </div>
        <p className="font-medium">N{amount.toLocaleString()}</p>
      </div>
      <div className="bg-gray-200 h-2 rounded-full w-full">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

const BudgetExpenses: React.FC<{ BudgetExpense: BudgetExpense[] }> = ({ BudgetExpense }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-4xl font-bold text-center mb-4">Budget Expenses</h2>
      {BudgetExpense.map((expense: BudgetExpense, index: number) => (
        <BudgetExpenseItem
          key={index}
          icon={expense.icon}
          category={expense.category}
          amount={expense.amount}
          progress={expense.progress}
        />
      ))}
    </div>
  );
};

export default BudgetExpenses;
