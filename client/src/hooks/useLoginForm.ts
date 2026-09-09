import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/src/schemas"
import type { LoginFormData } from "@/src/schemas"
import { login } from "@/src/services/auth.service"
import { useAuth } from "@/src/context/AuthContext"

export function useLoginForm() {
  const { onLoginSuccess } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError("")
    setLoading(true)
    try {
      const res = await login({ email: data.email, password: data.password })
      await onLoginSuccess(res.data.accessToken)
      // Navigation is handled by the page after context hydrates
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ||
        "Login failed. Please try again."
      setError(msg.slice(0, 200))
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    error,
    clearError: () => setError(""),
  }
}
