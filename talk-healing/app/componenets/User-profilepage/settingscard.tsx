'use client';

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function SettingsCard() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <div className="bg-white rounded-2xl shadow-md  p-6">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-8 text-lg font-medium mb-3">
        <span className="text-black border-b-2 border-black pb-1">Account State</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Delete Account
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Log Out
        </button>
      </div>

      {/* Settings Card */}
      <div className="bg-ivory border border-gray-300 rounded-2xl p-6 max-w-3xl">
        {/* Language Selector */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Change Language</label>
          <select
            className="w-full border rounded-md px-4 py-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <hr className="my-4" />

        {/* Notification Toggles with Switch */}
        {[
          { label: 'Push Notification', value: pushEnabled, set: setPushEnabled },
          { label: 'Email Notification', value: emailEnabled, set: setEmailEnabled },
          { label: 'SMS Notification', value: smsEnabled, set: setSmsEnabled },
        ].map(({ label, value, set }) => (
          <div key={label} className="flex justify-between items-center py-3">
            <span>{label}</span>
            <Switch checked={value} onCheckedChange={set} />
          </div>
        ))}
      </div>
    </div>
  );
}
