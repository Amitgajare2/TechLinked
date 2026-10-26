"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DM_Serif_Display } from "next/font/google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { loginSchema, type LoginFormValues } from "@/src/lib/validations/auth";
// import { useLogin } from "@/src/hooks/auth/authHooks";
// import { tokenStore } from "@/src/lib/auth/tokenStore";
import LoginImg from "@/public/images/registerImage.png"
import { ErrorTag, GoogleIcon, MicrosoftIcon, Swoosh } from "@/src/components/auth/Icons/AuthIcons";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });





const inputClass = "h-11 w-full rounded-md border bg-white pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showUnderWorking, setShowUnderWorking] = useState(false);
  // const { mutate: loginMutate, isPending: isLoggingIn } = useLogin();
  const isLoggingIn = false;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // useEffect(() => {
  //   const token = tokenStore.get();
  //   if (token) router.back();
  // }, [router]);

  const onSubmit = async (values: LoginFormValues) => {
    // loginMutate({ ...values, remember });
    setShowUnderWorking(true);
  };

  const social = (provider: string) => {
    // console.log({ provider });
    setShowUnderWorking(true);
  };

  const fieldState = (error?: string) => error ? "border-red-500 focus:ring-red-500/20" : "border-gray-300 focus:border-orange-500 focus:ring-orange-500/20";

  return (
    <main className="min-h-screen bg-stone-50 lg:flex">
      {/* Desktop hero */}
      <section className="relative hidden bg-white lg:block lg:w-1/2">
        <Image src={LoginImg} alt="Hospitality professionals" fill priority className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-white via-white/90 to-transparent" />
        <div className="absolute bottom-12 left-10 max-w-lg">
          <h2 className={`${dmSerif.className} text-[44px] leading-[1.15] text-gray-900`}>
            Connect. Grow. Build
            <span className="block">
              Your <span className="italic text-orange-500">Hospitality Career.</span>
            </span>
          </h2>
          <Swoosh className="ml-4 mt-2 w-24" />
          <p className="mt-3 max-w-xs text-sm text-gray-600">
            Join Hospitality professionals, discover opportunities and grow your industry network.
          </p>
        </div>
      </section>

      {/* Mobile hero */}
      <div className="relative aspect-[2/1] w-full lg:hidden">
        <Image src={LoginImg} alt="Hospitality professionals" fill priority className="object-cover object-[50%_25%]" />
      </div>

      {/* Form side */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-8 lg:px-10 lg:py-12">
        <span className="absolute -left-16 -top-32 size-[300px] rounded-full bg-orange-500 lg:-left-14 lg:-top-28 lg:size-[380px] 2xl:size-[420px]" />

        <div className="relative w-full max-w-md lg:max-w-[520px]">
          <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
            <span className="text-white">Welcome</span> Back
          </h1>
          <p className="mt-1 text-xs font-medium text-gray-800 lg:text-sm">
            Sign in to continue to your hospitality network.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 rounded-lg border border-gray-200 border-t-4 border-t-orange-500 bg-white p-5 shadow-sm lg:mt-10 lg:p-6"
          >
            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="text-sm font-semibold text-gray-900">Email</label>
              <div className="relative mt-1.5">
                {errors.email && <ErrorTag>{errors.email.message}</ErrorTag>}
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${inputClass} pr-3 ${fieldState(errors.email?.message)}`}
                  {...register("email")}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-900">Password</label>
                <Link href="/forgot-password" className="text-xs font-medium text-orange-500">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative mt-1.5">
                {errors.password && <ErrorTag>{errors.password.message}</ErrorTag>}
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-10 ${fieldState(errors.password?.message)}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-gray-300 accent-orange-500"
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              onClick={() => setShowUnderWorking(true)}
              disabled={isLoggingIn || isSubmitting}
              className="mt-4 h-11 w-full rounded-md bg-orange-500 text-base font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting || isLoggingIn ? "Signing in..." : "Sign In"}
            </button>

            <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
              <span className="h-px flex-1 bg-gray-300" />
              OR
              <span className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "google", label: "Continue with Google", icon: <GoogleIcon /> },
                { name: "microsoft", label: "Continue with Microsoft", icon: <MicrosoftIcon /> },
              ].map(({ name, label, icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => social(name)}
                  className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-400 bg-white text-xs font-medium text-gray-800 transition hover:bg-gray-50"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-sm text-gray-500">
              New to TechLinked?{" "}
              <Link href="/register" className="font-medium text-orange-500 underline">Register</Link>
            </p>

            <p className="mx-auto mt-3 max-w-[18rem] text-center text-[11px] leading-snug text-gray-500">
              By Continuing, you agree to our{" "}
              <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy.</Link>
            </p>
          </form>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-400 bg-white px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </section>

      {showUnderWorking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <p className="text-xl font-bold text-gray-900">Under Working</p>
            <p className="mt-2 text-sm text-gray-600">
              This feature is currently under development.
            </p>
            <button
              type="button"
              onClick={() => setShowUnderWorking(false)}
              className="mt-5 w-full rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}