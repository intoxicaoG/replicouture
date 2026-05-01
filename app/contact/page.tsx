import { MessageCircle, Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Get in touch to order or ask about any shirt
          </p>
        </div>

        {/* Contact Options */}
        <div className="space-y-4">

          {/* WhatsApp */}
          <a
            href="https://wa.me/YOUR_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-green-300 dark:hover:border-green-800 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-950 group-hover:bg-green-200 dark:group-hover:bg-green-900 transition-colors">
              <MessageCircle className="h-7 w-7 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Fastest way to reach us — usually reply within minutes
              </p>
            </div>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950">
              Chat now
            </Button>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/replicouture"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-pink-300 dark:hover:border-pink-800 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-950 group-hover:bg-pink-200 dark:group-hover:bg-pink-900 transition-colors">
              <Instagram className="h-7 w-7 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">Instagram</h3>
              <p className="text-sm text-muted-foreground">
                Follow us for new arrivals and send us a DM
              </p>
            </div>
            <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-950">
              Follow
            </Button>
          </a>

          {/* Email */}
          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors">
              <Mail className="h-7 w-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">Email</h3>
              <p className="text-sm text-muted-foreground">
                For bulk orders or business inquiries
              </p>
            </div>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">
              Send email
            </Button>
          </a>

        </div>

        {/* FAQ-style note */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground mb-3">How to order</h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
              Browse the catalog and find the shirt you want
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
              Click &quot;Ask about this shirt&quot; or contact us directly
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
              Tell us your size, name and number — we&apos;ll handle the rest
            </li>
          </ol>
        </div>

      </div>
    </div>
  )
}

export const metadata = {
  title: 'Contact - Replicouture',
  description: 'Get in touch with Replicouture to order your football shirt via WhatsApp, Instagram or email.',
}
