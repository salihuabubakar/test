'use client';

import React, { useState } from 'react';
import { useDarkMode } from '@/context/darkModeContext';
import TopBar from '@/components/Dashboard/TopBar';
import { settingsIcon } from '@/assets';

const PreferenceTab = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [marketingNotification, setMarketingNotification] = useState(true);

  return (
    <>
      <TopBar title="Preference Settings" logo={settingsIcon} />
      <div className="flex p-2 h-screen px-6 text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
        <main className="flex-1">
          {/* Preference Section */}
          <section>
            <h3 className="md:text-xl dark:text-cdneutral-white font-clashSemiBold mb-6">
              Preference
            </h3>

            {/* Marketing Notification */}
            <div className="flex flex-row items-center justify-between mb-6 pb-6 border-b border-[#CCCCCC4D] gap-4">
              <div className="flex-1">
                <h4 className="md:text-lg dark:text-cdneutral-white font-clashMedium">
                  Marketing Notification
                </h4>
                <p className="text-cdneutral-darkGray text-sm mt-2 w-[230px] md:w-[400px]">
                  Receive marketing communications from CashDime including special offers and
                  subscription members.
                </p>
              </div>
              <label className="relative inline-block w-12 h-6 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={marketingNotification}
                  onChange={() => setMarketingNotification(!marketingNotification)}
                  className="peer hidden"
                />
                <span className="absolute top-0 left-0 h-6 w-12 rounded-full bg-gray-300 bg-gradient-to-r peer-checked:from-[#0085FF] peer-checked:to-[#00D1FF] transition"></span>
                <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-6 transition"></span>
              </label>
            </div>

            {/* Dark Theme */}
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="md:text-lg dark:text-cdneutral-white font-clashMedium">Dark Theme</h4>
              </div>
              <label className="relative inline-block w-12 h-6 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="peer hidden"
                />
                <span className="absolute top-0 left-0 h-6 w-12 rounded-full bg-[#C5D1DC] bg-gradient-to-r from-gray-300 to-gray-300 peer-checked:from-[#00D1FF] peer-checked:to-[#0085FF] transition"></span>
                <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-6 transition"></span>
              </label>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default PreferenceTab;
