"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/core/lib/utils";
import { useId } from "react";

type PropsType = {
  label: string;
  items: { value: string; label: string }[];
  prefixIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
};

export function Select({
  items,
  label,
  placeholder,
  prefixIcon,
  className,
  value = "",
  onChange,
  error,
}: PropsType) {
  const id = useId();

  return (
    <div className={cn("space-y-3", className)}>
      <label
        htmlFor={id}
        className="block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>

      <div className="relative">
        {prefixIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {prefixIcon}
          </div>
        )}

        <select
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6",
            !!value
              ? "text-dark dark:text-white"
              : "text-dark-6 dark:text-dark-6",
            prefixIcon && "pl-11.5",
            error && "border-red-500 focus:border-red-500 dark:border-red-500",
          )}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
