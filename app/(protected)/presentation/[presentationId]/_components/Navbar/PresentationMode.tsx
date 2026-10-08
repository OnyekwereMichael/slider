import { useSlideStore } from '@/app/store/useSlideStore'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { MasterRecursiveComponent } from '../editor/MasterRecursiveComponent'
import { Button } from '@/components/ui/button'
import {
    ChevronLeft,
    ChevronRight,
    X,
    Play,
    Pause,
    Maximize2,
    Minimize2
} from 'lucide-react'

interface PresentationModeProps {
    onClose: () => void
    presentationId: string
}

const PresentationMode = ({ onClose }: PresentationModeProps) => {
    const { getOrderedSlides, currentTheme } = useSlideStore()
    const slides = getOrderedSlides()

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const slideViewportRef = useRef<HTMLDivElement>(null)
    const touchStartRef = useRef<{ x: number; y: number } | null>(null)

    const isFirstSlide = currentSlideIndex === 0
    const isLastSlide = currentSlideIndex === slides.length - 1

    const goToPreviousSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))
    }, [])

    const goToNextSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))
    }, [slides.length])

    // Toggle Auto Play Mode
    const toggleAutoPlay = () => {
        setIsAutoPlay((prev) => !prev)
    }

    // Toggle Fullscreen Mode
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(() => { })
            setIsFullscreen(true)
        } else {
            document.exitFullscreen().catch(() => { })
            setIsFullscreen(false)
        }
    }

    // Auto-play timer logic
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isAutoPlay) {
            timer = setInterval(() => {
                setCurrentSlideIndex((prev) => {
                    if (prev >= slides.length - 1) {
                        setIsAutoPlay(false)
                        return prev
                    }
                    return prev + 1
                })
            }, 3000)
        }
        return () => clearInterval(timer)
    }, [isAutoPlay, slides.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' || event.key === ' ') {
                if (currentSlideIndex === slides.length - 1) {
                    onClose()
                } else {
                    goToNextSlide()
                }
            } else if (event.key === 'ArrowLeft') {
                goToPreviousSlide()
            } else if (event.key === 'Escape' && !document.fullscreenElement) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [currentSlideIndex, slides.length, onClose, goToNextSlide, goToPreviousSlide])

    // Touch Swipe Navigation for mobile devices
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return

        const touch = e.changedTouches[0]
        const deltaX = touch.clientX - touchStartRef.current.x
        const deltaY = touch.clientY - touchStartRef.current.y
        const minSwipeDistance = 50

        // Only trigger slide navigation on horizontal swipe if content is at top or non-scrollable
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX < 0 && !isLastSlide) {
                goToNextSlide()
            } else if (deltaX > 0 && !isFirstSlide) {
                goToPreviousSlide()
            }
        }

        touchStartRef.current = null
    }

    // Scroll to top on slide change
    useEffect(() => {
        if (slideViewportRef.current) {
            slideViewportRef.current.scrollTop = 0
        }
    }, [currentSlideIndex])

    return (
        <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-neutral-950 text-slate-100 overflow-hidden select-none h-screen w-screen"
        >
            {/* Top Control Bar */}
            <header className="w-full z-30 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Presentation Mode
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        className="h-9 w-9 rounded-full bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition-all"
                        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-9 w-9 rounded-full bg-neutral-900/60 text-neutral-300 hover:bg-red-500/20 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 transition-all"
                        title="Exit (Esc)"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            <main className="relative flex-1 w-full h-full flex items-center justify-center p-0 overflow-hidden max-w-6xl">
                <div className="relative w-full h-full flex items-center justify-center">
                    <div
                        ref={slideViewportRef}
                        className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-neutral-900 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlideIndex}
                                initial={{ opacity: 0, scale: 0.99, y: 4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.01, y: -4 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className={`w-full min-h-full  flex flex-col justify-center items-center ${slides[currentSlideIndex]?.className || ''
                                    }`}
                                style={{
                                    backgroundColor: currentTheme?.slideBackgroundColor || '#0a0a0a',
                                    backgroundImage: currentTheme?.gradientBackground,
                                    color: currentTheme?.accentColor,
                                    fontFamily: currentTheme?.fontFamily,
                                }}
                            >
                                <div className="w-full h-full select-text">
                                    <MasterRecursiveComponent
                                        content={slides[currentSlideIndex]?.content}
                                        onContentChange={() => { }}
                                        slideId={slides[currentSlideIndex]?.id}
                                        isEditable={false}
                                        isPreview={false}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Bottom Floating Toolbar */}
            <footer className="w-full z-30 pb-6 flex justify-center items-center pointer-events-none shrink-0">
                <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 shadow-2xl ring-1 ring-white/5">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPreviousSlide}
                        disabled={isFirstSlide}
                        className="h-8 w-8 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

                    {/* Auto-Play Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleAutoPlay}
                        className={`h-8 px-3 rounded-full text-xs font-medium transition-all gap-1.5 ${isAutoPlay
                            ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                            }`}
                    >
                        {isAutoPlay ? (
                            <>
                                <Pause className="h-3.5 w-3.5 fill-emerald-400" />
                                <span>Autoplay On</span>
                            </>
                        ) : (
                            <>
                                <Play className="h-3.5 w-3.5" />
                                <span>Autoplay</span>
                            </>
                        )}
                    </Button>

                    <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

                    {/* Slide Counter */}
                    <span className="px-2 text-xs font-mono font-medium tracking-tight text-neutral-400">
                        <span className="text-white font-semibold">{currentSlideIndex + 1}</span>
                        <span className="text-neutral-600 mx-1">/</span>
                        {slides.length}
                    </span>

                    <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNextSlide}
                        disabled={isLastSlide}
                        className="h-8 w-8 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-30 transition-all"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </footer>
        </div>
    )
}

export default PresentationMode