'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSlideStore } from '@/app/store/useSlideStore'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Download, Play, Loader2 } from 'lucide-react'
import PresentationMode from './PresentationMode'
import { updateSlides } from '@/app/actions/project'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface NavbarProps {
    presentationId: string
}

const Navbar = ({ presentationId }: NavbarProps) => {
    const router = useRouter()
    const { project, slides } = useSlideStore()
    const { resolvedTheme } = useTheme()
    const [isPresentationMode, setIsPresentationMode] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        if (!project) return
        setIsSaving(true)
        try {
            await updateSlides(project.id, JSON.parse(JSON.stringify(slides)))
            toast.success('Saved successfully')
        } catch (err) {
            toast.error('Failed to save')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b',
                    resolvedTheme === 'dark'
                        ? 'bg-neutral-950 border-neutral-800'
                        : 'bg-white border-gray-200'
                )}
            >
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push('/dashboard')}
                        className={cn(
                            'h-8 w-8',
                            resolvedTheme === 'dark' ? 'text-white hover:text-white' : 'text-black hover:text-black'
                        )}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span
                        className={cn(
                            'text-sm font-semibold truncate max-w-xs',
                            resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        )}
                    >
                        {project?.title || 'Untitled Presentation'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            'gap-1.5',
                            resolvedTheme === 'dark'
                                ? 'text-white hover:text-white hover:bg-neutral-800'
                                : 'text-gray-700 hover:text-gray-900'
                        )}
                    >
                        {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">Save</span>
                    </Button>

                    <Button
                        size="sm"
                        onClick={() => setIsPresentationMode(true)}
                        className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white"
                    >
                        <Play className="h-4 w-4 fill-white" />
                        <span className="hidden sm:inline">Present</span>
                    </Button>
                </div>
            </nav>

            {isPresentationMode && (
                <PresentationMode onClose={() => setIsPresentationMode(false)} />
            )}
        </>
    )
}

export default Navbar