'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { date, autoRenewa, myPlan, settingsIcon } from '@/assets';
import Image from 'next/image';
import TopBar from '@/components/Dashboard/TopBar';

interface BillProps {
  id: string;
  Plan: string;
  Amount: number;
  SubDate: string;
  ExpDate: string;
  Method: string;
}

const billFields: BillProps[] = [
  {
    id: '1',
    Plan: 'Basic',
    Amount: 20000,
    SubDate: '12-10-2024',
    ExpDate: '13-10-2024',
    Method: 'Credit Card',
  },
  {
    id: '2',
    Plan: 'Premium',
    Amount: 10,
    SubDate: '08-10-2024',
    ExpDate: '13-10-2024',
    Method: 'Paystack',
  },
  {
    id: '3',
    Plan: 'Basic',
    Amount: 500,
    SubDate: '01-10-2024',
    ExpDate: '13-10-2024',
    Method: 'Credit Card',
  },
];

const BillingsTab = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);

  return (
    <>
      <TopBar title="Billing Settings" logo={settingsIcon} />
      <div className="flex flex-col md:flex-row">
        {/* Main Content */}
        <main className="flex-1 p-2 px-6 dark:text-cdneutral-white text-cdneutral-black h-screen bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
          {/* Billings Section */}
          <section>
            <h2 className="text-2xl font-clashSemiBold mb-4">Billings</h2>
            <div className="flex md:flex-row font-clashMedium flex-col justify-between pb-3">
              <h2>Subscription</h2>
              <div className="mt-2 flex space-x-2">
                <Link href="#" className="text-gray-400 text-sm underline underline-offset-4">
                  Cancel Subscription
                </Link>
                <Link href="#" className="text-[#007AFF] text-sm underline underline-offset-4">
                  Change Plan
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
              {/* My Plan */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-cdneutral-black dark:bg-[#09090b] dark:border dark:border-[#3A3A3A]">
                <div className="flex  gap-4 items-center">
                  <Image src={myPlan} alt="my plan" />
                  <p className="text-cdneutral-black mb-2 dark:text-cdneutral-white">MY PLAN</p>
                </div>
                <h3 className="text-xl font-clashMedium dark:text-cdneutral-white text-center dark:text-cdneutral-black">
                  BASIC
                </h3>
              </div>

              {/* Subscription Date */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-cdneutral-black dark:bg-[#09090b] dark:border dark:border-[#3A3A3A]">
                <div className="flex  gap-4 items-center">
                  <Image src={date} alt="date" />
                  <p className="text-cdneutral-black mb-2 dark:text-cdneutral-white">
                    SUBSCRIPTION DATE
                  </p>
                </div>
                <h3 className="text-xl font-clashMedium text-center dark:text-cdneutral-white">
                  15 - 10 - 2024
                </h3>
              </div>

              {/* Expiry Date */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-cdneutral-black dark:bg-[#09090b] dark:border dark:border-[#3A3A3A]">
                <div className="flex  gap-4 items-center">
                  <Image src={date} alt="date" />
                  <p className="text-cdneutral-black mb-2 dark:text-cdneutral-white">EXPIRY DATE</p>
                </div>
                <h3 className="text-xl font-clashMedium text-center dark:text-cdneutral-white">
                  22 - 10 - 2024
                </h3>
              </div>

              {/* Auto Renewal */}
              <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-between shadow-sm text-cdneutral-black dark:bg-[#09090b] dark:border dark:border-[#3A3A3A]">
                <div className="flex items-center">
                  <div className="flex  gap-4 items-center">
                    <Image src={autoRenewa} alt="autoRenewa" />
                  </div>
                  <p className="text-gray-500 px-3 dark:text-cdneutral-white">AUTORENEWAL</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRenewal}
                    onChange={() => setAutoRenewal(!autoRenewal)}
                    className="hidden"
                  />
                  <span
                    className={`block w-10 h-5 rounded-full relative ${
                      autoRenewal ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white shadow transform duration-300 absolute top-0.5 ${
                        autoRenewal ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></span>
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-4 p-4">
              <h3 className="text-xl font-clashMedium mb-6">Payment Method:</h3>
              <h2 className="font-clashMedium text-lg">History</h2>
            </div>

            {/* History Table */}
            <div className=" overflow-x-auto font-clash">
              <table className="table-auto w-full hidden md:table text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                      Plan
                    </th>
                    <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                      Amount
                    </th>
                    <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                      Sub Date
                    </th>
                    <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                      Exp Date
                    </th>
                    <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billFields.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted-foreground">
                        No team members found
                      </td>
                    </tr>
                  ) : (
                    billFields.map((bill) => (
                      <tr key={bill.id}>
                        <td className="p-4">{bill.Plan}</td>
                        <td className="p-4">{bill.Amount}</td>
                        <td className="p-4">{bill.SubDate}</td>
                        <td className="p-4">{bill.ExpDate}</td>
                        <td className="p-4 text-[#399320]">{bill.Method}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Mobile View */}
              <div className="flex flex-col gap-4 md:hidden">
                {billFields.length === 0 ? (
                  <div className="rounded-lg p-4 text-muted-foreground">No team members found</div>
                ) : (
                  billFields.map((bill) => (
                    <div key={bill.id} className="rounded-lg p-4">
                      <div className="flex justify-between border-b pb-2 mb-2">
                        <span className="font-clash text-dneutral-black">Plan</span>
                        <span className="font-clash text-dneutral-black">{bill.Plan}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2 mb-2">
                        <span className="font-clash text-dneutral-black">Amount</span>
                        <span className="font-clash text-dneutral-black">{bill.Amount}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2 mb-2">
                        <span className="font-clash text-dneutral-black">Sub Date</span>
                        <span className="font-clash text-dneutral-black">{bill.SubDate}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2 mb-2">
                        <span className="font-clash text-dneutral-black">Exp Date</span>
                        <span className="font-clash text-dneutral-black">{bill.ExpDate}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2 mb-2">
                        <span className="font-clash text-dneutral-black">Method</span>
                        <span className="font-clash text-[#399320]">{bill.Method}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Mobile Sidebar (optional for smaller screens) */}
        <aside className="md:hidden fixed bottom-0 w-full bg-white shadow-md p-4">
          {/* Mobile Sidebar */}
        </aside>
      </div>
    </>
  );
};

export default BillingsTab;
