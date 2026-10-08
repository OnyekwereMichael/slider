import { useSlideStore } from '@/app/store/useSlideStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutSlides, Slide } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import { Check, Loader2, Trash2, X } from 'lucide-react'
import { MasterRecursiveComponent } from './MasterRecursiveComponent'
import { updateSlides } from '@/app/actions/project'
import { toast } from 'sonner'

type DropZoneProps = {
    index: number
    onDrop: (args: {
        items: {
            type: string
            layoutType: string
            component: LayoutSlides
            index?: number
        }
        dropIndex: number
    }) => void
    isEditable: boolean
}

export const DropZone: React.FC<DropZoneProps> = ({ index, onDrop, isEditable }) => {
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: ['SLIDE', 'layout'],
        drop: (item: {
            type: string
            layoutType: string
            component: LayoutSlides
            index?: number
        }) => {
            onDrop({ items: item, dropIndex: index })
        },
        canDrop: () => isEditable,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [isEditable, onDrop, index])

    return (
        <div
            ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
            className={cn(
                "h-4 my-2 rounded-md transition-all duration-200 opacity-0",
                isOver && canDrop && 'border-2 border-green-400 bg-green-50 opacity-100',
                canDrop && !isOver && 'border-2 border-blue-300 border-dashed opacity-100'
            )}
        >
            {isOver && canDrop && (
                <div className='h-full flex items-center justify-center text-green-600 text-xs py-10'>
                    Drop here
                </div>
            )}
        </div>
    )
}

interface DraggableSlideProps {
    slide: Slide
    index: number
    moveSlide: (dragIndex: number, hoverIndex: number) => void
    handleDelete: (id: string) => void
    isEditable: boolean
}

// forwardRef so the parent (Editor) can attach this to slideRefs for scroll-into-view
export const DraggableSlide = React.forwardRef<HTMLDivElement, DraggableSlideProps>(
    ({ slide, index, moveSlide, handleDelete, isEditable }, forwardedRef) => {
        const innerRef = useRef<HTMLDivElement>(null)
        const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } = useSlideStore()

        const [{ isDragging }, dragRef] = useDrag(() => ({
            type: 'SLIDE',
            item: {
                index,
                type: 'SLIDE',
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            canDrag: () => isEditable,
        }), [index, isEditable])

        const [_, drop] = useDrop<{ index: number; type: string }>({
            accept: ['SLIDE', 'LAYOUT'],
            hover(item: { index: number; type: string }) {
                if (!innerRef.current || !isEditable) {
                    return
                }
                const dragIndex = item.index
                const hoverIndex = index

                if (item.type === 'SLIDE') {
                    if (dragIndex === hoverIndex) {
                        return
                    }
                    moveSlide(dragIndex, hoverIndex)
                    item.index = hoverIndex

                }
            }
        })

        dragRef(drop(innerRef))
        // Combine the drag behavior + the local ref + the forwarded ref onto one element
        const setRefs = (node: HTMLDivElement | null) => {
            innerRef.current = node
            dragRef(node) // attach drag behavior to this node
            if (typeof forwardedRef === 'function') {
                forwardedRef(node)
            } else if (forwardedRef) {
                forwardedRef.current = node
            }
        }

        return (
            <div
                id={`slide-${index}`}
                ref={setRefs}
                className={cn(
                    'w-full rounded-lg relative p-0 min-h-[400px] max-h-[800px]',
                    'transition-shadow duration-300',
                    'flex flex-col group overflow-hidden',
                    slide.className?.split(' ').filter((cls) => !/^(p|px|py|pt|pr|pb|pl)-\d+$/.test(cls)).join(' '),
                    isDragging ? 'opacity-50' : 'opacity-100'
                )}
                style={{
                    backgroundImage: currentTheme.gradientBackground,
                    border: index === currentSlide ? `2px solid ${currentTheme.accentColor}` : '2px solid #e2e8f0',
                }}
                onClick={() => setCurrentSlide(index)}
            >
                {isEditable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation() // don't trigger setCurrentSlide when deleting
                            handleDelete(slide.id)
                        }}
                        className='absolute top-2 right-2 z-10 p-1.5 rounded-md bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50'
                    >
                        <Trash2 className='w-4 h-4 text-red-500' />
                    </button>
                )}

                <div className='h-full w-full flex-grow overflow-auto'>
                    <MasterRecursiveComponent
                        content={slide.content}
                        isEditable={isEditable}
                        slideId={slide.id}
                        onContentChange={(args: { contentId: string; newContent: string | string[] | string[][] }) =>
                            isEditable ? updateContentItem(slide.id, args.contentId, args.newContent) : null
                        }
                    />
                </div>
            </div>
        )
    }
)
DraggableSlide.displayName = 'DraggableSlide'

type Props = {
    isEditable?: boolean
}

const Editor = ({ isEditable = false }: Props) => {
    const [loading, setLoading] = useState(true)
    const {
        getOrderedSlides,
        currentSlide,
        removeSlide,
        addSlideAtIndex,
        reorderSlides,
        slides,
        project,
    } = useSlideStore()

    const orderedSlides = getOrderedSlides()
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    type SaveStatus = "idle" | "saving" | "saved" | "error"

    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
    const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)


    useEffect(() => {
        setLoading(false)
    }, [])

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        if (isEditable) {
            reorderSlides(dragIndex, hoverIndex)
        }
    }

    const handleDelete = (id: string) => {
        if (isEditable) {
            removeSlide(id)
        }
    }

    const handleDrop = (args: {
        items: {
            type: string
            layoutType: string
            component: LayoutSlides
            index?: number
        }
        dropIndex: number
    }) => {
        if (!isEditable) return

        const { items, dropIndex } = args

        if (items.type === 'layout') {
            addSlideAtIndex(
                {
                    id: uuidv4(),
                    SlideOrder: dropIndex,
                    SlideName: items.component.slideName,
                    types: items.component.type,
                    content: items.component.content,
                    className: items.component.className,
                } as Slide,
                dropIndex
            )
        } else if (items.type === 'SLIDE' && items.index !== undefined) {
            moveSlide(items.index, dropIndex)
        }
    }

    useEffect(() => {
        if (slideRefs.current[currentSlide]) {
            slideRefs.current[currentSlide]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [currentSlide])

    useEffect(() => {
        if (typeof window != 'undefined') setLoading(false)
    }, [])

    const saveSlides = useCallback((toastId: string | number) => {
        if (isEditable && project) {
            ; (async () => {
                setSaveStatus("saving")
                try {
                    await updateSlides(project.id, JSON.parse(JSON.stringify(slides)))
                    setSaveStatus("saved")
                    toast.success("Saved", { id: toastId })
                } catch (err) {
                    setSaveStatus("error")
                    toast.error("Failed to save", { id: toastId })
                }
            })()
        }
    }, [slides, project, isEditable])

    useEffect(() => {
        if (autosaveTimeoutRef.current) {
            clearTimeout(autosaveTimeoutRef.current)
        }

        if (isEditable) {
            autosaveTimeoutRef.current = setTimeout(() => {
                const toastId = toast.loading("Saving...")
                saveSlides(toastId)
            }, 2000)
        }

        return () => {
            if (autosaveTimeoutRef.current) {
                clearTimeout(autosaveTimeoutRef.current)
            }
        }
    }, [slides, isEditable, project])

    {
        saveStatus === "saving" && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
            </span>
        )
    }
    {
        saveStatus === "saved" && (
            <span className="flex items-center gap-1 text-sm text-green-600">
                <Check className="h-3 w-3" />
                Saved
            </span>
        )
    }
    {
        saveStatus === "error" && (
            <span className="flex items-center gap-1 text-sm text-red-600">
                <X className="h-3 w-3" />
                Failed to save
            </span>
        )
    }

    return (
        <div className='flex-1 flex flex-col h-full max-w-5xl mx-auto pl-28 mb-20'>
            {loading ? (
                <Skeleton className='w-full h-full' />
            ) : (
                <ScrollArea className='flex-1 mt-4'>
                    <div className='px-4 pb-4 space-y-4 pt-2'>
                        {/* Drop zone before the very first slide */}
                        {isEditable && (
                            <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
                        )}

                        {orderedSlides.map((slide, index) => (
                            <React.Fragment key={slide.id}>
                                <DraggableSlide
                                    ref={(el) => {
                                        slideRefs.current[index] = el
                                    }}
                                    slide={slide}
                                    index={index}
                                    moveSlide={moveSlide}
                                    handleDelete={handleDelete}
                                    isEditable={isEditable}
                                />
                                {/* Drop zone after each slide, so you can drop between/after any slide */}
                                {isEditable && (
                                    <DropZone
                                        index={index + 1}
                                        onDrop={handleDrop}
                                        isEditable={isEditable}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}

export default Editor

