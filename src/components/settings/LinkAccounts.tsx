// src/components/settings/LinkAccounts.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Eye, EyeOff, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

// Schema using Zod
const formSchema = z.object({
  bank: z.string().nonempty({ message: 'Bank selection is required' }),
  accountNumber: z.string().min(10, { message: 'Account number must be 10 digits' }),
  bvn: z.string().length(11, { message: 'BVN must be 11 digits' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof formSchema>;

const banks = [
  'First Bank',
  'Access Bank',
  'GTBank',
  'UBA',
  'Zenith Bank',
  'Fidelity Bank',
  'Sterling Bank',
];

type LinkAccountsProps = {
  onLoadingChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const LinkAccounts: React.FC<LinkAccountsProps> = ({ onLoadingChange }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Linked account with ${data.bank}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Link Your Bank Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left */}
          <div className="space-y-6">
            {/* Bank */}
            <div>
              <Label className="mb-3">Select Bank</Label>
              <Select onValueChange={val => setValue('bank', val)} defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Choose a bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map(bank => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.bank && <p className="text-sm text-red-500 mt-1">{errors.bank.message}</p>}
            </div>

            {/* Account Number */}
            <div>
              <Label className="mb-3">Account Number</Label>
              <Input
                type="text"
                placeholder="Enter account number"
                {...register('accountNumber')}
              />
              {errors.accountNumber && (
                <p className="text-sm text-red-500 mt-1">{errors.accountNumber.message}</p>
              )}
            </div>

            {/* BVN */}
            <div>
              <div className="flex items-center gap-2">
                <Label className="mb-3">BVN</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 mb-3 text-gray-400 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Used only for identity verification. Securely encrypted.
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input type="text" placeholder="Enter your BVN" {...register('bvn')} />
              {errors.bvn && <p className="text-sm text-red-500 mt-1">{errors.bvn.message}</p>}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <Label className="mb-3">Email</Label>
              <Input type="email" placeholder="Enter your email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <Label className="mb-3">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="px-6 text-white border-blue-600 bg-blue-500"
                disabled={loading}
              >
                {loading ? 'Linking...' : 'Link Account'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
};

export default LinkAccounts;
