'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Wand2, PenLine, Palette, Store, GitBranch, Settings
} from 'lucide-react'

const features = [
  {
    icon: Wand2,
    title: 'AI Generation',
    body: 'Describe your topic and get a complete, structured deck. Headings, bullets, layouts — all generated in one shot.',
    tag: 'Core',
    accent: '#F55C7A',
  },
  {
    icon: PenLine,
    title: 'Manual Creation',
    body: 'Prefer full control? Build slide-by-slide from a blank canvas. Add any content block, arrange freely.',
    tag: 'Core',
    accent: '#F6A35A',
  },
  {
    icon: Palette,
    title: 'Deep Customization',
    body: 'Colors, fonts, layouts, branding. Change everything after AI generates it — or start from your own style guide.',
    tag: 'Design',
    accent: '#F6BC66',
  },
  {
    icon: Store,
    title: 'Template Marketplace',
    body: 'Sell templates you\'ve created. Set your price, reach buyers, earn 80% on every sale. Your designs, your income.',
    tag: 'Marketplace',
    accent: '#F55C7A',
    highlight: true,
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    body: 'Accidentally delete something? Slider keeps a restore window so nothing is gone for good.',
    tag: 'Safety',
    accent: '#F6A35A',
  },
  {
    icon: Settings,
    title: 'Settings Dashboard',
    body: 'Manage your account, all your templates, sales history, and payout info — in one clean dashboard.',
    tag: 'Account',
    accent: '#F6BC66',
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-28 px-6 bg-[hsl(222_13%_9%)]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="label-mono text-muted-foreground">Capabilities</span>
          <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Everything you need to{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #F55C7A 0%, #F6BC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              create and sell.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Slider is not a simple AI wrapper. It's a complete creative studio with a built-in marketplace.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`relative flex flex-col gap-4 rounded-2xl border p-7 transition-all duration-300 group hover:-translate-y-1 ${
                  feat.highlight
                    ? 'border-[#F55C7A]/40 bg-gradient-to-br from-[#F55C7A]/8 to-[#F6BC66]/4'
                    : 'border-border/50 bg-card hover:border-border'
                }`}
              >
                {/* Tag */}
                <span
                  className="font-mono text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: feat.accent }}
                >
                  {feat.tag}
                </span>
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: feat.accent + '18' }}
                >
                  <Icon className="w-5.5 h-5.5" style={{ color: feat.accent }} />
                </div>
                {/* Text */}
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.body}</p>
                </div>
                {/* Subtle glow on highlight card */}
                {feat.highlight && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 60px -10px #F55C7A33' }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
