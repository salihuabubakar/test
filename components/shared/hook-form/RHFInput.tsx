import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form"; // For error handling

interface RHFInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  error?: FieldError;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  register: any;
  className?: string;
  inputClassName?: string;
}

const RHFInput: React.FC<RHFInputProps> = ({
  label,
  name,
  placeholder,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  register,
  className,
  inputClassName,
  ...rest
}) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {LeftIcon && (
          //   <LeftIcon  />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {LeftIcon}
          </span>
        )}
        <Input
          {...register(name)}
          placeholder={placeholder}
          className={cn(
            // error && "border-red-500",
            LeftIcon ? "pl-10" : "",
            RightIcon ? "pr-10" : "",
            inputClassName
          )}
          {...rest}
        />
        {RightIcon && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {RightIcon}
          </span>
        )}
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default RHFInput;
