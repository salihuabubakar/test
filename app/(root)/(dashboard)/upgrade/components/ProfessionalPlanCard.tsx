'use client';

import React from 'react';
import CustomButton from '@/components/shared/CustomButton';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
import { Tick, PriceImg } from '@/assets';
import { useRouter } from 'next/navigation';

const ProfessionalPlanCard = () => {
  const router = useRouter();
  return (
    <div
      className={
        'md:w-[400px] bg-white shadow-md rounded-[24px] p-[24px] z-20 border hover:border-purple-600 dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]'
      }
    >
      <div className={'bg-cdaccent-200 w-[60px] rounded-full p-3'}>
        <Image src={PriceImg} alt={'cash-dime-pricing-icon'} />
      </div>
      <div className={'py-5 space-y-5'}>
        <h1 className={'font-semibold font-clash text-cdneutral-black dark:text-cdneutral-white'}>
          PROFESSIONAL PLAN
        </h1>
        <p className="text-4xl font-bold text-gray-900 dark:text-gray-600 flex ">
          <span className={'font-clashSemiBold'}>$30</span>
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
            <p className={'inline-block'}>Multiple currencies</p>
          </li>
          <li className="flex items-center text-gray-700 space-x-2">
            <Image src={Tick} alt={'cash-dime-tick'} className={'inline-block'} />
            <p className={'inline-block'}>Multiple business</p>
          </li>
        </ul>
      </div>
      <div className="py-8">
        <div className={'flex-1 h-[1px] bg-[#CCCCCC4D]' + ' '} />
      </div>
      <CustomButton
        rightIcon={<ArrowRightIcon />}
        rightIconClassName={'bg-gradient text- rounded-full p-1.5'}
        className={' py-7 bg-white border-gradient-rounded-full w-full'}
        onClick={() => router.push(`/upgrade/professional`)}
      >
        <p className={'font-bold text-[16px] text-gradient bg-white'}>Buy professional plan</p>
      </CustomButton>
    </div>
  );
};

export default ProfessionalPlanCard;
