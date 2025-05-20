// File: components/RecentTransactions.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { Search, Plus, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import Card from './ui/Card';
import { Button } from '@/components/ui/button';

import { TransactionsList } from './TransactionsList';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from './ui/input';

export interface Transaction {
  id: string;
  icon: string;
  label: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
  category?: string;
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
  onAddTransaction?: () => void;
  className?: string;
}

type FilterType = 'all' | 'income' | 'expense';

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onAddTransaction,
  className = '',
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesFilter = filter === 'all' || tx.type === filter;
      const matchesSearch = tx.label.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [transactions, filter, searchQuery]);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleAddTransaction = useCallback(() => {
    onAddTransaction?.();
  }, [onAddTransaction]);

  const filterOptions: Array<{ value: FilterType; label: string; icon: React.ReactNode }> = [
    { value: 'all', label: 'All', icon: <CreditCard size={14} /> },
    { value: 'income', label: 'Income', icon: <TrendingUp size={14} className="text-green-500" /> },
    {
      value: 'expense',
      label: 'Expense',
      icon: <TrendingDown size={14} className="text-red-500" />,
    },
  ];

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold" id="transactions-heading">
          Recent Transactions
        </h3>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddTransaction}
          aria-label="Add new transaction"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add New</span>
        </Button>
      </div>

      <div className="flex flex-wrap items-center border-b mb-3 pb-1 gap-1">
        <div className="flex" role="tablist" aria-labelledby="transactions-heading">
          {filterOptions.map(option => (
            <button
              key={option.value}
              role="tab"
              aria-selected={filter === option.value}
              aria-controls="transactions-panel"
              className={`relative pb-2 px-3 text-sm font-medium transition-all flex items-center gap-1.5 ${
                filter === option.value ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleFilterChange(option.value)}
            >
              {option.icon}
              {option.label}
              {filter === option.value && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="ml-auto mt-1 sm:mt-0 relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <Input
            type="text"
            placeholder="Search transactions"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search transactions"
            className="pl-8 pr-3 py-1.5 text-sm w-full max-w-[150px] sm:max-w-[200px]"
          />
        </div>
      </div>

      <div
        id="transactions-panel"
        role="tabpanel"
        aria-labelledby={`tab-${filter}`}
        className="min-h-[200px]"
      >
        <div className="flex justify-between text-xs text-gray-500 px-2 py-1.5 font-medium">
          <div>Transaction Details</div>
          <div>Amount</div>
        </div>

        <div className="space-y-1 h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <AnimatePresence initial={false} mode="sync">
            {filteredTransactions.length > 0 ? (
              <TransactionsList transactions={filteredTransactions} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-12 text-center text-gray-500 flex flex-col items-center"
              >
                <Search size={32} className="text-gray-300 mb-2" />
                <p>No transactions found</p>
                <p className="text-xs text-gray-400 mt-1">Try changing your filters</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export default RecentTransactions;
