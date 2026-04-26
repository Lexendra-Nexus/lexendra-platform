import React from 'react'
import { cn } from '../../utils/helpers.ts'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all font-lora duration-200'

  const variants = {
    primary: 'bg-legal-surface border border-legal-border text-legal-text hover:bg-legal-surfaceLight active:bg-legal-lightGray disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-legal-bgLight border border-legal-border text-legal-text hover:bg-legal-surface active:bg-legal-lightGray disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border border-legal-border text-legal-text hover:bg-legal-surface active:bg-legal-lightGray disabled:opacity-50 disabled:cursor-not-allowed',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={loading}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  )
}