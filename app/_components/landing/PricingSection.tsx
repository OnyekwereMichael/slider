'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Great for exploring AI generation and building your first decks.',
    cta: 'Get started free',
    ctaHref: '/sign-up',
    highlight: false,
    features: [
      '5 AI-generated decks/month',
      'Manual creation (unlimited slides)',
      'Export as PDF',
      'Basic themes',
      'Marketplace browsing',
    ],
    missing: [
      'PPTX export',
      'Marketplace selling',
      'Custom branding',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    description: 'For professionals who create and sell presentation templates regularly.',
    cta: 'Start Pro free for 14 days',
    ctaHref: '/sign-up?plan=pro',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited AI-generated decks',
      'PPTX & PDF export',
      'All themes + custom branding',
      'Marketplace selling (80% rev. share)',
      'Version history & restore',
      'Priority support',
    ],
    missing: [],
  },
  {
    name: 'Business',
    price: '$49',
    period: '/mo',
    description: 'For agencies and teams managing multiple brands and sellers.',
    cta: 'Contact sales',
    ctaHref: 'mailto:hello@slider.so',
    highlight: false,
    features: [
      'Everything in Pro',
      'Team seats (up to 10)',
      'Shared brand kits',
      'Analytics dashboard',
      'Dedicated account manager',
      'Custom commission structure',
    ],
    missing: [],
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="label-mono text-muted-foreground">Pricing</span>
          <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            No per-deck fees. Marketplace selling requires Pro — we take a flat{' '}
            <span className="font-mono font-semibold text-foreground">20% commission</span> on sales.
            That's it.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? 'border-[#F55C7A]/50 bg-gradient-to-b from-[#F55C7A]/8 to-transparent'
                  : 'border-border/50 bg-card'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-semibold text-black"
                  style={{ background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)' }}
                >
                  {plan.badge}
                </span>
              )}

              {/* Plan name */}
              <span className="label-mono text-muted-foreground">{plan.name}</span>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="font-mono text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>

              {/* CTA */}
              <Link href={plan.ctaHref} className="mt-7">
                <Button
                  size="lg"
                  className={`w-full h-11 font-semibold text-sm ${plan.highlight ? 'text-black!' : ''}`}
                  style={plan.highlight ? { background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)' } : {}}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                  {plan.highlight && <ArrowRight className="w-4 h-4 ml-1" />}
                </Button>
              </Link>

              {/* Divider */}
              <div className="my-7 h-px bg-border/50" />

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#F55C7A]" />
                    {f}
                  </li>
                ))}
                {plan.missing?.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/50 line-through">
                    <span className="w-4 h-4 mt-0.5 shrink-0 text-center text-muted-foreground/30">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-xs text-muted-foreground/60"
        >
          All plans include a 30-day money-back guarantee. Marketplace commission applies to Pro and Business only.
        </motion.p>
      </div>
    </section>
  )
}
