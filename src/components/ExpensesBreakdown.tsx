// components/ExpensesBreakdown.tsx
import React, { useState } from 'react';
import Card from './ui/Card';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export interface ExpenseItem {
  label: string;
  icon: React.ReactNode;
  amount: number;
}

export interface ExpensesBreakdownProps {
  items: ExpenseItem[];
}

const ExpensesBreakdown: React.FC<ExpensesBreakdownProps> = ({ items }) => {
  const [expanded, setExpanded] = useState(true);

  // Calculate total expenses
  const totalExpenses = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Expenses Breakdown</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            // Calculate percentage of total
            const percentage = Math.round((item.amount / totalExpenses) * 100);

            return (
              <div
                key={idx}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="mr-3 p-3 bg-blue-100 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-gray-500">{percentage}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">N{item.amount.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ExpensesBreakdown;
