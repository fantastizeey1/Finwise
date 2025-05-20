import { Button } from '@/components/ui/button';
import { Download, PlusCircle } from 'lucide-react';

const TransactionsHeader = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex justify-between items-center p-6 border-b">
    <h1 className="text-2xl font-bold text-gray-800">Transactions History</h1>
    <div className="flex space-x-4">
      <Button variant="outline" className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        Import CSV File
      </Button>

      <Button className="flex items-center gap-2" onClick={onAdd}>
        <PlusCircle className="w-4 h-4" />
        Add Transaction
      </Button>
    </div>
  </div>
);

export default TransactionsHeader;
