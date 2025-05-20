// src/components/settings/TabNavigation.tsx
import React from 'react';

interface TabNavigationProps<T extends string> {
  tabs: readonly T[];
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel?: string;
  className?: string;
}

function TabNavigation<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = 'Navigation Tabs',
  className = '',
}: TabNavigationProps<T>) {
  // Handle edge cases
  if (!tabs.length) {
    return null;
  }

  // Ensure activeTab is valid
  const validActiveTab = tabs.includes(activeTab) ? activeTab : tabs[0];

  return (
    <div
      className={`flex border-b border-gray-200 ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map(tab => {
        const isActive = validActiveTab === tab;
        const id = `tab-${tab.toLowerCase().replace(/\s+/g, '-')}`;

        return (
          <button
            key={tab}
            id={id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${id}`}
            onClick={() => onChange(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 ${
              isActive
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default TabNavigation;
