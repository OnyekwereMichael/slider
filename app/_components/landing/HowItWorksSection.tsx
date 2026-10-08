'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Wand2, PenLine, Download, Store } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Wand2,
    title: 'Generate with AI',
    body: 'Describe your topic in a sentence. Slider generates a complete, structured deck — slides, headings, bullets, layouts — in seconds.',
    accent: '#F55C7A',
  },
  {
    num: '02',
    icon: PenLine,
    title: 'Customize everything',
    body: 'Swap colors, change fonts, rearrange layouts, upload images. What the AI generates is a starting point — not a ceiling.',
    accent: '#F6A35A',
  },
  {
    num: '03',
    icon: Download,
    title: 'Export in any format',
    body: 'Download as PPTX for PowerPoint, PDF for sharing, or keep it in Slider for live editing. Your deck, your format.',
    accent: '#F6BC66',
  },
  {
    num: '04',
    icon: Store,
    title: 'Sell it on the marketplace',
    body: 'List your template with a price. Every time someone buys it, you earn — 80% revenue share, paid monthly, no lock-in.',
    accent: '#F55C7A',
  },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="label-mono text-muted-foreground">How it works</span>
          <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            From blank page to<br />
            <span
              style={{
                background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              income stream.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Four steps, no friction. Each one faster than the old way.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col gap-5 rounded-2xl border border-border/50 bg-card p-7 hover:border-border transition-colors"
              >
                {/* Step number */}
                <span
                  className="font-mono text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: step.accent }}
                >
                  STEP {step.num}
                </span>
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: step.accent + '18' }}
                >
                  <Icon className="w-5 h-5" style={{ color: step.accent }} />
                </div>
                {/* Content */}
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
                {/* Connector line for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[3.75rem] -right-3 w-6 h-px bg-border/60" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
