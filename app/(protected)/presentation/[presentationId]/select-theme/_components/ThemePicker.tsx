
import { generateLayouts } from '@/app/actions/openai'
import { useSlideStore } from '@/app/store/useSlideStore'
import { Button } from '@/components/ui/button'
import { Theme } from '@/lib/types'
import { Check, Loader2, Wand2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { themes } from '@/lib/constants'
import { motion } from 'framer-motion'

type Props = {
    selectedTheme: Theme
    theme: Theme[]
    onThemeSelect: (theme: Theme) => void
}
const ThemePicker = ({ onThemeSelect, selectedTheme }: Props) => {
    const router = useRouter()
    const params = useParams()
    const { project, setSlides, currentTheme } = useSlideStore()
    const [loading, setLoading] = useState(false)

    const handleGenerativeLayouts = async () => {
        setLoading(true)
        if (!selectedTheme) {
            toast.error('Please select a theme')
            setLoading(false)
            return
        }

        if (project?.id === '') {
            toast.error('Error', {
                description: 'Please create a project'
            })
            router.push('/create-page')
            return
        }

        try {
            const res = await generateLayouts(
                params.presentationId as string,
                currentTheme.name
            )

            if (res.status !== 200 || !('data' in res) || !res.data) {
                throw new Error('Failed to generate layouts')
            }

            toast.success('Success', {
                description: 'Layouts generated successfully'
            })
            router.push(`/presentation/${project?.id}`)
            setSlides(res.data)
        } catch (error) {
            toast.error('Error', {
                description: 'Failed to generate layouts'
            })
        } finally {
            setLoading(false)
        }



    }
    return (
        <div className='w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col'
            style={{
                backgroundColor: selectedTheme.sidebarColor || selectedTheme.backgroundColor,

                borderLeft: `1px solid ${selectedTheme.accentColor}20`
            }}
        >
            <div className='px-5 py-4 space-y-6 flex-shrink-0'>
                <div className='space-y-2'>
                    <h2 className='font-serif text-[23px] font-bold tracking-tight'>Choose a theme</h2>
                    <p className='text-sm font-medium leading-[1.8]'
                        style={{ color: `${selectedTheme.fontColor}` }}
                    >Select from our curated collection or generate a custom theme</p>
                </div>

                <Button
                    onClick={handleGenerativeLayouts}
                    className='w-full h-12 text-[15px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-white!'
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.backgroundColor
                    }}
                >
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className='mr-2 h-5 w-5' />}

                    {loading ? <p className='animate-pulse font-medium text-sm!'>Generating Theme.. </p> : 'Generate Theme'}

                </Button>
            </div>

            {/* Themes List Section */}
            <ScrollArea className="flex-1 min-h-0 px-4 py-4">
                <div className="flex flex-col gap-2.5">
                    {themes.map((theme) => {
                        const isSelected = selectedTheme?.name === theme.name

                        return (
                            <button
                                key={theme.name}
                                type="button"
                                onClick={() => onThemeSelect(theme)}
                                className={`
                  w-full text-left rounded-xl p-3.5 transition-all duration-150 cursor-pointer
                  border group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${isSelected
                                        ? 'border-primary ring-1 ring-primary bg-accent/40'
                                        : 'border-border/60 hover:border-border bg-card hover:bg-accent/20'
                                    }
                `}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    {/* Theme Info & Font Sample */}
                                    <div className="space-y-1 min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-medium text-card-foreground truncate">
                                                {theme.name}
                                            </span>
                                            {isSelected && (
                                                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    <Check className="h-2.5 w-2.5" />
                                                </span>
                                            )}
                                        </div>

                                        <p
                                            className="text-xs text-muted-foreground truncate"
                                            style={{ fontFamily: theme.fontFamily }}
                                        >
                                            {theme.fontFamily.split(',')[0].replace(/['"]/g, '').trim()} &bull; Sample text
                                        </p>
                                    </div>

                                    {/* Visual Color Palette Preview */}
                                    <div className="flex items-center gap-1 shrink-0 p-1 rounded-lg bg-background/50 border border-border/30">
                                        <div
                                            className="w-3.5 h-7 rounded-sm"
                                            style={{ background: theme.backgroundColor }}
                                            title="Background"
                                        />
                                        <div
                                            className="w-3.5 h-7 rounded-sm"
                                            style={{ background: theme.slideBackgroundColor || theme.backgroundColor }}
                                            title="Slide Background"
                                        />
                                        <div
                                            className="w-3.5 h-7 rounded-sm"
                                            style={{ background: theme.accentColor }}
                                            title="Accent"
                                        />
                                        <div
                                            className="w-3.5 h-7 rounded-sm"
                                            style={{ background: theme.fontColor }}
                                            title="Text"
                                        />
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}

export default ThemePicker












