import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { FieldError } from "react-hook-form";

interface RHFTextAreaProps {
  name: string;
  placeholder: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
  textAreaClassName?: string;
  error?: FieldError;
  register: any;
}

const RHFTextArea: React.FC<RHFTextAreaProps> = ({
  name,
  placeholder,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  textAreaClassName,
  error,
  register,
}) => {
  return (
    <>
      <div className={cn("relative flex items-center", className)}>
        {LeftIcon && (
          <LeftIcon
            className="absolute left-3 text-neutral-400"
            width={20}
            height={20}
          />
        )}

        <textarea
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            " py-2 text-md border rounded-md  resize-none focus:outline-none",
            LeftIcon ? "pl-12" : "",
            RightIcon ? "pr-12" : "",
            textAreaClassName
          )}
        />

        {RightIcon && (
          <RightIcon
            className="absolute right-3 text-neutral-400"
            width={20}
            height={20}
          />
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </>
  );
};

export default RHFTextArea;
