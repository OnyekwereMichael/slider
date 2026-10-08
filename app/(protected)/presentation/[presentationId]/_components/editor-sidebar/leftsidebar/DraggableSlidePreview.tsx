import { useSlideStore } from '@/app/store/useSlideStore'
import { Slide } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ScaledPreview from './ScaledPreview'

type DraggableSlidePreviewProps = {
    slide: Slide
    index: number
    moveSlide: (dragIndex: number, hoverIndex: number) => void
}
const DraggableSlidePreview = ({ slide, index, moveSlide }: DraggableSlidePreviewProps) => {
    const { currentSlide, setCurrentSlide } = useSlideStore()
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag({
        type: 'SLIDE',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [, drop] = useDrop({
        accept: 'SLIDE',
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            moveSlide(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    drag(drop(ref))
    return (
        <div
            ref={ref}
            className={cn(
                'relative cursor-pointer group',
                index === currentSlide ? 'before:bg-blue-500' : 'before:bg-transparent',
                isDragging ? 'opacity-50' : 'opacity-180'
            )}
            onClick={() => setCurrentSlide(index)}
        >
            <div className='pl-2 mb-4 relative'>
                <ScaledPreview slide={slide} index={index} isActive={index === currentSlide} />

            </div>

        </div>
    )
}

export default DraggableSlidePreview