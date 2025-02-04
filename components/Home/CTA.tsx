import React from "react";
import CustomButton from "../shared/CustomButton";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="bg-[#FCFCFC]">
      <section className="section-gap py-5 ">
        <div className="md:h-[400px] px-5  flex flex-col items-center justify-center  border-gradient-rounded shadow-md md:mx-10 py-5 mb-8">
          <div className="flex flex-col text-center items-center justify-center gap-y-4">
            <h1 className="font-clashSemiBold text-[28px] md:text-[48px]">
              Experience the power of
              <span className="text-gradient"> CashDime</span>{" "}
            </h1>
            <p className="text-[16px] md:text-[24px] font-clash md:max-w-[700px] text-center">
              Ready to simplify your accounting and boost your business
              efficiency?
            </p>
            <Link href="/sign-up">
              <CustomButton
                rightIcon={<ArrowRightIcon />}
                rightIconClassName={"bg-white text-black rounded-full p-1"}
                className={
                  "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[124px] flex items-center justify-between py-7 pr-10"
                }
              >
                <p className={"font-bold text-[16px]"}> Sign Up</p>
              </CustomButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
