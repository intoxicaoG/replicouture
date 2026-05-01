import { Suspense } from 'react'
import Link from 'next/link'
import { sql } from '@/lib/db'
import { type Product, type FiltersResponse } from '@/lib/types'
import { ProductGrid } from '@/components/catalog/product-grid'
import { SidebarFilters } from '@/components/catalog/sidebar-filters'
import { ActiveFilters } from '@/components/catalog/active-filters'
import { MobileFilters } from '@/components/catalog/mobile-filters'
import { SearchInput } from '@/components/catalog/search-input'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PRODUCTS_PER_PAGE = 24

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
}): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
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
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10))

  const allProducts = await sql`SELECT * FROM products ORDER BY id DESC` as Product[]
  
  let filteredProducts = allProducts
  
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

  const total = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE)

  return { products: paginatedProducts, total, page: safePage, totalPages }
}

function buildPageUrl(searchParams: URLSearchParams, page: number): string {
  const params = new URLSearchParams(searchParams.toString())
  if (page <= 1) {
    params.delete('page')
  } else {
    params.set('page', page.toString())
  }
  const qs = params.toString()
  return `/catalog${qs ? `?${qs}` : ''}`
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number
  totalPages: number
  searchParams: URLSearchParams
}) {
  if (totalPages <= 1) return null

  // Build page numbers to show
  const pages: (number | '...')[] = []
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Pagination">
      {currentPage > 1 ? (
        <Button variant="outline" size="icon" asChild>
          <Link href={buildPageUrl(searchParams, currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            size="icon"
            asChild={page !== currentPage}
            className="h-9 w-9"
          >
            {page === currentPage ? (
              <span>{page}</span>
            ) : (
              <Link href={buildPageUrl(searchParams, page)}>{page}</Link>
            )}
          </Button>
        )
      )}

      {currentPage < totalPages ? (
        <Button variant="outline" size="icon" asChild>
          <Link href={buildPageUrl(searchParams, currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  )
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams
  const [filters, { products, total, page, totalPages }] = await Promise.all([
    getFilters(),
    getProducts(resolvedParams),
  ])

  // Build current search params for pagination links
  const currentSearchParams = new URLSearchParams()
  const paramKeys = ['team', 'league', 'category', 'season', 'sort', 'q'] as const
  for (const key of paramKeys) {
    const val = resolvedParams[key]
    if (val) {
      const values = Array.isArray(val) ? val : [val]
      values.forEach((v) => currentSearchParams.append(key, v))
    }
  }

  const startItem = (page - 1) * PRODUCTS_PER_PAGE + 1
  const endItem = Math.min(page * PRODUCTS_PER_PAGE, total)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Football Shirts
          </h1>
          <p className="mt-2 text-muted-foreground">
            {total > 0
              ? `Showing ${startItem}–${endItem} of ${total} products`
              : '0 products available'}
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

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              searchParams={currentSearchParams}
            />
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
