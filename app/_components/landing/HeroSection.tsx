'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-6">
      {/* Background glow blobs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #F55C7A 0%, #F6BC66 60%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: 'radial-gradient(ellipse, #F6BC66 0%, transparent 70%)' }}
      />

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F55C7A]/30 bg-[#F55C7A]/8 text-sm font-medium text-[#F55C7A]">
          <Sparkles className="w-3.5 h-3.5" />
          AI-powered · Fully customizable · Built to sell
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-center max-w-4xl leading-[1.08] tracking-tight text-foreground"
      >
        Polished presentations{' '}
        <span
          style={{
            background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          in minutes,
        </span>{' '}
        not hours.
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-2xl text-center text-lg sm:text-xl text-muted-foreground leading-relaxed"
      >
        Generate a full deck from a single prompt, then customize every pixel — colors,
        fonts, layouts, imagery. When it looks exactly right, sell it to the world.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link href="/sign-up">
          <Button
            size="lg"
            className="h-12 px-7 text-base font-semibold text-black! gap-2 shadow-lg shadow-[#F55C7A]/25"
            style={{ background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)' }}
          >
            Start Creating Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="#marketplace">
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-7 text-base font-medium border-border/60"
          >
            Browse Templates
          </Button>
        </Link>
      </motion.div>

      {/* Stat strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-14 flex items-center gap-10 flex-wrap justify-center"
      >
        {[
          { value: '12,400+', label: 'Decks generated' },
          { value: '3,200+', label: 'Templates sold' },
          { value: '840+', label: 'Active creators' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="font-mono text-2xl font-semibold text-foreground tracking-tight">
              {stat.value}
            </span>
            <span className="label-mono text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Hero product image */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 w-full max-w-5xl"
      >
        <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)]">
          {/* Gradient overlay to fade at bottom */}
          <div
            className="absolute bottom-0 inset-x-0 h-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(222 13% 11%), transparent)',
            }}
          />
          <div className="relative aspect-[16/9] w-full bg-[hsl(222_13%_14%)]">
            {/* Simulated editor chrome */}
            <div className="absolute inset-0 flex flex-col">
              {/* Titlebar */}
              <div className="flex items-center gap-2 px-4 h-10 bg-[hsl(222_13%_9%)] border-b border-border/40 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 label-mono text-muted-foreground/60">slider — Pitch Deck 2025.pptx</span>
              </div>
              {/* Editor layout */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left: slide rail */}
                <div className="w-[14%] bg-[hsl(226_14%_9%)] border-r border-border/30 flex flex-col gap-2 p-2 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-full aspect-video rounded border ${i === 0 ? 'border-[#F55C7A]/70 bg-[#F55C7A]/10' : 'border-border/20 bg-[hsl(222_13%_14%)]'}`}
                    />
                  ))}
                </div>
                {/* Center: slide preview */}
                <div className="flex-1 flex items-center justify-center p-6 bg-[hsl(222_13%_11%)]">
                  <div className="w-full max-w-[480px] aspect-video bg-gradient-to-br from-[hsl(222_13%_16%)] to-[hsl(222_13%_12%)] rounded-lg border border-border/30 flex flex-col justify-center px-8 gap-3">
                    <div className="label-mono text-[8px] text-[#F55C7A]">QUARTERLY REVIEW · Q3 2025</div>
                    <div className="font-serif text-2xl font-bold text-foreground leading-tight">Revenue grew<br />47% this quarter.</div>
                    <div className="text-[10px] text-muted-foreground leading-relaxed max-w-[240px]">
                      Driven by marketplace adoption and a 3x increase in active creators selling templates.
                    </div>
                    <div className="flex gap-3 mt-2">
                      {[
                        { label: 'ARR', val: '$2.4M' },
                        { label: 'MRR', val: '$198K' },
                        { label: 'Churn', val: '1.8%' },
                      ].map(s => (
                        <div key={s.label} className="bg-[hsl(222_13%_20%)] rounded px-2 py-1">
                          <div className="label-mono text-[7px] text-muted-foreground">{s.label}</div>
                          <div className="font-mono text-xs font-semibold text-foreground">{s.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right: customization panel */}
                <div className="w-[18%] bg-[hsl(226_14%_9%)] border-l border-border/30 p-3 flex flex-col gap-3 overflow-hidden">
                  <div>
                    <div className="label-mono text-[8px] text-muted-foreground mb-1.5">THEME</div>
                    <div className="flex gap-1.5">
                      {['#F55C7A', '#6366F1', '#10B981', '#F6BC66', '#E2E8F0'].map(c => (
                        <div key={c} className={`w-4 h-4 rounded-full ${c === '#F55C7A' ? 'ring-2 ring-offset-1 ring-offset-[hsl(226_14%_9%)] ring-[#F55C7A]' : ''}`} style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="label-mono text-[8px] text-muted-foreground mb-1.5">FONT</div>
                    <div className="text-[9px] text-foreground bg-[hsl(222_13%_14%)] rounded px-2 py-1 border border-border/30">Fraunces</div>
                  </div>
                  <div>
                    <div className="label-mono text-[8px] text-muted-foreground mb-1.5">LAYOUT</div>
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`aspect-video rounded ${i === 0 ? 'bg-[#F55C7A]/20 border border-[#F55C7A]/50' : 'bg-[hsl(222_13%_18%)] border border-border/20'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
