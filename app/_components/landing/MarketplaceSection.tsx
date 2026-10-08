'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, ShieldCheck, DollarSign } from 'lucide-react'

const TEMPLATES = [
  { name: 'Elevate Pitch Deck', creator: 'Leo V.', price: '$29', rating: '5.0', sales: 142, accent: '#F55C7A' },
  { name: 'Insight Tech Proposal', creator: 'Chloe D.', price: '$18', rating: '4.8', sales: 97, accent: '#6366F1' },
  { name: 'Vertex Portfolio', creator: 'Alex M.', price: '$15', rating: '4.9', sales: 213, accent: '#10B981' },
  { name: 'Prism Marketing Deck', creator: 'Mia S.', price: '$24', rating: '4.7', sales: 88, accent: '#F6BC66' },
  { name: 'Visionary Pitch', creator: 'Sam K.', price: '$32', rating: '5.0', sales: 174, accent: '#F55C7A' },
  { name: 'Spectrum Year Review', creator: 'Nina T.', price: '$19', rating: '4.9', sales: 61, accent: '#8B5CF6' },
]

const TRUST_POINTS = [
  { icon: DollarSign, label: 'You keep 80%', body: 'We take 20% commission on every sale. No hidden fees, no lock-in.' },
  { icon: ShieldCheck, label: 'You own your work', body: 'You grant buyers a license to use — you retain the original. Delete your listing anytime.' },
  { icon: ArrowRight, label: 'Monthly payouts', body: 'Earnings are paid out monthly via Stripe to any bank worldwide.' },
]

// Slide color palettes for the template preview cards
const CARD_PALETTES = [
  ['#F55C7A', '#F6BC66', '#1E2026'],
  ['#6366F1', '#8B5CF6', '#1a1a2e'],
  ['#10B981', '#34D399', '#0d1f1a'],
  ['#F6BC66', '#F55C7A', '#201a0d'],
  ['#F55C7A', '#EC4899', '#1f0d14'],
  ['#8B5CF6', '#6366F1', '#0f0d1f'],
]

export default function MarketplaceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="marketplace" className="py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="label-mono text-muted-foreground">Marketplace</span>
            <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Turn your designs<br />
              <span
                style={{
                  background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                into income.
              </span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              Build a template once, sell it indefinitely. Slider's marketplace connects
              your best work with the professionals who need it — from startup founders
              to Fortune 500 designers.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {TRUST_POINTS.map((pt) => {
                const Icon = pt.icon
                return (
                  <div key={pt.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F55C7A]/12 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#F55C7A]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{pt.label}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{pt.body}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-10 flex gap-3">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-11 px-6 font-semibold text-black! gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)' }}
                >
                  Start selling <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-11 px-6">
                  Browse marketplace
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Template grid preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {TEMPLATES.map((t, i) => {
              const [c1, c2, bg] = CARD_PALETTES[i]
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                  className="group relative rounded-xl border border-border/50 bg-card overflow-hidden cursor-pointer hover:border-[#F55C7A]/50 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Slide thumbnail sim */}
                  <div
                    className="aspect-video w-full flex flex-col justify-end p-2"
                    style={{ background: `linear-gradient(135deg, ${c1}22 0%, ${c2}11 100%), ${bg}` }}
                  >
                    <div className="w-full h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${c1}, ${c2})`, opacity: 0.7 }} />
                  </div>
                  {/* Meta */}
                  <div className="p-3">
                    <div className="text-xs font-semibold text-foreground truncate">{t.name}</div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#F6BC66] text-[#F6BC66]" />
                        <span className="font-mono text-[10px] text-muted-foreground">{t.rating}</span>
                      </div>
                      <span
                        className="font-mono text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)',
                          color: '#000',
                        }}
                      >
                        {t.price}
                      </span>
                    </div>
                    <div className="mt-1 label-mono text-muted-foreground/60">{t.sales} sold</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
