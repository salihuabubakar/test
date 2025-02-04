'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { warning } from '@/assets';
import Image from 'next/image';
import CustomButton from '@/components/shared/CustomButton';
import { ChevronRight } from 'lucide-react';
import DeleteAccountModal from '@/components/Settings/modal/delete-account-modal';
import ChangePasswordModal from '@/components/Settings/modal/change-password-modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TopBar from '@/components/Dashboard/TopBar';
import { settingsIcon } from '@/assets';

interface Country {
  code: string;
  name: string;
  nativeName?: string;
  flag: string | JSX.Element;
  pattern?: string;
}

const pattern1 = '^[0-9]{10}$';
const pattern2 = '^[0-9]{9}$';

// Map of country codes to their respective regex patterns for phone number detection
const phoneNumberPatterns: { [key: string]: RegExp } = {
  '+234': /^(?:0|234)?([789][01]\d{8})$/, // Nigeria
  '+91': /^(?:0|91)?([6789]\d{9})$/, // India
  '+27': /^(?:0|27)?([1-9]\d{8})$/, // South Africa
  '+44': /^(?:0|44)?([7-9]\d{9})$/, // UK
  '+1': /^(?:1)?([2-9]\d{9})$/, // US
};

const ProfileTab = () => {
  const countries: Country[] = [
    { code: '+234', name: 'Nigeria', flag: <NigriaFlag />, pattern: pattern1 },
    { code: '+91', name: 'India', flag: <IndiaFlag />, pattern: pattern1 },
    {
      code: '+27',
      name: 'South Africa',
      nativeName: 'iNingizimu Afrika',
      flag: <SouthAfricaFlag />,
      pattern: pattern2,
    },
    { code: '+44', name: 'United Kingdom', flag: <UKFlag />, pattern: pattern1 },
    { code: '+1', name: 'United States', flag: <USFlag />, pattern: pattern1 },
  ];

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');

  const detectCountry = (number: string) => {
    // Remove all non-digit characters
    const cleanNumber = number.replace(/\D/g, '');

    // Try to match the number against each country's pattern
    for (const [code, pattern] of Object.entries(phoneNumberPatterns)) {
      if (pattern.test(cleanNumber)) {
        setSelectedCountry(code);
        break;
      }
    }
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and spaces
    const cleaned = value.replace(/[^\d\s]/g, '');
    setPhoneNumber(cleaned);
    detectCountry(cleaned);
  };

  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      'Data: ' +
        firstName +
        ' ' +
        lastName +
        ' ' +
        email +
        ' ' +
        selectedCountry +
        ' ' +
        phoneNumber
    );
  };

  return (
    <>
      <TopBar title="Profile Settings" logo={settingsIcon}/>
      <div className="flex flex-col md:flex-row dark:text-cdneutral-white p-2 h-screen px-6 text-cdneutral-black  dark:bg-[#09090b] bg-[#FAFAFA]">
        <section className="w-full">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-6 text-cdneutral-black dark:text-cdneutral-white">
            Profile Settings
          </h2>
          {/* Form Section */}
          <form className="font-clash md:px-0 w-full" onSubmit={onSubmit}>
            {/* Name Inputs */}
            <div className="flex md:flex-row flex-col gap-6 mb-6">
              <div className=" md:w-1/2">
                <label
                  className="block text-cdneutral-black dark:text-cdneutral-white"
                  htmlFor="name"
                >
                  First Name
                </label>
                <input
                  id="name"
                  type="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                  placeholder="Aderinola"
                />
              </div>
              <div className="md:w-1/2">
                <label
                  className="block text-cdneutral-black dark:text-cdneutral-white"
                  htmlFor="name"
                >
                  Last Name
                </label>
                <input
                  id="name"
                  type="name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-cdneutral-black dark:text-cdneutral-white" htmlFor="name">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none bg-[#CCCCCC4D]"
                placeholder="aderinola@gmail.com"
              />
            </div>
            {/*Phone Number Input */}
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center items-start w-full">
              <div className="mb-4 relative w-full">
                <label
                  className="block text-cdneutral-black dark:text-cdneutral-white"
                  htmlFor="number"
                >
                  Phone number
                </label>
                <div className="flex justify-between items-center">
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-fit bg-transparent border rounded-lg px-4 py-5 mt-1 mr-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{selectedCountryData?.flag}</span>
                          <span>{selectedCountry}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-[#1c1c1c] border-[#2d2d2d]">
                      {countries.map((country) => (
                        <SelectItem
                          key={`${country.code}-${country.name}`}
                          value={country.code}
                          className="text-white hover:bg-[#2d2d2d] focus:bg-[#2d2d2d]"
                        >
                          <div className="flex items-center justify-between w-full py-2">
                            <div className="flex items-start gap-3">
                              <span className="text-xl mr-2">{country.flag}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">{country.code}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    id="number"
                    type="tel"
                    className="w-full bg-transparent border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                    placeholder="+213 8056231507"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
              <CustomButton
                className="bg-transparent text-[#550f70] font-clashMedium text-[16px] flex items-center justify-start px-10 border border-[#550f70] py-6 w-fit"
                type="button"
              >
                Verify
              </CustomButton>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Image src={warning} alt="Warning icon" width={16} height={16} />
              <p>
                It is required for you to verify your number. An OTP would be sent for verification.
              </p>
            </div>
            <div className="border-t border-[#ECECEC] pt-6 mt-6">
              <button
                onClick={() => setOpenChangePassword(true)}
                className="flex w-full justify-between items-center mb-4 cursor-pointer border-b border-[#ECECEC] pb-6 mt-4"
              >
                <p className="text-gray-800 dark:text-cdneutral-white font-clashMedium">Change Password</p>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setOpenDeleteAccount(true)}
                className="flex w-full justify-between items-center cursor-pointer"
              >
                <p className="text-[#FF5555] font-clashMedium">Delete my CashDime Account</p>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between mt-8">
              <CustomButton className="bg-[#ECECEC] text-gray-800 py-5 w-full mr-4 text-center font-clashSemiBold rounded-full">
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 text-[#FBFEFC] py-5 w-full text-center font-clashSemiBold rounded-full"
              >
                Update
              </CustomButton>
            </div>
          </form>
        </section>

        <ChangePasswordModal
          isOpen={openChangePassword}
          onClose={() => setOpenChangePassword(false)}
        />
        <DeleteAccountModal isOpen={openDeleteAccount} onClose={() => setOpenDeleteAccount(false)} />
      </div>
    </>
  );
};

export default ProfileTab;

const NigriaFlag = () => (
  <svg width="16" height="16" viewBox="0 0 513 342" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_301_617)">
      <path d="M0 -0.00585938H513V341.994H0V-0.00585938Z" fill="white" />
      <path
        d="M0 -0.00585938H171V341.994H0V-0.00585938ZM342 -0.00585938H513V341.994H342V-0.00585938Z"
        fill="#007B23"
      />
    </g>
    <defs>
      <clipPath id="clip0_301_617">
        <rect width="513" height="342" fill="white" transform="translate(0 -0.00585938)" />
      </clipPath>
    </defs>
  </svg>
);

const IndiaFlag = () => (
  <svg width="16" height="16" viewBox="0 0 513 342" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_301_989)">
      <path d="M17.3 -0.00585938H495.7V341.994H17.3V-0.00585938Z" fill="#181A93" />
      <path d="M0 -0.00585938H513V113.994H0V-0.00585938Z" fill="#FFA44A" />
      <path d="M0 227.994H513V341.994H0V227.994Z" fill="#1A9F0B" />
      <path d="M0 113.994H513V227.994H0V113.994Z" fill="white" />
      <path
        d="M256.5 205.194C275.388 205.194 290.7 189.882 290.7 170.994C290.7 152.106 275.388 136.794 256.5 136.794C237.612 136.794 222.3 152.106 222.3 170.994C222.3 189.882 237.612 205.194 256.5 205.194Z"
        fill="white"
      />
      <path
        d="M256.5 216.594C231.4 216.594 210.9 196.094 210.9 170.994C210.9 145.894 231.4 125.394 256.5 125.394C281.6 125.394 302.1 145.894 302.1 170.994C302.1 196.094 281.6 216.594 256.5 216.594ZM256.5 205.194C274.7 205.194 290.7 189.194 290.7 170.994C290.7 152.794 274.8 136.794 256.5 136.794C238.2 136.794 222.3 152.794 222.3 170.994C222.3 189.194 238.3 205.194 256.5 205.194Z"
        fill="#181A93"
      />
      <path
        d="M256.5 193.794C269.092 193.794 279.3 183.586 279.3 170.994C279.3 158.402 269.092 148.194 256.5 148.194C243.908 148.194 233.7 158.402 233.7 170.994C233.7 183.586 243.908 193.794 256.5 193.794Z"
        fill="#181A93"
      />
    </g>
    <defs>
      <clipPath id="clip0_301_989">
        <rect width="513" height="342" fill="white" transform="translate(0 -0.00585938)" />
      </clipPath>
    </defs>
  </svg>
);

const SouthAfricaFlag = () => (
  <svg width="16" height="16" viewBox="0 0 513 343" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_301_20)">
      <path d="M0 0.958496H513V342.951H0V0.958496Z" fill="white" />
      <path d="M114.247 171.956L0 57.6582V286.274L114.247 171.956Z" fill="black" />
      <path
        d="M161.507 171.955L0 10.3398V57.6581L114.247 171.956L0 286.274V333.504L161.507 171.955Z"
        fill="#FFB915"
      />
      <path
        d="M510.829 205.411C510.887 204.97 511.634 204.531 513 204.09V138.499H223.037L85.4967 0.958496H0V10.3398L161.507 171.955L0 333.504V342.951H85.4967L223.037 205.411H510.829Z"
        fill="#007847"
      />
      <path d="M504.163 238.868H236.894L132.811 342.951H513V238.868H504.163Z" fill="#000C8A" />
      <path d="M504.163 105.041H513V0.958496H132.811L236.894 105.041H504.163Z" fill="#E1392D" />
    </g>
    <defs>
      <clipPath id="clip0_301_20">
        <rect width="513" height="342" fill="white" transform="translate(0 0.95459)" />
      </clipPath>
    </defs>
  </svg>
);

const UKFlag = () => (
  <svg width="16" height="16" viewBox="0 0 513 343" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_301_1200)">
      <path d="M0 0.926514H513V342.93H0V0.926514Z" fill="white" />
      <path
        d="M288.562 0.923584H224.438V139.86H0V203.985H224.438V342.922H288.562V203.985H513V139.86H288.562V0.923584Z"
        fill="#D80027"
      />
      <path
        d="M394.554 231.401L513 297.205V231.401H394.554ZM312.261 231.401L513 342.922V311.387L369.026 231.401H312.261ZM459.53 342.922L312.261 261.099V342.922H459.53Z"
        fill="#0052B4"
      />
      <path d="M312.261 231.401L513 342.922V311.387L369.026 231.401H312.261Z" fill="white" />
      <path d="M312.261 231.401L513 342.922V311.387L369.026 231.401H312.261Z" fill="#D80027" />
      <path
        d="M90.5174 231.399L0 281.687V231.399H90.5174ZM200.739 245.58V342.921H25.5408L200.739 245.58Z"
        fill="#0052B4"
      />
      <path d="M143.974 231.401L0 311.387V342.922L200.739 231.401H143.974Z" fill="#D80027" />
      <path
        d="M118.446 112.445L0 46.6407V112.445H118.446ZM200.739 112.445L0 0.923584V32.4591L143.974 112.445H200.739ZM53.4702 0.923584L200.739 82.7471V0.923584H53.4702Z"
        fill="#0052B4"
      />
      <path d="M200.739 112.445L0 0.923584V32.4591L143.974 112.445H200.739Z" fill="white" />
      <path d="M200.739 112.445L0 0.923584V32.4591L143.974 112.445H200.739Z" fill="#D80027" />
      <path
        d="M422.483 112.447L513 62.1589V112.447H422.483ZM312.261 98.2653V0.924561H487.459L312.261 98.2653Z"
        fill="#0052B4"
      />
      <path d="M369.026 112.445L513 32.4591V0.923584L312.261 112.445H369.026Z" fill="#D80027" />
    </g>
    <defs>
      <clipPath id="clip0_301_1200">
        <rect width="513" height="342" fill="white" transform="translate(0 0.926514)" />
      </clipPath>
    </defs>
  </svg>
);

const USFlag = () => (
  <svg width="16" height="16" viewBox="0 0 513 343" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_301_131)">
      <path d="M0 0.957031H513V342.957H0V0.957031Z" fill="white" />
      <path
        d="M0 0.957031H513V27.257H0V0.957031ZM0 53.557H513V79.857H0V53.557ZM0 106.157H513V132.457H0V106.157ZM0 158.757H513V185.057H0V158.757ZM0 211.457H513V237.757H0V211.457ZM0 264.057H513V290.357H0V264.057ZM0 316.657H513V342.957H0V316.657Z"
        fill="#D80027"
      />
      <path d="M0 0.957031H256.5V185.057H0V0.957031Z" fill="#2E52B2" />
      <path
        d="M47.8002 139.857L43.8002 127.057L39.4002 139.857H26.2002L36.9002 147.557L32.9002 160.357L43.8002 152.457L54.4002 160.357L50.3002 147.557L61.2002 139.857H47.8002ZM104.1 139.857L100 127.057L95.8002 139.857H82.6002L93.3002 147.557L89.3002 160.357L100 152.457L110.8 160.357L106.8 147.557L117.5 139.857H104.1ZM160.6 139.857L156.3 127.057L152.3 139.857H138.8L149.8 147.557L145.6 160.357L156.3 152.457L167.3 160.357L163.1 147.557L173.8 139.857H160.6ZM216.8 139.857L212.8 127.057L208.6 139.857H195.3L206.1 147.557L202.1 160.357L212.8 152.457L223.6 160.357L219.3 147.557L230.3 139.857H216.8ZM100 76.2572L95.8002 89.0572H82.6002L93.3002 96.9572L89.3002 109.557L100 101.757L110.8 109.557L106.8 96.9572L117.5 89.0572H104.1L100 76.2572ZM43.8002 76.2572L39.4002 89.0572H26.2002L36.9002 96.9572L32.9002 109.557L43.8002 101.757L54.4002 109.557L50.3002 96.9572L61.2002 89.0572H47.8002L43.8002 76.2572ZM156.3 76.2572L152.3 89.0572H138.8L149.8 96.9572L145.6 109.557L156.3 101.757L167.3 109.557L163.1 96.9572L173.8 89.0572H160.6L156.3 76.2572ZM212.8 76.2572L208.6 89.0572H195.3L206.1 96.9572L202.1 109.557L212.8 101.757L223.6 109.557L219.3 96.9572L230.3 89.0572H216.8L212.8 76.2572ZM43.8002 25.6572L39.4002 38.2572H26.2002L36.9002 46.1572L32.9002 58.8572L43.8002 50.9572L54.4002 58.8572L50.3002 46.1572L61.2002 38.2572H47.8002L43.8002 25.6572ZM100 25.6572L95.8002 38.2572H82.6002L93.3002 46.1572L89.3002 58.8572L100 50.9572L110.8 58.8572L106.8 46.1572L117.5 38.2572H104.1L100 25.6572ZM156.3 25.6572L152.3 38.2572H138.8L149.8 46.1572L145.6 58.8572L156.3 50.9572L167.3 58.8572L163.1 46.1572L173.8 38.2572H160.6L156.3 25.6572ZM212.8 25.6572L208.6 38.2572H195.3L206.1 46.1572L202.1 58.8572L212.8 50.9572L223.6 58.8572L219.3 46.1572L230.3 38.2572H216.8L212.8 25.6572Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_301_131">
        <rect width="513" height="342" fill="white" transform="translate(0 0.957031)" />
      </clipPath>
    </defs>
  </svg>
);
