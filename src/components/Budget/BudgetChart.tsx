import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { formatCurrency } from '@/lib/utils';

// Add missing interface definition
interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface BudgetChartProps {
  chartData: ChartDataItem[];
  totalExpenses: number;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ chartData, totalExpenses }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Budget History</h2>
      <div className="h-64">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={value => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No budget history to display
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-center text-2xl font-bold mb-4">
          Total: {formatCurrency(totalExpenses)}
        </p>
        {chartData.length > 0 && (
          <div className="flex flex-col gap-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                ></div>
                <span>
                  {item.name}: {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
