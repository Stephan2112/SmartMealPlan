import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabase'

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  daily_goal: NutrientTargets
  created_at?: string
  updated_at?: string
}

export interface NutrientTargets {
  calories: number
  protein: number
  fat: number
  carbs: number
}

interface SupabaseContextValue {
  session: Session | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Явно указываем тип для data из getSession()
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => setSession(data.session))
      .finally(() => setLoading(false))

    // Явно указываем тип для data из onAuthStateChange
    const { data }: { data: { subscription: { unsubscribe: () => void } } } = 
      supabase.auth.onAuthStateChange((_event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession)
        setLoading(false)
      })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return <SupabaseContext.Provider value={{ session, loading }}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }
  return context
}