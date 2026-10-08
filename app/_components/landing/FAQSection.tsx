'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'What file formats can I export to?',
    a: 'Pro and Business plans export to PPTX (Microsoft PowerPoint) and PDF. Free plan exports to PDF only. PPTX files are fully editable in PowerPoint, Keynote, and Google Slides.',
  },
  {
    q: 'What happens if I delete a template from the marketplace?',
    a: 'Deleting a listing removes it from public sale immediately. You have a 30-day restore window to recover it. Buyers who already purchased retain their license indefinitely — deletion does not revoke existing purchases.',
  },
  {
    q: 'Who owns the templates I create?',
    a: 'You do. When you list a template, you grant buyers a non-exclusive license to use it in their own presentations. You retain the original design and can edit, reprice, or delist it at any time.',
  },
  {
    q: 'What commission does Slider take on marketplace sales?',
    a: 'We take a flat 20% commission on every sale. You keep 80%. There are no tiers, volume minimums, or hidden fees. Commission applies to Pro and Business plans only — marketplace selling is not available on the Free plan.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Payouts are processed monthly via Stripe. You need a minimum of $10 in earned balance to receive a payout. We support bank transfers in 40+ countries. Payout details are managed in your Settings dashboard.',
  },
  {
    q: 'Can I offer a refund on my template?',
    a: "Template sales are generally final, since the buyer receives the file immediately. However, if a buyer contacts support with a legitimate issue (file corruption, significant misrepresentation), we'll work with you to resolve it. Our refund policy is documented in the Seller Agreement.",
  },
  {
    q: 'Is my AI-generated content unique?',
    a: 'Yes. Every deck is generated fresh against your specific prompt, not retrieved from a pre-made library. Layouts, slide order, and wording are unique to your session.',
  },
  {
    q: 'Can I use Slider for commercial client work?',
    a: 'Yes. Pro and Business plans explicitly allow commercial use — creating decks for clients, embedding branding, and delivering PPTX files is all permitted.',
  },
]

function FAQItem({ q, a, i, inView }: { q: string; a: string; i: number; inView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="border-b border-border/50 last:border-0"
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-foreground group-hover:text-[#F55C7A] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200',
            open && 'rotate-180 text-[#F55C7A]'
          )}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed pr-8">
          {a}
        </p>
      )}
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const half = Math.ceil(FAQS.length / 2)

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="label-mono text-muted-foreground">FAQ</span>
          <h2 className="font-serif mt-3 text-4xl sm:text-5xl font-bold text-foreground">
            Everything you want to know.
          </h2>
        </motion.div>

        {/* Two-column FAQ on desktop */}
        <div className="grid md:grid-cols-2 gap-x-12">
          <div>
            {FAQS.slice(0, half).map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i} inView={inView} />
            ))}
          </div>
          <div>
            {FAQS.slice(half).map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i + half} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
