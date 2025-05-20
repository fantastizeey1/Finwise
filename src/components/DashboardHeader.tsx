// File: components/DashboardHeader.tsx
import React from 'react';
import { Bell, Search } from 'lucide-react';

export interface DashboardHeaderProps {
  userName: string;
  currentDate: string;
  onSearch?: (query: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, currentDate, onSearch }) => (
  <header className="flex items-center justify-between border-b pb-4 bg-white p-4 rounded-t-lg mb-6">
    <h2 className="text-xl font-bold">
      Hello {userName} &gt;&gt; {currentDate}
    </h2>
    <div className="flex gap-4 items-center">
      <Bell className="w-5 h-5 text-gray-600" />
      <div className="relative">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search here"
          aria-label="Search"
          onChange={e => onSearch?.(e.target.value)}
          className="pl-8 pr-4 py-2 border rounded-md text-sm"
        />
      </div>
    </div>
  </header>
);

export default DashboardHeader;
