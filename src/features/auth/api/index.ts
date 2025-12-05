import { supabase } from '@/shared/api/supabase'

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase не сконфигурирован. Укажите переменные окружения VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
  }
  return supabase
}

export async function signInWithEmail(email: string, password: string) {
  const client = ensureSupabase()
  const { error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signUpWithEmail(email: string, password: string) {
  const client = ensureSupabase()
  const { error } = await client.auth.signUp({ email, password })
  if (error) throw error
}