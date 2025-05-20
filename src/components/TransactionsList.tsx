// File: components/TransactionsList.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from './RecentTransactions';
import { Tooltip } from './ui/tooltip';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ShoppingBag, Coffee, Home, Car, Briefcase, CreditCard } from 'lucide-react';

interface TransactionsListProps {
  transactions: Transaction[];
}

// Category icon mapping for better visual representation
const getCategoryIcon = (transaction: Transaction) => {
  // First check if there's an emoji icon in the transaction
  if (transaction.icon && transaction.icon.trim()) {
    return (
      <span aria-hidden="true" className="text-xl">
        {transaction.icon}
      </span>
    );
  }

  // Otherwise use a category-based icon
  const category = transaction.category?.toLowerCase() || transaction.label.toLowerCase();

  if (category.includes('shop') || category.includes('store') || category.includes('buy')) {
    return <ShoppingBag size={18} />;
  } else if (
    category.includes('coffee') ||
    category.includes('food') ||
    category.includes('restaurant')
  ) {
    return <Coffee size={18} />;
  } else if (category.includes('home') || category.includes('rent') || category.includes('bill')) {
    return <Home size={18} />;
  } else if (
    category.includes('car') ||
    category.includes('transport') ||
    category.includes('uber')
  ) {
    return <Car size={18} />;
  } else if (
    category.includes('salary') ||
    category.includes('work') ||
    category.includes('income')
  ) {
    return <Briefcase size={18} />;
  }

  // Default icon
  return <CreditCard size={18} />;
};

// Get appropriate color for background based on transaction type
const getIconBgColor = (transaction: Transaction) => {
  if (transaction.type === 'income') return 'bg-green-100 text-green-600';
  return 'bg-red-100 text-red-600';
};

// Format relative time for better UX
const formatRelativeDate = (dateString: string) => {
  try {
    // Try to parse as ISO date first
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (e) {
    // Fall back to original string if it's not a valid date
    return dateString;
  }
};

// Format amount with proper currency symbol and sign
const formatAmount = (amount: string, type: 'income' | 'expense') => {
  const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
  }).format(numericAmount);

  return type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`;
};

// Animation variants for list items
const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
    },
  }),
};

export const TransactionsList = memo(({ transactions }: TransactionsListProps) => {
  return (
    <motion.ul variants={listVariants} initial="hidden" animate="visible" className="space-y-2">
      {transactions.map((transaction, index) => (
        <motion.li
          key={transaction.id}
          custom={index}
          variants={itemVariants}
          whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.01)' }}
          className="flex justify-between items-center p-2.5 rounded-lg transition-all border border-transparent hover:border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <Tooltip>
              <div>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${getIconBgColor(transaction)}`}
                >
                  {getCategoryIcon(transaction)}
                </div>
              </div>
              <span>{transaction.type === 'income' ? 'Income' : 'Expense'}</span>
            </Tooltip>
            <div>
              <p className="font-medium text-gray-800 line-clamp-1">{transaction.label}</p>
              <p className="text-xs text-gray-500">{formatRelativeDate(transaction.date)}</p>
            </div>
          </div>
          <span
            className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}
          >
            {formatAmount(transaction.amount, transaction.type)}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
});

TransactionsList.displayName = 'TransactionsList';
