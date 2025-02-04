import React from 'react';
import Image from 'next/image';
import TopBar from '@/components/Dashboard/TopBar';
import { upgradeIcon, tickMark, Tick } from '@/assets';
import PriceImg from '@/assets/images/price.svg';
import HeaderLabel from '@/components/shared/HeaderLabel';
import CustomButton from '@/components/shared/CustomButton';
import { ArrowRightIcon } from 'lucide-react';
import BasicPlanCard from './components/BasicPlanCard';
import StandardPlanCard from './components/StandardPlanCard';
import ProfessionalPlanCard from './components/ProfessionalPlanCard';

const UpgradePage = () => {
  return (
    <div>
      <TopBar title="Upgrade Plan" logo={upgradeIcon} />
      <div className="flex flex-col space-y-8 dark:text-cdneutral-white h-screen text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
        <p className="text-lg font-clashSemiBold px-8 py-4">Choose a plan of your Choice</p>
        <div className="text-cdsuccess-300 px-8 p-3 mb-4 font-clash">
          <span className="flex flex-row items-center gap-2">
            <Image src={tickMark} alt="tick" /> Subscription payment via bank transfer option is
            available
          </span>
        </div>
        <div className="flex flex-col justify-center bg-cdneutral-white dark:bg-[#09090b]">
          <div className={'flex items-center justify-center '}>
            <HeaderLabel
              text={'Plans to fit your need'}
              className="w-[148px] font-clash text-cdneutral-black text-[14px]"
            />
          </div>
          <div className='mb-4'>
            <div className={'text-center text-[28px] py-5 space-y-3'}>
              <h1 className="text-[28px] md:text-[48px] font-clashSemiBold">Pricing Plans</h1>
              <p
                className={
                  'text-[16px] md:text-[24px] text-cdneutral-black dark:text-cdneutral-white font-clash'
                }
              >
                Join 20,000+ users growing and optimizing their businesses
              </p>
            </div>
            <div
              className={
              'flex flex-col md:flex-row flex-wrap space-y-5 md:space-x-5 items-center justify-center '
              }
            >
              <BasicPlanCard />
              <StandardPlanCard />
              <ProfessionalPlanCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
