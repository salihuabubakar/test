'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { NotificationOutline } from '@/assets';
import TopBar from '@/components/Dashboard/TopBar';
import { Button } from '@/components/ui/button';
import useNotificationStore from '@/zustand/notificationSlice';
import { useRouter } from 'next/navigation';
import { filterNotifications } from './utils/notification';
import NoDataRecord from '@/components/NoData/noDataRecord';

const NotificationsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Unread'>('All');

  const {
    notifications,
    markAllAsRead,
    deleteNotification,
    getReadNotificationsCount,
  } = useNotificationStore();

  // Filter notifications based on the active tab
  const filteredNotifications = filterNotifications(notifications, activeTab);

  return (
    <div className="">
      <TopBar title="Notifications" logo={NotificationOutline} />
      <div className="h-screen flex flex-col px-6 pt-3 dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
        {/* Sticky Top Section */}
        <div className="sticky top-0 z-10 bg-cdneutral-white dark:text-cdneutral-white dark:bg-[#09090b] pb-4">
          <h2 className="md:text-2xl font-clashSemiBold mb-6 flex flex-col sm:flex-row sm:justify-between items-center text-center">
            You've {getReadNotificationsCount()} unread notifications
            <button
              onClick={markAllAsRead}
              className="bg-[#CCCCCC4D] text-sm py-3 px-6 rounded-xl font-clashLight mt-3 sm:mt-0 w-full sm:w-auto"
            >
              Mark All as Read
            </button>
          </h2>
          <div className="border-b border-gray-300 mb-4">
            <div className="flex sm:justify-start justify-center space-x-8 items-center">
              <button
                className={`text-sm font-clashMedium ${
                  activeTab === 'All'
                    ? 'text-cdsuccess-300 border-b-2 border-cdsuccess-300'
                    : 'text-cdneutral-darkGray'
                }`}
                onClick={() => setActiveTab('All')}
              >
                All
              </button>
              <button
                className={`text-sm font-clashMedium ${
                  activeTab === 'New'
                    ? 'text-cdsuccess-300 border-b-2 border-cdsuccess-300'
                    : 'text-cdneutral-darkGray'
                }`}
                onClick={() => setActiveTab('New')}
              >
                New
              </button>
              <button
                className={`text-sm font-clashMedium ${
                  activeTab === 'Unread'
                    ? 'text-cdsuccess-300 border-b-2 border-cdsuccess-300'
                    : 'text-cdneutral-darkGray'
                }`}
                onClick={() => setActiveTab('Unread')}
              >
                Unread
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Notification List */}
        {notifications.length > 0 ? (
          <div className="flex-grow overflow-y-auto space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center justify-between p-2 rounded-lg shadow-sm dark:border dark:border-gray-200 dark:bg-[#09090b] ${
                  notification.status === 'New' ? 'bg-[#F5FCF2]' : 'bg-cdneutral-white border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Image src={notification.icon} alt="Notification Icon" width={40} height={40} />
                  <div>
                    <p className="font-medium text-cdneutral-black dark:text-cdneutral-white">
                      {notification.title}
                    </p>
                    <p className="text-sm text-cdneutral-darkGray">{notification.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-6">
                  {notification.status === 'New' && (
                    <span className="bg-cdsuccess-300 text-cdneutral-white text-xs font-clashMedium py-2 px-3 rounded-lg">
                      New
                    </span>
                  )}
                  {notification.date && (
                    <p className="text-sm text-cdneutral-darkGray font-clashLight">
                      {notification.date}
                    </p>
                  )}
                  <Button
                    className="text-cdneutral-black dark:text-cdneutral-white border border-cdsuccess-100 text-sm"
                    variant="outline"
                    size="sm"
                    onClick={() => router.replace(`/notification/${notification.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    className="text-red-500 border border-red-500 text-sm"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteNotification(Number(notification.id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataRecord />
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
