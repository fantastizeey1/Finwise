import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type TransactionFormData = {
  merchant: string;
  account: string;
  category: string;
  date: string;
  amount: number;
};

export default function AddTransactionDialog({
  onSubmit,
}: {
  onSubmit: (data: TransactionFormData) => void;
}) {
  const [merchant, setMerchant] = useState('');
  const [account, setAccount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (!merchant || !account || !category || !date || !amount) return;
    onSubmit({
      merchant,
      account,
      category,
      date: format(date, 'PPP'),
      amount: parseFloat(amount),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {/* Left side */}
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Shopping"
          />
        </div>

        <div>
          <Label>Select account</Label>
          <Select onValueChange={value => setAccount(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GTBank">GTBank</SelectItem>
              <SelectItem value="Opay">Opay</SelectItem>
              <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn('w-full justify-start text-left font-normal', {
                  'text-muted-foreground': !date,
                })}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Amount</Label>
          <Input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="40000"
            type="number"
          />
        </div>

        <div>
          <Label>Merchant</Label>
          <Input
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
            placeholder="Amazon"
          />
        </div>
      </div>

      {/* Right side preview */}
      <div className="bg-muted p-4 rounded-md space-y-2 text-sm text-gray-700">
        <div>{merchant || 'Merchant'}</div>
        <div>{account || 'Account'}</div>
        <div>{category || 'Category'}</div>
        <div>{date ? format(date, 'PPP') : 'Date'}</div>
        <div className="text-xl font-bold">
          ₦{amount ? parseFloat(amount).toLocaleString() : '0.00'}
        </div>
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Save Transaction
        </Button>
      </div>
    </div>
  );
}
