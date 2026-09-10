"use client"

import {
  createContext,
  useCallback,
  useContext,
} from "react"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import {
  refreshAccessToken,
  logout as logoutService,
} from "@/src/services/auth.service"
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "@/src/lib/token"
import { apiRequest } from "@/src/lib/api"

// Types 

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface AuthContextValue {
  user: AuthUser | null
  /** true while the initial session check is running */
  initializing: boolean
  /** true while logout mutation is in flight */
  logoutLoading: boolean
  /** Call after a successful login response to hydrate the context */
  onLoginSuccess: (accessToken: string) => Promise<void>
  logout: () => void
}

// Query keys

export const authKeys = {
  session: ["auth", "session"] as const,
}

// Profile fetcher 

interface ProfileResponse {
  success: boolean
  data: {
    id: string
    FirstName: string
    LastName: string
    email: string
    phone: string
  }
}

async function fetchSession(): Promise<AuthUser> {
  // Try existing in memory token
  if (!getAccessToken()) {
    // mo token attempt silent refresh via http only cookie
    const res = await refreshAccessToken()
    setAccessToken(res.data.accessToken)
  }

  // Fetch profile with valid token
  const profile = await apiRequest<ProfileResponse>("/api/profile")
  return {
    id: profile.data.id,
    firstName: profile.data.FirstName,
    lastName: profile.data.LastName,
    email: profile.data.email,
    phone: profile.data.phone,
  }
}

// Context
const AuthContext = createContext<AuthContextValue | null>(null)

// Providar

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient()

 
  const { data: user = null, isLoading: initializing } = useQuery({
    queryKey: authKeys.session,
    queryFn: fetchSession,
    retry: false,
    throwOnError: false,
  })

  const logoutMutation = useMutation({
    mutationFn: logoutService,
    onSettled: () => {
      clearAccessToken()
      qc.setQueryData(authKeys.session, null)
      qc.removeQueries({ queryKey: authKeys.session })
    },
  })

  /** login hook after a successful login */
  const onLoginSuccess = useCallback(
    async (accessToken: string) => {
      setAccessToken(accessToken)
      await qc.invalidateQueries({ queryKey: authKeys.session })
    },
    [qc]
  )

  const logout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        logoutLoading: logoutMutation.isPending,
        onLoginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook 

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
