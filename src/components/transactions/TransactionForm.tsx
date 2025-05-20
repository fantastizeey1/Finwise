import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

const transactionSchema = z.object({
  merchant: z.string().min(1),
  account: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
  amount: z.number().positive(),
});

const TransactionForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      merchant: '',
      account: '',
      category: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      amount: 0,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Controller
        name="merchant"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Merchant"
            className={errors.merchant ? 'border-red-500' : ''}
          />
        )}
      />
      <Controller
        name="account"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GTBank">GTBank</SelectItem>
              <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
              <SelectItem value="Opay">Opay</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Subscription">Subscription</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <Input type="date" {...field} className={errors.date ? 'border-red-500' : ''} />
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            {...field}
            placeholder="Amount"
            className={errors.amount ? 'border-red-500' : ''}
          />
        )}
      />
      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
