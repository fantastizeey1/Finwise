import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Props {
  transactions: {
    id: string;
    merchant: string;
    account: string;
    category: string;
    date: string;
    amount: number;
  }[];
}

const TransactionsTable = ({ transactions }: Props) => (
  <Table className="w-full text-sm text-left">
    <TableHeader className="bg-gray-100">
      <TableRow>
        <TableHead className="px-4 py-3 font-semibold text-gray-700">Merchant</TableHead>
        <TableHead className="px-4 py-3 font-semibold text-gray-700">Account</TableHead>
        <TableHead className="px-4 py-3 font-semibold text-gray-700">Category</TableHead>
        <TableHead className="px-4 py-3 font-semibold text-gray-700">Date</TableHead>
        <TableHead className="px-4 py-3 text-right font-semibold text-gray-700">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map(transaction => (
        <TableRow key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
          <TableCell className="px-4 py-2">{transaction.merchant}</TableCell>
          <TableCell className="px-4 py-2">{transaction.account}</TableCell>
          <TableCell className="px-4 py-2">{transaction.category}</TableCell>
          <TableCell className="px-4 py-2">{transaction.date}</TableCell>
          <TableCell className="px-4 py-2 text-right text-gray-800 font-medium">
            ₦{transaction.amount.toLocaleString()}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TransactionsTable;
