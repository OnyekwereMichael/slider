'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAnimation } from 'framer-motion'
import { useSlideStore } from '@/app/store/useSlideStore'
import { Theme } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, TrendingUp, Zap, Sparkles } from 'lucide-react'
import ThemeCard from './ThemeCard'
import ThemePicker from './ThemePicker'
import { themes } from '@/lib/constants'

const ThemePreview = () => {
    const params = useParams()
    const router = useRouter()
    const controls = useAnimation()
    const { currentTheme, setCurrentTheme, project } = useSlideStore()

    const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme || themes[0])

    // Fix: Use router.push instead of redirect inside useEffect for client components
    useEffect(() => {
        if (project?.slides && (project.slides as unknown as unknown[])?.length > 0) {
            router.push(`/presentation/${params.presentationId}`)
        }
    }, [project, params.presentationId, router])

    useEffect(() => {
        controls.start('visible')
    }, [controls, selectedTheme])

    // Apply selected theme
    const applyTheme = (theme: Theme) => {
        setSelectedTheme(theme)
        setCurrentTheme(theme)
    }

    // Left Card Content: Presentation Agenda / Overview Slide
    const leftCardContent = (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 opacity-80" style={{ color: selectedTheme.accentColor }} />
                <span
                    className="text-xs font-semibold tracking-wide uppercase opacity-90"
                    style={{ color: selectedTheme.accentColor }}
                >
                    Executive Summary
                </span>
            </div>

            <div className="space-y-2">
                {[
                    'Market Opportunity & Trends',
                    'Product Architecture Overview',
                    'Financial Growth Metrics',
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium border border-black/5"
                        style={{
                            backgroundColor: `${selectedTheme.accentColor}08`,
                            color: selectedTheme.fontColor,
                        }}
                    >
                        <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{
                                backgroundColor: `${selectedTheme.accentColor}20`,
                                color: selectedTheme.accentColor,
                            }}
                        >
                            0{idx + 1}
                        </span>
                        <span className="truncate">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    )

    // Main Card Content: Key Metrics / KPI Slide
    const mainCardContent = (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 opacity-80" style={{ color: selectedTheme.accentColor }} />
                <span
                    className="text-xs font-semibold tracking-wide uppercase opacity-90"
                    style={{ color: selectedTheme.accentColor }}
                >
                    Executive Summary
                </span>
            </div>

            <div className="space-y-3">
                {[
                    'Market Opportunity & Trends',
                    'Product Architecture Overview',
                    'Financial Growth Metrics',
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-lg text-xs font-medium border border-black/5"
                        style={{
                            backgroundColor: `${selectedTheme.accentColor}08`,
                            color: selectedTheme.fontColor,
                        }}
                    >
                        <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{
                                backgroundColor: `${selectedTheme.accentColor}20`,
                                color: selectedTheme.accentColor,
                            }}
                        >
                            0{idx + 1}
                        </span>
                        <span className="truncate">{item}</span>
                    </div>
                ))}
            </div>

            {/* <div className="flex items-center gap-2.5 pt-1">
                <Button
                    size="sm"
                    className="h-9 px-4 text-xs font-semibold shadow-xs transition-opacity hover:opacity-90"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.backgroundColor || '#ffffff',
                    }}
                >
                    Explore Deck
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 text-xs font-semibold border"
                    style={{
                        borderColor: `${selectedTheme.accentColor}40`,
                        color: selectedTheme.fontColor,
                    }}
                >
                    View Analytics
                </Button>
            </div> */}
        </div>
    )

    const rightCardContent = (
        <div className="space-y-3">
            <div className="space-y-2">
                {[
                    { title: 'AI Automation', desc: 'Instant layout generation' },
                    { title: 'Smart Themes', desc: 'Dynamic brand palette matching' },
                ].map((feature, idx) => (
                    <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-black/5 space-y-0.5"
                        style={{ backgroundColor: `${selectedTheme.accentColor}08` }}
                    >
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: selectedTheme.accentColor }} />
                            <span className="text-xs font-bold" style={{ color: selectedTheme.fontColor }}>
                                {feature.title}
                            </span>
                        </div>
                        <p className="text-[11px] opacity-75 pl-5" style={{ color: selectedTheme.fontColor }}>
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div
            className="h-screen w-full flex overflow-hidden transition-colors duration-300 max-sm:flex-col"
            style={{
                backgroundColor: selectedTheme.backgroundColor || selectedTheme.slideBackgroundColor,
                color: selectedTheme.fontColor,
                fontFamily: selectedTheme.fontFamily,
            }}
        >
            <main className="flex-1 flex flex-col h-full min-w-0 relative">
                <header className="p-6 absolute top-0 left-0 right-0 z-30 flex items-center justify-between pointer-events-none">
                    <Button
                        variant="outline"
                        size="sm"
                        className="pointer-events-auto h-9 px-3.5 text-xs font-medium border bg-background/80 backdrop-blur-sm shadow-xs transition-all hover:bg-background cursor-pointer"
                        style={{
                            color: selectedTheme.fontColor,
                            borderColor: `${selectedTheme.accentColor}30`,
                        }}
                        onClick={() => router.push('/create-page')}
                    >
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                        Back to Editor
                    </Button>
                </header>

                {/* Centered Slide Canvas & Cards Stack Container */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                    <div className="w-full max-w-4xl aspect-[16/9] relative flex items-center justify-center mt-14">
                        {/* Left Card */}
                        <ThemeCard
                            title="Overview & Strategy"
                            description="A clear roadmap for scaling your next big initiative."
                            content={leftCardContent}
                            variant="left"
                            theme={selectedTheme}
                            controls={controls}
                        />

                        {/* Main Center Card */}
                        <ThemeCard
                            title="Impact & Growth Metrics"
                            description="Accelerating performance and driving key business outcomes."
                            content={mainCardContent}
                            variant="main"
                            theme={selectedTheme}
                            controls={controls}
                        />

                        {/* Right Card */}
                        <ThemeCard
                            title="Platform Capabilities"
                            description="Built for enterprise efficiency and high-converting decks."
                            content={rightCardContent}
                            variant="right"
                            theme={selectedTheme}
                            controls={controls}
                        />
                    </div>
                </div>
            </main>

            {/* Sidebar Theme Picker */}
            <ThemePicker
                selectedTheme={selectedTheme}
                theme={themes}
                onThemeSelect={applyTheme}
            />
        </div>
    )
}

export default ThemePreview