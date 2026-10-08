'use client'

import { User } from '@/lib/generated/prisma'
import { ShoppingBag, ExternalLink, Info } from 'lucide-react'

export default function SellerCard({ user }: { user: User }) {
    const hasStore = !!user.storeId

    return (
        <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground text-[15px] ">Creator Storefront</h3>
            </div>

            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
                Sell your presentation templates directly through your LemonSqueezy storefront.
                Buyers can purchase and instantly use your designs.
            </p>

            {/* Store status */}
            {hasStore ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Store Connected</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">Store ID: {user.storeId}</p>
                    </div>
                    <a
                        href={`https://app.lemonsqueezy.com/stores/${user.storeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                    >
                        View <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            ) : (
                <div className="rounded-xl border border-border/40 bg-muted/20 p-4 flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <Info className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/70">No store connected</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            To sell templates, connect your LemonSqueezy store via the API settings below.
                        </p>
                    </div>
                </div>
            )}

            {/* Key indicators */}
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">API Key</p>
                    <p className="text-xs font-mono font-medium text-foreground/80 truncate">
                        {user.lemonSqueezyApiKey ? '••••' + user.lemonSqueezyApiKey.slice(-6) : '—'}
                    </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Webhook Secret</p>
                    <p className="text-xs font-mono font-medium text-foreground/80 truncate">
                        {user.webhooksSecret ? '••••' + user.webhooksSecret.slice(-4) : '—'}
                    </p>
                </div>
            </div>

            <p className="text-[13px] text-muted-foreground/60 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Update these keys in your LemonSqueezy dashboard.
            </p>
        </div>
    )
}
