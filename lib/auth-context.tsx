"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { User } from "@supabase/supabase-js"
import { supabaseBrowser } from "@/lib/supabase-browser"

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
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

function memberFromUser(user: User): Member {
  const meta = user.user_metadata ?? {}
  const namePart = (user.email ?? "member").split("@")[0]
  return {
    id: user.id,
    firstName: meta.first_name ?? namePart.charAt(0).toUpperCase() + namePart.slice(1),
    lastName: meta.last_name ?? "",
    email: user.email ?? "",
    memberSince: new Date(user.created_at).getFullYear().toString(),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setMember(data.session?.user ? memberFromUser(data.session.user) : null)
      setIsLoading(false)
    })

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setMember(session?.user ? memberFromUser(session.user) : null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return {}
  }

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ error?: string }> => {
    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
      },
    })
    if (error) return { error: error.message }
    return {}
  }

  const signOut = async () => {
    await supabaseBrowser.auth.signOut()
    setMember(null)
  }

  return (
    <AuthContext.Provider value={{ member, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
