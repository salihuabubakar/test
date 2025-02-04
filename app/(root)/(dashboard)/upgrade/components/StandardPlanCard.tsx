'use client';

import React from 'react';
import CustomButton from '@/components/shared/CustomButton';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
import { Tick, PriceImg } from '@/assets';
import { useRouter } from 'next/navigation';

const StandardPlanCard = () => {
  const router = useRouter();
  return (
    <div
      className={
        'md:w-[400px] bg-white  shadow-xl rounded-[24px] p-[24px] z-20 border border-purple-600 dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]'
      }
    >
      <div className="flex items-center justify-between">
        <div className={'bg-cdaccent-200 w-[60px] rounded-full p-3'}>
          <Image src={PriceImg} alt={'cash-dime-pricing-icon'} />
        </div>
        <div
          className={
            'border border-cdsuccess-200 px-2 bg-cdsuccess-100/20 p-2 rounded-full font-clash '
          }
        >
          <h5 className={'text-cdsuccess-300'}>Most popular </h5>
        </div>
      </div>
      <div className={'py-5 space-y-5'}>
        <h1
          className={
            'font-semibold font-clash text-cdneutral-black text-cdneutral-black dark:text-cdneutral-white'
          }
        >
          STANDARD PLAN
        </h1>
        <p className="text-4xl font-bold text-gray-900 dark:text-gray-600 flex">
          <span className={'font-clashSemiBold'}>$20</span>
          <span className="text-[20px] font-normal mt-0.5 block font-clash">/month</span>
        </p>
      </div>
      <div className={''}>
        <ul className="mt-4 space-y-3 font-clash">
          <li className="flex items-center text-gray-700 space-x-2">
            <Image src={Tick} alt={'cash-dime-tick'} className={'inline-block'} />
            <p className="inline-block">Add Unlimited clients</p>
          </li>
          <li className="flex items-center text-gray-700 space-x-2">
            <Image src={Tick} alt={'cash-dime-tick'} className={'inline-block'} />
            <p className={'inline-block'}> Unlimited invoices</p>
          </li>
          <li className="flex items-center text-gray-700 space-x-2">
            <Image src={Tick} alt={'cash-dime-tick'} className={'inline-block'} />
            <p className={'inline-block'}> Estimate & Receipts</p>
          </li>
          <li className="flex items-center text-gray-700 space-x-2">
            <Image src={Tick} alt={'cash-dime-tick'} className={'inline-block'} />
            <p className={'inline-block'}>Financial reporting (Dashboard)</p>
          </li>
          <li className="flex items-center text-gray-700 space-x-2">
            <Image src={Tick} alt={'cash-dime-tick'} className={'inline-block'} />
            <p className={'inline-block'}> Multiple currencies</p>
          </li>
        </ul>
      </div>
      <div className="py-8">
        <div className={'flex-1 h-[1px] bg-[#CCCCCC4D]' + ' '} />
      </div>
      <CustomButton
        rightIcon={<ArrowRightIcon />}
        rightIconClassName={'bg-white text-black rounded-full p-1'}
        className={
          'bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full flex items-center py-7 px-3 pr-10'
        }
        onClick={() => router.push(`/upgrade/standard`)}
      >
        <p className={'font-bold text-[16px]'}>Buy standard plan</p>
      </CustomButton>
    </div>
  );
};

export default StandardPlanCard;
