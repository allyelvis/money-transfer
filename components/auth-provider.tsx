"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const res = await fetch("/api/auth/session")

        if (!res.ok) {
          console.error("Failed to fetch session:", res.status, res.statusText)
          setUser(null)
          if (pathname.startsWith("/dashboard")) {
            router.push("/login")
          }
          return
        }

        const data = await res.json()
        if (data.user) {
          setUser(data.user)
        } else {
          setUser(null)
          if (pathname.startsWith("/dashboard")) {
            router.push("/login")
          }
        }
      } catch (error) {
        console.error("Failed to load user session:", error)
        setUser(null)
        if (pathname.startsWith("/dashboard")) {
          router.push("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserFromSession()
  }, [pathname, router])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

