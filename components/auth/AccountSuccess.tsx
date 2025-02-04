"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import account from "@/assets/images/account.svg";
import background from "@/assets/images/background.png";
import CustomButton from "../shared/CustomButton";
import { useRouter } from "next/navigation";

const AccountSuccessPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen bg-white font-clash flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block w-1/2 bg-cover bg-no-repeat bg-center">
        <Image
          src={background}
          alt="background"
          className="object-cover h-full"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mb-4" />
            <div className="flex flex-col items-center justify-center text-center">
              <Image src={account} alt="account" />
              <p className="text-xl md:text-3xl font-clashSemiBold mb-4">
                Account Created!{" "}
              </p>
              <p className="text-sm md:text-xl text-cdneutral-darkGray font-clashLight mb-6 max-w-[450px]">
                You are now on a 7 days free trial of our Basic subscription
                plan
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <CustomButton onClick={() => router.push('/overview')} className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[900px] max-w-[260px] md:max-w-[380px] py-3 md:py-4 flex justify-center items-center">
              <p className="font-bold text-sm md:text-[16px]">
                Create your first invoice
              </p>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSuccessPage;
