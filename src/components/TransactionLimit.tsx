// File: components/TransactionLimit.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { Badge } from './ui/badge';

interface TransactionLimitProps {
  transactions: {
    amount: string;
    type: 'income' | 'expense';
  }[];
  limitAmount: number;
  className?: string;
}

const TransactionLimit: React.FC<TransactionLimitProps> = ({
  transactions,
  limitAmount,
  className = '',
}) => {
  const financialData = useMemo(() => {
    const spent = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + Math.abs(parseFloat(tx.amount.replace(/[^0-9.-]+/g, ''))), 0);

    const percent = Math.min(100, Math.round((spent / limitAmount) * 100));

    return { spent, percent };
  }, [transactions, limitAmount]);

  const getProgressColor = (percent: number) => {
    if (percent > 80) return 'bg-red-500';
    if (percent > 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Daily Spending Limit</h4>
          <p className="text-xs text-gray-500">
            {financialData.percent >= 90 ? (
              <span className="text-red-500 font-medium">Almost reached</span>
            ) : financialData.percent >= 75 ? (
              <span className="text-yellow-500 font-medium">Getting close</span>
            ) : (
              <span>You're doing well</span>
            )}
          </p>
        </div>
        <Badge
          variant={
            financialData.percent > 80
              ? 'destructive'
              : financialData.percent > 60
                ? 'secondary'
                : 'default'
          }
        >
          {financialData.percent}%
        </Badge>
      </div>

      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${financialData.percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-2 rounded-full ${getProgressColor(financialData.percent)}`}
        />
      </div>

      <div className="flex justify-between text-xs mt-2">
        <span className="font-medium text-gray-700">
          ₦{financialData.spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className="text-gray-500">
          of ₦{limitAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </Card>
  );
};

export default TransactionLimit;
