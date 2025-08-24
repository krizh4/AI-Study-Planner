import { useState } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import useUser from "@/utils/useUser";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Moon, 
  Sun,
  Save,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

export default function SettingsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Study Learner',
      email: 'learner@email.com',
      bio: 'Passionate learner exploring new topics and mastering skills.',
      timezone: 'UTC-8',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      dailyReminders: true,
      weeklyProgress: false,
      achievementAlerts: true,
      studyPlanUpdates: true
    },
    privacy: {
      profileVisibility: 'private',
      progressVisibility: 'friends',
      allowAnalytics: true,
      allowMarketing: false
    },
    appearance: {
      theme: 'system',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    }
  });

  const handleSaveSettings = async (section) => {
    setLoading(true);
    try {
      // In a real app, this would save to your API
      console.log(`Saving ${section} settings:`, settings[section]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (you could use a toast here)
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your study plans and progress. Type "DELETE" to confirm.')) {
        try {
          // In a real app, this would call your delete account API
          console.log('Deleting account...');
          alert('Account deletion initiated. You will receive an email confirmation.');
        } catch (error) {
          console.error('Error deleting account:', error);
          alert('Failed to delete account. Please contact support.');
        }
      }
    }
  };

  if (userLoading) {
    return (
      <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212]">
        <LeftSidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-3 border-[#30C4B5] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212]">
        <LeftSidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="p-6">
            <div className="text-center">
              <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                Please <a href="/account/signin" className="text-[#30C4B5] hover:underline">sign in</a> to access settings.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      <LeftSidebar />
      
      <div className="flex-1 md:ml-64">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-2">
                Settings
              </h1>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                Manage your account preferences and application settings
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Settings Navigation */}
              <div className="lg:w-64 flex-shrink-0">
                <nav className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-2 transition-colors duration-200">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-inter font-medium text-sm transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-[#30C4B5] text-white'
                            : 'text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-[#252525] hover:text-[#111827] dark:hover:text-[#F9FAFB]'
                        }`}
                      >
                        <Icon size={18} className="mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
                  
                  {/* Profile Settings */}
                  {activeTab === 'profile' && (
                    <div>
                      <h2 className="font-montserrat font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-6">
                        Profile Settings
                      </h2>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                              Display Name
                            </label>
                            <input
                              type="text"
                              value={settings.profile.name}
                              onChange={(e) => setSettings({
                                ...settings,
                                profile: { ...settings.profile, name: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                            />
                          </div>
                          
                          <div>
                            <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={settings.profile.email}
                              disabled
                              className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] bg-gray-50 dark:bg-[#111827] cursor-not-allowed transition-colors duration-200"
                            />
                            <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                              Contact support to change your email address
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                            Bio
                          </label>
                          <textarea
                            value={settings.profile.bio}
                            onChange={(e) => setSettings({
                              ...settings,
                              profile: { ...settings.profile, bio: e.target.value }
                            })}
                            rows="4"
                            className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                            placeholder="Tell us about yourself..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                              Timezone
                            </label>
                            <select
                              value={settings.profile.timezone}
                              onChange={(e) => setSettings({
                                ...settings,
                                profile: { ...settings.profile, timezone: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                            >
                              <option value="UTC-8">Pacific Time (UTC-8)</option>
                              <option value="UTC-5">Eastern Time (UTC-5)</option>
                              <option value="UTC+0">UTC</option>
                              <option value="UTC+1">Central European Time (UTC+1)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                              Language
                            </label>
                            <select
                              value={settings.profile.language}
                              onChange={(e) => setSettings({
                                ...settings,
                                profile: { ...settings.profile, language: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                            >
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveSettings('profile')}
                            disabled={loading}
                            className="flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] disabled:bg-gray-300 text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                          >
                            {loading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeTab === 'notifications' && (
                    <div>
                      <h2 className="font-montserrat font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-6">
                        Notification Preferences
                      </h2>
                      
                      <div className="space-y-6">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3 border-b border-[#E7ECF3] dark:border-[#2A2A2A] last:border-b-0">
                            <div>
                              <h3 className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB] mb-1">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </h3>
                              <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                                {key === 'dailyReminders' && 'Get daily reminders to continue your study plans'}
                                {key === 'weeklyProgress' && 'Weekly summary of your learning progress'}
                                {key === 'achievementAlerts' && 'Notifications when you earn new achievements'}
                                {key === 'studyPlanUpdates' && 'Updates about your study plan progress'}
                              </p>
                            </div>
                            <button
                              onClick={() => setSettings({
                                ...settings,
                                notifications: {
                                  ...settings.notifications,
                                  [key]: !value
                                }
                              })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2 ${
                                value ? 'bg-[#30C4B5]' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveSettings('notifications')}
                            disabled={loading}
                            className="flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] disabled:bg-gray-300 text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                          >
                            {loading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeTab === 'privacy' && (
                    <div>
                      <h2 className="font-montserrat font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-6">
                        Privacy & Security
                      </h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                            Profile Visibility
                          </label>
                          <select
                            value={settings.privacy.profileVisibility}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, profileVisibility: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                            Progress Visibility
                          </label>
                          <select
                            value={settings.privacy.progressVisibility}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, progressVisibility: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB] mb-1">
                                Allow Analytics
                              </h3>
                              <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                Help us improve by sharing anonymous usage data
                              </p>
                            </div>
                            <button
                              onClick={() => setSettings({
                                ...settings,
                                privacy: {
                                  ...settings.privacy,
                                  allowAnalytics: !settings.privacy.allowAnalytics
                                }
                              })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2 ${
                                settings.privacy.allowAnalytics ? 'bg-[#30C4B5]' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.privacy.allowAnalytics ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB] mb-1">
                                Marketing Communications
                              </h3>
                              <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                Receive emails about new features and tips
                              </p>
                            </div>
                            <button
                              onClick={() => setSettings({
                                ...settings,
                                privacy: {
                                  ...settings.privacy,
                                  allowMarketing: !settings.privacy.allowMarketing
                                }
                              })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2 ${
                                settings.privacy.allowMarketing ? 'bg-[#30C4B5]' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.privacy.allowMarketing ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-[#E7ECF3] dark:border-[#2A2A2A]">
                          <h3 className="font-inter font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-4">
                            Danger Zone
                          </h3>
                          <div className="p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded-lg">
                            <h4 className="font-inter font-medium text-sm text-red-800 dark:text-red-400 mb-2">
                              Delete Account
                            </h4>
                            <p className="font-inter text-xs text-red-600 dark:text-red-500 mb-4">
                              Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <button
                              onClick={handleDeleteAccount}
                              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete Account
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveSettings('privacy')}
                            disabled={loading}
                            className="flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] disabled:bg-gray-300 text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                          >
                            {loading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeTab === 'appearance' && (
                    <div>
                      <h2 className="font-montserrat font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-6">
                        Appearance & Display
                      </h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-3">
                            Theme
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { value: 'light', label: 'Light', icon: Sun },
                              { value: 'dark', label: 'Dark', icon: Moon },
                              { value: 'system', label: 'System', icon: Globe }
                            ].map((theme) => {
                              const Icon = theme.icon;
                              return (
                                <button
                                  key={theme.value}
                                  onClick={() => setSettings({
                                    ...settings,
                                    appearance: { ...settings.appearance, theme: theme.value }
                                  })}
                                  className={`p-4 border-2 rounded-lg transition-colors duration-200 ${
                                    settings.appearance.theme === theme.value
                                      ? 'border-[#30C4B5] bg-[#F0FDFA] dark:bg-[#0F2A26]'
                                      : 'border-[#E7ECF3] dark:border-[#2A2A2A] hover:border-[#30C4B5]'
                                  }`}
                                >
                                  <Icon size={24} className="mx-auto mb-2 text-[#30C4B5]" />
                                  <p className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB]">
                                    {theme.label}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                              Date Format
                            </label>
                            <select
                              value={settings.appearance.dateFormat}
                              onChange={(e) => setSettings({
                                ...settings,
                                appearance: { ...settings.appearance, dateFormat: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                            >
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                              Time Format
                            </label>
                            <select
                              value={settings.appearance.timeFormat}
                              onChange={(e) => setSettings({
                                ...settings,
                                appearance: { ...settings.appearance, timeFormat: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                            >
                              <option value="12h">12 Hour</option>
                              <option value="24h">24 Hour</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveSettings('appearance')}
                            disabled={loading}
                            className="flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] disabled:bg-gray-300 text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                          >
                            {loading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}