import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ChevronDown, Filter, Download, X } from 'lucide-react';

import { RootState, AppDispatch } from '@/store';
import { setActiveTab, setSelectedDate, resetFilters } from '@/store/filtersSlice';
import { Transaction } from '@/types/transactions';

import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TransactionsFiltersProps = {
  transactions: Transaction[];
  onFilterChange?: (filtered: Transaction[]) => void;
};

const TransactionsFilters = ({ transactions, onFilterChange }: TransactionsFiltersProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeTab, selectedDate } = useSelector((state: RootState) => state.filters);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterAccount, setFilterAccount] = useState<string | null>(null);

  // Get unique categories and accounts
  const categories = [...new Set(transactions.map(tx => tx.category))].sort();
  const accounts = [...new Set(transactions.map(tx => tx.account))].sort();

  // Helper function to properly compare dates
  // (Removed duplicate declaration)

  // Filter transactions based on active tab and additional filters
  const filteredTransactions = transactions.filter(tx => {
    // Tab filter
    const tabMatch =
      activeTab === 'all' ||
      (activeTab === 'expenses' && tx.amount < 0) ||
      (activeTab === 'income' && tx.amount > 0);

    // Date filter - convert string date from Redux to Date object for comparison
    const dateMatch = !selectedDate || compareDates(new Date(tx.date), new Date(selectedDate));

    // Category filter
    const categoryMatch = !filterCategory || tx.category === filterCategory;

    // Account filter
    const accountMatch = !filterAccount || tx.account === filterAccount;

    return tabMatch && dateMatch && categoryMatch && accountMatch;
  });

  // Helper function to properly compare dates
  const compareDates = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange?.(filteredTransactions);
  }, [activeTab, selectedDate, filterCategory, filterAccount, transactions, onFilterChange]);

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Merchant', 'Account', 'Category', 'Date', 'Amount'];
    const rows = filteredTransactions.map(tx => [
      tx.id,
      tx.merchant,
      tx.account,
      tx.category,
      tx.date,
      tx.amount,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setFilterCategory(null);
    setFilterAccount(null);
  };

  const activeFiltersCount = [
    selectedDate !== null,
    filterCategory !== null,
    filterAccount !== null,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap justify-between items-center p-4 md:p-6">
        <div className="flex space-x-2 md:space-x-4  sm:mb-0 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {['all', 'expenses', 'income'].map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => dispatch(setActiveTab(tab as 'all' | 'expenses' | 'income'))}
              className="capitalize whitespace-nowrap text-xs md:text-sm"
              size="sm"
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 w-full sm:w-auto justify-start sm:justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center text-xs md:text-sm" size="sm">
                {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select Date'}
                <ChevronDown className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-2 flex justify-between items-center border-b">
                <span className="font-medium">Select Date</span>
                {selectedDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(setSelectedDate(null))}
                    className="h-8 px-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Calendar
                mode="single"
                selected={selectedDate ? new Date(selectedDate) : undefined}
                onSelect={date => dispatch(setSelectedDate(date ?? null))}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center text-xs md:text-sm"
            size="sm"
          >
            <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 md:ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogContent className="sm:max-w-md max-w-[85vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Advanced Filters</DialogTitle>
                <DialogDescription>Filter transactions by category and account</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Category</label>
                  <Select
                    value={filterCategory ?? 'all-categories'}
                    onValueChange={value =>
                      setFilterCategory(value === 'all-categories' ? null : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-categories">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Account</label>
                  <Select
                    value={filterAccount ?? 'all-accounts'}
                    onValueChange={value =>
                      setFilterAccount(value === 'all-accounts' ? null : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Accounts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-accounts">All Accounts</SelectItem>
                      {accounts.map(account => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="gap-2 flex-col sm:flex-row">
                <Button variant="outline" onClick={handleResetFilters} className="w-full sm:w-auto">
                  Reset All Filters
                </Button>
                <Button onClick={() => setIsFilterOpen(false)} className="w-full sm:w-auto">
                  Apply
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={handleDownloadCSV}
            className="text-xs md:text-sm"
            size="sm"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="px-4 md:px-6 flex flex-wrap gap-2 overflow-x-auto pb-2">
        {activeFiltersCount > 0 && (
          <>
            <div className="flex items-center text-xs md:text-sm text-muted-foreground">
              Active filters:
            </div>

            {selectedDate && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs whitespace-nowrap"
              >
                Date: {new Date(selectedDate).toLocaleDateString()}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(setSelectedDate(null))}
                  className="h-4 w-4 p-0 ml-1"
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}

            {filterCategory && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs whitespace-nowrap"
              >
                Category: {filterCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterCategory(null)}
                  className="h-4 w-4 p-0 ml-1"
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}

            {filterAccount && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs whitespace-nowrap"
              >
                Account: {filterAccount}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterAccount(null)}
                  className="h-4 w-4 p-0 ml-1"
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}

            {activeFiltersCount > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs h-6"
              >
                Clear all
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionsFilters;
