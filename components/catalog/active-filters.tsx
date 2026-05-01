'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ActiveFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const allFilters = [
    ...searchParams.getAll('team').map((v) => ({ key: 'team', value: v })),
    ...searchParams.getAll('league').map((v) => ({ key: 'league', value: v })),
    ...searchParams.getAll('category').map((v) => ({ key: 'category', value: v })),
  ]

  const removeFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const currentValues = params.getAll(key)
      params.delete(key)
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => params.append(key, v))
      params.delete('page')
      router.push(`/catalog?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  if (allFilters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {allFilters.map(({ key, value }) => (
        <Badge
          key={`${key}-${value}`}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          <span className="text-xs capitalize text-muted-foreground">{key}:</span>
          <span>{value}</span>
          <button
            onClick={() => removeFilter(key, value)}
            className="ml-1 rounded-full p-0.5 hover:bg-muted"
            aria-label={`Remove ${value} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}
