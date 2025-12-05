import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNutrient = (value: number, unit = 'g') => `${Math.round(value)}${unit}`