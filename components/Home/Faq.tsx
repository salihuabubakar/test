"use client";

import React, { useState } from "react";
import HeaderLabel from "../shared/HeaderLabel";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Sphare13, Sphare14 } from "@/assets";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <section className=" py-20 relative">
      <Image
        src={Sphare14}
        alt={"cash-dime-gradient"}
        className={"absolute top-0 right-0 md:w-fit w-[100px]"}
      />
      <Image
        src={Sphare13}
        alt={"cash-dime-gradient"}
        className={"absolute bottom-0 left-0 md:w-fit w-[100px]"}
      />
      <div className={"flex items-center justify-center "}>
        <HeaderLabel
          text={"Ask me"}
          className={"w-[78px] text-[14px] font-clash"}
        />
      </div>

      <div className={"text-center  text-[28px] py-5 space-y-3"}>
        <h1 className="md:text-[48px] text-[28px] font-clashSemiBold">FAQs</h1>
      </div>

      <div className="max-w-3xl z-50 mx-auto relative">
        <div className="1" onClick={() => toggleFaq(1)}>
          <div className="py-8">
            <div className="flex justify-between items-center">
              <h1 className=" text-[16px] md:text-[24px] font-clashMedium text-cdneutral-black">
                Is my Information secure?
              </h1>
              {activeIndex === 1 ? <Minus /> : <Plus />}
            </div>
            {activeIndex === 1 && (
              <p className="text-cdneutral-darkGray text-[16px] md:text-[21px] font-clash mt-5">
                Yes, we prioritize the security and privacy of your information.
                We use industry standard encryption to keep your data safe?
              </p>
            )}
          </div>
          <div className={"flex-1 h-[1px] bg-[#CCCCCC4D]" + " "} />
        </div>

        <div className="2" onClick={() => toggleFaq(2)}>
          <div className="py-8">
            <div className="flex justify-between items-center">
              <h1 className=" text-[16px] md:text-[24px] font-clashMedium text-cdneutral-black">
                Is there a free trial?
              </h1>
              {activeIndex === 2 ? <Minus /> : <Plus />}
            </div>
            {activeIndex === 2 && (
              <p className="text-cdneutral-darkGray text-[16px] md:text-[21px] font-clash mt-5">
                Yes, we prioritize the security and privacy of your information.
                We use industry standard encryption to keep your data safe?
              </p>
            )}
          </div>
          <div className={"flex-1 h-[1px] bg-[#CCCCCC4D]" + " "} />
        </div>
      </div>
    </section>
  );
};

export default Faq;
