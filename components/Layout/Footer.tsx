"use client";
import { CashDimeLogoWhite, Instagram, Twitter } from "@/assets";

import Image from "next/image";
import React from "react";
import RHFInput from "@/components/shared/hook-form/RHFInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextArea from "../shared/hook-form/RHFTextArea";
import CustomButton from "../shared/CustomButton";
import Link from "next/link";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

type FormSchema = z.infer<typeof formSchema>;

const Footer = () => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };
  return (
    <footer id="footer" className="bg-cdprimary-100 py-5 text-white ">
      <section className="section-gap">
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="flex flex-col items-center justify-center md:justify-start md:items-start ">
            <Image src={CashDimeLogoWhite} alt="cash-dime-logo" />
            <p className="text-cdneutral-white font-clash max-w-[300px]  text-center md:text-left text-[16px]">
              Dime by dime, master your finance to make informed financial
              decisions and optimise your cash flow
            </p>
          </div>

          <div className="flex items-center justify-center flex-col mt-5 md:justify-start md:items-start md:mt-2">
            <h1 className="font-clashSemiBold text-cdneutral-white mb-5">
              Follow Us
            </h1>

            <div className="flex space-x-1">
              <Image src={Instagram} alt="cash-dime-instagram" />
              <Image src={Twitter} alt="cash-dime-instagram" />
            </div>
          </div>

          <div className="flex items-center justify-center flex-col mt-5 md:justify-start md:items-start md:mt-2">
            <h1 className="font-clashSemiBold text-cdneutral-white mb-3">
              Company
            </h1>

            <ul className="space-y-5 ">
              <li className={"font-clash"}><Link href={"/"}>Home</Link></li>
              <li className={"font-clash"}><Link href={"#features"}>Features</Link></li>
              <li className={"font-clash"}><Link href={"#pricing"}>Pricing</Link></li>
            </ul>
          </div>

          <div className="flex items-center justify-center flex-col mt-5 md:justify-start md:items-start md:mt-2">
            <h1 className="font-clashSemiBold text-cdneutral-white mb-3">
              Get in touch
            </h1>

            <FormProvider {...methods}>
              <form
                className="space-y-5 font-clash  md:px-0"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <RHFInput
                  name="fullName"
                  placeholder="Full Name"
                  error={errors.fullName}
                  register={register}
                  className="w-[330px] mx-auto md:w-[380px] h-[44px] rounded-2xl mb-3"
                  inputClassName="py-5 placeholder:text-white"
                />
                <RHFInput
                  name="email"
                  placeholder="Email"
                  error={errors.email}
                  register={register}
                  className="w-[330px] mx-auto  md:w-[380px] h-[44px] rounded-2xl mb-3"
                  inputClassName="py-5 placeholder:text-white border border-cdsecondary"
                />
                <RHFTextArea
                  name="message"
                  placeholder="Write a description..."
                  error={errors.message}
                  textAreaClassName="bg-transparent w-[330px] mx-auto  md:w-[380px] h-[104px] pl-2 placeholder:text-white"
                  register={register}
                  className="mb-3"
                />

                <CustomButton
                  type="submit"
                  className={
                    "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[330px] mx-auto  md:w-[380px] flex items-center justify-center py-7 pr-10 border "
                  }
                >
                  <p className={"font-clashSemiBold text-center text-[16px]"}>
                    {" "}
                    Submit
                  </p>
                </CustomButton>
              </form>
            </FormProvider>
          </div>
        </div>

        <div>
          <div className="py-8">
            <div className={"flex-1 h-[1px] bg-[#CCCCCC4D]" + " "} />
          </div>

          <p className="font-clash text-center text-[14px] text-cdneutral-white">
            Copyright 2024 CashDime, All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
