"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import background from "@/assets/images/background.png";
import CustomButton from "../shared/CustomButton";

const NewPassword = () => {
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
              <p className="text-xl md:text-3xl font-clashSemiBold mb-4">
                Create Password{" "}
              </p>
              <p className="text-sm md:text-xl text-cdneutral-darkGray font-clashLight mb-6 max-w-[450px]">
                Your new password has to be different from previously used
                password{" "}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <CustomButton className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full max-w-[260px] md:max-w-[380px] py-3 md:py-4 flex justify-center items-center">
              <p className="font-bold text-sm md:text-[16px]">Verify</p>
            </CustomButton>
          </div>

          <p className="text-center text-xs md:text-base text-cdneutral-darkGray mt-4">
            Didn’t receive a code?{" "}
            <a href="/sign-in" className="text-[#007AFF] hover:underline">
              Resend code
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
