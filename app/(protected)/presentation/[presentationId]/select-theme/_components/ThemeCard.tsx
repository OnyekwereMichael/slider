import React from 'react'
import { motion, useAnimation, type Variants } from 'framer-motion'
import { Theme } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

type Props = {
    title: string
    description: string
    content?: React.ReactNode
    variant: 'left' | 'main' | 'right'
    theme: Theme
    controls: ReturnType<typeof useAnimation>
}

const ThemeCard = ({ title, description, content, variant, theme, controls }: Props) => {
    const variants: Record<'left' | 'right' | 'main', Variants> = {
        left: {
            hidden: { opacity: 0, x: '-30%', scale: 0.8, rotate: 0 },
            visible: {
                opacity: 0.45,
                x: '-22%',
                y: '3%',
                scale: 0.84,
                rotate: -6,
                transition: {
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                    delay: 0.05,
                },
            },
        },
        right: {
            hidden: { opacity: 0, x: '30%', scale: 0.8, rotate: 0 },
            visible: {
                opacity: 0.45,
                x: '22%',
                y: '3%',
                scale: 0.84,
                rotate: 6,
                transition: {
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                    delay: 0.05,
                },
            },
        },
        main: {
            hidden: { opacity: 0, scale: 0.9, y: '5%' },
            visible: {
                opacity: 1,
                x: '0%',
                y: '0%',
                scale: 1,
                rotate: 0,
                transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 25,
                },
            },
        },
    }

    const isMain = variant === 'main'

    // Dynamic borders & shadows based on theme color palette
    const subtleBorder =
        theme.accentColor?.startsWith('#') && theme.accentColor.length === 7
            ? `${theme.accentColor}20`
            : 'rgba(255, 255, 255, 0.15)'

    return (
        <motion.div
            initial="hidden"
            animate={controls}
            variants={variants[variant]}
            /* Hides background/side stacked cards on mobile to prevent clipping and focus on main content */
            className={`
                absolute w-full max-w-xl md:max-w-2xl px-4 pointer-events-none
                ${!isMain ? 'hidden md:block' : 'block'}
            `}
            style={{
                zIndex: isMain ? 20 : 10,
                perspective: 1000,
            }}
        >
            <Card
                className={`
                    w-full overflow-hidden rounded-2xl transition-all duration-300 pointer-events-auto
                    ${isMain
                        ? 'shadow-[0_20px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10'
                        : 'shadow-md filter blur-[0.4px]'
                    }
                `}
                style={{
                    backgroundColor: theme.slideBackgroundColor || theme.backgroundColor,
                    borderColor: subtleBorder,
                    fontFamily: theme.fontFamily,
                }}
            >
                {/* Header bar */}
                <div className="px-4 py-2 sm:px-5 sm:pt-3 sm:pb-1 flex items-center justify-between border-b border-black/5 ">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full " style={{ background: theme.fontColor }} />
                        <span className="w-2 h-2 rounded-full " style={{ background: theme.fontColor }} />
                        <span className="w-2 h-2 rounded-full " style={{ background: theme.fontColor }} />
                    </div>
                    <span
                        className="text-[10px] font-mono tracking-wider uppercase "
                        style={{ color: theme.fontColor }}
                    >
                        Slide Preview
                    </span>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-5 min-h-[320px] md:h-[370px]">
                    <CardContent className="order-2 md:order-1 md:col-span-3 flex flex-col justify-between p-5 md:p-6 space-y-4 overflow-hidden z-10">
                        <div className="space-y-2 md:space-y-3">
                            <span
                                className="text-[10px] md:text-[11px] font-semibold tracking-widest uppercase py-0.5 rounded-xs"
                                style={{ color: theme.accentColor }}
                            >
                                {/* {theme.name} */}
                            </span>

                            <h2
                                className="text-lg sm:text-xl md:text-[22.5px] font-bold tracking-tight leading-snug mt-1 md:mt-3"
                                style={{ color: theme.fontColor }}
                            >
                                {title}
                            </h2>

                            <p
                                className="text-xs md:text-sm leading-relaxed md:leading-[1.8] opacity-80 line-clamp-3 md:line-clamp-none"
                                style={{ color: theme.fontColor }}
                            >
                                {description}
                            </p>
                        </div>

                        {content ? (
                            <div className="pt-2">{content}</div>
                        ) : (
                            <div className="flex items-center gap-2 pt-3 md:pt-4 border-t border-black/5">
                                <div
                                    className="h-1.5 w-12 rounded-full"
                                    style={{ backgroundColor: theme.accentColor }}
                                />
                                <div
                                    className="h-1.5 w-6 rounded-full opacity-40"
                                    style={{ backgroundColor: theme.fontColor }}
                                />
                            </div>
                        )}
                    </CardContent>

                    {/* Image Section */}
                    <div className="order-1 md:order-2 md:col-span-2 relative h-[140px] sm:h-[160px] md:h-full w-full overflow-hidden bg-black/5">
                        <Image
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                            alt={title || 'Theme Preview'}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover object-center"
                            priority={isMain}
                        />
                        {/* Subtle overlay blend to match theme */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundColor: theme.accentColor }}
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

export default ThemeCard
















