'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/lib/generated/prisma'
import { UserButton } from '@clerk/nextjs'
import { Mail, User2 } from 'lucide-react'

export default function ProfileCard({ user }: { user: User }) {
    const initials = user.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) ?? '?'

    return (
        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            {/* Banner gradient */}
            <div className="h-24 w-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.25),transparent_70%)]" />
            </div>

            <div className="px-6 pb-6 -mt-10">
                {/* Avatar + Clerk button */}
                <div className="flex items-end justify-between">
                    <Avatar className="h-20 w-20 ring-4 ring-background shadow-xl">
                        <AvatarImage src={user.profileImage ?? undefined} alt={user.name} />
                        <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Manage account</span>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>

                {/* Info */}
                <div className="mt-4 space-y-1">
                    <h2 className="text-lg font-semibold text-foreground leading-tight">{user.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        <span>{user.email}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        <User2 className="h-3 w-3" />
                        Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    {user.subscription && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            ✦ Pro
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
