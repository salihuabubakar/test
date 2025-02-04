import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RHFCheckboxProps {
  label: string;
  name: string;
  error?: FieldError;
  register: any;
  className?: string;
  inputClassName?: string;
  defaultChecked?: boolean;
  labelClassName?: string;
}

const RHFCheckbox: React.FC<RHFCheckboxProps> = ({
  label,
  name,
  error,
  register,
  className,
  inputClassName,
  defaultChecked = false,
  labelClassName,
  ...rest
}) => {
  return (
    <>
      <div className={cn("flex items-center space-x-2", className)}>
        <Checkbox
          id={name}
          defaultChecked={defaultChecked}
          {...register(name)}
          className={inputClassName}
          {...rest}
        />
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </>
  );
};

export default RHFCheckbox;
