"use client";
import React from "react";
import TopBar from "../Dashboard/TopBar";
import { tickMark } from "../../assets";
import Image from "next/image";
import Pricing from "../Home/Pricing";
import { upgradeIcon } from "../../assets";

const UpgradePlan = () => {
  return (
    <div>
      <TopBar title="Upgrade Plan" logo={upgradeIcon} />
      <div className="p-8 flex flex-col space-y-8">
        <p className="text-lg font-clashSemiBold">
          Choose a plan of your Choice
        </p>
        <div className="text-cdsuccess-300 p-3 mb-4 font-clash">
          <span className="flex flex-row items-center gap-2">
            <Image src={tickMark} alt="tick" /> Subscription payment via bank
            transfer option is available
          </span>
        </div>
        <div className="flex justify-center">
          <Pricing />
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
