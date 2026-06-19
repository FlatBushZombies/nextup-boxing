"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useUser, useClerk } from "@clerk/nextjs"

export type Member = {
  id: string
  firstName: string
  lastName: string
  email: string
  memberSince: string
}

type AuthContextType = {
  member: Member | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser()
  const { signOut: clerkSignOut } = useClerk()

  const member: Member | null = user
    ? {
        id: user.id,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.primaryEmailAddress?.emailAddress ?? "",
        memberSince: new Date(user.createdAt!).getFullYear().toString(),
      }
    : null

  const signOut = async () => {
    await clerkSignOut()
  }

  return (
    <AuthContext.Provider value={{ member, isLoading: !isLoaded, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}