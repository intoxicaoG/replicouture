import { notFound } from 'next/navigation'
import { Instagram } from 'lucide-react'
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

// Remove leading numbers and dots/dashes from product name
function cleanProductName(name: string): string {
  return name.replace(/^\d+[\.\-\s]*/, '').trim()
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

  const displayName = cleanProductName(product.name)

  // Replace YOUR_INSTAGRAM with your actual Instagram username
  const instagramUrl = `https://ig.me/m/replicouture`

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BackToCatalog />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images Gallery */}
          <div className="relative">
            {product.is_new && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 text-sm px-3 py-1">
                  NEW
                </Badge>
              </div>
            )}

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
              {displayName}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">{product.team}</p>

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

            <div className="mt-8 flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white border-0"
              >
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-5 w-5" />
                  Ask about this shirt
                </a>
              </Button>

              <BackToCatalog variant="button" />
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
