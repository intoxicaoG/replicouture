'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { type FiltersResponse } from '@/lib/types'

// Only show these major leagues (must match normalized names in DB)
const MAIN_LEAGUES = [
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Eredivisie',
  'Primeira Liga',
  'Série A Brazil',
  'Primera División Argentina',
  'Liga MX',
  'MLS',
  'Saudi Pro League',
  'Süper Lig',
  'Super League Greece',
  'Scottish Premiership',
  'Jupiler Pro League',
  'EFL Championship',
  'J1 League',
  'International',
]

interface SidebarFiltersProps {
  filters: FiltersResponse
  onFilterChange?: () => void
}

export function SidebarFilters({ filters, onFilterChange }: SidebarFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getSelectedValues = useCallback(
    (key: string) => {
      return searchParams.getAll(key)
    },
    [searchParams]
  )

  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const currentValues = params.getAll(key)

      if (currentValues.includes(value)) {
        params.delete(key)
        currentValues
          .filter((v) => v !== value)
          .forEach((v) => params.append(key, v))
      } else {
        params.append(key, value)
      }

      params.delete('page')
      router.push(`/catalog?${params.toString()}`, { scroll: false })
      onFilterChange?.()
    },
    [router, searchParams, onFilterChange]
  )

  const clearAllFilters = useCallback(() => {
    router.push('/catalog', { scroll: false })
    onFilterChange?.()
  }, [router, onFilterChange])

  const hasActiveFilters =
    searchParams.has('league') ||
    searchParams.has('category')

  // Filter to only show main leagues that exist in the database
  const mainLeagues = filters.leagues.filter((league) =>
    MAIN_LEAGUES.some((main) => main.toLowerCase() === league.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={['league', 'category']}
        className="w-full"
      >
        <AccordionItem value="league">
          <AccordionTrigger>League</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {mainLeagues.map((league) => (
                <FilterCheckbox
                  key={league}
                  label={league}
                  checked={getSelectedValues('league').includes(league)}
                  onCheckedChange={() => toggleFilter('league', league)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {filters.categories
                .filter((category) => category.toLowerCase() !== 'yupoo')
                .map((category) => (
                  <FilterCheckbox
                    key={category}
                    label={category}
                    checked={getSelectedValues('category').includes(category)}
                    onCheckedChange={() => toggleFilter('category', category)}
                  />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

interface FilterCheckboxProps {
  label: string
  checked: boolean
  onCheckedChange: () => void
}

function FilterCheckbox({ label, checked, onCheckedChange }: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  )
}
