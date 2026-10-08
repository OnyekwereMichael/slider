'use client'

import { buySubscription } from '@/app/actions/lemonSqueezy'
import { Button } from '@/components/ui/button'
import { User } from '@/lib/generated/prisma'
import { Check, Sparkles, Zap } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const FREE_FEATURES = [
    'Up to 5 projects',
    'Basic AI outline generation',
    'Standard themes',
    'Export to PDF',
]

const PRO_FEATURES = [
    'Unlimited projects',
    'Advanced AI generation',
    'All premium themes',
    'Sell your templates',
    'LemonSqueezy storefront integration',
    'Priority support',
]

export default function PlanCard({ user }: { user: User }) {
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const res = await buySubscription(user.id)
            if (res.url) {
                window.location.href = res.url
            }
        } catch {
            toast.error('Could not start checkout. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const isPro = !!user.subscription

    return (
        <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-5">
            <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground text-[15px]">Your Plan</h3>
            </div>

            {/* Current plan pill */}
            <div className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${isPro
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-muted/50 text-muted-foreground border border-border/50'
                }`}>
                {isPro ? (
                    <><Sparkles className="h-3.5 w-3.5" /> Pro Plan — Active</>
                ) : (
                    <>Free Plan</>
                )}
            </div>

            {/* Feature comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Free */}
                <div className="rounded-xl border border-border/40 bg-muted/20 p-4 space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Free</p>
                    <ul className="space-y-2">
                        {FREE_FEATURES.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground/60" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pro */}
                <div className={`rounded-xl border p-4 space-y-3 ${isPro
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border/40 bg-muted/20'
                    }`}>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Pro</p>
                        {!isPro && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">Upgrade</span>
                        )}
                    </div>
                    <ul className="space-y-2">
                        {PRO_FEATURES.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                                <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isPro ? 'text-primary' : 'text-muted-foreground/60'}`} />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* CTA */}
            {!isPro && (
                <Button
                    onClick={handleUpgrade}
                    disabled={loading}
                    className="w-full gap-2 font-semibold"
                >
                    <Sparkles className="h-4 w-4" />
                    {loading ? 'Redirecting to checkout…' : 'Upgrade to Pro'}
                </Button>
            )}

            {isPro && (
                <p className="text-center text-sm text-muted-foreground">
                    You&apos;re on the Pro plan. Thank you for supporting Slider! 🎉
                </p>
            )}
        </div>
    )
}
