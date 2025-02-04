import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";
import { cloneElement, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../auth/PasswordInput";

interface CustomFormFieldProps {
  name: string;
  label: string;
  type?: string;
  form: UseFormReturn<any>;
  placeholder?: string;
  selectItems?: readonly string[];
  readonly?: boolean;
  onChangeHandler?: (value: any) => void;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const CustomFormField = ({
  name,
  label,
  type = "text",
  form,
  placeholder,
  selectItems,
  readonly = false,
  onChangeHandler,
  rightIcon,
  onRightIconClick,
}: CustomFormFieldProps) => {
  const { control } = form;

  const renderField = (fieldProps: any) => {
    const handleChange = (value: any) => {
      if (onChangeHandler) {
        onChangeHandler(value);
      } else {
        fieldProps.onChange(value);
      }
    };

    return (
      <div className="relative">
        {(() => {
          switch (type) {
            case "textarea":
              return (
                <Textarea
                  {...fieldProps}
                  onChange={(e) => handleChange(e.target.value)}
                  className="dark:bg-slate-700"
                />
              );
            case "password":
              return (
                <PasswordInput
                  {...fieldProps}
                  onChange={(e) => handleChange(e.target.value)}
                />
              );
            case "checkbox":
              return (
                <Switch
                  checked={fieldProps.value}
                  onCheckedChange={handleChange}
                />
              );
            default:
              return (
                <Input
                  readOnly={readonly}
                  type={type}
                  {...fieldProps}
                  onChange={(e) => handleChange(e.target.value)}
                  className="dark:bg-slate-700"
                />
              );
          }
        })()}
        {rightIcon && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={onRightIconClick} 
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CustomFormFieldWithChildProps {
  children: ReactElement;
  className?: string;
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: string;
}

export const CustomFormFieldWithChild = ({
  children,
  className,
  form,
  name,
  label,
  type,
}: CustomFormFieldWithChildProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn(className)}>
            <FormLabel className="w-full">{label}</FormLabel>
            <FormControl>
              {type === "checkbox"
                ? cloneElement(children, {
                    checked: field.value,
                    onCheckedChange: field.onChange,
                  })
                : cloneElement(children, { ...field })}
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
