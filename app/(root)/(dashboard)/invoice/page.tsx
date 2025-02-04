'use client';
import React, { useState } from 'react';
import TopBar from '@/components/Dashboard/TopBar';
import { OverviewIcon } from '@/assets';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { links, LinksProps, tabs, TabName } from './invoice-config';
import { gradientColor } from '@/lib';

const InvoicePage = () => {
  const [activeTab, setActiveTab] = useState<TabName>('All');

  const templateMap = {
    All: links,
    Freelancer: links.filter((link) => link.alt === 'Freelancer'),
    Business: links.filter((link) => link.alt === 'Business'),
    Commercial: links.filter((link) => link.alt === 'Commercial'),
    Contractor: links.filter((link) => link.alt === 'Contractor'),
    'Catering Services': links.filter((link) => link.alt === 'Catering Services'),
  };

  const renderContent = (template: LinksProps[]) => {
    return template.map((link) => (
      <Link key={link.templateId} href={`/invoice/${link.templateId}`}>
        <Image
          className="border rounded"
          src={link.imgSrc}
          alt={link.alt}
          width={250}
          height={100}
        />
      </Link>
    ));
  };

  const getTotalTemplates = (tab: TabName) => {
    return templateMap[tab].length;
  };

  return (
    <>
      <TopBar title="Invoice" logo={OverviewIcon} />
      <div className="h-screen flex flex-col px-6 pt-3 dark:bg-[#09090b] bg-[#FAFAFA]">
        <div className="sticky top-0 z-10 pb-4 dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
          <h2 className="md:text-2xl font-clashSemiBold mb-6 flex flex-col sm:flex-row sm:justify-between items-center text-center">
            Templates ({getTotalTemplates(activeTab)})
            <Link
              href="/invoice/saved-invoices"
              className="underline decoration-2 text-sky-500 text-lg font-clashSemiBold py-3 px-6 rounded-xl mt-3 sm:mt-0 w-full sm:w-auto"
            >
              Saved Invoices
            </Link>
          </h2>
          {/* Desktop Tabs */}
          <div className="hidden md:block border-b border-gray-300 mb-4">
            <div className="flex justify-center space-x-8 items-center overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`text-sm font-clashLight whitespace-nowrap pb-2 ${
                    activeTab === tab
                      ? `text-purple-900 dark:font-clashSemiBold border-b-2 border-purple-900`
                      : 'text-cdneutral-darkGray dark:text-cdneutral-white'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile Select */}
          <div className="md:hidden w-full mb-4">
            <Select value={activeTab} onValueChange={(value: TabName) => setActiveTab(value)}>
              <SelectTrigger className="w-fit ml-auto shadow-none focus:ring-0 font-clashLight">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem
                    key={tab}
                    value={tab}
                    className={`font-clashLight ${
                      activeTab === tab ? 'text-purple-900 border-b-2 border-purple-900' : 'text-cdneutral-darkGray'
                    }`}
                  >
                    {tab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Main Content */}
          <div className="flex-1 px-4 py-2 md:px-8 md:ml-5">
            <div className="w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {renderContent(templateMap[activeTab])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
