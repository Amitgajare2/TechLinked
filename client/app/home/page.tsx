"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/src/services/auth.service"
import { getAccessToken, clearAccessToken, setAccessToken } from "@/src/lib/token"
import { refreshAccessToken } from "@/src/services/auth.service"
import { apiRequest } from "@/src/lib/api"

interface ProfileResponse {
  success: boolean
  data: {
    FirstName: string
    LastName: string
  }
}

export default function HomePage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const init = async () => {
      let token = getAccessToken()

      // No in-memory token — try to silently refresh via the httpOnly cookie
      if (!token) {
        try {
          const res = await refreshAccessToken()
          setAccessToken(res.data.accessToken)
          token = res.data.accessToken
        } catch {
          router.replace("/login")
          return
        }
      }

      // Fetch the user's name from the server — don't trust localStorage
      try {
        const profile = await apiRequest<ProfileResponse>("/api/profile")
        setFirstName(profile.data.FirstName)
      } catch {
        // Profile fetch failed but token is valid — show fallback
        setFirstName("User")
      } finally {
        setChecking(false)
      }
    }

    init()
  }, [router])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
    } catch {
      // Even if the server call fails, clear local state
    } finally {
      clearAccessToken()
      router.replace("/login")
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold">Hello, {firstName}!</p>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Logging out…" : "Logout"}
      </button>
    </div>
  )
}
