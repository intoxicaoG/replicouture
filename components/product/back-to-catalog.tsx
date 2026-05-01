'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackToCatalogProps {
  variant?: 'link' | 'button'
}

export function BackToCatalog({ variant = 'link' }: BackToCatalogProps) {
  const router = useRouter()

  const handleBack = () => {
    // Use browser history to go back to the exact catalog page + scroll position
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/catalog')
    }
  }

  if (variant === 'button') {
    return (
      <button onClick={handleBack} className="w-full">
        Browse More Shirts
      </button>
    )
  }

  return (
    <button
      onClick={handleBack}
      className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to catalog
    </button>
  )
}
