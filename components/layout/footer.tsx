import Link from 'next/link'
import { Shirt, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Shirt className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground">Replicouture</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Premium football replica shirts from top leagues worldwide.
              Name and number included free.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Browse</h3>
            <div className="space-y-2">
              <Link href="/catalog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Catalog
              </Link>
              <Link href="/prices" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Prices
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Follow Us</h3>
            <a
              href="https://instagram.com/YOUR_INSTAGRAM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @YOUR_INSTAGRAM
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Replicouture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
