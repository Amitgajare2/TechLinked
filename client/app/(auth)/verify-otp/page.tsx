"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, Clock } from "lucide-react";
import toast from "react-hot-toast";

import { otpSchema, type OtpFormValues } from "@/src/lib/validations/auth";
import { useVerifyOtp, useResendOtp, useSendOtp } from "@/src/hooks/auth/authHooks";
import { tokenStore } from "@/src/lib/auth/tokenStore";
import OTPIMG from "@/public/images/verification.png"
import verifyPhnImg from "@/public/images/fluent_phone-checkmark-16-filled.png"
import { HeroCopy, Swoosh } from "@/src/components/auth/Icons/AuthIcons";
import { OtpBoxes } from "@/src/components/auth/OtpInput";


const RESEND_SECONDS = 30;

export default function VerifyOtpPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const token = tokenStore.get();
  //   if (token) router.back();
  // }, [router]);

  // const verificationToken = searchParams.get("token") ?? "";
  // const maskedPhone = searchParams.get("phone") ?? "your phone";

  const verificationToken = "";
  const maskedPhone = "your phone";

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [showToast, setShowToast] = useState(false);
  const otpSentRef = useRef(false);

  // const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  // const { mutate: resendOtp, isPending: isResending } = useResendOtp();
  // const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const isVerifying = false;
  const isResending = false;
  const isSendingOtp = false;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const flashToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // useEffect(() => {
  //   if (secondsLeft <= 0) return;
  //   const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [secondsLeft]);

  /* Send initial OTP */
  // useEffect(() => {
  //   if (!verificationToken) {
  //     router.replace("/register");
  //     return;
  //   }
  //   if (otpSentRef.current) return;
  //   otpSentRef.current = true;

  //   sendOtp(
  //     { token: verificationToken },
  //     {
  //       onSuccess: flashToast,
  //       onError: (error) => {
  //         console.error("Send OTP error:", error);
  //         toast.error("Unable to send OTP. Please register again.");
  //         router.replace("/register");
  //       },
  //     }
  //   );
  // }, [verificationToken, router, sendOtp]);

  const onSubmit = (values: OtpFormValues) => {
    // verifyOtp(
    //   { token: verificationToken, otp: values.otp },
    //   {
    //     onSuccess: () => router.push("/login"),
    //     onError: (error) => {
    //       console.error("Verify OTP error:", error);
    //       setError("otp", {
    //         type: "manual",
    //         message: "That code didn't match — check and try again",
    //       });
    //     },
    //   }
    // );
    console.log("Static OTP submit:", values.otp);
  };

  const handleResend = () => {
    // if (secondsLeft > 0 || isResending) return;

    // resendOtp(
    //   { token: verificationToken },
    //   {
    //     onSuccess: () => {
    //       setSecondsLeft(RESEND_SECONDS);
    //       flashToast();
    //     },
    //     onError: (error) => {
    //       console.error("Resend OTP error:", error);
    //       toast.error("Unable to resend code. Please try again.");
    //     },
    //   }
    // );
    console.log("Static resend OTP");
  };

  const isBusy = isVerifying || isSubmitting || isSendingOtp;

  return (
    <main className="min-h-screen bg-white lg:flex">
      {/* Toast */}
      {showToast && (
        <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-green-500 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-md lg:left-auto lg:right-10 lg:translate-x-0">
          <span className="grid size-5 place-items-center rounded-full bg-green-500 text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          Verification code sent
        </div>
      )}

      {/* Desktop hero */}
      <section className="relative hidden lg:block lg:w-1/2">
        <Image src={OTPIMG} alt="Hospitality professionals" fill priority className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-white via-white/90 to-transparent" />
        <div className="absolute bottom-12 left-10 max-w-md">
          <HeroCopy className="text-[48px]" />
          <Swoosh className="ml-6 mt-3 w-28" />
          <p className="mt-4 text-xl text-black">
            Verify your number to secure your account and start connecting.
          </p>
        </div>
      </section>

      {/* Mobile header */}
      <header className="lg:hidden">
        <p className="py-4 text-center text-2xl font-bold text-gray-900">
          Tech<span className="text-orange-500">Linked</span>
        </p>
        <div className="relative aspect-[2/1] w-full">
          <Image src={OTPIMG} alt="Hospitality professionals" fill priority className="object-cover object-[50%_40%]" />
        </div>
        <div className="px-4 pt-4">
          <HeroCopy className="text-2xl" />
          <Swoosh className="ml-4 mt-1 w-16" />
          <p className="mt-2 max-w-[18rem] text-[14px] leading-snug text-gray-700">
            Verify your number to secure your account and start connecting.
          </p>
        </div>
      </header>

      {/* Form side */}
      <section className="flex flex-1 items-center justify-center mt-5 sm:mt-0 px-4 py-6 lg:px-10 lg:py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full max-w-md flex-col items-center text-center lg:max-w-[454px]"
        >
          <span className="grid size-14 place-items-center rounded-xl bg-orange-100 text-orange-500 lg:size-22 lg:rounded-2xl">
            <Image src={verifyPhnImg} alt="Phone verified" className="size-10 lg:size-16" />
          </span>

          <h1 className="mt-3 text-2xl font-bold text-gray-900 lg:mt-6 lg:text-5xl">Verify your number</h1>
          <p className="mt-2 text-xs text-gray-500 lg:mt-3 lg:text-sm">
            We&apos;ve sent a 6-digit verification code to {maskedPhone}.
            <br className="hidden lg:block" /> Wrong number?{" "}
            <Link href="/register" className="font-semibold text-orange-500">
              Change
            </Link>
          </p>

          <p className="mt-5 flex items-center gap-1.5 text-[11px] text-gray-500 lg:mt-6 lg:text-sm">
            <Clock className="size-4" />
            Code Expires in 10 minutes
          </p>

          <div className="mt-5 lg:mt-6">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => <OtpBoxes onChange={field.onChange} error={Boolean(errors.otp)} />}
            />
          </div>

          {errors.otp && <p className="mt-2 text-xs text-red-500">{errors.otp.message}</p>}

          <button
            type="submit"
            disabled={isBusy}
            className="mt-5 h-9 w-full rounded-md bg-orange-500 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 lg:mt-7 lg:h-11 lg:text-base"
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
          </button>

          <p className="mt-4 text-[11px] text-gray-500 lg:mt-6 lg:text-sm">
            Didn&apos;t receive the code?{" "}
            {secondsLeft > 0 ? (
              <>Resend in {secondsLeft}s</>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold text-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            )}
          </p>
        </form>
      </section>
    </main>
  );
}