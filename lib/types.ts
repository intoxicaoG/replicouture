export interface Product {
  id: number
  name: string
  team: string
  league: string
  category: string
  season: string
  price: number
  original_price: number | null
  is_new: boolean
  is_sale: boolean
  image: string
}

export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  product: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
}

export interface FiltersResponse {
  teams: string[]
  leagues: string[]
  categories: string[]
  seasons: string[]
}

export interface ProductFilters {
  team?: string | string[]
  league?: string | string[]
  category?: string | string[]
  season?: string | string[]
  page?: number
  limit?: number
  sort?: 'newest' | 'price_asc' | 'price_desc'
}
