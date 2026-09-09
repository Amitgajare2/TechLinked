"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
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

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthUser {
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
  /** true while a logout request is in flight */
  logoutLoading: boolean
  /** Call after a successful login to hydrate the context */
  onLoginSuccess: (accessToken: string) => Promise<void>
  logout: () => Promise<void>
}

// Context 
const AuthContext = createContext<AuthContextValue | null>(null)

// Provider 
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [initializing, setInitializing] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)

  /** Fetch profile from server and store in context */
  const fetchAndSetUser = useCallback(async () => {
    const profile = await apiRequest<ProfileResponse>("/api/profile")
    setUser({
      id: profile.data.id,
      firstName: profile.data.FirstName,
      lastName: profile.data.LastName,
      email: profile.data.email,
      phone: profile.data.phone,
    })
  }, [])

  /** Called by login page after a successful login response */
  const onLoginSuccess = useCallback(
    async (accessToken: string) => {
      setAccessToken(accessToken)
      await fetchAndSetUser()
    },
    [fetchAndSetUser]
  )

  const logout = useCallback(async () => {
    setLogoutLoading(true)
    try {
      await logoutService()
    } catch {
      // Server-side revocation failed — still clear client state
    } finally {
      clearAccessToken()
      setUser(null)
      setLogoutLoading(false)
    }
  }, [])

  /** On mount: try to restore session via httpOnly refresh token cookie */
  useEffect(() => {
    const init = async () => {
      // Already have an in-memory token (e.g. navigated from login)
      if (getAccessToken()) {
        try {
          await fetchAndSetUser()
        } catch {
          clearAccessToken()
        }
        setInitializing(false)
        return
      }

      // No in-memory token — try silent refresh via cookie
      try {
        const res = await refreshAccessToken()
        setAccessToken(res.data.accessToken)
        await fetchAndSetUser()
      } catch {
        // No valid session — user must log in
        clearAccessToken()
      } finally {
        setInitializing(false)
      }
    }

    init()
  }, [fetchAndSetUser])

  return (
    <AuthContext.Provider
      value={{ user, initializing, logoutLoading, onLoginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

//  Hook 
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
