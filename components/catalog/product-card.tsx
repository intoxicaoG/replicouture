import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { type Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

// Remove leading numbers and dots/dashes from product name
function cleanProductName(name: string): string {
  return name.replace(/^\d+[\.\-\s]*/, '').trim()
}

export function ProductCard({ product }: ProductCardProps) {
  const price = Number(product.price)
  const originalPrice = product.original_price ? Number(product.original_price) : null
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0
  const displayName = cleanProductName(product.name)

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_new && (
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              NEW
            </Badge>
          )}
          {product.is_sale && discountPercentage > 0 && (
            <Badge className="bg-red-600 text-white hover:bg-red-600">
              -{discountPercentage}%
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.team}
        </p>
        <h3 className="mt-1 font-medium text-foreground line-clamp-2 text-sm">
          {displayName}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-foreground">
            {price.toFixed(2)}€
          </span>
          {product.is_sale && originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toFixed(2)}€
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{product.league}</span>
          <span>•</span>
          <span>{product.category}</span>
        </div>
      </div>
    </Link>
  )
}
