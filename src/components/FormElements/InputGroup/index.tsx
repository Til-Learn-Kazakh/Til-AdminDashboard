import { cn } from "@/core/lib/utils";
import { useId, type HTMLInputTypeAttribute } from "react";
import { Controller, type Control } from "react-hook-form";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  name: string;
  control: Control<any>;
  error?: string;

  fileStyleVariant?: "style1" | "style2";
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
  defaultValue?: string;
};

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  label,
  type,
  placeholder,
  control,
  name,
  error,
  required,
  disabled,
  active,
  icon,
  ...props
}) => {
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>

      <div
        className={cn(
          "relative [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
          props.iconPosition === "left"
            ? "[&_svg]:left-4.5"
            : "[&_svg]:right-4.5",
        )}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={props.defaultValue || ""}
          render={({ field }) => (
            <input
              {...field}
              id={id}
              type={type}
              placeholder={placeholder}
              className={cn(
                "w-full rounded-lg border-[1.5px] bg-transparent outline-none transition disabled:cursor-not-allowed",
                "border-stroke dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary",
                "px-5.5 py-3 text-dark placeholder:text-dark-6",
                props.iconPosition === "left" && "pl-12.5",
                props.height === "sm" && "py-2.5",
                !!error
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "focus:border-primary",
                type === "file" &&
                  getFileStyles(props.fileStyleVariant || "style1"),
              )}
              required={required}
              disabled={disabled}
              data-active={active}
            />
          )}
        />

        {icon}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputGroup;

function getFileStyles(variant: "style1" | "style2") {
  switch (variant) {
    case "style1":
      return `file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white`;
    default:
      return `file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]`;
  }
}
