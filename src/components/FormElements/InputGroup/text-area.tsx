"use client";

import { cn } from "@/core/lib/utils";
import { useId } from "react";
import { Controller, type Control } from "react-hook-form";

interface PropsType {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any>;
  error?: string;

  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function TextAreaGroup({
  name,
  label,
  placeholder,
  control,
  error,
  required,
  disabled,
  active,
  className,
  icon,
}: PropsType) {
  const id = useId();

  return (
    <div className={cn(className)}>
      <label
        htmlFor={id}
        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>

      <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:left-5.5 [&_svg]:top-5.5">
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              id={id}
              rows={6}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              data-active={active}
              className={cn(
                "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
                icon && "py-5 pl-13 pr-5",
                error &&
                  "border-red-500 focus:border-red-500 dark:border-red-500",
              )}
            />
          )}
        />

        {icon}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
