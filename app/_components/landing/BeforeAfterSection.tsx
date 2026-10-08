'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BeforeAfterSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-[hsl(222_13%_9%)]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="label-mono text-muted-foreground">The editing power is real</span>
          <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Raw AI output vs.{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              your version.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            The same slide. Same content. The difference is 5 minutes of customization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="label-mono text-muted-foreground/70">Before</span>
              <div className="flex-1 h-px bg-border/40" />
              <span className="label-mono text-muted-foreground/50">AI raw output</span>
            </div>
            <div className="rounded-2xl border border-border/40 overflow-hidden aspect-video bg-white flex flex-col p-7 gap-4">
              {/* Raw AI look */}
              <div className="flex flex-col gap-1.5">
                <div className="h-3 rounded-sm bg-gray-300 w-1/4" />
                <div className="h-7 rounded-sm bg-gray-800 w-3/4" />
                <div className="h-3 rounded-sm bg-gray-300 w-2/3 mt-1" />
                <div className="h-3 rounded-sm bg-gray-300 w-1/2" />
              </div>
              <div className="flex gap-3 mt-2">
                {[1, 2, 3].map((b) => (
                  <div key={b} className="flex-1 bg-gray-100 rounded-lg p-3 flex flex-col gap-2">
                    <div className="h-2 rounded-sm bg-gray-300 w-2/3" />
                    <div className="h-5 rounded-sm bg-gray-800 w-1/2" />
                    <div className="h-2 rounded-sm bg-gray-200 w-full" />
                    <div className="h-2 rounded-sm bg-gray-200 w-3/4" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <div className="h-2 rounded-sm bg-gray-200 w-1/3" />
                <div className="h-2 rounded-sm bg-gray-200 w-1/4" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 text-center">
              Functional. Generic. Gets the job done.
            </p>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="label-mono text-[#F55C7A]">After</span>
              <div className="flex-1 h-px bg-[#F55C7A]/30" />
              <span className="label-mono text-[#F6BC66]/70">5 min of customization</span>
            </div>
            <div
              className="rounded-2xl border border-[#F55C7A]/30 overflow-hidden aspect-video flex flex-col p-7 gap-4"
              style={{ background: 'linear-gradient(135deg, #0f0a0e 0%, #1a0f14 50%, #160d11 100%)' }}
            >
              {/* Customized look */}
              <div className="flex flex-col gap-2">
                <span
                  className="font-mono text-[9px] tracking-widest uppercase"
                  style={{ color: '#F55C7A' }}
                >
                  Q3 2025 · Investor Update
                </span>
                <div
                  className="font-serif text-2xl font-bold leading-tight"
                  style={{ color: '#F1F2F4' }}
                >
                  Revenue grew<br />47% this quarter.
                </div>
                <div className="text-[10px] leading-relaxed" style={{ color: '#A0A8B8' }}>
                  Driven by marketplace adoption and a 3× increase in creators selling templates.
                </div>
              </div>
              <div className="flex gap-3 mt-auto">
                {[
                  { label: 'ARR', val: '$2.4M', c: '#F55C7A' },
                  { label: 'MRR', val: '$198K', c: '#F6A35A' },
                  { label: 'Churn', val: '1.8%', c: '#F6BC66' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 rounded-lg p-2.5"
                    style={{ background: s.c + '14', borderLeft: `2px solid ${s.c}` }}
                  >
                    <div className="font-mono text-[8px] tracking-widest uppercase" style={{ color: s.c }}>
                      {s.label}
                    </div>
                    <div className="font-mono text-sm font-bold mt-0.5" style={{ color: '#F1F2F4' }}>
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 text-center">
              The same content — presentation-ready.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
