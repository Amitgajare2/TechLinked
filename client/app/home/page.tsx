"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/src/services/auth.service"

export default function HomePage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.replace("/login")
      return
    }
    const name = localStorage.getItem("firstName") || "User"
    setFirstName(name)
  }, [router])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
    } catch {
      // Even if the server call fails, clear local state
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("firstName")
      router.replace("/login")
    }
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
