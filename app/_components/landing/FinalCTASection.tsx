'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function FinalCTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[hsl(222_13%_9%)]" ref={ref}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[600px] h-[400px] rounded-full blur-[130px] opacity-15"
          style={{ background: 'radial-gradient(ellipse, #F55C7A 0%, #F6BC66 60%, transparent 100%)' }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="label-mono text-muted-foreground">Get started today</span>

          <h2 className="font-serif mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] tracking-tight">
            Whether you&rsquo;re making<br className="hidden sm:block" />
            your next pitch deck or{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              building a template business —
            </span>{' '}
            start here.
          </h2>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Free to start. No credit card required. Your first deck in under 60 seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-13 px-9 text-base font-semibold text-black! gap-2 shadow-lg shadow-[#F55C7A]/25"
                style={{ background: 'linear-gradient(135deg, #F55C7A 0%, #F6BC66 100%)' }}
              >
                Start Creating Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="h-13 px-8 text-base border-border/60"
              >
                Browse Templates
              </Button>
            </Link>
          </div>

          <p className="mt-7 text-xs text-muted-foreground/50">
            Join{' '}
            <span className="font-mono font-semibold text-muted-foreground">840+</span>
            {' '}creators already earning on Slider.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
