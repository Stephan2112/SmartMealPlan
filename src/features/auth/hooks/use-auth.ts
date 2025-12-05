import { useCallback, useMemo } from 'react'
import { supabase } from '@/shared/api/supabase'
import { useSupabase } from '../lib/supabase-context'

export function useAuth() {
  const { session, loading } = useSupabase()

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const authenticated = useMemo(() => Boolean(session?.user), [session?.user])

  return { session, loading, authenticated, signOut }
}
