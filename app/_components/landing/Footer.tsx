import Link from 'next/link'

const LINKS = {
  Product: ['Features', 'How it works', 'Marketplace', 'Pricing'],
  Resources: ['Documentation', 'Changelog', 'Blog', 'Status'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Seller Agreement', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-[hsl(226_14%_9%)] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <span
                className="font-serif text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Slider
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              The AI presentation studio where the best designs become a business.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <div className="label-mono text-muted-foreground/70 mb-4">{group}</div>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="label-mono text-muted-foreground/50">
            © 2025 Slider Inc. All rights reserved.
          </p>
          <p className="label-mono text-muted-foreground/40">
            Built with Slider ·{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F55C7A 0%, #F6BC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              v0.1 beta
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
