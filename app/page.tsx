import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shirt, Star, TrendingUp, Shield, Award, Gift } from 'lucide-react'
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

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden border-b border-border/50">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

            {/* Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <Star className="h-3 w-3 fill-primary" />
                Pick of the Week
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
                {featured ? cleanProductName(featured.name) : 'Premium Football Shirts'}
              </h1>

              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                {featured
                  ? `${featured.team} — ${featured.category} ${featured.season}`
                  : 'Browse our collection of replica football shirts from top leagues worldwide'}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {featured && (
                  <Button asChild size="lg" className="text-base px-8 font-semibold">
                    <Link href={`/product/${featured.id}`}>
                      View This Shirt
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="text-base px-8 border-border/50 hover:border-primary/30 hover:bg-primary/5">
                  <Link href="/catalog">
                    Browse Catalog
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-14 grid grid-cols-3 gap-6">
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-2xl font-bold text-foreground sm:text-3xl">1000+</p>
                  <p className="mt-0.5 text-xs text-muted-foreground uppercase tracking-wider">Shirts</p>
                </div>
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-2xl font-bold text-foreground sm:text-3xl">50+</p>
                  <p className="mt-0.5 text-xs text-muted-foreground uppercase tracking-wider">Teams</p>
                </div>
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-2xl font-bold text-foreground sm:text-3xl">Free</p>
                  <p className="mt-0.5 text-xs text-muted-foreground uppercase tracking-wider">Name & Number</p>
                </div>
              </div>
            </div>

            {/* Featured image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Glow behind */}
                <div className="absolute -inset-8 rounded-3xl bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 blur-3xl pointer-events-none" />

                <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/5">
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
                    <div className="flex aspect-[3/4] items-center justify-center bg-secondary">
                      <Shirt className="h-24 w-24 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-20">
                    <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Premium Quality</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Top-tier replica shirts with detailed embroidery and stitching</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Free Customization</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Name and number printing included with every order at no extra cost</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">All Leagues</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">From the Premier League to Bundesliga, La Liga, Serie A and beyond</p>
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
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Latest Arrivals
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Link href="/catalog">
              View all
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
          {latest.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(200,170,80,0.15)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3">
                <p className="text-[11px] font-medium uppercase tracking-widest text-primary/80">
                  {product.team}
                </p>
                <h3 className="mt-1 font-semibold text-foreground line-clamp-1 text-sm">
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

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-10 text-center sm:p-14">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Contact us and we&apos;ll find it for you — any team, any season
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 hover:border-primary/30 hover:bg-primary/5">
                  <Link href="/prices">See Prices</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
