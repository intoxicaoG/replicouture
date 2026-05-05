import { query, buildProductQuery } from '@/lib/db'
import { type Product, type ProductsResponse } from '@/lib/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const teams = searchParams.getAll('team')
    const leagues = searchParams.getAll('league')
    const categories = searchParams.getAll('category')
    const seasons = searchParams.getAll('season')
    const search = searchParams.get('q')?.trim() || ''
    const sort = searchParams.get('sort') || 'newest'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '24')))
    const offset = (page - 1) * limit

    const filterOptions = {
      teams: teams.length > 0 ? teams : undefined,
      leagues: leagues.length > 0 ? leagues : undefined,
      categories: categories.length > 0 ? categories : undefined,
      seasons: seasons.length > 0 ? seasons : undefined,
      search: search || undefined,
      sort,
    }

    const countQ = buildProductQuery({ ...filterOptions, countOnly: true })
    const dataQ = buildProductQuery({ ...filterOptions, limit, offset })

    const [countResult, dataResult] = await Promise.all([
      query(countQ.text, countQ.params),
      query(dataQ.text, dataQ.params),
    ])

    const total = (countResult[0] as { total: number }).total

    const response: ProductsResponse = {
      products: dataResult as Product[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
