import { ContentItem } from '@/lib/types'
import React from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import { useSlideStore } from '@/app/store/useSlideStore'
import { cn } from '@/lib/utils'

type DropZoneProps = {
    index: number
    parentId: string
    slideId: string
}
const DropZone = ({ index, parentId, slideId }: DropZoneProps) => {
    const { addComponentInSlide } = useSlideStore()
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: 'CONTENT_ITEM',
        drop: (item: {
            type: string
            componentType: string
            label: string
            component: ContentItem
        }) => {
            if (item.type === 'component') {
                addComponentInSlide(
                    slideId,
                    {
                        ...item.component,
                        id: uuidv4(),
                    },
                    index,
                    parentId
                )
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }))
    return (
        <div
            ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
            className={cn(
                'w-full transition-all duration-200 z-10',
                isOver && canDrop
                    ? 'h-6 border-2 border-blue-500 bg-blue-100 my-1 rounded flex items-center justify-center'
                    : 'h-0 opacity-0 hover:h-2 hover:opacity-100 hover:bg-blue-200'
            )}
        >
            {isOver && canDrop && (
                <div className='w-full h-full flex text-xs items-center justify-center text-blue-600 font-medium'>Drop here</div>
            )}
        </div>
    )
}

export default DropZone