"use client";

import { EmailIcon, UserIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email" }),
});

type FormType = z.infer<typeof schema>;

export function SettingsForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "Bolatbek",
      lastName: "Ermekov",
      email: "ermekbolatbek21@gmail.com",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormType) => {
    console.log("Saved data", data);
    // TODO: API submission
  };

  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="firstName"
            label="First Name"
            placeholder="David"
            control={control}
            error={errors.firstName?.message}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="Jhon"
            control={control}
            error={errors.lastName?.message}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          control={control}
          error={errors.email?.message}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
