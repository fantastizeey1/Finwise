import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onMarkAllAsRead: () => void;
};

export const NotificationHeader: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  onMarkAllAsRead,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search..."
          className="w-60"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => {
            onMarkAllAsRead();
            toast.success('All notifications marked as read');
          }}
        >
          Mark all as read
        </Button>
      </div>
    </div>
  );
};
