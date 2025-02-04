'use client';

import React from 'react';

import TopBar from '@/components/Dashboard/TopBar';
import Cards from '@/components/Dashboard/Cards';
import BillingPerformanceGraph from '@/components/Dashboard/BillingPerformanceGraph';
import ActivityPerformance from '@/components/Dashboard/ActivityPerformance';
import RecentActivitiesTable from '@/components/Dashboard/RecentActivitiesTable';
import { OverviewIcon } from '@/assets';

const OverviewPage = () => {
  return (
    <>
      <TopBar title="Overview" logo={OverviewIcon} />
      <div className="p-6 flex flex-col space-y-8 dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
        <Cards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BillingPerformanceGraph />
          <ActivityPerformance />
        </div>
        <RecentActivitiesTable />
      </div>
    </>
  );
};

export default OverviewPage;
