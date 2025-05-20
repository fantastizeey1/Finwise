// components/SalaryDeduction.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from './ui/Card';

export interface DeductionSlice {
  name: string;
  value: number;
  color: string;
}

export interface SalaryDeductionProps {
  salary: number;
  slices: DeductionSlice[];
}

const SalaryDeduction: React.FC<SalaryDeductionProps> = ({ salary, slices }) => {
  // Calculate actual values
  const calculatedSlices = slices.map(slice => ({
    ...slice,
    actualValue: (slice.value / 100) * salary,
  }));

  // Find final amount slice
  const finalAmountSlice = calculatedSlices.find(slice => slice.name === 'Final Amount');
  const finalAmount = finalAmountSlice ? finalAmountSlice.actualValue : 0;

  // Find bank deduction slice
  const bankDeductionSlice = calculatedSlices.find(slice => slice.name === 'Bank Deduction');
  const deduction = bankDeductionSlice ? bankDeductionSlice.actualValue : 0;
  const deductionPercent = bankDeductionSlice ? bankDeductionSlice.value : 0;

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p>{`${data.value}% (₦${data.actualValue.toLocaleString()})`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="flex flex-col h-full">
        <h3 className="text-[16px] text-center font-semibold ">Salary Auto-Deduction</h3>
        <h4 className="text-center text-sm font-medium mb-2">
          Total Salary ₦{salary.toLocaleString()}
        </h4>

        <div className="flex-1 flex justify-center">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={calculatedSlices}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
              >
                {calculatedSlices.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            Deducted by Bank
            <span className="block text-red-500 font-semibold">{`₦${deduction.toLocaleString()} (${deductionPercent}%)`}</span>
          </p>
          <p className="text-sm text-gray-600">
            Final Amount
            <span className="block font-semibold text-green-600">{`₦${finalAmount.toLocaleString()}`}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SalaryDeduction;
