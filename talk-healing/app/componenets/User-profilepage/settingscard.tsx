'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useStores } from '@/models';

export default function SettingsCard() {
  const stores = useStores?.(); // Guard in case useStores is undefined
  const settingsStore = stores?.settingsStore;
  const i18nStore = stores?.i18nStore;

  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [language, setLanguage] = useState(
    i18nStore?.getCurrentLanguage?.() ?? 'English'
  );

  useEffect(() => {
    settingsStore?.getSettings?.().then((res: any) => {
      if (res?.ok && settingsStore.settings) {
        setPushEnabled(!!settingsStore.settings.push_notification);
        setEmailEnabled(!!settingsStore.settings.email_notification);
        setSmsEnabled(!!settingsStore.settings.sms_notification);
      }
    });
    setLanguage(i18nStore?.getCurrentLanguage?.() ?? 'English');
    // eslint-disable-next-line
  }, []);

  const handlePushToggle = (checked: boolean) => {
    setPushEnabled(checked);
    settingsStore?.editSettings?.({
      ...settingsStore.settings,
      push_notification: checked,
    });
  };
  const handleEmailToggle = (checked: boolean) => {
    setEmailEnabled(checked);
    settingsStore?.editSettings?.({
      ...settingsStore.settings,
      email_notification: checked,
    });
  };
  const handleSmsToggle = (checked: boolean) => {
    setSmsEnabled(checked);
    settingsStore?.editSettings?.({
      ...settingsStore.settings,
      sms_notification: checked,
    });
  };

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    if (i18nStore?.setAppLanguage) {
      await i18nStore.setAppLanguage(e.target.value);
      window.location.reload();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <div className="flex gap-8 text-lg font-medium mb-3">
        <span className="text-black border-b-2 border-black pb-1">Account State</span>
      </div>
      <div className="flex gap-2 mb-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Delete Account
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Log Out
        </button>
      </div>
      <div className="bg-ivory border border-gray-300 rounded-2xl p-6 max-w-3xl">
        <div className="mb-6">
          <label className="font-semibold block mb-2">Change Language</label>
          <select
            className="w-full border rounded-md px-4 py-2"
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
          <Switch checked={pushEnabled} onCheckedChange={handlePushToggle} />
        </div>
        <div className="flex justify-between items-center py-3">
          <span>Email Notification</span>
          <Switch checked={emailEnabled} onCheckedChange={handleEmailToggle} />
        </div>
        <div className="flex justify-between items-center py-3">
          <span>SMS Notification</span>
          <Switch checked={smsEnabled} onCheckedChange={handleSmsToggle} />
        </div>
      </div>
    </div>
  );
}
