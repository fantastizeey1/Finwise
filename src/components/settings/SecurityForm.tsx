// src/components/settings/SecurityForm.tsx
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SecurityFormProps = {
  onLoadingChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const SecurityForm: React.FC<SecurityFormProps> = ({ onLoadingChange }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-medium text-gray-900">
          Enable two-factor authentication
        </Label>
        <Switch checked />
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">Change Password</Label>
        <Input placeholder="Current Password" type="password" />
        <Input placeholder="Confirm Password" type="password" />
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button className="px-6 text-white border-blue-600 bg-blue-500">Save</Button>
      </div>
    </div>
  );
};

export default SecurityForm;
