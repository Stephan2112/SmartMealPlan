import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { DashboardPage } from '@/pages/DashboardPage'
import { useAuth } from '@/hooks/use-auth'
import { HistoryPage } from '@/pages/HistoryPage'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticated, loading } = useAuth()
  if (loading) return <div className="p-6 text-center text-slate-600">Загрузка...</div>
  if (!authenticated) return <Navigate to="/login" replace />
  return children
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
