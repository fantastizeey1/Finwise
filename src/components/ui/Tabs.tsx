// components/ui/Tabs.tsx
import React, { createContext, useContext, useState } from 'react';

// Context for tab state
type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Hook to use tabs context
export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}

// Provider component
export interface TabsProviderProps {
  children: React.ReactNode;
  defaultTab: string;
}

export function TabsProvider({ children, defaultTab }: TabsProviderProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
  );
}

// TabList component
export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return <div className={`flex ${className}`}>{children}</div>;
}

// Tab component
export interface TabProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tab({ value, children, className = '' }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();

  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors
        ${
          isActive
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
        } ${className}`}
    >
      {children}
    </button>
  );
}

// TabContent component
export interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

export function TabContent({ value, children }: TabContentProps) {
  const { activeTab } = useTabs();

  if (value !== activeTab) {
    return null;
  }

  return <div>{children}</div>;
}

// Export all components
export const Tabs = {
  Provider: TabsProvider,
  List: TabsList,
  Tab: Tab,
  Content: TabContent,
};
