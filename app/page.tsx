import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shirt, Star, TrendingUp } from 'lucide-react'
import { sql } from '@/lib/db'
import { type Product } from '@/lib/types'
import { Button } from '@/components/ui/button'

// 🔹 Change this ID to feature a different shirt
const FEATURED_PRODUCT_ID = 1146

async function getFeaturedProduct(): Promise<Product | null> {
  const result = await sql`SELECT * FROM products WHERE id = ${FEATURED_PRODUCT_ID} LIMIT 1`
  return (result[0] as Product) || null
}

async function getLatestProducts(): Promise<Product[]> {
  const result = await sql`SELECT * FROM products ORDER BY id DESC LIMIT 8`
  return result as Product[]
}

function cleanProductName(name: string): string {
  return name.replace(/^\d+[\.\-\s]*/, '').trim()
}

export default async function Home() {
  const [featured, latest] = await Promise.all([
    getFeaturedProduct(),
    getLatestProducts(),
  ])

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />
        
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            
            {/* Left: Text content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400 mb-6">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                Featured Shirt
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {featured ? cleanProductName(featured.name) : 'Premium Football Shirts'}
              </h1>

              <p className="mt-4 text-lg text-neutral-400 sm:text-xl">
                {featured
                  ? `${featured.team} — ${featured.category} ${featured.season}`
                  : 'Browse our collection of replica football shirts from top leagues worldwide'}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {featured && (
                  <Button asChild size="lg" className="bg-white text-neutral-950 hover:bg-neutral-200 text-base px-8">
                    <Link href={`/product/${featured.id}`}>
                      View This Shirt
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white text-base px-8">
                  <Link href="/catalog">
                    Browse Catalog
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-neutral-700/50 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">1000+</p>
                  <p className="mt-1 text-sm text-neutral-500">Shirts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">50+</p>
                  <p className="mt-1 text-sm text-neutral-500">Teams</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">Free</p>
                  <p className="mt-1 text-sm text-neutral-500">Name & Number</p>
                </div>
              </div>
            </div>

            {/* Right: Featured image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-transparent to-white/10 blur-2xl" />
                
                <div className="relative overflow-hidden rounded-2xl border border-neutral-700/50 shadow-2xl">
                  {featured ? (
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      width={600}
                      height={800}
                      className="w-full object-cover aspect-[3/4]"
                      priority
                    />
                  ) : (
                    <div className="flex aspect-[3/4] items-center justify-center bg-neutral-800">
                      <Shirt className="h-24 w-24 text-neutral-600" />
                    </div>
                  )}
                  
                  {/* Overlay badge */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-black uppercase tracking-wider">
                        Pick of the week
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LATEST ARRIVALS ═══════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Latest Arrivals
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/catalog">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {latest.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {product.team}
                </p>
                <h3 className="mt-1 font-medium text-foreground line-clamp-1 text-sm">
                  {cleanProductName(product.name)}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Contact us and we&apos;ll find it for you — any team, any season
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/prices">See Prices</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
