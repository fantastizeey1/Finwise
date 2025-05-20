import { useState } from 'react';
import { Settings2, BellIcon } from 'lucide-react';

// Define types for settings
interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  city: string;
  address: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Preferences {
  currency: string;
  timeZone: string;
  notifications: {
    dailyCurrency: boolean;
    upcomingBills: boolean;
    suspiciousActivity: boolean;
  };
}

const SettingsPage: React.FC = () => {
  // Define tabs
  const tabs = ['Edit Profile', 'Preference', 'Security', 'Link Accounts'];
  const [activeTab, setActiveTab] = useState<string>('Edit Profile');

  // State for user profile
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Christian Mark',
    username: 'Christianmark123',
    email: 'christianmark@gmail.com',
    password: '****************',
    dateOfBirth: '09/09/1999',
    city: 'Yaba',
    address: 'Community Road, Akoka, Lagos State',
    state: 'Lagos State',
    postalCode: '10001',
    country: 'Nigeria',
  });

  // State for preferences
  const [preferences, setPreferences] = useState<Preferences>({
    currency: 'NGN',
    timeZone: '[GMT+0100]West Central Africa',
    notifications: {
      dailyCurrency: true,
      upcomingBills: true,
      suspiciousActivity: false,
    },
  });

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    // Here you would normally send the data to an API
  };

  // Handle preferences update
  const handlePreferencesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Preferences updated:', preferences);
    // Here you would normally send the data to an API
  };

  // Handle notification toggle
  const toggleNotification = (key: keyof Preferences['notifications']) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full px-4 py-6 bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>

          <div className="relative flex space-x-4">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for something"
                className="w-80 px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Settings and Notifications icons */}
            <div className="flex space-x-4">
              <button
                className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center"
                type="button"
                title="Settings"
                aria-label="Settings"
              >
                <Settings2 className="h-5 w-5 text-blue-500" />
              </button>
              <button
                className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center relative"
                type="button"
                title="Notifications"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5 text-blue-500" />
                <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></div>
              </button>
            </div>

            {/* User avatar */}
            <div className="h-10 w-10 bg-green-400 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/40/40"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto mt-8 pb-12">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          {/* Edit Profile */}
          {activeTab === 'Edit Profile' && (
            <button
              className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1"
              type="button"
              title="Edit profile image"
              aria-label="Edit profile image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Form fields */}
        <div className="w-4/5 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={profile.fullName}
              onChange={e => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              placeholder="Enter your user name"
              value={profile.username}
              onChange={e => setProfile({ ...profile, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={profile.password}
              onChange={e => setProfile({ ...profile, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
            <input
              type="text"
              placeholder="Enter your date of birth"
              value={profile.dateOfBirth}
              onChange={e => setProfile({ ...profile, dateOfBirth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={profile.city}
              onChange={e => setProfile({ ...profile, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permanent Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              value={profile.address}
              onChange={e => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              value={profile.state}
              onChange={e => setProfile({ ...profile, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              placeholder="Enter your postal code"
              value={profile.postalCode}
              onChange={e => setProfile({ ...profile, postalCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              placeholder="Enter your country"
              value={profile.country}
              onChange={e => setProfile({ ...profile, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      {/* Preferences */}
      {activeTab === 'Preference' && (
        <form onSubmit={handlePreferencesUpdate}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <input
                type="text"
                placeholder="Enter your currency"
                value={preferences.currency}
                onChange={e => setPreferences({ ...preferences, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <input
                type="text"
                placeholder="Enter your time zone"
                value={preferences.timeZone}
                onChange={e => setPreferences({ ...preferences, timeZone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  I want to receive alert in daily currency
                </span>
                <button
                  type="button"
                  className={`${
                    preferences.notifications.dailyCurrency ? 'bg-blue-500' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  onClick={() => toggleNotification('dailyCurrency')}
                >
                  <span
                    className={`${
                      preferences.notifications.dailyCurrency ? 'translate-x-5' : 'translate-x-1'
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-1`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Stay updated with upcoming bills and due date
                </span>
                <button
                  type="button"
                  className={`${
                    preferences.notifications.upcomingBills ? 'bg-blue-500' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  onClick={() => toggleNotification('upcomingBills')}
                >
                  <span
                    className={`${
                      preferences.notifications.upcomingBills ? 'translate-x-5' : 'translate-x-1'
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-1`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Suspicious activity alerts</span>
                <button
                  type="button"
                  className={`${
                    preferences.notifications.suspiciousActivity ? 'bg-blue-500' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  onClick={() => toggleNotification('suspiciousActivity')}
                >
                  <span
                    className={`${
                      preferences.notifications.suspiciousActivity
                        ? 'translate-x-5'
                        : 'translate-x-1'
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-1`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Security */}
      {activeTab === 'Security' && (
        <div className="py-12 text-center text-gray-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
          <p>Security settings implementation will be added in future updates.</p>
        </div>
      )}

      {/* Link Accounts */}
      {activeTab === 'Link Accounts' && (
        <div className="py-12 text-center text-gray-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Link Accounts</h3>
          <p>Link accounts functionality will be added in future updates.</p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
