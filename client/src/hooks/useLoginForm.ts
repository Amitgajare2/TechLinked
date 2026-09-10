import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { loginSchema } from "@/src/schemas"
import type { LoginFormData } from "@/src/schemas"
import { login } from "@/src/services/auth.service"
import { useAuth } from "@/src/context/AuthContext"

export function useLoginForm() {
  const { onLoginSuccess } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      await onLoginSuccess(res.data.accessToken)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ email: data.email, password: data.password })
  })

  const errorMsg = mutation.error
    ? ((mutation.error as { message?: string })?.message || "Login failed. Please try again.").slice(0, 200)
    : ""

  return {
    register,
    handleSubmit: onSubmit,
    errors,
    loading: mutation.isPending,
    error: errorMsg,
    clearError: () => mutation.reset(),
  }
}
