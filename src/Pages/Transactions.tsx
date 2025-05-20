// File: pages/Transactions.tsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addTransaction } from '@/store/transactionsSlice';

import TransactionsHeader from '@/components/transactions/TransactionsHeader';
import TransactionsFilters from '@/components/transactions/TransactionsFilters';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import AddTransactionDialog from '@/components/transactions/AddTransactionDialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Transaction, NewTransaction } from '@/types/transactions';

const TransactionsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.items);
  const { activeTab, selectedDate } = useSelector((state: RootState) => state.filters);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTransaction = (data: NewTransaction) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
    };
    dispatch(addTransaction(newTransaction));
    setIsDialogOpen(false);
  };

  // Helper function to properly compare dates
  const compareDates = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Filtering the transactions based on the active tab and optional date
  const filteredTransactions = transactions.filter(tx => {
    // Tab filter
    const tabMatch =
      activeTab === 'all' ||
      (activeTab === 'expenses' && tx.amount < 0) ||
      (activeTab === 'income' && tx.amount > 0);

    // Optional date filter - updated to handle string dates from Redux
    const dateMatch = !selectedDate || compareDates(new Date(tx.date), new Date(selectedDate));

    return tabMatch && dateMatch;
  });

  return (
    <div className="flex flex-col md:-mt-3 h-full bg-white rounded-lg shadow-md md:m-4">
      {/* Header with Add button */}
      <TransactionsHeader onAdd={() => setIsDialogOpen(true)} />

      {/* Filter Bar - scrollable on small screens */}
      <div className="">
        <TransactionsFilters transactions={transactions} />
      </div>

      {/* Transactions Table with filtered data */}
      <div className="h-[80%] overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <TransactionsTable transactions={filteredTransactions} />
      </div>

      {/* Dialog for adding a new transaction */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <AddTransactionDialog onSubmit={handleAddTransaction} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsPage;
