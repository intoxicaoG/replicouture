import { Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Get in touch to order or ask about any shirt
          </p>
        </div>

        <div className="space-y-3">
          {/* Instagram */}
          <a
            href="https://ig.me/m/YOUR_INSTAGRAM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-pink-500/30 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.15)] group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-400/20 group-hover:from-purple-600/30 group-hover:via-pink-500/30 group-hover:to-orange-400/30 transition-colors">
              <Instagram className="h-7 w-7 text-pink-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">Instagram DM</h3>
              <p className="text-sm text-muted-foreground">
                Fastest way to reach us — usually reply within minutes
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10 hover:text-pink-300">
              Message
            </Button>
          </a>

          {/* Email */}
          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-blue-500/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="h-7 w-7 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">Email</h3>
              <p className="text-sm text-muted-foreground">
                For bulk orders or business inquiries
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
              Send
            </Button>
          </a>
        </div>

        {/* How to order */}
        <div className="mt-12 rounded-xl border border-border/50 bg-card p-8">
          <h2 className="font-semibold text-foreground mb-4">How to order</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">1</span>
              <p className="text-sm text-muted-foreground pt-0.5">Browse the catalog and find the shirt you want</p>
            </div>
            <div className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">2</span>
              <p className="text-sm text-muted-foreground pt-0.5">Click &quot;Ask about this shirt&quot; or contact us directly</p>
            </div>
            <div className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">3</span>
              <p className="text-sm text-muted-foreground pt-0.5">Tell us your size, name and number — we&apos;ll handle the rest</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export const metadata = {
  title: 'Contact - Replicouture',
  description: 'Get in touch with Replicouture to order your football shirt.',
}
