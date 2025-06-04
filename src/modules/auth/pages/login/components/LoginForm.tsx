"use client";

import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { fetchAndSetCSRFToken } from "../../../../../core/api/fetchAndSetCSRFToken";
import { LoginDTO } from "../../../models/auth.model";
import { AuthService } from "../../../services/auth.service";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { mutate } = useMutation({
    mutationKey: ["auth-login"],
    mutationFn: (data: LoginDTO) => AuthService.login(data),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["profile"] });
      toast.success("Вы успешно вошли в систему!");
      form.reset();
      router.push("/");
    },
    onError: (err: any) => {
      toast.error("Ошибка при входе в систему!", {
        description: err.message,
      });
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    const dto = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    await fetchAndSetCSRFToken();

    mutate(dto);
  };

  return (
    <ShowcaseSection title="Welcome Back" className="!p-6.5">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          control={control}
          error={errors.email?.message}
          className="mb-4.5"
        />

        <InputGroup
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          control={control}
          error={errors.password?.message}
        />

        <div className="mb-5.5 mt-5 flex items-center justify-between">
          <Checkbox label="Remember me" minimal withBg withIcon="check" />

          <Link href="#" className="text-body-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
        >
          Sign In
        </button>
      </form>
    </ShowcaseSection>
  );
}
