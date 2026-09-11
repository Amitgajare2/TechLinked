"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShieldCheck } from "lucide-react";
import AuthLayout from "@/src/components/auth/AuthLayout";
import OtpInput from "@/src/components/auth/OtpInput";
import { otpSchema, type OtpFormValues } from "@/src/lib/validations/auth";
import { useVerifyOtp, useResendOtp } from "@/src/hooks/auth/authHooks";

const RESEND_SECONDS = 30;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationToken, setVerificationToken] = useState(searchParams.get("token") ?? "");
  const maskedPhone = searchParams.get("maskedPhone");

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const onSubmit = (values: OtpFormValues) => {
    verifyOtp(
      { token: verificationToken, otp: values.otp },
      {
        onError: () => {
          setError("otp", { message: "That code didn't match — check and try again" });
        },
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    resendOtp(
      { token: verificationToken },
      {
        onSuccess: (data: { verificationToken: string }) => {
          setVerificationToken(data.verificationToken);
        },
      }
    );
    setSecondsLeft(RESEND_SECONDS);
  };

  const isBusy = isVerifying || isSubmitting;

  return (
    <AuthLayout
      title="Verify your number"
      subtitle={
        <>
          We sent a 6-digit code to{" "}
          <span className="text-[#EDEFF7]">{maskedPhone ?? "your phone"}</span>.{" "}
          <Link href="/register" className="text-[#4C5FFF] hover:text-[#6E7CFF] transition-colors">
            Wrong number?
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={16} strokeWidth={1.75} className="text-[#4C5FFF]" />
          <span className="font-mono text-[12px] text-[#6D84A8]">
            one-time code · expires in 10 min
          </span>
        </div>

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput value={field.value} onChange={field.onChange} error={Boolean(errors.otp)} />
          )}
        />
        {errors.otp && <p className="text-[12px] text-[#FF6B6B]">{errors.otp.message}</p>}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full bg-[#4C5FFF] hover:bg-[#6E7CFF] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 text-[#0B2340] font-medium text-[14px] rounded-md py-2.5 transition-all mt-1"
        >
          {isBusy ? "Verifying..." : "Verify and continue"}
        </button>

        <p className="text-center text-[13px] text-[#9FB0CC]">
          Didn&apos;t get it?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0 || isResending}
            className="text-[#4C5FFF] hover:text-[#6E7CFF] disabled:text-[#6D84A8] disabled:cursor-not-allowed transition-colors"
          >
            {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : isResending ? "Sending..." : "Resend code"}
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}