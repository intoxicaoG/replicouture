import { sql } from '@/lib/db'
import { type Product, type ProductsResponse } from '@/lib/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const teams = searchParams.getAll('team')
    const leagues = searchParams.getAll('league')
    const categories = searchParams.getAll('category')
    const seasons = searchParams.getAll('season')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sort = searchParams.get('sort') || 'newest'
    
    // Fetch all products using tagged template literal
    const allProducts = await sql`SELECT * FROM products ORDER BY created_at DESC` as Product[]
    
    // Filter in memory for dynamic filters
    let filteredProducts = allProducts
    
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
    
    // Sort
    if (sort === 'price_asc') {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
      filteredProducts.sort((a, b) => b.price - a.price)
    }
    
    const total = filteredProducts.length
    const offset = (page - 1) * limit
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)
    
    const response: ProductsResponse = {
      products: paginatedProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
