"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "@/src/components/auth/AuthLayout";
import FormField from "@/src/components/auth/FormField";
import { loginSchema, type LoginFormValues } from "@/src/lib/validations/auth";

export default function LoginPage() {
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log(values, { remember });
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle={
        <>
          New here?{" "}
          <Link href="/register" className="text-[#4C5FFF] hover:text-[#6E7CFF] transition-colors">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          id="email"
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormField
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          labelExtra={
            <Link
              href="/forgot-password"
              className="text-[13px] text-[#9FB0CC] hover:text-[#4C5FFF] transition-colors"
            >
              Forgot?
            </Link>
          }
          {...register("password")}
        />

        <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded-[4px] bg-[#122C52] border border-[#1E3A63] accent-[#4C5FFF] cursor-pointer"
          />
          <span className="text-[13px] text-[#9FB0CC]">Keep me signed in</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4C5FFF] hover:bg-[#6E7CFF] disabled:opacity-60 disabled:cursor-not-allowed text-[#0B2340] font-medium text-[14px] rounded-md py-2.5 transition-colors mt-2"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-7">
        <div className="h-px flex-1 bg-[#1E3A63]" />
        <span className="font-mono text-[12px] text-[#6D84A8]">or</span>
        <div className="h-px flex-1 bg-[#1E3A63]" />
      </div>

      <p className="text-[12px] text-[#6D84A8] mt-10 leading-relaxed">
        By continuing, you agree to TechLinked&apos;s Terms of Service and Privacy Policy.
      </p>
    </AuthLayout>
  );
}