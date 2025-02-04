'use client';
import { AuthBg, GoogleIcon, Logo } from '@/assets';
import SignUpForm from '@/components/auth/SignUpForm';

import Image from 'next/image';

const SignUpPage = () => {
  return (
    <div className="flex  h-screen overflow-y-hidden">
      <div>
        <Image src={AuthBg} alt="cash-dime-auth-bg" className="hidden md:block" />
      </div>
      <div className="flex flex-col items-center justify-center mx-auto  ">
        <div className="">
          <Image src={Logo} alt="cash-dime-auth-bg" className="mx-auto" />
          <div className="text-center">
            <h1 className="font-clashSemiBold text-[24px] md:text-[32px]">Good to see you</h1>
            <p className="font-clash text-cdneutral-lightGray text-16 text-18">
              Let’s get you started
            </p>
            <div className="flex items-center justify-center gap-x-3 bg-white   p-5 cursor-pointer">
              <Image src={GoogleIcon} alt="cash-dime-google-icon" />
              <p className="font-clashSemiBold  text-cdneutral-black">Sign In with Google</p>
            </div>
            <div className={'flex flex-row justify-center items-center mt-4 gap-x-3'}>
              <div className={'flex-1 w-[220px] md:w-[0px] h-[1px] bg-[#CCCCCC4D]'} />
              <h5 className="text-lg font-clash text-14 text-cdneutral-lightGray">
                Or Sign In With
              </h5>
              <div className={'flex-1 md:w-[350px] h-[1px] bg-[#CCCCCC4D]'} />
            </div>
          </div>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
