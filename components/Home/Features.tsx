import HeaderLabel from '@/components/shared/HeaderLabel';
import { BentoCard, Tick } from '@/assets';
import Image from 'next/image';
import CustomButton from '@/components/shared/CustomButton';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

const Features = () => {
  return (
    <section id='features' className={'py-28 px-8 section-side-gap'}>
      <div className={'flex items-center justify-center md:justify-start'}>
        <HeaderLabel text={'What You Get'} className={'w-[120px] text-14 font-clash'} />
      </div>

      <div className={'flex flex-col md:flex-row mt-5 md:justify-between  md:gap-x-20'}>
        <div className={'md:w-3/5'}>
          <div className={'text-center md:text-left'}>
            <h1 className={'font-clashSemiBold text-cdneutral-black text-[28px] md:text-[48px]'}>
              Our Features
            </h1>
            <h5 className={'text-[28px]  py-5 font-clashMedium'}>
              Hassle-Free Invoicing Solution For All
            </h5>

            <p className={' md:w-[500px] text-[16px] md:text-[20px] font-clash'}>
              CashDime offers a simple yet powerful invoicing and billing solution designed to
              streamline your workflow & improve cashflow
            </p>
          </div>

          <div className={' md:px-0 md:py-5'}>
            <ul className={'py-5 space-y-5 font-clash'}>
              <li className={'flex items-center justify-center md:justify-start gap-x-5'}>
                <Image src={Tick} alt={'cash-dime-tick'} />
                <p className={'text-[16px] md:text-[20px] '}>
                  Generate invoices in seconds using our easy to use templates.
                </p>
              </li>
              <li className={'flex items-center justify-center md:justify-start gap-x-5'}>
                <Image src={Tick} alt={'cash-dime-tick'} />
                <p className={'text-[16px] md:text-[20px]'}>
                  Use automated reminders to alert when invoices are unpaid, paid or overdue.
                </p>
              </li>
              <li className={'flex items-center justify-center md:justify-start gap-x-5'}>
                <Image src={Tick} alt={'cash-dime-tick'} />
                <p className={'text-[16px] md:text-[20px]'}>
                  With a simple “Pay Now” button on every invoice you offer a smooth payment
                  experience to clients.
                </p>
              </li>
            </ul>
            <div className={'flex flex-col md:flex-row gap-x-10 items-center mt-5'}>
                <Link href="/sign-up">
                  <CustomButton
                    className={
                      'bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 md:w-[260px] font-clashSemiBold w-full  py-7 space-x-3'
                    }
                  >
                    <p className={'font-bold md:text-[24px] text-[16px]'}> Sign Up</p>
                    <div className={'bg-white text-black rounded-full p-1'}>
                      <ArrowRightIcon />
                    </div>
                  </CustomButton>
                </Link>

              <div className={'text-center py-5'}>
                <p className={'text-cdsecondary-100 text-[16px] font-clash'}>
                  More Features coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={'md:w-2/5 md:justify-end xl:justify-end flex items-center justify-center'}>
          <Image src={BentoCard} alt={'cash-dime-bento'} />
        </div>
      </div>
    </section>
  );
};

export default Features;
