import { updateTheme } from '@/app/actions/project'
import { useSlideStore } from '@/app/store/useSlideStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { themes } from '@/lib/constants'
import { Theme } from '@/lib/types'
import { Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'
import { toast } from 'sonner'

const ThemeChooser = () => {
    const { currentTheme, setCurrentTheme, project } = useSlideStore()
    const { setTheme } = useTheme()

    const handleThemeChange = async (theme: Theme) => {
        if (!project) {
            toast.error('Error', {
                description: 'Failed to update theme'
            })
            return
        }

        // Optimistic UI updates
        setTheme(theme.type)
        setCurrentTheme(theme)

        try {
            const res = await updateTheme(project.id, theme.name)

            if (res.status !== 200) {
                throw new Error('Failed to update theme')
            }

            toast.success('Theme Updated', {
                description: `Switched to ${theme.name}`
            })
        } catch (error) {
            toast.error('Error', {
                description: 'Failed to update theme'
            })
        }
    }

    return (
        /* Light theme container with soft gray backdrop, subtle border & blur */
        <div className="w-full max-h-[70vh] flex flex-col rounded-2xl bg-slate-50/90 backdrop-blur-md border border-slate-200/80 shadow-xl overflow-hidden">
            {/* Header section */}
            <div className="px-5 py-3.5 border-b border-slate-200/80 bg-slate-100/70 flex items-center justify-between shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Select Theme
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">
                    {themes.length} Available
                </span>
            </div>

            {/* Scrollable Theme Area */}
            <ScrollArea className="flex-1 p-3">
                <div className="flex flex-col gap-2.5">
                    {themes.map((theme) => {
                        const isSelected = currentTheme?.name === theme.name

                        return (
                            <button
                                key={theme.name}
                                type="button"
                                onClick={() => handleThemeChange(theme)}
                                className={`
                                    w-full text-left rounded-xl p-3.5 transition-all duration-150 cursor-pointer
                                    border group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                    ${isSelected
                                        ? 'border-primary ring-1 ring-primary bg-white shadow-sm'
                                        : 'border-slate-200/70 hover:border-slate-300 bg-white/70 hover:bg-white'
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    {/* Theme Info & Font Sample */}
                                    <div className="space-y-1 min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-medium text-slate-800 truncate">
                                                {theme.name}
                                            </span>
                                            {isSelected && (
                                                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    <Check className="h-2.5 w-2.5" />
                                                </span>
                                            )}
                                        </div>

                                        <p
                                            className="text-xs text-slate-500 truncate"
                                            style={{ fontFamily: theme.fontFamily }}
                                        >
                                            {theme.fontFamily.split(',')[0].replace(/['"]/g, '').trim()} &bull; Sample text
                                        </p>
                                    </div>

                                    {/* Visual Color Palette Preview */}
                                    <div className="flex items-center gap-1 shrink-0 p-1 rounded-lg bg-slate-100/80 border border-slate-200/60">
                                        <div
                                            className="w-3.5 h-7 rounded-sm border border-slate-300/40"
                                            style={{ background: theme.backgroundColor }}
                                            title="Background"
                                        />
                                        <div
                                            className="w-3.5 h-7 rounded-sm border border-slate-300/40"
                                            style={{ background: theme.slideBackgroundColor || theme.backgroundColor }}
                                            title="Slide Background"
                                        />
                                        <div
                                            className="w-3.5 h-7 rounded-sm border border-slate-300/40"
                                            style={{ background: theme.accentColor }}
                                            title="Accent"
                                        />
                                        <div
                                            className="w-3.5 h-7 rounded-sm border border-slate-300/40"
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

export default ThemeChooser