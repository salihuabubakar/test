'use client';
import { AuthBg, Logo } from '@/assets';
import { CustomFormField } from '@/components/shared/CustomInputField';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/schema';
import Image from 'next/image';
import CustomButton from '@/components/shared/CustomButton';

const ForgotPage = () => {
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-y-hidden">
      <div className="sm:pt-10">
        <Image src={AuthBg} alt="cash-dime-auth-bg " className="hidden md:block" />
      </div>
      <div className="flex flex-col items-center justify-center mx-auto">
        <div>
          <Image src={Logo} alt="cash-dime-logo" className="mx-auto" />
          <div className="text-center">
            <h1 className="font-clashSemiBold text-[24px] md:text-[32px]">Forgot Password</h1>
            <p className="font-clash text-cdneutral-lightGray text-[16px] md:text-[18px] w-[270px] md:w-[400px] pb-6">
              Don’t worry! Please enter the email address to receive password reset instructions.
            </p>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            className="font-clash px-5 md:px-0 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="mb-6">
              <CustomFormField
                label="Email"
                name="email"
                placeholder="aderinola@gmail.com"
                form={methods}
                type="text"
              />
            </div>
            <CustomButton
              className={
                'bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-[330px] mx-auto  md:w-[500px] py-5 md:py-5 pr-10 border '
              }
            >
              Reset
            </CustomButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ForgotPage;
