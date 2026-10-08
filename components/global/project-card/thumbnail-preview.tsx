'use client'

import React from 'react'
import { MasterRecursiveComponent } from '@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent'
import { Slide, Theme } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Layout } from 'lucide-react'

interface ThumbnailPreviewProps {
    slide?: Slide | null
    theme: Theme
    className?: string
}

const ThumbnailPreview = ({ slide, theme, className }: ThumbnailPreviewProps) => {
    return (
        <div
            className={cn(
                "relative w-full aspect-video overflow-hidden select-none transition-all duration-300",
                className
            )}
            style={{
                backgroundColor: theme?.slideBackgroundColor || 'var(--background)',
                color: theme?.accentColor || 'inherit',
                fontFamily: theme?.fontFamily || 'inherit',
                backgroundImage: theme?.gradientBackground || 'none',
            }}
        >
            {slide?.content ? (
                /* Scaled Canvas Viewport — rendered at 2× then scaled to 50%, making content appear larger */
                <div className="absolute inset-0 pointer-events-none origin-top-left scale-[0.5] w-[200%] h-[200%] transform-gpu overflow-hidden p-0">
                    <MasterRecursiveComponent
                        slideId={slide.id}
                        content={slide.content}
                        onContentChange={() => { }}
                        isPreview={true}
                    />
                </div>
            ) : (
                /* Sleek Empty / Placeholder State */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-muted/20 to-muted/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/60 shadow-sm backdrop-blur-sm border border-border/40">
                        <Layout className="h-4 w-4 text-muted-foreground/70" />
                    </div>
                    <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground/60">
                        No Content
                    </span>
                </div>
            )}

            {/* Subtle Vignette & Framing Ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5 dark:ring-white/10" />
        </div>
    )
}

export default ThumbnailPreview