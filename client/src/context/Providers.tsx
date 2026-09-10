"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/src/lib/queryClient"
import { AuthProvider } from "@/src/context/AuthContext"

// Root providers 

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
