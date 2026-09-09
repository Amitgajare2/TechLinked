import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/src/schemas"
import type { RegisterFormData } from "@/src/schemas"
import { register, sendOtp } from "@/src/services/auth.service"

interface UseRegisterFormOptions {
  onOtpReady: (phone: string) => void
}

export function useRegisterForm({ onOtpReady }: UseRegisterFormOptions) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError("")
    setLoading(true)

    const fullPhone = `+91${data.phone}`

    // register  hard fail, show error if this fails
    try {
      await register({
        FirstName: data.firstName,
        LastName: data.lastName,
        email: data.email,
        phone: fullPhone,
        password: data.password,
      })
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ||
        "Registration failed. Please try again."
      setError(msg.slice(0, 200))
      setLoading(false)
      return
    }

    //  send OTP  non-fatal, user can resend from OTP screen
    try {
      await sendOtp(fullPhone)
    } catch {
      // Ignore user is registered and can use Resend OTP
    }

    setLoading(false)
    onOtpReady(fullPhone)
  }

  return {
    field,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    error,
    clearError: () => setError(""),
  }
}
