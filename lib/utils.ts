import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeFormat = (timestamp: string) => {
  const t = new Date()
  const diffInSeconds = Math.floor(
    (t.getTime() - new Date(timestamp).getTime()) / 1000
  )

  const intervals = [
    { label: 'year', value: 60 * 60 * 24 * 365 },
    { label: 'month', value: 60 * 60 * 24 * 30 },
    { label: 'days', value: 60 * 60 * 24 },
    { label: 'hours', value: 60 * 60 },
    { label: 'mins', value: 60 },
    { label: 'secs', value: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.value)
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'


}


