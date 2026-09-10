import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { registerSchema } from "@/src/schemas"
import type { RegisterFormData } from "@/src/schemas"
import { register, sendOtp } from "@/src/services/auth.service"

interface UseRegisterFormOptions {
  onOtpReady: (phone: string) => void
}

export function useRegisterForm({ onOtpReady }: UseRegisterFormOptions) {
  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  // Mutation register fail
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async (_, variables) => {
      // After register succeeds sendOtp 
      try {
        await sendOtp(variables.phone)
      } catch {
        // User is registered they can resend from OTP screen
      }
      onOtpReady(variables.phone)
    },
  })

  const onSubmit = handleSubmit((data) => {
    const fullPhone = `+91${data.phone}`
    registerMutation.mutate({
      FirstName: data.firstName,
      LastName: data.lastName,
      email: data.email,
      phone: fullPhone,
      password: data.password,
    })
  })

  const errorMsg = registerMutation.error
    ? ((registerMutation.error as { message?: string })?.message || "Registration failed. Please try again.").slice(0, 200)
    : ""

  return {
    field,
    handleSubmit: onSubmit,
    errors,
    loading: registerMutation.isPending,
    error: errorMsg,
    clearError: () => registerMutation.reset(),
  }
}
