import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { sendOtp, verifyOtp } from "@/src/services/auth.service"

interface UseOtpFormOptions {
  phone: string
  onVerified: () => void
}

export function useOtpForm({ phone, onVerified }: UseOtpFormOptions) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const [resendCooldown, setResendCooldown] = useState(30)

  // Countdown timar
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((v) => v - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  // verify mutation
  const verifyMutation = useMutation({
    mutationFn: ({ p, code }: { p: string; code: string }) =>
      verifyOtp(p, code),
    onSuccess: () => {
      onVerified()
    },
  })

  // resend mutation
  const resendMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      setResendCooldown(30)
    },
  })

  const loading = verifyMutation.isPending || resendMutation.isPending

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
    if (!pasted) return
    const next = pasted
      .split("")
      .concat(["", "", "", "", "", ""])
      .slice(0, 6)
    setDigits(next)
    document.getElementById(
      `otp-${Math.min(pasted.length, 6) - 1}`
    )?.focus()
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const code = digits.join("")
    if (code.length !== 6 || !phone) return
    verifyMutation.mutate({ p: phone, code })
  }

  const handleResend = () => {
    if (!phone || resendCooldown > 0) return
    resendMutation.mutate(phone)
  }

  const reset = () => {
    setDigits(["", "", "", "", "", ""])
    verifyMutation.reset()
    resendMutation.reset()
  }

  const rawError =
    verifyMutation.error || resendMutation.error
  const error = rawError
    ? (
        (rawError as { message?: string })?.message ||
        "Something went wrong. Please try again."
      ).slice(0, 200)
    : ""

  // Successs
  const success = resendMutation.isSuccess
    ? "OTP resent successfully."
    : verifyMutation.isSuccess
      ? "Phone verified! You can now sign in."
      : ""

  return {
    digits,
    loading,
    error,
    success,
    resendCooldown,
    isComplete: digits.join("").length === 6,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,
    reset,
  }
}
