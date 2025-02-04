'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import { LogOut, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { gradientColor } from '@/lib';
import { useDarkMode } from '@/context/darkModeContext';

interface SidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  activeTitle?: string;
}

interface SidebarItem {
  title: string
  icon: React.ReactNode
  href?: string
  subItems?: Array<{
    title: string
    href: string
  }>
}

interface IconProps {
  pathname: string;
  settingsExpanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen, activeTitle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [settingsExpanded, setSettingsExpanded] = useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      title: "Overview",
      icon: <OverView pathname={pathname} />,
      href: "/overview",
    },
    {
      title: "Invoice",
      icon: <Invoice pathname={pathname} />,
      href: "/invoice",
    },
    {
      title: "Notifications",
      icon: <Notification pathname={pathname} />,
      href: "/notification",
    },
    {
      title: "Settings",
      icon: <Settings pathname={pathname} settingsExpanded={settingsExpanded} />,
      subItems: [
        {
          title: "Profile",
          href: "/settings/profile",
        },
        {
          title: "Billing",
          href: "/settings/billing",
        },
        {
          title: "Team",
          href: "/settings/team",
        },
        {
          title: "Preference",
          href: "/settings/preference",
        },
      ],
    },
  ]

  const handleLogOut = () => {
    router.replace('/sign-in');
  };

  const toggleSettings = (e: React.MouseEvent) => {
    e.preventDefault()
    setSettingsExpanded(!settingsExpanded)
  }

  return (
    <div className="relative z-50 mr-2">
      <div className="border rounded-lg p-2 md:hidden fixed top-4 left-4 z-50 dark:bg-[#09090b] bg-cdneutral-white">
        {open ? (
          <X onClick={() => setOpen && setOpen(false)} className="cursor-pointer dark:bg-white" />
        ) : (
          <Menu onClick={() => setOpen && setOpen(true)} className="cursor-pointer dark:bg-white" />
        )}
      </div>

      <div
        className={`fixed top-0 left-0 h-screen dark:bg-[#09090b] bg-cdneutral-white shadow-lg p-6 font-clashSemiBold w-64 transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <div className="hidden md:flex items-center py-4 px-8">
          <Image src={Logo} alt="Logo" width={120} height={50} className="cursor-pointer" />
        </div>

        <nav className="flex flex-col space-y-9 px-4 pt-9 w-full">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.title === "Settings" ? (
                <div>
                  <a
                    href={item.href ?? ''}
                    onClick={toggleSettings}
                    className={`flex items-center justify-between relative ${
                      settingsExpanded
                        ? "text-purple-900"
                        : "text-cdneutral-black dark:text-cdneutral-white dark:font-clashLight"
                    } hover:text-purple-900 dark:hover:text-purple-900`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {settingsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </a>
                  {settingsExpanded && (
                    <div className="ml-8 mt-2 space-y-2">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={`flex items-center relative ${
                            pathname.includes(subItem.href)
                              ? 'text-purple-900'
                              : 'text-cdneutral-black dark:text-cdneutral-white dark:font-clashLight'
                          } hover:text-purple-900 dark:hover:text-purple-900`}
                        >
                          {/* {item.icon} */}
                          <span className="ml-3">{subItem.title}</span>
                          {pathname.includes(subItem.href ?? '') && (
                            <div
                              className='bg-purple-900'
                              style={{width: "2px", height: "40px",  position: "absolute", right: "-40px"}}
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    key={item.title}
                    href={item.href ?? ''}
                    className={`flex items-center relative ${
                      pathname.includes(item.href ?? '')
                        ? 'text-purple-900'
                        : 'text-cdneutral-black dark:text-cdneutral-white dark:font-clashLight'
                    } hover:text-purple-900 dark:hover:text-purple-900`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                    {pathname.includes(item.href ?? '') && (
                      <div
                        className='bg-purple-900'
                        style={{width: "2px", height: "40px",  position: "absolute", right: "-40px"}}
                      />
                    )}
                  </Link>
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-80 md:mt-76 px-4">
          <div className="mb-6">
            <Link
              href="/upgrade"
              className={`flex items-center dark:hover:text-purple-900 hover:text-purple-900 relative ${
                pathname.includes('/upgrade')
                  ? 'text-purple-900'
                  : 'text-cdneutral-black dark:text-cdneutral-white dark:font-clashLight'
              }`}
            >
              <Upgrade pathname={pathname} />
              <span className="ml-3">Upgrade</span>
              {pathname.includes('/upgrade') && (
                <div
                  className='bg-purple-900'
                  style={{width: "2px", height: "40px",  position: "absolute", right: "-40px"}}
                />
              )}
            </Link>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center text-[#FF5555] hover:text-red-700"
          >
            <LogOut className="mr-3" size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const Invoice: React.FC<IconProps> = ({ pathname }) => {
  const { darkMode } = useDarkMode();
  const isActive = pathname.includes('/invoice');
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isActive ? (
        <>
          <g clip-path="url(#clip0_3364_2271)">
            <path
              d="M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM8 9V11H16V9H8ZM8 13V15H16V13H8Z"
              fill="url(#paint0_linear_3364_2271)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_3364_2271"
              x1="3.31469"
              y1="13.3636"
              x2="20.9768"
              y2="14.4301"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#AA3CDD" />
              <stop offset="1" stop-color="#500C6A" />
            </linearGradient>
            <clipPath id="clip0_3364_2271">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      ) : (
        <>
          <g clipPath="url(#clip0_3364_2438)">
            <path
              d="M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM19 20V4H5V20H19ZM8 9H16V11H8V9ZM8 13H16V15H8V13Z"
              fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
            />
          </g>
          <defs>
            <clipPath id="clip0_3364_2438">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </svg>
  );
};

const Settings: React.FC<IconProps> = ({ pathname, settingsExpanded }) => {
  const { darkMode } = useDarkMode();
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {settingsExpanded ? (
        <>
          <g clip-path="url(#clip0_3364_3635)">
            <path
              d="M5.33405 4.54409C6.36078 3.62437 7.56673 2.92709 8.87605 2.49609C9.25043 2.96512 9.72571 3.34372 10.2666 3.60376C10.8074 3.8638 11.3999 3.99858 12 3.99809C12.6002 3.99858 13.1927 3.8638 13.7335 3.60376C14.2744 3.34372 14.7497 2.96512 15.124 2.49609C16.4334 2.92709 17.6393 3.62437 18.666 4.54409C18.4476 5.10254 18.3577 5.70303 18.403 6.30098C18.4484 6.89894 18.6278 7.47899 18.928 7.99809C19.2276 8.51818 19.6406 8.96404 20.1363 9.30252C20.632 9.64099 21.1976 9.86336 21.791 9.95309C22.0716 11.302 22.0716 12.6942 21.791 14.0431C20.6311 14.2211 19.561 14.9031 18.928 15.9981C18.6277 16.5173 18.4481 17.0976 18.4028 17.6957C18.3574 18.2938 18.4474 18.8945 18.666 19.4531C17.6392 20.3725 16.4333 21.0694 15.124 21.5001C14.7496 21.0313 14.2742 20.6528 13.7334 20.393C13.1925 20.1331 12.6001 19.9985 12 19.9991C11.3999 19.9986 10.8074 20.1334 10.2666 20.3934C9.72571 20.6535 9.25043 21.0321 8.87605 21.5011C7.56682 21.0704 6.36087 20.3735 5.33405 19.4541C5.5527 18.8955 5.64269 18.2948 5.59733 17.6967C5.55197 17.0986 5.37243 16.5183 5.07205 15.9991C4.77234 15.4792 4.3593 15.0335 3.86363 14.6952C3.36797 14.3569 2.80242 14.1347 2.20905 14.0451C1.92836 12.6959 1.92836 11.3033 2.20905 9.95409C2.80251 9.86436 3.36811 9.64198 3.86379 9.30351C4.35946 8.96504 4.77245 8.51919 5.07205 7.99909C5.37228 7.47999 5.55173 6.89994 5.59709 6.30198C5.64245 5.70403 5.55254 5.10354 5.33405 4.54509V4.54409ZM13.5 14.5961C13.844 14.4005 14.1458 14.1389 14.3883 13.8262C14.6307 13.5135 14.8088 13.156 14.9125 12.7742C15.0161 12.3924 15.0433 11.9938 14.9923 11.6015C14.9413 11.2091 14.8132 10.8307 14.6153 10.4881C14.4175 10.1455 14.1539 9.84536 13.8396 9.60504C13.5253 9.36471 13.1666 9.18892 12.7841 9.0878C12.4016 8.98667 12.0029 8.9622 11.6109 9.0158C11.2189 9.0694 10.8414 9.2 10.5 9.40009C9.81663 9.80075 9.31942 10.4555 9.11694 11.2213C8.91445 11.9872 9.02312 12.8021 9.41923 13.4882C9.81533 14.1742 10.4667 14.6758 11.2313 14.8833C11.9958 15.0909 12.8114 14.9876 13.5 14.5961Z"
              fill="url(#paint0_linear_3364_3635)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_3364_3635"
              x1="2.34824"
              y1="13.2944"
              x2="21.9495"
              y2="14.6785"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#AA3CDD" />
              <stop offset="1" stop-color="#500C6A" />
            </linearGradient>
            <clipPath id="clip0_3364_3635">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      ) : (
        <>
          <g clip-path="url(#clip0_2842_3541)">
            <path
              d="M2 11.9993C2 11.1343 2.11 10.2963 2.316 9.49533C2.86847 9.52437 3.4182 9.40008 3.90444 9.1362C4.39068 8.87231 4.79448 8.47912 5.07121 8.00007C5.34793 7.52103 5.48681 6.97479 5.47247 6.42175C5.45814 5.86871 5.29117 5.3304 4.99 4.86633C6.19894 3.6769 7.69079 2.81482 9.325 2.36133C9.57599 2.8548 9.95864 3.2692 10.4306 3.55864C10.9025 3.84808 11.4454 4.00128 11.999 4.00128C12.5526 4.00128 13.0955 3.84808 13.5674 3.55864C14.0394 3.2692 14.422 2.8548 14.673 2.36133C16.3072 2.81482 17.7991 3.6769 19.008 4.86633C18.7065 5.33048 18.5393 5.869 18.5248 6.42229C18.5104 6.97559 18.6493 7.52209 18.9262 8.00134C19.2031 8.48059 19.6071 8.87389 20.0937 9.13774C20.5802 9.40159 21.1303 9.5257 21.683 9.49633C21.889 10.2963 21.999 11.1343 21.999 11.9993C21.999 12.8643 21.889 13.7023 21.683 14.5033C21.1305 14.4741 20.5806 14.5982 20.0942 14.862C19.6078 15.1258 19.2039 15.519 18.927 15.9981C18.6502 16.4772 18.5112 17.0235 18.5255 17.5766C18.5398 18.1298 18.7068 18.6682 19.008 19.1323C17.7991 20.3218 16.3072 21.1838 14.673 21.6373C14.422 21.1439 14.0394 20.7295 13.5674 20.44C13.0955 20.1506 12.5526 19.9974 11.999 19.9974C11.4454 19.9974 10.9025 20.1506 10.4306 20.44C9.95864 20.7295 9.57599 21.1439 9.325 21.6373C7.69079 21.1838 6.19894 20.3218 4.99 19.1323C5.29151 18.6682 5.45873 18.1297 5.47317 17.5764C5.48761 17.0231 5.3487 16.4766 5.07181 15.9973C4.79492 15.5181 4.39085 15.1248 3.90431 14.8609C3.41776 14.5971 2.8677 14.473 2.315 14.5023C2.11 13.7033 2 12.8653 2 11.9993ZM6.804 14.9993C7.434 16.0903 7.614 17.3453 7.368 18.5233C7.776 18.8133 8.21 19.0643 8.665 19.2733C9.58167 18.4522 10.7693 17.9985 12 17.9993C13.26 17.9993 14.438 18.4703 15.335 19.2733C15.79 19.0643 16.224 18.8133 16.632 18.5233C16.3794 17.3193 16.5803 16.0644 17.196 14.9993C17.8106 13.9337 18.797 13.1325 19.966 12.7493C20.0122 12.2504 20.0122 11.7483 19.966 11.2493C18.7966 10.8664 17.8099 10.0651 17.195 8.99933C16.5793 7.93426 16.3784 6.67936 16.631 5.47533C16.2231 5.18525 15.7889 4.93415 15.334 4.72533C14.4176 5.54626 13.2303 5.99994 12 5.99933C10.7693 6.00018 9.58167 5.54649 8.665 4.72533C8.21013 4.93415 7.77589 5.18526 7.368 5.47533C7.62056 6.67936 7.41972 7.93426 6.804 8.99933C6.18937 10.065 5.20298 10.8662 4.034 11.2493C3.98775 11.7483 3.98775 12.2504 4.034 12.7493C5.20335 13.1323 6.19013 13.9335 6.805 14.9993H6.804ZM12 14.9993C11.2044 14.9993 10.4413 14.6833 9.87868 14.1206C9.31607 13.558 9 12.795 9 11.9993C9 11.2037 9.31607 10.4406 9.87868 9.87801C10.4413 9.3154 11.2044 8.99933 12 8.99933C12.7956 8.99933 13.5587 9.3154 14.1213 9.87801C14.6839 10.4406 15 11.2037 15 11.9993C15 12.795 14.6839 13.558 14.1213 14.1206C13.5587 14.6833 12.7956 14.9993 12 14.9993ZM12 12.9993C12.2652 12.9993 12.5196 12.894 12.7071 12.7064C12.8946 12.5189 13 12.2645 13 11.9993C13 11.7341 12.8946 11.4798 12.7071 11.2922C12.5196 11.1047 12.2652 10.9993 12 10.9993C11.7348 10.9993 11.4804 11.1047 11.2929 11.2922C11.1054 11.4798 11 11.7341 11 11.9993C11 12.2645 11.1054 12.5189 11.2929 12.7064C11.4804 12.894 11.7348 12.9993 12 12.9993Z"
              fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
            />
          </g>
          <defs>
            <clipPath id="clip0_2842_3541">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </svg>
  );
};

const Upgrade: React.FC<IconProps> = ({ pathname }) => {
  const { darkMode } = useDarkMode();
  const isActive = pathname === '/upgrade';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isActive ? (
        <>
          <g clip-path="url(#clip0_3364_739)">
            <path
              d="M4 19H20V12H22V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V12H4V19ZM14 9V15H10V9H5L12 2L19 9H14Z"
              fill="url(#paint0_linear_3364_739)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_3364_739"
              x1="2.34965"
              y1="12.7955"
              x2="21.948"
              y2="14.1795"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#AA3CDD" />
              <stop offset="1" stop-color="#500C6A" />
            </linearGradient>
            <clipPath id="clip0_3364_739">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      ) : (
        <path
          d="M4 19H20V12H22V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"
          fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
        />
      )}
    </svg>
  );
};

const OverView: React.FC<IconProps> = ({ pathname }) => {
  const { darkMode } = useDarkMode();
  const isActive = pathname === '/overview';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isActive ? (
        <>
          <g clip-path="url(#clip0_3364_1216)">
            <path
              d="M6.75 2.5C7.30812 2.5 7.86077 2.60993 8.37641 2.82351C8.89204 3.03709 9.36056 3.35015 9.75521 3.7448C10.1499 4.13945 10.4629 4.60796 10.6765 5.1236C10.8901 5.63923 11 6.19188 11 6.75V11H6.75C5.62283 11 4.54183 10.5522 3.7448 9.7552C2.94777 8.95817 2.5 7.87717 2.5 6.75C2.5 5.62283 2.94777 4.54183 3.7448 3.7448C4.54183 2.94777 5.62283 2.5 6.75 2.5ZM6.75 13H11V17.25C11 18.0906 10.7507 18.9123 10.2837 19.6112C9.81675 20.3101 9.15299 20.8548 8.37641 21.1765C7.59982 21.4982 6.74529 21.5823 5.92087 21.4183C5.09645 21.2543 4.33917 20.8496 3.7448 20.2552C3.15042 19.6608 2.74565 18.9036 2.58166 18.0791C2.41768 17.2547 2.50184 16.4002 2.82351 15.6236C3.14519 14.847 3.68992 14.1833 4.38883 13.7163C5.08774 13.2493 5.90943 13 6.75 13ZM17.25 2.5C18.3772 2.5 19.4582 2.94777 20.2552 3.7448C21.0522 4.54183 21.5 5.62283 21.5 6.75C21.5 7.87717 21.0522 8.95817 20.2552 9.7552C19.4582 10.5522 18.3772 11 17.25 11H13V6.75C13 5.62283 13.4478 4.54183 14.2448 3.7448C15.0418 2.94777 16.1228 2.5 17.25 2.5ZM13 13H17.25C18.0906 13 18.9123 13.2493 19.6112 13.7163C20.3101 14.1833 20.8548 14.847 21.1765 15.6236C21.4982 16.4002 21.5823 17.2547 21.4183 18.0791C21.2544 18.9036 20.8496 19.6608 20.2552 20.2552C19.6608 20.8496 18.9036 21.2543 18.0791 21.4183C17.2547 21.5823 16.4002 21.4982 15.6236 21.1765C14.847 20.8548 14.1833 20.3101 13.7163 19.6112C13.2493 18.9123 13 18.0906 13 17.25V13Z"
              fill="url(#paint0_linear_3364_1216)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_3364_1216"
              x1="2.83217"
              y1="13.2955"
              x2="21.4596"
              y2="14.5452"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#AA3CDD" />
              <stop offset="1" stop-color="#500C6A" />
            </linearGradient>
            <clipPath id="clip0_3364_1216">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      ) : (
        <>
          <g clip-path="url(#clip0_2609_1505)">
            <path
              d="M6.75 2.5C7.30812 2.5 7.86077 2.60993 8.37641 2.82351C8.89204 3.03709 9.36056 3.35015 9.75521 3.7448C10.1499 4.13945 10.4629 4.60796 10.6765 5.1236C10.8901 5.63923 11 6.19188 11 6.75V11H6.75C5.62283 11 4.54183 10.5522 3.7448 9.7552C2.94777 8.95817 2.5 7.87717 2.5 6.75C2.5 5.62283 2.94777 4.54183 3.7448 3.7448C4.54183 2.94777 5.62283 2.5 6.75 2.5ZM9 9V6.75C9 6.30499 8.86804 5.86998 8.62081 5.49997C8.37358 5.12996 8.02217 4.84157 7.61104 4.67127C7.19991 4.50097 6.74751 4.45642 6.31105 4.54323C5.87459 4.63005 5.47368 4.84434 5.15901 5.15901C4.84434 5.47368 4.63005 5.87459 4.54323 6.31105C4.45642 6.7475 4.50098 7.1999 4.67127 7.61104C4.84157 8.02217 5.12996 8.37357 5.49997 8.62081C5.86998 8.86804 6.30499 9 6.75 9H9ZM6.75 13H11V17.25C11 18.0906 10.7507 18.9123 10.2837 19.6112C9.81675 20.3101 9.15299 20.8548 8.37641 21.1765C7.59982 21.4982 6.74529 21.5823 5.92087 21.4183C5.09645 21.2543 4.33917 20.8496 3.7448 20.2552C3.15042 19.6608 2.74565 18.9036 2.58166 18.0791C2.41768 17.2547 2.50184 16.4002 2.82351 15.6236C3.14519 14.847 3.68992 14.1833 4.38883 13.7163C5.08774 13.2493 5.90943 13 6.75 13ZM6.75 15C6.30499 15 5.86998 15.132 5.49997 15.3792C5.12996 15.6264 4.84157 15.9778 4.67127 16.389C4.50098 16.8001 4.45642 17.2525 4.54323 17.689C4.63005 18.1254 4.84434 18.5263 5.15901 18.841C5.47368 19.1557 5.87459 19.3699 6.31105 19.4568C6.74751 19.5436 7.19991 19.499 7.61104 19.3287C8.02217 19.1584 8.37358 18.87 8.62081 18.5C8.86804 18.13 9 17.695 9 17.25V15H6.75ZM17.25 2.5C18.3772 2.5 19.4582 2.94777 20.2552 3.7448C21.0522 4.54183 21.5 5.62283 21.5 6.75C21.5 7.87717 21.0522 8.95817 20.2552 9.7552C19.4582 10.5522 18.3772 11 17.25 11H13V6.75C13 5.62283 13.4478 4.54183 14.2448 3.7448C15.0418 2.94777 16.1228 2.5 17.25 2.5ZM17.25 9C17.695 9 18.13 8.86804 18.5 8.62081C18.87 8.37357 19.1584 8.02217 19.3287 7.61104C19.499 7.1999 19.5436 6.7475 19.4568 6.31105C19.37 5.87459 19.1557 5.47368 18.841 5.15901C18.5263 4.84434 18.1254 4.63005 17.689 4.54323C17.2525 4.45642 16.8001 4.50097 16.389 4.67127C15.9778 4.84157 15.6264 5.12996 15.3792 5.49997C15.132 5.86998 15 6.30499 15 6.75V9H17.25ZM13 13H17.25C18.0906 13 18.9123 13.2493 19.6112 13.7163C20.3101 14.1833 20.8548 14.847 21.1765 15.6236C21.4982 16.4002 21.5823 17.2547 21.4183 18.0791C21.2544 18.9036 20.8496 19.6608 20.2552 20.2552C19.6608 20.8496 18.9036 21.2543 18.0791 21.4183C17.2547 21.5823 16.4002 21.4982 15.6236 21.1765C14.847 20.8548 14.1833 20.3101 13.7163 19.6112C13.2493 18.9123 13 18.0906 13 17.25V13ZM15 15V17.25C15 17.695 15.132 18.13 15.3792 18.5C15.6264 18.87 15.9778 19.1584 16.389 19.3287C16.8001 19.499 17.2525 19.5436 17.689 19.4568C18.1254 19.3699 18.5263 19.1557 18.841 18.841C19.1557 18.5263 19.37 18.1254 19.4568 17.689C19.5436 17.2525 19.499 16.8001 19.3287 16.389C19.1584 15.9778 18.87 15.6264 18.5 15.3792C18.13 15.132 17.695 15 17.25 15H15Z"
              fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
            />
          </g>
          <defs>
            <clipPath id="clip0_2609_1505">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </svg>
  );
};

const Notification: React.FC<IconProps> = ({ pathname }) => {
  const { darkMode } = useDarkMode();
  const isActive = pathname === '/notification';
  return (
    <svg width="20" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isActive ? (
        <>
          <path
            d="M18 15H20V17H0V15H2V8C2 5.87827 2.84285 3.84344 4.34315 2.34315C5.84344 0.842855 7.87827 0 10 0C12.1217 0 14.1566 0.842855 15.6569 2.34315C17.1571 3.84344 18 5.87827 18 8V15ZM7 19H13V21H7V19Z"
            fill={'url(#activeGradient)'}
          />
          <defs>
            <linearGradient
              id="activeGradient"
              x1="0.34965"
              y1="11.9318"
              x2="19.9657"
              y2="13.1852"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AA3CDD" />
              <stop offset="1" stopColor="#500C6A" />
            </linearGradient>
          </defs>
        </>
      ) : (
        <path
          d="M20 17H22V19H2V17H4V10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10V17ZM18 17V10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10V17H18ZM9 21H15V23H9V21Z"
          fill={`${darkMode ? '#FAFAFA' : '#111111'}`}
        />
      )}
    </svg>
  );
};
