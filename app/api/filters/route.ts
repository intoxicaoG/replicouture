import { sql } from '@/lib/db'
import { type FiltersResponse } from '@/lib/types'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [teamsResult, leaguesResult, categoriesResult, seasonsResult] = await Promise.all([
      sql`SELECT DISTINCT team FROM products WHERE team IS NOT NULL ORDER BY team`,
      sql`SELECT DISTINCT league FROM products WHERE league IS NOT NULL ORDER BY league`,
      sql`SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category`,
      sql`SELECT DISTINCT season FROM products WHERE season IS NOT NULL ORDER BY season DESC`,
    ])
    
    const response: FiltersResponse = {
      teams: teamsResult.map(row => row.team as string),
      leagues: leaguesResult.map(row => row.league as string),
      categories: categoriesResult.map(row => row.category as string),
      seasons: seasonsResult.map(row => row.season as string),
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    )
  }
}
