import { Session } from '@supabase/supabase-js'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/shared/api/supabase'

interface SupabaseContextValue {
  session: Session | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      active = false
      subscription?.subscription.unsubscribe()
    }
  }, [])

  return <SupabaseContext.Provider value={{ session, loading }}>{children}</SupabaseContext.Provider>
}

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext)
  if (!ctx) throw new Error('SupabaseContext not found')
  return ctx
}
