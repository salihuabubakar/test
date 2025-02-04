"use client";

import AnimatedText from "@/components/shared/AnimatedText";
import CustomButton from "@/components/shared/CustomButton";
import { ArrowRightIcon } from "lucide-react";
import { Person1, Person3, Person2, Person4, HeroImg } from "@/assets";
import Image from "next/image";
import React from "react";
import HeaderLabel from "@/components/shared/HeaderLabel";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={" py-4 px-8 section-side-gap"}>
      <div className={"flex flex-col md:flex-row "}>
        <div className={"md:w-3/5 md:mt-28"}>
          <HeaderLabel
            text={"Accounting made easy"}
            className={"w-[200px] font-clash text-14 "}
          />

          <div>
            <div className="py-3 md:max-w-[400px]">
              <AnimatedText />
            </div>

            <div className="py-8 font-clash">
              <p className={"text-cdneutral-black md:text-24 text-16 "}>
                Get started with invoicing and Bill Management.
              </p>
              <p className={"text-cdneutral-black md:text-24 text-16"}>
                Easily create,send and track invoices
              </p>
            </div>

            <div>
              <Link href="/sign-in">
                <CustomButton
                  rightIcon={<ArrowRightIcon />}
                  rightIconClassName={"bg-white text-black rounded-full p-2"}
                  className={
                    "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[260px] flex items-center justify-between py-7 "
                  }
                >
                  <p className={"font-bold text-16"}>
                    Log In
                  </p>
                </CustomButton>
              </Link>

              <div className={"md:flex w-full items-center gap-x-3 "}>
                <div className="py-5 flex gap-x-5 items-center">
                  <div className={"flex"}>
                    <Image
                      src={Person1}
                      className={"w-5 h-5"}
                      alt="cash-dime-person1"
                    />
                    <Image
                      src={Person2}
                      className={"w-5 h-5"}
                      alt="cash-dime-person2"
                    />
                    <Image
                      src={Person3}
                      className={"w-5 h-5"}
                      alt="cash-dime-person3"
                    />
                    <Image
                      src={Person4}
                      className={"w-5 h-5"}
                      alt="cash-dime-person4"
                    />
                  </div>

                  <div>
                    <p className={"font-clash text-16"}>
                      “Billing made easy, like it”
                    </p>
                  </div>
                </div>

                <div className={"flex  gap-x-3"}>
                  <h6 className="text-gradient text-[27.53px] font-clashSemiBold">
                    20K+
                  </h6>
                  <h6 className="text-cdneutral-black text-[27.53px] font-clashSemiBold">
                    registered users
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:w-2/5 mr-[30px] md:mr-[0] md:justify-end flex items-center justify-center">
          <Image src={HeroImg} alt={"Cash-dime-hero-img"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
