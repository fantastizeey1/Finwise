import BudgetCards from '@/components/Budget/BudgetCards';
import BudgetExpenses from '@/components/Budget/BudgetExpenses';
import BudgetHeader from '@/components/Budget/BudgetHeader';
import BudgetHistory from '@/components/Budget/BudgetHistory';
import Thisweek from '@/components/Budget/Thisweek';
import { Car, FileText, Gift, Home, Package, ShoppingBag, ShoppingCart, Wifi } from 'lucide-react';

const Budget = () => {
  const budgetData = [
    { icon: <ShoppingCart size={24} />, title: 'Grocery & Foods', amount: 5000.0 },
    { icon: <ShoppingBag size={24} />, title: 'Shopping & Transportation', amount: 5000.0 },
    { icon: <Gift size={24} />, title: 'Gifts and other items', amount: 5000.0 },
    { icon: <FileText size={24} />, title: 'Utilities', amount: 5000.0 },
    { icon: <Home size={24} />, title: 'Housing', amount: 5000.0 },
  ];

  const transactions = [
    {
      icon: <Home size={20} />,
      title: 'Monthly house rent',
      date: '6 Mer,11:00 PM',
      amount: 7000.0,
    },
    { icon: <ShoppingCart size={20} />, title: 'Food', date: '10 Mer,13:00 PM', amount: 3000.0 },
    {
      icon: <ShoppingBag size={20} />,
      title: 'Shopping',
      date: '15 Mer,18:30 PM',
      amount: 10000.0,
    },
    { icon: <Car size={20} />, title: 'Travel', date: '16 Mer,15:30 PM', amount: 20000.0 },
    {
      icon: <ShoppingCart size={20} />,
      title: 'Grocery',
      date: '17 Mer,12:05 PM',
      amount: 20000.0,
    },
    { icon: <Wifi size={20} />, title: 'Internet bills', date: '19 Mer,14:00 PM', amount: 20000.0 },
  ];

  const expenses = [
    { icon: <Home size={20} />, category: 'Housing', amount: 10000.0, progress: 70 },
    { icon: <ShoppingCart size={20} />, category: 'Food', amount: 20000.0, progress: 50 },
    { icon: <Car size={20} />, category: 'Transportation', amount: 5000.0, progress: 30 },
    { icon: <Package size={20} />, category: 'Others', amount: 6000.0, progress: 40 },
  ];

  return (
    <div className="h-full w-full flex-1">
      <div>
        <BudgetHeader />
      </div>
      <div>
        <BudgetCards cards={budgetData} />
      </div>
      <div className="flex flex-row gap-4 w-full flex-1">
        <div className="w-3/7">
          <Thisweek transactions={transactions} />
        </div>
        <div className="w-2/7">
          <BudgetExpenses BudgetExpense={expenses} />
        </div>
        <div className="w-2/7">
          <BudgetHistory />
        </div>
      </div>
    </div>
  );
};

export default Budget;
