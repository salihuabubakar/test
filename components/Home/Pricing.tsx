import HeaderLabel from "@/components/shared/HeaderLabel";
import React from "react";
import { Ellipse14, Ellipse15, PriceImg, Tick } from "@/assets";
import Image from "next/image";
import CustomButton from "@/components/shared/CustomButton";
import { ArrowRightIcon } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className={"relative "}>
      <Image
        src={Ellipse14}
        alt={"cash-dime-gradient"}
        className={"absolute top-0"}
      />
      <Image
        src={Ellipse15}
        alt={"cash-dime-gradient"}
        className={"absolute bottom-0 right-0"}
      />
      <div className={"py-20  px-8 section-side-gap"}>
        <div className={"flex items-center justify-center "}>
          <HeaderLabel
            text={"Plans to fit your need"}
            className={"w-[178px] font-clash text-[14px]"}
          />
        </div>

        <div className={"text-center text-[28px] py-5 space-y-3"}>
          <h1 className="text-[28px] md:text-[48px] font-clashSemiBold">
            Pricing Plans
          </h1>
          <p
            className={
              "text-[16px] md:text-[24px] text-cdneutral-black font-clash"
            }
          >
            Join 20,000+ users growing and optimizing their businesses
          </p>
        </div>

        <div
          className={
            "flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 items-center justify-center "
          }
        >
          <div
            className={
              " md:w-[400px] bg-white shadow-md rounded-[24px] p-[24px] z-20 "
            }
          >
            <div className={"bg-cdaccent-200 w-[60px] rounded-full p-3"}>
              <Image src={PriceImg} alt={"cash-dime-pricing-icon"} />
            </div>

            <div className={"py-5 space-y-5"}>
              <h1 className={"font-semibold font-clash md:text-[24px]"}>
                BASIC PLAN
              </h1>
              <p className="text-4xl font-bold text-gray-900 flex ">
                <span className={"font-clashSemiBold"}>$10</span>
                <span className="text-[20px] font-normal mt-0.5 block font-clash">
                  /month
                </span>
              </p>
            </div>

            <div className={""}>
              <ul className="mt-4 space-y-3 font-clash">
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className="inline-block text-[16px] md:text-[20px]">
                    Add Unlimited clients
                  </p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block text-[16px] md:text-[20px]"}>
                    {" "}
                    Unlimited invoices
                  </p>
                </li>

                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block text-[16px] md:text-[20px]"}>
                    {" "}
                    Estimate & Receipts
                  </p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block text-[16px] md:text-[20px]"}>
                    Financial reporting (Dashboard)
                  </p>
                </li>
              </ul>
            </div>

            <div className="py-8">
              <div className={"flex-1 h-[1px] bg-[#CCCCCC4D]" + " "} />
            </div>

            <CustomButton
              rightIcon={<ArrowRightIcon />}
              rightIconClassName={"bg-gradient text- rounded-full p-1.5"}
              className={" py-7 bg-white border-gradient-rounded-full w-full"}
            >
              <p className={"font-bold text-[16px] text-gradient bg-white"}>
                Buy Basic Plan
              </p>
            </CustomButton>
          </div>
          <div
            className={
              " md:w-[400px] bg-white border-gradient-rounded-full shadow-xl rounded-[24px] p-[24px] z-20"
            }
          >
            <div className="flex items-center justify-between">
              <div className={"bg-cdaccent-200 w-[60px] rounded-full p-3"}>
                <Image src={PriceImg} alt={"cash-dime-pricing-icon"} />
              </div>

              <div
                className={
                  "border border-cdsuccess-200 px-2 bg-cdsuccess-100/20 p-2 rounded-full font-clash "
                }
              >
                <h5 className={"text-cdsuccess-300"}>Most popular </h5>
              </div>
            </div>

            <div className={"py-5 space-y-5"}>
              <h1 className={"font-semibold font-clash"}>STANDARD PLAN</h1>
              <p className="text-4xl font-bold text-gray-900 flex ">
                <span className={"font-clashSemiBold"}>$20</span>
                <span className="text-[20px] font-normal mt-0.5 block font-clash">
                  /month
                </span>
              </p>
            </div>

            <div className={""}>
              <ul className="mt-4 space-y-3 font-clash">
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className="inline-block">Add Unlimited clients</p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}> Unlimited invoices</p>
                </li>

                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}> Estimate & Receipts</p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}>
                    Financial reporting (Dashboard)
                  </p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}> Multiple currencies</p>
                </li>
              </ul>
            </div>

            <div className="py-8">
              <div className={"flex-1 h-[1px] bg-[#CCCCCC4D]" + " "} />
            </div>

            <CustomButton
              rightIcon={<ArrowRightIcon />}
              rightIconClassName={"bg-white text-black rounded-full p-1"}
              className={
                "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full flex items-center py-7 px-3 pr-10"
              }
            >
              <p className={"font-bold text-[16px]"}>Buy standard plan</p>
            </CustomButton>
          </div>
          <div
            className={
              " md:w-[400px] bg-white shadow-md rounded-[24px] p-[24px] z-20"
            }
          >
            <div className={"bg-cdaccent-200 w-[60px] rounded-full p-3"}>
              <Image src={PriceImg} alt={"cash-dime-pricing-icon"} />
            </div>

            <div className={"py-5 space-y-5"}>
              <h1 className={"font-semibold font-clash"}>PROFESSIONAL PLAN</h1>
              <p className="text-4xl font-bold text-gray-900 flex ">
                <span className={"font-clashSemiBold"}>$30</span>
                <span className="text-[20px] font-normal mt-0.5 block font-clash">
                  /month
                </span>
              </p>
            </div>

            <div className={""}>
              <ul className="mt-4 space-y-3 font-clash">
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className="inline-block">Add Unlimited clients</p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}> Unlimited invoices</p>
                </li>

                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}> Estimate & Receipts</p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}>
                    Financial reporting (Dashboard)
                  </p>
                </li>

                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}>Multiple currencies</p>
                </li>
                <li className="flex items-center text-gray-700 space-x-2">
                  <Image
                    src={Tick}
                    alt={"cash-dime-tick"}
                    className={"inline-block"}
                  />
                  <p className={"inline-block"}>Multiple business</p>
                </li>
              </ul>
            </div>

            <div className="py-8">
              <div className={"flex-1 h-[1px] bg-[#CCCCCC4D]" + " "} />
            </div>

            <CustomButton
              rightIcon={<ArrowRightIcon />}
              rightIconClassName={"bg-gradient text- rounded-full p-1.5"}
              className={" py-7 bg-white border-gradient-rounded-full w-full"}
            >
              <p className={"font-bold text-[16px] text-gradient bg-white"}>
                Buy professional plan
              </p>
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
