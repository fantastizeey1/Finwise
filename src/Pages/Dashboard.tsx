// pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import TopSummary from '../components/TopSummary';
import RecentTransactions, { Transaction } from '../components/RecentTransactions';
import IncomeExpensesChart from '../components/IncomeExpensesChart';
import SalaryDeduction from '../components/SalaryDeduction';
import ExpensesBreakdown, { ExpenseItem } from '../components/ExpensesBreakdown';
import { TabsProvider, Tabs } from '../components/ui/Tabs';
import TransactionLimit from '@/components/TransactionLimit';

export default function Dashboard() {
  // Current date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // State for mock data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      icon: '🍔',
      label: 'Food',
      date: '17 May, 2016',
      amount: 'N1,000.00',
      type: 'expense',
    },
    {
      id: '2',
      icon: '💼',
      label: 'Salary',
      date: '20 May, 2016',
      amount: 'N100,000.00',
      type: 'income',
    },
    {
      id: '3',
      icon: '🚕',
      label: 'Taxi fare',
      date: '22 May, 2016',
      amount: 'N3,500.00',
      type: 'expense',
    },
    {
      id: '4',
      icon: '👕',
      label: 'Clothes',
      date: '25 May, 2016',
      amount: 'N7,000.00',
      type: 'expense',
    },
    {
      id: '5',
      icon: '🏠',
      label: 'Rent',
      date: '28 May, 2016',
      amount: 'N40,000.00',
      type: 'expense',
    },
    {
      id: '6',
      icon: '🍔',
      label: 'Food',
      date: '29 May, 2016',
      amount: 'N1,200.00',
      type: 'expense',
    },
    {
      id: '7',
      icon: '🎁',
      label: 'Freelance Project',
      date: '30 May, 2016',
      amount: 'N20,000.00',
      type: 'income',
    },
    {
      id: '8',
      icon: '📱',
      label: 'Mobile Data',
      date: '31 May, 2016',
      amount: 'N3,000.00',
      type: 'expense',
    },
  ]);

  const limitAmount = 150000;

  const [chartData, setChartData] = useState([
    { month: 'May', income: 60, expenses: 30 },
    { month: 'Jun', income: 50, expenses: 20 },
    { month: 'Jul', income: 65, expenses: 25 },
    { month: 'Aug', income: 70, expenses: 40 },
    { month: 'Sep', income: 55, expenses: 35 },
  ]);

  const [deductionSlices] = useState([
    { name: 'Bank Deduction', value: 20, color: '#ef4444' },
    { name: 'Final Amount', value: 80, color: '#10b981' },
  ]);

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { label: 'Housing', icon: <span>🏠</span>, amount: 5000 },
    { label: 'Food', icon: <span>🍔</span>, amount: 6000 },
    { label: 'Transportation', icon: <span>🚗</span>, amount: 6000 },
    { label: 'Entertainment', icon: <span>🎮</span>, amount: 5000 },
    { label: 'Shopping', icon: <span>🛍️</span>, amount: 10000 },
    { label: 'Others', icon: <span>📦</span>, amount: 6000 },
  ]);

  const [summaryCards, setSummaryCards] = useState([
    {
      title: 'TOTAL BALANCE',
      details: (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">₦ 240,000.00</p>
            </div>
          </div>

          <div className="mt-2 bg-[#2F80ED] text-white p-1 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs mb-1">Account Type</p>
              <p className="text-sm font-bold">Credit Card</p>
              <p className="text-xs opacity-80 mb-2">*********5687</p>
            </div>
            <div>
              <img src="/mscard.png" alt="master card logo" />
              <p className="text-base font-bold mt-2">N 250,000</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <button className="text-sm text-gray-500">← Previous</button>
            <button className="text-sm text-gray-500">Next →</button>
          </div>
        </>
      ),
      footer: null,
    },
    {
      title: 'TOTAL INCOME',
      details: (
        <>
          <div className="flex justify-between items-start border-b-[1px] pb-1 border-gray-200">
            <p className="text-2xl font-bold">
              ₦ 240,000<span className="text-gray-400 text-lg">.00</span>
            </p>
            <span className="bg-gray-100 text-xs py-1 px-2 rounded">May,2025</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">
                <img src="/cup.svg" alt="trophy" />
              </span>
              <p className="text-xs text-gray-600">Target Achieved</p>
              <p className="text-xs font-medium ml-auto">₦500,000</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">
                <img src="/target.svg" alt="mark" />
              </span>
              <p className="text-xs text-gray-600">This Month Target</p>
              <p className="text-xs font-medium ml-auto">N700,000</p>
            </div>
          </div>
        </>
      ),
      footer: null,
    },
    {
      title: 'TOTAL SAVINGS',
      details: (
        <>
          <div className="flex justify-between items-start">
            <p className="text-2xl font-bold">
              ₦ 900,000<span className="text-gray-400 text-lg">.00</span>
            </p>
            <span className="bg-gray-100 text-xs py-1 px-2 rounded">May,2025</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">
                <img src="/cup.svg" alt="trophy" />
              </span>
              <p className="text-xs text-gray-600">Target Achieved</p>
              <p className="text-xs font-medium ml-auto">₦500,000</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">
                <img src="/target.svg" alt="mark" />
              </span>
              <p className="text-xs text-gray-600">This Month Target</p>
              <p className="text-xs font-medium ml-auto">₦800,000</p>
            </div>
          </div>
        </>
      ),
      footer: null,
    },
  ]);

  // Fetch data effect
  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      // In a real app, you would fetch data from your API here
      console.log('Fetching dashboard data...');

      // Simulating a delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Data is already set in state for this example
    };

    fetchData();
  }, []);

  // Handle search function
  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
    // Implement search functionality here
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white ">
      <div className="flex-1 overflow-y-auto">
        <div className="">
          <DashboardHeader userName="Christian" currentDate={currentDate} onSearch={handleSearch} />

          <TopSummary cards={summaryCards} />

          <div className="flex flex-row gap-4 w-full">
            {/* Left side: Transactions + Limit */}
            <div className="flex flex-col gap-4 w-2/5">
              <TabsProvider defaultTab="all">
                <RecentTransactions transactions={transactions} />
              </TabsProvider>
              <TransactionLimit limitAmount={limitAmount} transactions={transactions} />
            </div>

            {/* Right side: Charts and Breakdown */}
            <div className="flex flex-col gap-4 flex-1 w-2/5">
              <div className="flex gap-4 flex-row flex-1 w-full">
                <div className="w-2/3">
                  <IncomeExpensesChart data={chartData} />
                </div>
                <div className="w-1/3">
                  <SalaryDeduction salary={100000} slices={deductionSlices} />
                </div>
              </div>
              <ExpensesBreakdown items={expenses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
