// src/pages/Settings.tsx
import { useState, useEffect, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TabNavigation from '@/components/settings/TabNavigation';
import ProfileForm from '@/components/settings/ProfileForm';
import PreferencesForm from '@/components/settings/PreferencesForm';
import SecurityForm from '@/components/settings/SecurityForm';
import LinkAccounts from '@/components/settings/LinkAccounts';
import { Spinner } from '@/components/ui/spinner';

// Define available settings tabs
const SETTINGS_TABS = ['Edit Profile', 'Preferences', 'Security', 'Link Accounts'] as const;
type SettingsTab = (typeof SETTINGS_TABS)[number];

// Tab name to slug mapping
const TAB_TO_SLUG: Record<SettingsTab, string> = {
  'Edit Profile': 'profile',
  Preferences: 'preferences',
  Security: 'security',
  'Link Accounts': 'connections',
};

// Slug to tab name (reverse mapping)
const SLUG_TO_TAB: Record<string, SettingsTab> = Object.entries(TAB_TO_SLUG).reduce(
  (acc, [tab, slug]) => {
    acc[slug] = tab as SettingsTab;
    return acc;
  },
  {} as Record<string, SettingsTab>
);

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<SettingsTab>('Edit Profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Sync URL with active tab
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tabSlug = query.get('tab');
    const tabFromSlug = tabSlug ? SLUG_TO_TAB[tabSlug] : null;

    if (tabFromSlug && tabFromSlug !== activeTab) {
      setActiveTab(tabFromSlug);
    } else if (!tabFromSlug) {
      const newParams = new URLSearchParams(location.search);
      newParams.set('tab', TAB_TO_SLUG[activeTab]);
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    }
  }, [location.search]);

  // Set document title dynamically
  useEffect(() => {
    document.title = `Settings | ${activeTab.replace('Edit ', '')}`;
  }, [activeTab]);

  // Handle tab switch
  const handleTabChange = (tab: SettingsTab) => {
    startTransition(() => {
      setActiveTab(tab);
      const params = new URLSearchParams(location.search);
      params.set('tab', TAB_TO_SLUG[tab]);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    });
  };

  // Render content for each tab
  const renderTabContent = () => {
    if (isLoading || isPending) {
      return (
        <div className="flex justify-center items-center py-12">
          <Spinner size="medium" />
        </div>
      );
    }

    switch (activeTab) {
      case 'Edit Profile':
        return <ProfileForm onLoadingChange={setIsLoading} />;
      case 'Preferences':
        return <PreferencesForm onLoadingChange={setIsLoading} />;
      case 'Security':
        return <SecurityForm onLoadingChange={setIsLoading} />;
      case 'Link Accounts':
        return <LinkAccounts onLoadingChange={setIsLoading} />;
      default:
        return <div className="text-red-600">Invalid tab selected.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6">
      <h2 className="text-4xl my-7 ml-28 font-bold">Settings</h2>

      <main className="max-w-6xl mx-auto mt-8 pb-12">
        <TabNavigation
          tabs={SETTINGS_TABS}
          activeTab={activeTab}
          onChange={handleTabChange}
          ariaLabel="Settings Navigation"
        />

        <section
          id={`tabpanel-tab-${TAB_TO_SLUG[activeTab]}`}
          role="tabpanel"
          aria-labelledby={`tab-${TAB_TO_SLUG[activeTab]}`}
          className="mt-6 bg-white rounded-lg shadow p-6 relative"
        >
          {renderTabContent()}
        </section>
      </main>
    </div>
  );
};

export default Settings;
