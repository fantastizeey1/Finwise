import React, { useState, useEffect } from 'react';
import { NotificationItem } from './NotificationItem';
import { NotificationHeader } from './NotificationHeader';
import { NotificationTabs } from './NotificationTabs';
import { NotificationSkeleton } from './NotificationSkeleton';

type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Your credit score has been updated',
    message: 'Your credit score is ₦800. Check your credit report.',
    date: 'May 05, 2025',
    read: false,
  },
  {
    id: 2,
    title: 'Deposit Received: Payroll Credit',
    message: 'Your salary of ₦20,000 has been deposited to your account.',
    date: 'Jun 08, 2025',
    read: true,
  },
  // Add more as needed...
];

export const NotificationList = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'All' | 'Unread' | 'Read'>('All');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({
        ...n,
        read: true,
      }))
    );
  };

  // ✅ Combine tab + search filtering
  const filteredNotifications = notifications
    .filter(n => {
      if (tab === 'All') return true;
      if (tab === 'Unread') return !n.read;
      if (tab === 'Read') return n.read;
      return true;
    })
    .filter(n => `${n.title} ${n.message}`.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <NotificationHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onMarkAllAsRead={markAllAsRead}
      />
      <NotificationTabs activeTab={tab} setActiveTab={setTab} />
      {loading ? (
        <NotificationSkeleton />
      ) : filteredNotifications.length > 0 ? (
        filteredNotifications.map(n => (
          <NotificationItem
            key={n.id}
            title={n.title}
            message={n.message}
            date={n.date}
            read={n.read}
          />
        ))
      ) : (
        <p className="text-muted-foreground text-center py-10">No notifications found.</p>
      )}
    </div>
  );
};
