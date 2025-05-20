import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BudgetHistory = () => {
  // Sample data for the pie chart
  const data = [
    { name: 'Housing', value: 50, color: '#3b82f6' },
    { name: 'Food', value: 33.3, color: '#166534' },
    { name: 'Transportation', value: 16.7, color: '#c026d3' },
  ];

  // Calculate total budget amount
  const totalBudget = data.reduce((sum, item) => sum + item.value, 0);

  // Format currency with Nigerian Naira symbol
  const formatCurrency = (amount: number) => {
    return `₦${(amount * 820).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Custom tooltip for the recharts pie chart
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { payload: { name: string; value: number } }[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-md rounded border border-gray-200">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{`${data.value}% (${formatCurrency(data.value)})`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-4xl font-bold text-center mb-4">Budget History</h2>
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={65}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mb-4">
        <p className="text-xl font-bold">{formatCurrency(1)}</p>
      </div>
      <TooltipProvider>
        <div className="grid grid-rows-3 center gap-2">
          {data.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger className="flex items-center cursor-pointer">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1 flex gap-5 flex-col">
                  <p>
                    {item.name}: {item.value}%
                  </p>
                  <p>{formatCurrency(item.value)}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default BudgetHistory;
