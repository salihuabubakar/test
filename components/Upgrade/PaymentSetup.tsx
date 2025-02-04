"use client";

import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import TopBar from "../Dashboard/TopBar";
import Image from "next/image";

import { price, tickMark, credit, bank, stripe } from "../../assets";
import CustomButton from "../shared/CustomButton";
import { LuUpload } from "react-icons/lu";

const PaymentSetup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen font-clash">
      <Sidebar open={isOpen} setOpen={setIsOpen} activeTitle="Upgrade" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Upgrade Plan" logo={<LuUpload size={22} />} />
        <div className="p-8">
          <p className="text-lg font-clashSemiBold">
            Choose a plan of your Choice
          </p>

          <div className="text-cdsuccess-300 p-1 mb-4 font-clash">
            <span className="flex md:flex-row gap-2 ">
              <Image src={tickMark} alt="tick" /> Subscription payment via bank
              transfer option is available
            </span>
          </div>

          <div className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 text-cdneutral-white p-10 rounded-3xl md:flex items-center justify-between mb-8 ">
            <div className="flex gap-3 font-clashMedium mb-4">
              <Image src={price} alt="price" width={60} />
              <div className="">
                <h2 className="text-md">STANDARD PLAN</h2>
                <p className="text-3xl font-clashSemiBold flex items-center">
                  $20{" "}
                  <span className="text-center text-sm font-clash">
                    / month
                  </span>
                </p>
              </div>
            </div>

            <CustomButton className="bg-transparent border border-cdneutral-white">
              <p className="font-clashSemiBold text-[16px]">Change Plan</p>
            </CustomButton>
          </div>

          <div className="md:flex items-center mb-6 font-clashMedium">
            <div className="m-5 flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cdneutral-black text-cdneutral-black">
                1
              </div>
              <span className="ml-3 text-cdneutral-black">
                Choose a Payment Method
              </span>
            </div>

            <div className="m-5 flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cdneutral-darkGray text-cdneutral-darkGray">
                2
              </div>
              <span className="ml-3 text-cdneutral-darkGray ">
                Payment details
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 font-clashMedium ">
            <div className="bg-white p-12 rounded-3xl shadow flex items-center justify-center cursor-pointer ">
              <div className="flex items-center">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image src={credit} alt="credit" />
                </div>
                <span className="ml-4 font-medium">Credit Card</span>
              </div>
            </div>

            <div className="bg-white p-12 rounded-3xl shadow flex items-center justify-center cursor-pointer">
              <div className="flex items-center">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image src={bank} alt="bank" />
                </div>
                <span className="ml-4 font-medium">Bank Transfer</span>
              </div>
            </div>

            <div className="bg-white p-12 rounded-3xl shadow flex items-center justify-center cursor-pointer">
              <div className="flex items-center">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image src={stripe} alt="stripe" />
                </div>
                <span className="ml-4 font-medium">Pay with Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSetup;
