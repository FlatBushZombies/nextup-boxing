"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Member = {
  firstName: string
  lastName: string
  email: string
  country: string
  memberSince: string
  magazineSubscribed: boolean
  merchDropNotifications: boolean
}

type AuthContextType = {
  member: Member | null
  isLoading: boolean
  signIn: (email: string) => void
  signOut: () => void
  updateMember: (updates: Partial<Member>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = "nextup_member"

// Mock member returned on sign in. Real auth will replace this later.
function createMockMember(email: string): Member {
  const namePart = email.split("@")[0] ?? "member"
  const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1)
  return {
    firstName,
    lastName: "Carter",
    email,
    country: "United States",
    memberSince: "2026",
    magazineSubscribed: true,
    merchDropNotifications: false,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setMember(JSON.parse(stored) as Member)
    } catch {
      // ignore parse errors
    }
    setIsLoading(false)
  }, [])

  const persist = (next: Member | null) => {
    setMember(next)
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      else window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore storage errors
    }
  }

  const signIn = (email: string) => persist(createMockMember(email))
  const signOut = () => persist(null)
  const updateMember = (updates: Partial<Member>) => {
    setMember((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...updates }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  return (
    <AuthContext.Provider
      value={{ member, isLoading, signIn, signOut, updateMember }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
