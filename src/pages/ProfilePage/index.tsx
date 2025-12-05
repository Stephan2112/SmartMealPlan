import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/shared/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'

export const ProfilePage = () => {
  const { session, signOut } = useAuth()
  const email = session?.user?.email ?? 'unknown@example.com'

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <p className="text-sm text-slate-600">Управляйте целями КБЖУ и аккаунтом.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-semibold text-slate-900">{email}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => signOut()}>
              Выйти
            </Button>
            <Button>Сохранить цели</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
