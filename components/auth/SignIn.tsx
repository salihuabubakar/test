"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import background from "@/assets/images/background.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import CustomButton from "../shared/CustomButton";

const SigninPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex h-screen bg-white  font-clash flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block w-1/2 bg-cover bg-no-repeat bg-center">
        <Image src={background} alt="background" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mb-4" />
            <p className="text-2xl font-clashSemiBold text-center">
              Welcome Back!
            </p>
            <p className="text-cdneutral-darkGray text-sm text-center mb-6">
              Sign in to your account
            </p>
          </div>

          <div className="flex items-center justify-center w-full py-2 rounded-lg shadow-sm mb-6">
            <FcGoogle className="text-lg mr-2" /> Sign In with Google
          </div>

          <div className="text-center text-gray-400 mb-4">Or Sign In with</div>

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
            <div className="flex justify-between items-center">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g. 123/aB%"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center justify-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <IoEyeSharp /> : <FaRegEyeSlash />}
              </span>
            </div>
            <a
              href="/forgot-password"
              className="block text-right text-sm text-[#399320] hover:underline mt-2"
            >
              Forgot Password?
            </a>
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

          <div className="flex justify-center">
            <CustomButton
              className={
                "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full md:w-[260px] font-clashSemiBold py-4 flex items-center justify-center space-x-3"
              }
            >
              <p className="font-bold md:text-[16px] text-[16px]">Sign In</p>
            </CustomButton>
          </div>

          <p className="text-center text-cdneutral-darkGray mt-4">
            Don’t have an account?{" "}
            <a href="/signin" className="text-[#007AFF] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
