"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Валидационная схема
const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormType = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: SignUpFormType) => {
    console.log("Sign Up Data:", data);
    // TODO: send data to API
  };

  return (
    <ShowcaseSection title="Create Your Account" className="!p-6.5">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputGroup
          label="Name"
          name="name"
          type="text"
          placeholder="Enter full name"
          control={control}
          error={errors.name?.message}
          className="mb-4.5"
        />

        <InputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email address"
          control={control}
          error={errors.email?.message}
          className="mb-4.5"
        />

        <InputGroup
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          control={control}
          error={errors.password?.message}
          className="mb-4.5"
        />

        <InputGroup
          label="Re-type Password"
          name="confirmPassword"
          type="password"
          placeholder="Re-type password"
          control={control}
          error={errors.confirmPassword?.message}
          className="mb-5.5"
        />

        <button
          type="submit"
          className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
        >
          Sign Up
        </button>
      </form>
    </ShowcaseSection>
  );
}
