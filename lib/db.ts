import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const sql = neon(process.env.DATABASE_URL)

/**
 * Execute a dynamic parameterized query using neon's fullResults mode.
 * neon() returns a function that supports both tagged template literals
 * AND regular function calls as sql(query, params).
 */
export async function query(queryString: string, params: (string | number)[] = []) {
  // neon() supports sql(queryString, params) but TypeScript types
  // only expose the tagged template signature. Cast to any to use
  // the parameterized query mode which IS supported at runtime.
  return await (sql as any)(queryString, params)
}

/**
 * Build a parameterized query with dynamic WHERE clauses.
 * All values are passed as parameters ($1, $2...) to prevent SQL injection.
 */
export function buildProductQuery(options: {
  teams?: string[]
  leagues?: string[]
  categories?: string[]
  seasons?: string[]
  search?: string
  sort?: string
  limit?: number
  offset?: number
  countOnly?: boolean
}) {
  const conditions: string[] = []
  const params: (string | number)[] = []
  let paramIndex = 1

  if (options.teams && options.teams.length > 0) {
    const placeholders = options.teams.map(() => `$${paramIndex++}`).join(', ')
    conditions.push(`team IN (${placeholders})`)
    params.push(...options.teams)
  }

  if (options.leagues && options.leagues.length > 0) {
    const placeholders = options.leagues.map(() => `$${paramIndex++}`).join(', ')
    conditions.push(`league IN (${placeholders})`)
    params.push(...options.leagues)
  }

  if (options.categories && options.categories.length > 0) {
    const placeholders = options.categories.map(() => `$${paramIndex++}`).join(', ')
    conditions.push(`category IN (${placeholders})`)
    params.push(...options.categories)
  }

  if (options.seasons && options.seasons.length > 0) {
    const placeholders = options.seasons.map(() => `$${paramIndex++}`).join(', ')
    conditions.push(`season IN (${placeholders})`)
    params.push(...options.seasons)
  }

  if (options.search) {
    const searchParam = `%${options.search}%`
    conditions.push(
      `(LOWER(name) LIKE LOWER($${paramIndex}) OR LOWER(team) LIKE LOWER($${paramIndex + 1}) OR LOWER(league) LIKE LOWER($${paramIndex + 2}) OR LOWER(category) LIKE LOWER($${paramIndex + 3}))`
    )
    params.push(searchParam, searchParam, searchParam, searchParam)
    paramIndex += 4
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : ''

  if (options.countOnly) {
    return {
      text: `SELECT COUNT(*)::int as total FROM products ${whereClause}`,
      params,
    }
  }

  let orderBy = 'ORDER BY id DESC'
  if (options.sort === 'price_asc') orderBy = 'ORDER BY price ASC'
  else if (options.sort === 'price_desc') orderBy = 'ORDER BY price DESC'

  const limit = options.limit || 24
  const offset = options.offset || 0

  return {
    text: `SELECT id, name, team, league, category, season, price, image, is_new FROM products ${whereClause} ${orderBy} LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
    params: [...params, limit, offset],
  }
}
