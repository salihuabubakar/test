"use client";

import { AuthBg, Logo } from "@/assets";
import CustomButton from "@/components/shared/CustomButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useError, useSuccess } from "@/hooks";
import { emailVerificationSchema, EmailVerificationSchema } from "@/schema";
import { useAuth } from "@/zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { auth, confirmEmail } = useAuth();
  const { loading, error, clearError, message, clearMessage } = auth;
  const router = useRouter();
  const form = useForm<EmailVerificationSchema>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  useError(error, clearError);
  useSuccess(message, clearMessage);

  useEffect(() => {
    if (message) {
      router.push("/success-message");
    }
  }, [message, router]);

  function onSubmit(data: EmailVerificationSchema) {
    confirmEmail(data);
  }
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

          <div className="text-center space-y-5 text-cdneutral-lightGray">
            <div>
              <h1 className="font-clashSemiBold text-32 text-cdneutral-black">
                Verify Email
              </h1>
            </div>

            <p className="font-clash max-w-[400px] mx-auto">
              Please enter below the 6 digit code sent to your email address
            </p>
          </div>
        </div>

        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-10 ">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup className="flex gap-2 md:gap-4 items-center justify-center mx-auto">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <>
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="w-12 h-12 md:w-14 md:h-14 text-center bg-cdneutral-lightGray2 text-2xl rounded-lg border-none shadow-none "
                              />
                            </>
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <CustomButton
                type="submit"
                className={
                  "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[370px] mx-auto mt-10  md:w-[500px]  py-6 pr-10 border "
                }
                loading={loading}
                disabled={loading}
              >
                Verify
              </CustomButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
