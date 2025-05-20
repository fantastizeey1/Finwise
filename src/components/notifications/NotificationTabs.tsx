import React from 'react';

type TabType = 'All' | 'Unread' | 'Read';

type Props = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

export const NotificationTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs: TabType[] = ['All', 'Unread', 'Read'];

  return (
    <div className="flex gap-4 mb-4">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-1 border-b-2 transition text-sm ${
            activeTab === tab
              ? 'border-blue-500 font-semibold text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
