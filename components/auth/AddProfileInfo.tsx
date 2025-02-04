"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import background from "@/assets/images/background.png";
import CustomButton from "../shared/CustomButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateUserProfilePayload } from "@/types";
import { useAuth } from "@/zustand";
import { useError } from "@/hooks";

const AddProfileInfo = () => {
  const { auth, updateUserProfile } = useAuth();
  const { error, isAuthenticated, clearError, loading, message, user } = auth;
  const router = useRouter();

  const [profileInfo, setProfileInfo] = useState<UpdateUserProfilePayload>({
    firstName: '',
    lastName: '',
    phone: '',
    country: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useError(error, clearError);

  useEffect(() => {
    if (message && isAuthenticated) {
      console.log({ message, isAuthenticated, user });

      toast.success('Profile updated successful');
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/add-acct-info');
    }
  }, [message, isAuthenticated, router, user]);

  const handleSubmit =  (e: FormEvent) => {
    e.preventDefault();
    if (
      !profileInfo.firstName || 
      !profileInfo.lastName || 
      !profileInfo.phone || 
      !profileInfo.country
    ) {
      toast.error("Fields cannot be empty");
      return;
    }
    console.log(profileInfo);
    updateUserProfile(profileInfo)
  };
  
  return (
    <div className="flex h-screen bg-white  font-clash flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block w-1/2 bg-cover bg-no-repeat bg-center">
        <Image src={background} alt="background" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mb-4" />
            <p className="text-2xl font-clashSemiBold text-center">Add Profile Info </p>
            <p className="text-cdneutral-darkGray text-sm text-center mb-6">
              Enter the info needed to complete registration{" "}
            </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g. Frank"
                value={profileInfo.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g. Frank"
                value={profileInfo.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g 08184756372"
                value={profileInfo.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-cdneutral-black" htmlFor="country">
                Country
              </label>
              <div className="flex justify-between items-center">
                <select
                  name="country"
                  id="country"
                  className="w-full border text-cdneutral-darkGray  rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                  value={profileInfo.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="nigeria">Nigeria</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <CustomButton
                className={
                  "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full md:w-[260px] font-clashSemiBold py-4 flex items-center justify-center space-x-3"
                }
                type="submit"
                loading={loading}
                disabled={loading}
              >
                <p className="font-bold md:text-[16px] text-[16px]">Proceed</p>
              </CustomButton>
            </div>
          </form>
        </div>
        </div>
      </div>
  );
};

export default AddProfileInfo;