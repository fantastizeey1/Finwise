// src/components/settings/PreferencesForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const prefsSchema = z.object({
  currency: z.string().min(1, 'Required'),
  timeZone: z.string().min(1, 'Required'),
  language: z.string().min(1, 'Required'),
  notifications: z.object({
    dailyCurrency: z.boolean(),
    upcomingBills: z.boolean(),
    suspiciousActivity: z.boolean(),
  }),
  shareUsageData: z.boolean(),
  twoFactorAuth: z.boolean(),
});

type PrefsFormValues = z.infer<typeof prefsSchema>;

type PrefrenceFormsProps = {
  onLoadingChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreferencesForm: React.FC<PrefrenceFormsProps> = ({ onLoadingChange }) => {
  const { register, handleSubmit } = useForm<PrefsFormValues>({
    resolver: zodResolver(prefsSchema),
    defaultValues: {
      currency: 'NGN',
      timeZone: '[GMT+0100] West Central Africa',
      language: 'en',
      notifications: {
        dailyCurrency: true,
        upcomingBills: true,
        suspiciousActivity: false,
      },
      shareUsageData: true,
      twoFactorAuth: false,
    },
  });

  const onSubmit = (data: PrefsFormValues) => {
    console.log('Preferences updated:', data);
    // TODO: API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="currency" className="text-sm font-medium text-gray-700 mb-2 block">
            Currency
          </Label>
          <select
            id="currency"
            {...register('currency')}
            className="w-full mt-1 p-2 border rounded-md bg-white text-sm text-gray-700"
          >
            <option value="NGN">Nigerian Naira (NGN)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
            <option value="CNY">Chinese Yuan (CNY)</option>
            <option value="INR">Indian Rupee (INR)</option>
            <option value="ZAR">South African Rand (ZAR)</option>
          </select>
        </div>

        <div>
          <Label htmlFor="timeZone" className="text-sm font-medium text-gray-700 mb-2 block">
            Time Zone
          </Label>
          <select
            id="timeZone"
            {...register('timeZone')}
            className="w-full mt-1 p-2 border rounded-md bg-white text-sm text-gray-700"
          >
            <option value="[GMT+0000] UTC">[GMT+0000] UTC</option>
            <option value="[GMT+0100] West Central Africa">[GMT+0100] West Central Africa</option>
            <option value="[GMT+0200] Central Africa Time">[GMT+0200] Central Africa Time</option>
            <option value="[GMT+0300] East Africa Time">[GMT+0300] East Africa Time</option>
            <option value="[GMT+0400] Gulf Standard Time">[GMT+0400] Gulf Standard Time</option>
            <option value="[GMT+0530] India Standard Time">[GMT+0530] India Standard Time</option>
            <option value="[GMT+0800] China Standard Time">[GMT+0800] China Standard Time</option>
            <option value="[GMT+0900] Japan Standard Time">[GMT+0900] Japan Standard Time</option>
            <option value="[GMT+1200] New Zealand Standard Time">
              [GMT+1200] New Zealand Standard Time
            </option>
            <option value="[GMT-0500] Eastern Time (US & Canada)">
              [GMT-0500] Eastern Time (US & Canada)
            </option>
            <option value="[GMT-0800] Pacific Time (US & Canada)">
              [GMT-0800] Pacific Time (US & Canada)
            </option>
          </select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Language</Label>
          <select
            {...register('language')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
        {(['dailyCurrency', 'upcomingBills', 'suspiciousActivity'] as const).map(key => (
          <div key={key} className="flex items-center justify-between">
            <Label className="mb-0 capitalize">
              {key === 'dailyCurrency'
                ? 'Daily currency alerts'
                : key === 'upcomingBills'
                  ? 'Upcoming bills'
                  : 'Suspicious activity'}
            </Label>
            <Switch {...register(`notifications.${key}` as const)} />
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Privacy & Security</h3>
        <div className="flex items-center justify-between">
          <Label className="text-gray-700">Share usage data to improve experience</Label>
          <Switch {...register('shareUsageData')} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="px-6 text-white border-blue-600 bg-blue-500">
          Save
        </Button>
      </div>
    </form>
  );
};

export default PreferencesForm;
