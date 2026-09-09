import { useEffect, useState } from "react"
import { sendOtp, verifyOtp } from "@/src/services/auth.service"

interface UseOtpFormOptions {
  phone: string
  onVerified: () => void
}

export function useOtpForm({ phone, onVerified }: UseOtpFormOptions) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [resendCooldown, setResendCooldown] = useState(30)

  // Countdown timer for resend 
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((v) => v - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    const next = pasted.split("").concat(["", "", "", "", "", ""]).slice(0, 6)
    setDigits(next)
    document.getElementById(`otp-${Math.min(pasted.length, 6) - 1}`)?.focus()
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const code = digits.join("")
    if (code.length !== 6 || !phone) return

    setError("")
    setSuccess("")
    setLoading(true)
    try {
      await verifyOtp(phone, code)
      setSuccess("Phone verified! You can now sign in.")
      onVerified()
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ||
        "OTP verification failed. Please try again."
      setError(msg.slice(0, 200))
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!phone || resendCooldown > 0) return
    setError("")
    setSuccess("")
    setLoading(true)
    try {
      await sendOtp(phone)
      setSuccess("OTP resent successfully.")
      setResendCooldown(30)
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ||
        "Failed to resend OTP. Please try again."
      setError(msg.slice(0, 200))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setDigits(["", "", "", "", "", ""])
    setError("")
    setSuccess("")
  }

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
