import { useSlideStore } from '@/app/store/useSlideStore'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    items: string[]
    onItemClick: (id: string) => void
    className?: string
}
const TableOfContents = ({ items, onItemClick, className }: Props) => {
    const { currentTheme } = useSlideStore()

    return (
        <nav
            className={cn('space-y-2', className)}
            style={{ color: currentTheme.fontColor }}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn('cursor-pointer hover:underline')}
                >
                    {item}
                </div>
            ))}
        </nav>
    )
}

export default TableOfContents
