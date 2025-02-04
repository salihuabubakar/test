'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import plus from '@/assets/images/plus.svg';
import Logo from '@/assets/images/logo.svg';
import { useRouter } from 'next/navigation';
import CustomButton from '../shared/CustomButton';
import { Bell, Menu, Search, X } from 'lucide-react';
import { useDarkMode } from '@/context/darkModeContext';
import useNotificationStore from '@/zustand/notificationSlice';

interface TopBarProps {
  title?: string;
  logo?: any;
}

const TopBar: React.FC<TopBarProps> = ({ title, logo }) => {

  const router = useRouter();
  const { 
    getReadNotificationsCount,
  } = useNotificationStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const notificationsCount = getReadNotificationsCount();

  const handleNavigate = () => {
    router.replace('/invoice')
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center dark:bg-[#09090b] bg-cdneutral-white p-4 w-full dark:text-cdneutral-white text-cdneutral-black">
      <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center md:hidden">
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} className="cursor-pointer" />
          ) : (
            <Menu onClick={() => setMenuOpen(true)} className="cursor-pointer" />
          )}
        </div>
        <Image src={Logo} alt="Cash Dime Logo" className="cursor-pointer md:hidden" />
      </div>

      <div className={`flex w-full items-center md:justify-start justify-center md:ml-[70px] gap-x-8 mt-4 md:mt-0 ${menuOpen ? 'hidden' : 'flex'}`}>
        <div className="flex md:gap-x-3 md:-ml-16">
          <Image src={logo} alt={title!} />
          <span className="font-clashBold text-[18px] md:text-[24px] ">{title}</span>
        </div>

        <CustomButton
          leftIcon={<Image src={plus} alt="plus icon" />}
          className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex py-[24px] items-center justify-between md:hidden"
          onClick={handleNavigate}
        >
          <p className="font-clashSemiBold text-[16px]">Create Invoice</p>
        </CustomButton>
      </div>

      <div
        className={`relative flex items-center justify-end bg-cdneutral-white mx-2 rounded-full w-full mt-4 md:mt-0 ${
          menuOpen ? 'hidden' : 'flex'
        }`}
      >
        <input
          placeholder="Search here"
          className="w-full h-[44px] bg-transparent dark:bg-black border border-[#CCCCCC4D] dark:text-cdneutral-white rounded-2xl pl-10 pr-4 placeholder:text-[#828F9B] focus:outline-none"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828F9B]"
          size={20}
        />
      </div>

      <div className="hidden w-full md:flex items-center justify-end space-x-4">
        <CustomButton
          leftIcon={<Image src={plus} alt="plus icon" />}
          className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 py-[24px] flex items-center justify-between"
          onClick={handleNavigate}
        >
          <p className="font-clashSemiBold text-[16px]">Create Invoice</p>
        </CustomButton>
        <div className='relative'>
          <div onClick={() => router.replace('/notification')} className='border rounded-full p-2 cursor-pointer'>
            <BellIncon />
          </div>
          {notificationsCount > 0 && (
            <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
              {notificationsCount}
            </span>
          )}
        </div>
        <div onClick={() => router.replace('/settings')} className='border rounded-full p-2 cursor-pointer'>
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

const BellIncon = () => {
  const { darkMode } = useDarkMode();
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2609_1516)">
        <path d="M20 17H22V19H2V17H4V10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10V17ZM9 21H15V23H9V21Z" 
          fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
        />
      </g>
      <defs>
        <clipPath id="clip0_2609_1516">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const UserIcon = () => {
  const { darkMode } = useDarkMode();
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2609_1518)">
        <path d="M4 22C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14C14.1217 14 16.1566 14.8429 17.6569 16.3431C19.1571 17.8434 20 19.8783 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z" 
          fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
        />
      </g>
      <defs>
        <clipPath id="clip0_2609_1518">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}