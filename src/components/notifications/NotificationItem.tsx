import React from 'react';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';

type Props = {
  title: string;
  message: string;
  date: string;
  read: boolean;
  icon?: React.ReactNode;
};

export const NotificationItem: React.FC<Props> = ({ title, message, date, read, icon }) => {
  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-muted/50 shadow-sm',
        !read && 'bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500'
      )}
    >
      <div className={cn('text-blue-600 dark:text-blue-400 shrink-0 mt-1')}>
        {icon || <Bell size={24} />}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{title}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{date}</p>
      </div>
    </div>
  );
};
