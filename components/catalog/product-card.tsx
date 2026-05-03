import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { type Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

function cleanProductName(name: string): string {
  return name.replace(/^\d+[\.\-\s]*/, '').trim()
}

export function ProductCard({ product }: ProductCardProps) {
  const displayName = cleanProductName(product.name)

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(200,170,80,0.15)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.is_new && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary text-xs font-bold px-2.5 py-0.5">
              NEW
            </Badge>
          </div>
        )}

        {/* Category badge on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-block rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-primary/80">
          {product.team}
        </p>
        <h3 className="mt-1.5 font-semibold text-foreground line-clamp-2 text-sm leading-snug">
          {displayName}
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          {product.league}
        </p>
      </div>
    </Link>
  )
}
