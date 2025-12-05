import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui/Button'
import { signUpWithEmail } from '@/features/auth/api'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

type FormValues = z.infer<typeof schema>

export const SignupPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      await signUpWithEmail(values.email, values.password)
      navigate('/profile')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl font-bold text-slate-900">Регистрация</h1>
      <p className="text-sm text-slate-600">Создайте аккаунт, чтобы сохранить цели и историю.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-slate-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-brand"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-700">Пароль</label>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-brand"
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" loading={isSubmitting} className="w-full">
          Создать аккаунт
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-brand">
          Войти
        </Link>
      </p>
    </div>
  )
}
