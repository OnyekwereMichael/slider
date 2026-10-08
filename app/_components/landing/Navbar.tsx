'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[hsl(222_13%_11%/0.85)] backdrop-blur-md border-b border-[hsl(224_10%_22%/0.6)] shadow-xl'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-serif text-xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Slider
          </span>
          <span className="label-mono text-[10px] text-muted-foreground hidden sm:block">
            beta
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: 'Features', href: '#features' },
            { label: 'How it works', href: '#how-it-works' },
            { label: 'Marketplace', href: '#marketplace' },
            { label: 'Pricing', href: '#pricing' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="text-sm font-semibold text-black!"
              style={{
                background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)',
              }}
            >
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
