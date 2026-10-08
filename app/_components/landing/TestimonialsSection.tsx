'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: "I listed my first template on a Friday. By Sunday I'd made $340. I didn't do anything after uploading it.",
    author: 'Amara J.',
    role: 'Freelance designer · Lagos',
    earnings: '$2,100 earned',
    templates: '6 templates sold',
    stars: 5,
  },
  {
    quote: "The AI draft is maybe 60% of the way there. The other 40% is where my design skills earn me money. That split works perfectly.",
    author: 'Tom B.',
    role: 'Brand strategist · Berlin',
    earnings: '$890/month avg',
    templates: '3 bestsellers',
    stars: 5,
  },
  {
    quote: "I've used Gamma, Beautiful.ai, all of them. Slider is the first one where I actually feel like I own the output — and now I sell it.",
    author: 'Sofia R.',
    role: 'Consultant · São Paulo',
    earnings: '$4,300 lifetime',
    templates: '11 templates',
    stars: 5,
  },
  {
    quote: "My team generates pitch decks in under an hour now. We've stopped paying for a designer for first drafts.",
    author: 'Kenji W.',
    role: 'Head of Product · Tokyo',
    earnings: null,
    templates: null,
    stars: 5,
  },
  {
    quote: "I make more from template sales than I do from some consulting clients. It's genuinely passive after the first upload.",
    author: 'Priya N.',
    role: 'Business analyst · London',
    earnings: '$1,200/month',
    templates: '9 templates',
    stars: 5,
  },
  {
    quote: "The customization is deep enough that buyers can't tell the template was AI-generated. That's the whole point.",
    author: 'Marcus D.',
    role: 'Creative director · NYC',
    earnings: '$670 first week',
    templates: '4 templates',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-[hsl(222_13%_9%)]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="label-mono text-muted-foreground">From the community</span>
          <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Real creators.{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Real earnings.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            We asked people who've sold templates, not just people who made decks.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="break-inside-avoid flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-7"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#F6BC66] text-[#F6BC66]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </div>
                {t.earnings && (
                  <div className="text-right">
                    <div className="font-mono text-xs font-semibold text-[#F55C7A]">{t.earnings}</div>
                    <div className="label-mono text-muted-foreground/60 mt-0.5">{t.templates}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
