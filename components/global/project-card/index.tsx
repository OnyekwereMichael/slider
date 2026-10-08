'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { itemVariants, themes } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, RotateCcw, Layers, Layout, ArrowUpRight } from 'lucide-react'
import ThumbnailPreview from './thumbnail-preview'
import { Slide } from '@/lib/types'
import { Button } from '@/components/ui/button'
import AlertDialogBox from '@/components/global/alert-dialog'
import { deleteProject, recoverProject } from '@/app/actions/project'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
    projectId: string
    src?: string | null
    title: string
    slideData?: unknown
    createdAt: Date
    isDelete?: boolean | null
    themeName?: string
}

const ProjectCard = ({ projectId, src, title, createdAt, isDelete, slideData, themeName }: Props) => {
    const slidesArray = (slideData as Slide[]) || []
    const slide = slidesArray[0]
    const theme = themes.find((t) => t.name === themeName) || themes[0]
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleAction = async () => {
        setLoading(true)
        try {
            if (isDelete) {
                const res = await recoverProject(projectId)
                if (res.status !== 200) throw new Error(res.message || 'Failed to recover project')
                toast.success('Project restored')
            } else {
                const res = await deleteProject(projectId)
                if (res.status !== 200) throw new Error(res.message || 'Failed to delete project')
                toast.success('Project moved to trash')
            }
            router.refresh()
        } catch {
            toast.error('Action failed', {
                description: isDelete ? 'Failed to recover project' : 'Failed to delete project',
            })
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    const hasSlides = slidesArray.length > 0

    return (
        <motion.div
            variants={itemVariants}
            className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/50 bg-card shadow-md hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-400 hover:-translate-y-1.5"
        >
            {/* ── Thumbnail Area ─────────────────────────────────── */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
                <Link href={`/presentation/${projectId}`} className="block h-full w-full">
                    {src ? (
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                    ) : hasSlides && slide ? (
                        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                            <ThumbnailPreview slide={slide} theme={theme} />
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-muted/40 to-muted/20">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm border border-border/40 shadow-sm">
                                <Layout className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground/50 tracking-widest uppercase">
                                No slides yet
                            </span>
                        </div>
                    )}

                    {/* Gradient overlay that intensifies on hover to make thumbnail pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                    {/* Open arrow — appears on hover */}
                    <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/90 dark:bg-black/80 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-semibold text-foreground shadow-lg border border-border/30">
                            <ArrowUpRight className="h-3 w-3" />
                            Open
                        </div>
                    </div>
                </Link>

                {/* Slide count badge */}
                {hasSlides && (
                    <div className="absolute top-3 left-3 pointer-events-none z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md border border-white/10 shadow-sm">
                            <Layers className="h-3 w-3" />
                            {slidesArray.length} {slidesArray.length === 1 ? 'slide' : 'slides'}
                        </span>
                    </div>
                )}

                {/* Delete / Restore action — top right, visible on hover */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <AlertDialogBox
                        description={
                            isDelete
                                ? 'This will recover the project and restore it to your workspace.'
                                : 'This will move the project to your trash folder.'
                        }
                        className={
                            isDelete
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        }
                        onClick={handleAction}
                        open={open}
                        handleOpen={() => setOpen((prev) => !prev)}
                        loading={loading}
                    >
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 shadow-sm transition-colors"
                        >
                            {isDelete ? (
                                <RotateCcw className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                                <Trash2 className="h-3.5 w-3.5 text-red-400" />
                            )}
                        </Button>
                    </AlertDialogBox>
                </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 bg-card border-t border-border/40">
                <div className="flex flex-col min-w-0 flex-1">
                    <Link href={`/presentation/${projectId}`} className="group/title block">
                        <h3 className="font-semibold text-sm tracking-tight text-foreground truncate group-hover/title:text-primary transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <p className="mt-0.5 text-[11px] text-muted-foreground/70">{formattedDate}</p>
                </div>

                {/* Theme color dot */}
                {theme?.accentColor && (
                    <div
                        className="h-2 w-2 rounded-full shrink-0 ring-2 ring-border/50"
                        style={{ backgroundColor: theme.accentColor }}
                        title={theme.name}
                    />
                )}
            </div>
        </motion.div>
    )
}

export default ProjectCard