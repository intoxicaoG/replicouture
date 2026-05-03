import { Shirt, Ruler, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const pricingItems = [
  {
    name: 'Fan Version',
    price: '20€',
    description: 'Standard fan replica shirt',
  },
  {
    name: 'Player Version',
    price: '23€',
    description: 'Slim fit, match-day fabric',
  },
  {
    name: 'Retro',
    price: '25€',
    description: 'Classic vintage shirts',
  },
  {
    name: 'Long Sleeve',
    price: '23€',
    description: 'Full sleeve version',
  },
]

export default function PricesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Prices
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Simple pricing, no hidden fees
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-8">
          {pricingItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(200,170,80,0.1)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Shirt className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-foreground">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-12">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Name & Number Included</h3>
              <p className="text-sm text-muted-foreground">
                Custom name and number printing is included for free with every shirt
              </p>
            </div>
            <span className="ml-auto text-lg font-bold text-primary">FREE</span>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Size Guide</h2>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-2 overflow-hidden">
            <div className="relative w-full aspect-[16/9] bg-secondary rounded-lg flex items-center justify-center">
              <Image
                src="/size-guide.webp"
                alt="Size guide chart"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-center">
            If you&apos;re between sizes, we recommend sizing up for a more comfortable fit
          </p>
        </div>

      </div>
    </div>
  )
}

export const metadata = {
  title: 'Prices - Replicouture',
  description: 'Check our prices for fan version, player version, retro and long sleeve football shirts.',
}
