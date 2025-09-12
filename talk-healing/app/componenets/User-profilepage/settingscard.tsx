'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useStores } from '@/models';
import { useRouter } from 'next/navigation';

export default function SettingsCard() {
  const router = useRouter();
  const stores = useStores?.(); // Guard in case useStores is undefined
  const userStore = stores?.userStore;

  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  useEffect(() => {
    // Load settings from localStorage for now
    const loadSettings = () => {
      setSettingsLoading(true);
      try {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setPushEnabled(!!settings.push_notification);
          setEmailEnabled(!!settings.email_notification);
          setSmsEnabled(!!settings.sms_notification);
        }
        
        const savedLanguage = localStorage.getItem('appLanguage');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setSettingsLoading(false);
      }
    };

    loadSettings();
    // eslint-disable-next-line
  }, []);

  const handlePushToggle = async (checked: boolean) => {
    setPushEnabled(checked);
    try {
      // Save to localStorage for now
      const currentSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const updatedSettings = {
        ...currentSettings,
        push_notification: checked,
      };
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      showNotification('success', 'Push notification setting updated');
    } catch (error) {
      console.error('Failed to update push notification setting:', error);
      showNotification('error', 'Failed to update push notification setting');
      // Revert on error
      setPushEnabled(!checked);
    }
  };

  const handleEmailToggle = async (checked: boolean) => {
    setEmailEnabled(checked);
    try {
      // Save to localStorage for now
      const currentSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const updatedSettings = {
        ...currentSettings,
        email_notification: checked,
      };
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      showNotification('success', 'Email notification setting updated');
    } catch (error) {
      console.error('Failed to update email notification setting:', error);
      showNotification('error', 'Failed to update email notification setting');
      // Revert on error
      setEmailEnabled(!checked);
    }
  };

  const handleSmsToggle = async (checked: boolean) => {
    setSmsEnabled(checked);
    try {
      // Save to localStorage for now
      const currentSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const updatedSettings = {
        ...currentSettings,
        sms_notification: checked,
      };
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      showNotification('success', 'SMS notification setting updated');
    } catch (error) {
      console.error('Failed to update SMS notification setting:', error);
      showNotification('error', 'Failed to update SMS notification setting');
      // Revert on error
      setSmsEnabled(!checked);
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const result = await userStore?.logoutUser?.();
      if (result?.ok) {
        // Clear any local storage or session data
        localStorage.clear();
        sessionStorage.clear();
        // Redirect to login page
        router.push('/login');
      } else {
        console.error('Logout failed:', result?.error);
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      // For now, we'll just show a message since delete account API might not be implemented
      alert('Account deletion feature will be implemented soon. Please contact support for account deletion.');
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    try {
      // Save language preference to localStorage
      localStorage.setItem('appLanguage', newLanguage);
      showNotification('success', `Language changed to ${newLanguage === 'en' ? 'English' : 'Hindi'}`);
    } catch (error) {
      console.error('Failed to change language:', error);
      showNotification('error', 'Failed to change language');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 relative">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
          notification.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' ? '✅' : '❌'}
            </span>
            {notification.message}
          </div>
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <div className="flex gap-8 text-lg font-medium mb-3">
        <span className="text-black border-b-2 border-black pb-1">Account State</span>
      </div>
      <div className="flex gap-2 mb-2">
        <button 
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Processing...' : 'Delete Account'}
        </button>
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? 'Logging Out...' : 'Log Out'}
        </button>
      </div>
      <div className="bg-ivory border border-gray-300 rounded-2xl p-6 max-w-3xl">
        {settingsLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading settings...</span>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="font-semibold block mb-2">Change Language</label>
              <select
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center py-3">
              <span>Push Notification</span>
              <Switch 
                checked={pushEnabled} 
                onCheckedChange={handlePushToggle}
                disabled={settingsLoading}
              />
            </div>
            <div className="flex justify-between items-center py-3">
              <span>Email Notification</span>
              <Switch 
                checked={emailEnabled} 
                onCheckedChange={handleEmailToggle}
                disabled={settingsLoading}
              />
            </div>
            <div className="flex justify-between items-center py-3">
              <span>SMS Notification</span>
              <Switch 
                checked={smsEnabled} 
                onCheckedChange={handleSmsToggle}
                disabled={settingsLoading}
              />
            </div>
          </>
        )}
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
