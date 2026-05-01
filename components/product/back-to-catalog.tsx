'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BackToCatalogProps {
  variant?: 'link' | 'button'
}

export function BackToCatalog({ variant = 'link' }: BackToCatalogProps) {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/catalog')
    }
  }

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Browse More Shirts
      </Button>
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
