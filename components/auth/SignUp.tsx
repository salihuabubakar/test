"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import background from "@/assets/images/background.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import CustomButton from "../shared/CustomButton";

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex h-screen bg-white font-clash overflow-hidden">
      <div className="hidden md:block w-1/2 bg-cover bg-no-repeat bg-center">
        <Image
          src={background}
          alt="background"
          className="object-cover h-full"
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 justify-center items-center px-6 md:px-10">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mb-4" />
            <p className="text-2xl font-clashSemiBold text-center">
              Good to see you
            </p>
            <p className="text-cdneutral-darkGray text-center mb-6">
              Let’s get you started
            </p>
          </div>

          <div className="flex items-center justify-center w-full py-2 rounded-lg">
            <FcGoogle className="text-lg mr-2" /> Sign Up with Google
          </div>

          <div className="text-center text-gray-400 my-4">Or Sign Up with</div>

          <div className="mb-4">
            <label className="block text-cdneutral-darkGray" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
              placeholder="e.g. Frank"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-cdneutral-darkGray" htmlFor="password">
              Password
            </label>

            <div className="flex items-center">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none pr-10"
                placeholder="e.g. 123/aB%"
              />
              <span
                className="absolute right-3 top-1/2 transform cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <IoEyeSharp className="text-xl text-gray-600" />
                ) : (
                  <FaRegEyeSlash className="text-xl text-gray-600" />
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-xs mb-4 font-clash">
            <div className="flex flex-row justify-start space-x-2">
              <span className="bg-[#CCCCCC4D] rounded-2xl px-2 py-1 text-gray-600">
                1 Lowercase
              </span>
              <span className="bg-[#CCCCCC4D] rounded-2xl px-2 py-1 text-gray-600">
                1 Uppercase
              </span>
            </div>
            <div className="flex flex-row justify-start space-x-2">
              <span className="bg-[#CCCCCC4D] rounded-2xl px-2 py-1 text-gray-600">
                1 Digit
              </span>
              <span className="bg-[#CCCCCC4D] rounded-2xl px-2 py-1 text-gray-600">
                8 Characters
              </span>
            </div>
            <div className="flex flex-row justify-start">
              <span className="bg-[#CCCCCC4D] rounded-2xl px-2 py-1 text-gray-600">
                1 Special Character
              </span>
            </div>
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-cdneutral-darkGray"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <input
                id="confirmPassword"
                type={passwordVisible ? "text" : "password"}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none pr-10"
                placeholder="********"
              />
              <span
                className="absolute right-3 top-1/2 transform cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <IoEyeSharp className="text-xl text-gray-600" />
                ) : (
                  <FaRegEyeSlash className="text-xl text-gray-600" />
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <CustomButton
              className={
                "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full md:w-[260px] font-clashSemiBold py-4 flex items-center justify-center space-x-3"
              }
            >
              <p className="font-bold md:text-[16px] text-[16px]">Sign Up</p>
            </CustomButton>
          </div>

          <p className="text-center text-cdneutral-darkGray mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-[#007AFF] hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
