import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { SupabaseProvider } from '../features/auth/lib/supabase-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function Providers() {
  return (
    <SupabaseProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </SupabaseProvider>
  )
}