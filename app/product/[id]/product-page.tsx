import { notFound } from 'next/navigation'
import { sql } from '@/lib/db'
import { type Product, type ProductImage } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageGallery } from '@/components/product/image-gallery'
import { BackToCatalog } from '@/components/product/back-to-catalog'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  const result = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`
  return (result[0] as Product) || null
}

async function getProductImages(productId: string): Promise<ProductImage[]> {
  const result = await sql`SELECT * FROM product_images WHERE product_id = ${productId}`
  return result as ProductImage[]
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const [product, images] = await Promise.all([
    getProduct(id),
    getProductImages(id)
  ])

  if (!product) {
    notFound()
  }

  const price = Number(product.price)
  const originalPrice = product.original_price ? Number(product.original_price) : null
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BackToCatalog />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images Gallery */}
          <div className="relative">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.is_new && (
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 text-sm px-3 py-1">
                  NEW
                </Badge>
              )}
              {product.is_sale && discountPercentage > 0 && (
                <Badge className="bg-red-600 text-white hover:bg-red-600 text-sm px-3 py-1">
                  -{discountPercentage}% OFF
                </Badge>
              )}
            </div>
            
            <ImageGallery 
              images={images} 
              productName={product.name}
              fallbackImage={product.image}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.league}</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">{product.team}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">
                {price.toFixed(2)}€
              </span>
              {product.is_sale && originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {originalPrice.toFixed(2)}€
                </span>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted-foreground">Season</p>
                  <p className="mt-1 font-medium text-foreground">{product.season}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted-foreground">Category</p>
                  <p className="mt-1 font-medium text-foreground">{product.category}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted-foreground">League</p>
                  <p className="mt-1 font-medium text-foreground">{product.league}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted-foreground">Team</p>
                  <p className="mt-1 font-medium text-foreground">{product.team}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <Button asChild className="w-full" size="lg">
                <BackToCatalog variant="button" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return { title: 'Product Not Found - Replicouture' }
  }

  return {
    title: `${product.name} - ${product.team} | Replicouture`,
    description: `${product.name} from ${product.team}. ${product.league} ${product.season} ${product.category} shirt.`,
  }
}
