"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "@/src/components/auth/AuthLayout";
import OtpInput from "@/src/components/auth/OtpInput";

import {
  otpSchema,
  type OtpFormValues,
} from "@/src/lib/validations/auth";

import {
  useVerifyOtp,
  useResendOtp,
  useSendOtp,
} from "@/src/hooks/auth/authHooks";

const RESEND_SECONDS = 30;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const verificationToken = searchParams.get("token") ?? "";

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const otpSentRef = useRef(false);

  const {
    mutate: verifyOtp,
    isPending: isVerifying,
  } = useVerifyOtp();

  const {
    mutate: resendOtp,
    isPending: isResending,
  } = useResendOtp();

  const {
    mutate: sendOtp,
    isPending: isSendingOtp,
  } = useSendOtp();

  const {
    control,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  /*
   * --------------------------------------------------
   * OTP COUNTDOWN
   * --------------------------------------------------
   */

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((previous) => previous - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [secondsLeft]);

  /*
   * --------------------------------------------------
   * SEND INITIAL OTP
   * --------------------------------------------------
   */

  useEffect(() => {
    if (!verificationToken) {
      router.replace("/register");
      return;
    }

    if (otpSentRef.current) {
      return;
    }

    otpSentRef.current = true;

    sendOtp(
      {
        token: verificationToken,
      },
      {
        onError: (error) => {
          console.error("Send OTP error:", error);

          toast.error(
            "Unable to send OTP. Please register again."
          );

          router.replace("/register");
        },
      }
    );
  }, [verificationToken, router, sendOtp]);



  const onSubmit = (values: OtpFormValues) => {
    verifyOtp(
      {
        token: verificationToken,
        otp: values.otp,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },

        onError: (error) => {
          console.error("Verify OTP error:", error);

          setError("otp", {
            type: "manual",
            message:
              "That code didn't match — check and try again",
          });
        },
      }
    );
  };


  const handleResend = () => {
    if (secondsLeft > 0 || isResending) {
      return;
    }

    resendOtp(
      {
        token: verificationToken,
      },
      {
        onSuccess: () => {
          setSecondsLeft(RESEND_SECONDS);
        },

        onError: (error) => {
          console.error("Resend OTP error:", error);

          toast.error(
            "Unable to resend code. Please try again."
          );
        },
      }
    );
  };


  const isBusy = isVerifying || isSubmitting || isSendingOtp;

  return (
    <AuthLayout
      title="Verify your number"
      subtitle={
        <>
          We sent a 6-digit code to{" "}
          <span className="text-[#EDEFF7]">
            your phone
          </span>
          .{" "}
          <Link
            href="/register"
            className="text-[#4C5FFF] hover:text-[#6E7CFF] transition-colors"
          >
            Wrong number?
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck
            size={16}
            strokeWidth={1.75}
            className="text-[#4C5FFF]"
          />

          <span className="font-mono text-[12px] text-[#6D84A8]">
            one-time code · expires in 10 min
          </span>
        </div>

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              error={Boolean(errors.otp)}
            />
          )}
        />

        {errors.otp && (
          <p className="text-[12px] text-[#FF6B6B]">
            {errors.otp.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="
            w-full
            bg-[#4C5FFF]
            hover:bg-[#6E7CFF]
            active:scale-[0.98]
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:active:scale-100
            text-[#0B2340]
            font-medium
            text-[14px]
            rounded-md
            py-2.5
            transition-all
            mt-1
          "
        >
          {isVerifying
            ? "Verifying..."
            : "Verify and continue"}
        </button>

        {/* Resend */}
        <p className="text-center text-[13px] text-[#9FB0CC]">
          Didn&apos;t get it?{" "}

          <button
            type="button"
            onClick={handleResend}
            disabled={
              secondsLeft > 0 || isResending
            }
            className="
              text-[#4C5FFF]
              hover:text-[#6E7CFF]
              disabled:text-[#6D84A8]
              disabled:cursor-not-allowed
              transition-colors
            "
          >
            {secondsLeft > 0
              ? `Resend in ${secondsLeft}s`
              : isResending
              ? "Sending..."
              : "Resend code"}
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}