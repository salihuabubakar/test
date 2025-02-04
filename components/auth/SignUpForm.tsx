'use client';
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CustomButton from '../shared/CustomButton';

import { Checkbox } from '../ui/checkbox';
import { CustomFormField, CustomFormFieldWithChild } from '../shared/CustomInputField';
import { registerSchema, RegisterSchema } from '@/schema';
import { useAuth } from '@/zustand';
import { useError } from '@/hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const { signUp, auth } = useAuth();
  const { error, isAuthenticated, clearError, loading, user, message } = auth;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationStatus, setValidationStatus] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasDigit: false,
    hasSpecialChar: false,
    isMinLength: false,
  });

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const { watch } = methods;

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

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

  useEffect(() => {
    if (user && !isAuthenticated) {
      console.log({ message, isAuthenticated });

      toast.success('Registration successful! Please verify your email.');
      router.push('/email-verification-info');
    }
  }, [user, isAuthenticated, router]);

  const onSubmit = async (data: RegisterSchema) => {
    console.log('Form submitted:', data);
    const { email, password } = data;
    signUp({ email, password });
  };

  return (
    <FormProvider {...methods}>
      <form className="font-clash px-5 md:px-0" onSubmit={methods.handleSubmit(onSubmit)}>
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

        <div className="mb-5">
          <CustomFormField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            form={methods}
            type={showConfirmPassword ? 'text' : 'password'}
            rightIcon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <div className="mb-6 ml-4">
          <CustomFormFieldWithChild
            label="By creating an account, I agree to our Terms of use and Privacy Policy"
            name="terms"
            form={methods}
            type="checkbox"
            className="flex flex-row-reverse gap-x-3"
          >
            <Checkbox />
          </CustomFormFieldWithChild>
        </div>

        <CustomButton
          type="submit"
          className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 pl-3 md:pl-0 w-full mx-auto md:w-[500px] py-7 pr-10 border"
          loading={loading}
          disabled={loading}
        >
          <p className="font-clashSemiBold text-center text-[16px]">Sign Up</p>
        </CustomButton>

        <div className="text-center mt-2">
          <p>
            Already have an account?{' '}
            <Link href="/sign-in" className="font-clashSemiBold text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
