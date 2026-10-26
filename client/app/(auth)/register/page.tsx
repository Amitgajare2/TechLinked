"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, Mail, Phone, Lock } from "lucide-react";
import toast from "react-hot-toast";
import RegisterImg from "@/public/images/registerImage.png"
import {
  registerSchema,
  type RegisterFormValues,
  // type RegisterPayload,
} from "@/src/lib/validations/auth";
// import { useRegister } from "@/src/hooks/auth/authHooks";
// import { tokenStore } from "@/src/lib/auth/tokenStore";
import { Field, GoogleIcon, HeroCopy, MicrosoftIcon, Swoosh } from "@/src/components/auth/Icons/AuthIcons";



export default function RegisterPage() {
  const router = useRouter();
  // const { mutate: registerMutate, isPending: isRegistering } = useRegister();
  const isRegistering = false;
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showUnderWorking, setShowUnderWorking] = useState(false);

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
    // const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    // if (isDesktop && !accepted) return setTermsError(true);

    // const payload: RegisterPayload = {
    //   FirstName: values.firstName,
    //   LastName: values.lastName,
    //   email: values.email,
    //   phone: values.phone,
    //   password: values.password,
    // };

    // registerMutate(payload, {
    //   onSuccess: (data) => {
    //     console.log("Registration successful");
    //     router.replace(`/verify-otp?token=${data.verificationToken}`);
    //   },
    // });
    setShowUnderWorking(true);
  };

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // void handleSubmit(onSubmit, () => {
    //   toast.error("Please correct the highlighted fields and try again.");
    // })(event);
    setShowUnderWorking(true);
  };

  const social = (provider: string) => {
    // console.log({ provider });
    setShowUnderWorking(true);
  };

  return (
    <main className="min-h-screen bg-white lg:flex">
      {/* Desktop hero */}
      <section className="relative hidden lg:block lg:w-1/2">
        <Image src={RegisterImg} alt="Hospitality professionals" fill priority className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white via-white/90 to-transparent" />
        <div className="absolute bottom-12 left-10 max-w-md">
          <HeroCopy className="text-5xl" />
          <Swoosh className="ml-6 mt-3 w-28" />
          <p className="mt-4 max-w-xs text-base text-gray-600 font-semibold">
            connect with professionals, discover opportunities and grow in the hospitality industry.
          </p>
        </div>
      </section>

      {/* Mobile header */}
      <header className="lg:hidden">
        <p className="py-4 text-center text-2xl font-bold text-gray-900">
          Tech<span className="text-orange-500">Linked</span>
        </p>
        <div className="relative aspect-[2/1] w-full">
          <Image src={RegisterImg} alt="Hospitality professionals" fill priority className="object-cover object-[50%_30%]" />
        </div>
        <div className="px-4 pt-4">
          <HeroCopy className="text-[22px]" />
          <Swoosh className="ml-4 mt-1 w-16" />
          <p className="mt-2 max-w-[18rem] text-[11px] leading-snug text-gray-600 font-semibold">
            connect with professionals, discover opportunities and grow in the hospitality industry.
          </p>
        </div>
      </header>

      {/* Form side */}
      <section className="flex flex-1 flex-col justify-center px-4 py-6 lg:px-10 lg:py-12">
        <div className="mx-auto w-full max-w-md lg:max-w-[520px]">
          <h1 className="text-center text-2xl font-semibold text-gray-900 lg:text-left lg:text-5xl">
            Create your account
          </h1>
          <p className="mt-1 text-center text-xs font-semibold text-gray-500 lg:text-left lg:text-base">
            Join TechLinked and grow your hospitality network.
          </p>

          <form
            onSubmit={handleRegisterSubmit}
            noValidate
            className="mt-5 rounded-lg border border-gray-200 border-t-4 border-t-orange-500 bg-white p-4 shadow-sm lg:mt-8 lg:p-6"
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 lg:gap-x-4 lg:gap-y-4">
              <Field label="First Name" icon={User} placeholder="Enter your first name" error={errors.firstName?.message} {...register("firstName")} />
              <Field label="Last Name" icon={User} placeholder="Enter your last name" error={errors.lastName?.message} {...register("lastName")} />
              <Field label="Email" icon={Mail} type="email" placeholder="Enter your email" error={errors.email?.message} {...register("email")} />
              <Field label="Phone Number" icon={Phone} type="tel" placeholder="Enter your phone number" error={errors.phone?.message} {...register("phone")} />
              <Field className="col-span-2" label="Password" icon={Lock} secure placeholder="Create a password" error={errors.password?.message} {...register("password")} />
              <Field className="col-span-2" label="Password" icon={Lock} secure placeholder="Re-enter password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
            </div>

            <div className="mt-4 hidden lg:block">
              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => {
                    setAccepted(e.target.checked);
                    setTermsError(false);
                  }}
                  className="size-5 rounded border-gray-300 accent-orange-500" />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-orange-500">Terms of Service</Link> and{" "}
                  <Link href="/privacy" className="text-orange-500">Privacy Policy.</Link>
                </span>
              </label>
              {termsError && <p className="mt-1 text-xs text-red-500">Please accept the terms to continue</p>}
            </div>

            <button
              type="submit"
              onClick={() => setShowUnderWorking(true)}
              disabled={isSubmitting || isRegistering}
              className="mt-4 h-10 w-full rounded-md bg-orange-500 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 lg:h-11 lg:text-base"
            >
              {isRegistering ? "Creating account..." : "Create Account"}
            </button>

            <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
              <span className="h-px flex-1 bg-gray-300" />
              OR
              <span className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {[
                { name: "google", label: "Continue with Google", icon: <GoogleIcon /> },
                { name: "microsoft", label: "Continue with Microsoft", icon: <MicrosoftIcon /> },
              ].map(({ name, label, icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => social(name)}
                  className="flex h-9 items-center justify-center gap-2 rounded-md border border-gray-400 bg-white text-xs font-medium text-gray-800 transition hover:bg-gray-50 lg:h-10 lg:text-sm"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-xs text-gray-500 lg:text-left lg:text-base">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-orange-500">Sign In</Link>
            </p>

            <p className="mt-3 text-center text-[10px] text-gray-500 lg:hidden">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy.</Link>
            </p>
          </form>

          <div className="mt-6 hidden justify-end lg:flex">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-400 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
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