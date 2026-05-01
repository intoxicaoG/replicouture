import { Suspense } from 'react'
import { sql } from '@/lib/db'
import { type Product, type FiltersResponse } from '@/lib/types'
import { ProductGrid } from '@/components/catalog/product-grid'
import { SidebarFilters } from '@/components/catalog/sidebar-filters'
import { ActiveFilters } from '@/components/catalog/active-filters'
import { MobileFilters } from '@/components/catalog/mobile-filters'
import { SearchInput } from '@/components/catalog/search-input'
import { Skeleton } from '@/components/ui/skeleton'

interface CatalogPageProps {
  searchParams: Promise<{
    team?: string | string[]
    league?: string | string[]
    category?: string | string[]
    season?: string | string[]
    page?: string
    sort?: string
    q?: string
  }>
}

async function getFilters(): Promise<FiltersResponse> {
  const [teamsResult, leaguesResult, categoriesResult, seasonsResult] = await Promise.all([
    sql`SELECT DISTINCT team FROM products WHERE team IS NOT NULL ORDER BY team`,
    sql`SELECT DISTINCT league FROM products WHERE league IS NOT NULL ORDER BY league`,
    sql`SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category`,
    sql`SELECT DISTINCT season FROM products WHERE season IS NOT NULL ORDER BY season DESC`,
  ])

  return {
    teams: teamsResult.map((row) => row.team as string),
    leagues: leaguesResult.map((row) => row.league as string),
    categories: categoriesResult.map((row) => row.category as string),
    seasons: seasonsResult.map((row) => row.season as string),
  }
}

async function getProducts(searchParams: {
  team?: string | string[]
  league?: string | string[]
  category?: string | string[]
  season?: string | string[]
  page?: string
  sort?: string
  q?: string
}): Promise<{ products: Product[]; total: number }> {
  const teams = Array.isArray(searchParams.team)
    ? searchParams.team
    : searchParams.team
      ? [searchParams.team]
      : []
  const leagues = Array.isArray(searchParams.league)
    ? searchParams.league
    : searchParams.league
      ? [searchParams.league]
      : []
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
      ? [searchParams.category]
      : []
  const seasons = Array.isArray(searchParams.season)
    ? searchParams.season
    : searchParams.season
      ? [searchParams.season]
      : []

  const searchQuery = searchParams.q?.toLowerCase().trim() || ''

  // Fetch all products and filter in memory for dynamic filters
  // This approach works with tagged template literals
  const allProducts = await sql`SELECT * FROM products ORDER BY id DESC` as Product[]
  
  let filteredProducts = allProducts
  
  // Search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.team.toLowerCase().includes(searchQuery) ||
      p.league.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    )
  }
  
  if (teams.length > 0) {
    filteredProducts = filteredProducts.filter(p => teams.includes(p.team))
  }
  if (leagues.length > 0) {
    filteredProducts = filteredProducts.filter(p => leagues.includes(p.league))
  }
  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter(p => categories.includes(p.category))
  }
  if (seasons.length > 0) {
    filteredProducts = filteredProducts.filter(p => seasons.includes(p.season))
  }

  const sort = searchParams.sort || 'newest'
  if (sort === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  return { products: filteredProducts, total: filteredProducts.length }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams
  const [filters, { products, total }] = await Promise.all([
    getFilters(),
    getProducts(resolvedParams),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Football Shirts
          </h1>
          <p className="mt-2 text-muted-foreground">
            {total} {total === 1 ? 'product' : 'products'} available
          </p>
          <div className="mt-4 max-w-md">
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <Suspense fallback={<FiltersSkeleton />}>
              <SidebarFilters filters={filters} />
            </Suspense>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between gap-4">
              <Suspense fallback={null}>
                <ActiveFilters />
              </Suspense>
              <MobileFilters filters={filters} />
            </div>

            <Suspense fallback={<ProductGrid products={[]} isLoading />}>
              <ProductGrid products={products} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function FiltersSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-24" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2 pl-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-32" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
