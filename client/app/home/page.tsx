"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/context/AuthContext"

export default function HomePage() {
  const router = useRouter()
  const { user, initializing, logoutLoading, logout } = useAuth()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/login")
    }
  }, [user, initializing, router])

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold">Hello, {user.firstName}!</p>
      <button
        onClick={logout}
        disabled={logoutLoading}
        className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {logoutLoading ? "Logging out…" : "Logout"}
      </button>
    </div>
  )
}
