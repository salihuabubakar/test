import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Define the prop types using TypeScript interface
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconClassName?: string;
  rightIconClassName?: string;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  leftIcon,
  leftIconClassName,
  rightIcon,
  rightIconClassName,
  loading,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "text-white font-bold py-2 px-4 rounded-full hover:bg-transparent font-clashSemiBold",
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-cdneutral-lightGray" />
      )}
      {!loading && leftIcon && (
        <span className={cn("mr-2", leftIconClassName)}>{leftIcon}</span>
      )}
      {loading ? "Loading..." : children}

      {!loading && rightIcon && (
        <span className={cn("ml-2", rightIconClassName)}>{rightIcon}</span>
      )}
    </Button>
  );
};

export default CustomButton;
