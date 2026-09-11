"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, Mail, Phone, Lock } from "lucide-react";
import AuthLayout from "@/src/components/auth/AuthLayout";
import FormField from "@/src/components/auth/FormField";
import {
  registerSchema,
  type RegisterFormValues,
  type RegisterPayload,
} from "@/src/lib/validations/auth";
import { useRegister } from "@/src/hooks/auth/authHooks";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

const { mutate: registerMutate, isPending: isRegistering } = useRegister();
const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const payload: RegisterPayload = {
      FirstName: values.firstName,
      LastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };
    registerMutate(payload,{
      onError: (error:any) => {
        console.error("Registration error:", error);
      },
      onSuccess: (data) => {
        console.log("Registration successful");
        router.replace(`/verify-otp?token=${data.verificationToken}`);
      }
    });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already on TechLinked?{" "}
          <Link href="/login" className="text-[#4C5FFF] hover:text-[#6E7CFF] transition-colors">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="firstName"
            label="First name"
            icon={User}
            placeholder="Kundan"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <FormField
            id="lastName"
            label="Last name"
            icon={User}
            placeholder="Patil"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <FormField
          id="email"
          label="Email"
          icon={Mail}
          type="email"
          placeholder="kundan@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormField
          id="phone"
          label="Phone number"
          icon={Phone}
          type="tel"
          placeholder="9876543210"
          maxLength={10}
          error={errors.phone?.message}
          {...register("phone")}
        />

        <FormField
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4C5FFF] hover:bg-[#6E7CFF] disabled:opacity-60 disabled:cursor-not-allowed text-[#0B2340] font-medium text-[14px] rounded-md py-2.5 transition-colors mt-2"
        >
         {isSubmitting || isRegistering ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-[12px] text-[#6D84A8] mt-8 leading-relaxed">
        By creating an account, you agree to TechLinked&apos;s Terms of Service and Privacy Policy.
      </p>
    </AuthLayout>
  );
}