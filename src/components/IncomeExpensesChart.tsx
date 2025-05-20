// File: components/IncomeExpensesChart.tsx
import React, { useState } from 'react';
import Card from './ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export interface ChartData {
  month: string;
  income: number;
  expenses: number;
}

export interface IncomeExpensesChartProps {
  data: ChartData[];
}

const IncomeExpensesChart: React.FC<IncomeExpensesChartProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  // Calculate net values (income - expenses)
  const enhancedData = data.map(item => ({
    ...item,
    net: item.income - item.expenses,
  }));

  // Calculate totals
  const totalIncome = enhancedData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = enhancedData.reduce((sum, item) => sum + item.expenses, 0);
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  // Custom tooltip to enhance the visualization
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-sm text-blue-600">
            Income: <span className="font-medium">{payload[0].value}%</span>
          </p>
          <p className="text-sm text-purple-600">
            Expenses: <span className="font-medium">{payload[1].value}%</span>
          </p>
          {payload[2] && (
            <p className="text-sm text-green-600">
              Net: <span className="font-medium">{payload[2].value}%</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Income & Expenses</h3>
        <select
          aria-label="Select timeframe"
          value={timeframe}
          onChange={e => setTimeframe(e.target.value as any)}
          className="border border-gray-300 rounded-md text-sm p-1"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={enhancedData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
          <YAxis
            axisLine={false}
            tickLine={false}
            fontSize={12}
            tickFormatter={value => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={value => <span className="text-xs font-medium">{value}</span>}
          />
          <Bar dataKey="income" name="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={8} />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#c084fc"
            radius={[4, 4, 0, 0]}
            barSize={8}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-blue-50 p-2 rounded-md">
          <p className="text-xs text-gray-500">Total Income</p>
          <p className="font-semibold text-blue-600">{totalIncome}%</p>
        </div>
        <div className="bg-purple-50 p-2 rounded-md">
          <p className="text-xs text-gray-500">Total Expenses</p>
          <p className="font-semibold text-purple-600">{totalExpenses}%</p>
        </div>
        <div className="bg-green-50 p-2 rounded-md">
          <p className="text-xs text-gray-500">Saving Rate</p>
          <p className="font-semibold text-green-600">{savingsRate}%</p>
        </div>
      </div>
    </Card>
  );
};

export default IncomeExpensesChart;
