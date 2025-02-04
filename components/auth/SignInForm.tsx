'use client';

import { loginSchema, LoginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFInput from '../shared/hook-form/RHFInput';
import { Check, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomButton from '../shared/CustomButton';
import Link from 'next/link';
import { CustomFormField } from '../shared/CustomInputField';
import { useAuth } from '@/zustand';
import { toast } from 'sonner';
import { useError, useSuccess } from '@/hooks';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();
  const { auth, login } = useAuth();
  const { loading, error, clearError, message, clearMessage, user, isAuthenticated } = auth;
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [validationStatus, setValidationStatus] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasDigit: false,
    hasSpecialChar: false,
    isMinLength: false,
  });

  const password = methods.watch('password');

  useEffect(() => {
    if (password) {
      setValidationStatus({
        hasLowerCase: /[a-z]/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
        isMinLength: password.length >= 8,
      });
    }
  }, [password]);

  useError(error, clearError);
  useSuccess(message, clearMessage);

  useEffect(() => {
  if (isAuthenticated && message) {
    toast.success(message);

    console.log({ user });
    
    if (user?.firstName === '') {
      router.push('/add-profile-info');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/overview');
    }
  }
}, [user, isAuthenticated, message, router]);


  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="font-clash md:px-0 w-full" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <CustomFormField
            label="Email"
            name="email"
            placeholder="e.g. frank@example.com"
            form={methods}
            type="text"
          />
        </div>

        <div className="mb-5">
          <CustomFormField
            label="Password"
            name="password"
            placeholder="Enter your password"
            form={methods}
            type={showPassword ? 'text' : 'password'}
            rightIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />

          <div className="mt-3 pl- md:pl-0">
            <div className="w-[250px] flex flex-wrap gap-2">
              {Object.entries(validationStatus).map(([key, value]) => (
                <p
                  key={key}
                  className={cn(
                    'p-1 text-xs rounded-full text-sm flex gap-x-1 items-center',
                    value ? 'bg-cdneutral-blue text-white' : 'bg-cdneutral-lightGray/20'
                  )}
                >
                  <span>{value && <Check className="text-white w-[16px] h-[16px]" />}</span>
                  {key === 'isMinLength' ? '8 Characters' : `1 ${key.slice(3)}`}
                </p>
              ))}
            </div>
          </div>
        </div>

        <CustomButton
          type="submit"
          className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 pl-3 md:pl-0 w-full mx-auto md:w-[500px] py-7 pr-10 border
          disabled:bg-gray-500
          "
          loading={loading}
          disabled={loading}
        >
          <p className="font-clashSemiBold text-center text-[16px]">Sign In</p>
        </CustomButton>

        <div className="text-center mt-2">
          <p>
            Don't have an account?{' '}
            <Link href="/sign-up" className="font-clashSemiBold text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
