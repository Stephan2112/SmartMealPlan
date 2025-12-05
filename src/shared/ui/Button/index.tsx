import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
}

export const Button = ({
  className,
  variant = 'primary',
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand',
    secondary:
      'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 focus-visible:outline-brand',
    ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:outline-brand',
  }

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
      {children}
    </button>
  )
}
