'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import TopBar from '@/components/Dashboard/TopBar';
import Image from 'next/image';
import { tickMark, upgradeIcon } from '@/assets';
import { PriceImg } from '@/assets';
import { useRouter } from 'next/navigation';
import { Check, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomButton from '@/components/shared/CustomButton';
import PaymentModal from '../components/modal/payment-modal';

const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: (
      <svg
        width="43"
        height="42"
        viewBox="0 0 43 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2700_3553)">
          <path
            d="M6.08337 5.25H37.5834C38.0475 5.25 38.4926 5.43437 38.8208 5.76256C39.149 6.09075 39.3334 6.53587 39.3334 7V35C39.3334 35.4641 39.149 35.9093 38.8208 36.2374C38.4926 36.5656 38.0475 36.75 37.5834 36.75H6.08337C5.61925 36.75 5.17413 36.5656 4.84594 36.2374C4.51775 35.9093 4.33337 35.4641 4.33337 35V7C4.33337 6.53587 4.51775 6.09075 4.84594 5.76256C5.17413 5.43437 5.61925 5.25 6.08337 5.25ZM35.8334 21H7.83337V33.25H35.8334V21ZM35.8334 14V8.75H7.83337V14H35.8334Z"
            fill="#500C6A"
          />
        </g>
        <defs>
          <clipPath id="clip0_2700_3553">
            <rect width="42" height="42" fill="white" transform="translate(0.833374)" />
          </clipPath>
        </defs>
      </svg>
    ) as any,
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: (
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 35H38.5V38.5H3.5V35ZM7 21H10.5V33.25H7V21ZM15.75 21H19.25V33.25H15.75V21ZM22.75 21H26.25V33.25H22.75V21ZM31.5 21H35V33.25H31.5V21ZM3.5 12.25L21 3.5L38.5 12.25V19.25H3.5V12.25ZM7 14.413V15.75H35V14.413L21 7.413L7 14.413ZM21 14C20.5359 14 20.0908 13.8156 19.7626 13.4874C19.4344 13.1592 19.25 12.7141 19.25 12.25C19.25 11.7859 19.4344 11.3408 19.7626 11.0126C20.0908 10.6844 20.5359 10.5 21 10.5C21.4641 10.5 21.9092 10.6844 22.2374 11.0126C22.5656 11.3408 22.75 11.7859 22.75 12.25C22.75 12.7141 22.5656 13.1592 22.2374 13.4874C21.9092 13.8156 21.4641 14 21 14Z"
          fill="#500C6A"
        />
      </svg>
    ) as any,
  },
  {
    id: 'stripe',
    name: 'Pay with Stripe',
    icon: (
      <svg
        width="45"
        height="44"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2700_3567)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M95.7673 11.6469L95.352 9.6751H89.5825V33.0556H96.2485V17.1881C97.8256 15.1256 100.486 15.5271 101.333 15.7897V9.67785C100.445 9.35885 97.3279 8.7731 95.7673 11.6441V11.6469ZM82.3885 3.8836L75.8765 5.26685L75.849 26.6646C75.849 30.6109 78.8162 33.53 82.7762 33.53C84.9556 33.53 86.5657 33.1147 87.4581 32.6459V27.2146C86.6029 27.5556 82.394 28.7794 82.394 24.8496V15.3621H87.4581V9.67373H82.394L82.3885 3.8836ZM64.3292 16.4594C64.3292 15.4171 65.1955 15.0156 66.5952 15.0156C68.9123 15.0658 71.186 15.6542 73.2365 16.7344V10.4506C71.1222 9.61927 68.867 9.20465 66.5952 9.2296C61.1997 9.2296 57.5794 12.0566 57.5794 16.7756C57.5794 24.1594 67.72 22.9604 67.72 26.1435C67.72 27.3892 66.6475 27.7742 65.1584 27.7742C62.9501 27.7742 60.0984 26.8612 57.8612 25.643V32.0092C60.1642 33.0109 62.647 33.5335 65.1584 33.5451C70.7037 33.5451 74.5262 30.8061 74.5262 26.0032C74.5262 18.0337 64.3279 19.4582 64.3279 16.4566L64.3292 16.4594ZM19.7517 13.0837C19.7517 11.2 21.3192 10.4712 23.852 10.4712C28.0438 10.5618 32.1571 11.6261 35.8667 13.5801V2.20885C32.0415 0.705582 27.9617 -0.0437989 23.852 0.00197746C14.0895 0.00197746 7.54175 5.1156 7.54175 13.6544C7.54175 27.0139 25.887 24.8441 25.887 30.6026C25.887 32.8549 23.962 33.5534 21.2532 33.5534C17.2589 33.5534 12.0999 31.9006 8.05325 29.7006V41.2204C12.2195 43.0331 16.7111 43.9791 21.2546 44.0006C31.288 44.0006 38.2042 39.0437 38.2042 30.3565C38.2042 15.9382 19.7517 18.5136 19.7517 13.0865V13.0837Z"
            fill="#500C6A"
          />
        </g>
        <defs>
          <clipPath id="clip0_2700_3567">
            <rect width="44" height="44" fill="white" transform="translate(0.666748)" />
          </clipPath>
        </defs>
      </svg>
    ) as any,
  },
];

const page = () => {
  const params = useParams();
  const router = useRouter();

  const [step, setStep] = useState<'method' | 'details'>('method');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div>
      <TopBar title="Upgrade Plan" logo={upgradeIcon} />
      <div className="flex flex-col dark:text-cdneutral-white h-screen text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] bg-[#FAFAFA]">
        <p className="text-lg font-clashSemiBold px-8 py-2">Choose a plan of your Choice</p>
        <div className="text-cdsuccess-300 px-8 p-3 mb-4 font-clash">
          <span className="flex flex-row items-center gap-2">
            <Image src={tickMark} alt="tick" /> Subscription payment via bank transfer option is
            available
          </span>
        </div>

        <div className="bg-gradient-to-r from-[#AA3CDD] to-[#500C6A] p-12 mx-8 rounded-3xl flex flex-col md:flex-row md:items-center items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={'bg-purple-200 w-[60px] rounded-full p-3'}>
              <Image src={PriceImg} alt={'cash-dime-pricing-icon'} />
            </div>
            <div>
              <h1 className={'font-semibold font-clash text-white'}>
                <span className="text-transform: uppercase">{params.plan}</span> PLAN
              </h1>
              <p className="text-4xl font-bold text-white flex ">
                <span className={'font-clashSemiBold'}>
                  {' '}
                  ${params.plan === 'basic' ? '10' : params.plan === 'standard' ? '20' : '30'}
                </span>
                <span className="text-[20px] font-normal mt-0.5 block font-clash">/month</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/upgrade`)}
            className="px-4 py-2 md:mt-0 mt-5 rounded-full border border-white text-white hover:bg-white hover:text-[#AA3CDD] transition-colors"
          >
            Change Plan
          </button>
        </div>

        <div className="flex items-center gap-4 m-8">
          <div
            className={`flex items-center gap-2 cursor-pointer`}
            onClick={() => setStep('method')}
          >
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
                step === 'method'
                  ? 'bg-transparent dark:text-white text-black border-2 dark:border-white border-black'
                  : 'bg-[#399320] border-2 border-[#399320] text-gray-500'
              }`}
            >
              {step === 'method' ? 1 : <Check className="h-5 w-5 text-white" />}
            </div>
            <span className={step === 'method' ? 'dark:text-white text-black' : 'text-gray-500'}>
              Choose a Payment Method
            </span>
          </div>

          <div className={`flex items-center ml-4 gap-2`}>
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                step === 'details'
                  ? 'bg-transparent dark:text-white text-black border-2 dark:border-white border-black'
                  : 'border-2 border-gray-500 text-gray-500'
              }`}
            >
              2
            </div>
            <span className={step === 'method' ? 'text-gray-500' : 'text-black dark:text-white'}>
              Payment details
            </span>
          </div>
        </div>

        {step === 'method' ? (
          <div className="grid md:grid-cols-3 gap-4 mx-2 dark:bg-[#09090b]">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b] p-12 mx-8 shadow-md rounded-3xl flex items-center justify-center cursor-pointer transition-all border hover:border-purple-600 ${
                  selectedMethod === method.id ? 'border border-purple-600 bg-purple-50' : ''
                }`}
                onClick={() => {
                  setSelectedMethod(method.id);
                  if (method.id === 'credit-card') setStep('details');
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`dark:bg-[#09090b] bg-cdaccent-200 w-[60px] flex items-center justify-center rounded-full p-3`}
                  >
                    {method.icon}
                  </div>
                  <p className="font-medium dark:text-cdneutral-white text-cdneutral-black">
                    {method.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 m-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  disabled={!selectedMethod}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Card Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" disabled={!selectedMethod} />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV (3 digits on card)</Label>
                  <Input id="cvv" placeholder="000" disabled={!selectedMethod} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" disabled={!selectedMethod} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    disabled={!selectedMethod}
                  />
                </div>
              </div>
            </div>
            <CustomButton
              type="submit"
              disabled={!selectedMethod}
              onClick={(e) => {
                e.preventDefault();
                setShowPaymentModal(true);
              }}
              className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center ml-auto px-10 py-3"
            >
              Pay ${params.plan === 'basic' ? '10' : params.plan === 'standard' ? '20' : '30'}
            </CustomButton>
          </form>
        )}
        <PaymentModal
          isOpen={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          planName={params.plan as string}
        />
      </div>
    </div>
  );
};

export default page;
