import { AuthBg, Logo } from "@/assets";
import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/zustand";

const EmailVerificationPage = () => {
  const { auth } = useAuth();
  const { user } = auth;
  return (
    <div className="flex  h-screen overflow-y-hidden">
      <div>
        <Image
          src={AuthBg}
          alt="cash-dime-auth-bg"
          className="hidden md:block"
        />
      </div>

      <div className="flex flex-col items-center justify-center mx-auto  ">
        <div className="">
          <Image src={Logo} alt="cash-dime-auth-bg" className="mx-auto" />

          <div className="text-center space-y-10 text-cdneutral-lightGray">
            <div>
              <h1 className="font-clashSemiBold text-32 text-cdneutral-black">
                Email Verification Required
              </h1>

              <p className="font-clash text-18">
                A verification email has been sent to: { user?.email }
              </p>
            </div>

            <p className="font-clash max-w-[400px] mx-auto">
              Please follow the instructions in the verification email to
              complete your account creation.
            </p>
            <p className="font-clash max-w-[500px]">
              Can’t find the email? Check your spam, junk, bulk or promotions
              folder
            </p>
            <p className="font-clash">Didn’t receive an email?</p>

            <CustomButton
              className={
                "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[370px] mx-auto  md:w-[500px]  py-7 pr-10 border "
              }
            >
              Resend Verification Mail
            </CustomButton>

            <Link
              href={"/email-verification"}
              className="block text-center font-clash text-cdneutral-black cursor-pointer -mt-5"
            >
              Proceed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
