"use client";
import React, { useState } from "react";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon, Menu, X } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="flex items-center justify-between py-4 px-8 section-side-gap">
      <Link href="/">
        <Image src={Logo} alt="Cash Dime Logo" className="cursor-pointer" />
      </Link>

      <div>
        <ul className="hidden md:flex items-center gap-x-5 font-clash ">
          <li className={"border-gradient-bottom "}><Link href={"/"}>Home</Link></li>
          <li className={"border-gradient-bottom "}><Link href={"#features"}>Features</Link></li>
          <li className={"border-gradient-bottom "}><Link href={"#pricing"}>Pricing</Link></li>
          <li className={"border-gradient-bottom "}><Link href={"#footer"}>Contact Us</Link></li>
        </ul>
      </div>

      <div className="hidden md:flex items-center gap-x-3 font-clashSemiBold">
        <Link href="/sign-in">
          <CustomButton
            className={" py-7 bg-white border-gradient-rounded-full"}
          >
            <p className={"font-bold text-[16px] text-gradient bg-white"}>
              Log In
            </p>
          </CustomButton>
        </Link>
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

      <div className="border rounded-lg p-2 md:hidden cursor-pointer">
        {open ? (
          <X onClick={() => setOpen(false)} />
        ) : (
          <Menu onClick={() => setOpen(true)} />
        )}
      </div>
      {open && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center">
              <Link href="/">
                <Image src={Logo} alt="Cash Dime Logo" className="cursor-pointer" />
              </Link>
              <div className="border rounded-lg p-2 cursor-pointer">
                <X className="cursor-pointer" onClick={() => setOpen(false)} />
              </div>
            </div>
            
            <ul className="flex items-center flex-col space-y-6 mt-8">
              <li className="border-gradient-bottom">
                <Link className="hover:text-purple-900" href="/" onClick={() => setOpen(false)}>Home</Link>
              </li>
              <li className="border-gradient-bottom">
                <Link className="hover:text-purple-900" href="#features" onClick={() => setOpen(false)}>Features</Link>
              </li>
              <li className="border-gradient-bottom">
                <Link className="hover:text-purple-900" href="#pricing" onClick={() => setOpen(false)}>Pricing</Link>
              </li>
              <li className="border-gradient-bottom">
                <Link className="hover:text-purple-900" href="#footer" onClick={() => setOpen(false)}>Contact Us</Link>
              </li>
            </ul>
            
            <div className="mt-10 flex flex-col space-y-4">
              <Link href="/sign-in">
                <CustomButton
                  className={
                    'bg-tranparent border-purple-900 border text-purple-900 md:w-[260px] font-clashSemiBold w-full  py-7 space-x-3'
                  }
                >
                  <p className={'font-bold md:text-[24px] text-[16px]'}> Login</p>
                </CustomButton>
              </Link>
              <Link href="/sign-up">
                <CustomButton
                  className={
                    'bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 md:w-[260px] font-clashSemiBold w-full  py-7 space-x-3'
                  }
                >
                  <p className={'font-bold md:text-[24px] text-[16px]'}> Sign Up</p>
                  <div className={'bg-white text-black rounded-full p-1'}>
                    <ArrowRightIcon />
                  </div>
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
