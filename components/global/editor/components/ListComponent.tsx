import React from 'react'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/app/store/useSlideStore'

interface ListProps {
    items: string[]
    onChange: (newItems: string[]) => void
    className?: string
}

const ListBase = ({ items, onChange, className, type }: ListProps & { type: 'bullet' | 'number' | 'todo' }) => {
    const { currentTheme } = useSlideStore()

    const itemsArray = Array.isArray(items) ? items : typeof items === 'string' ? [items] : []
    const handleChange = (index: number, value: string) => {
        const newItems = [...itemsArray]
        newItems[index] = value
        onChange(newItems)
    }

    const renderItem = (item: string, index: number) => {
        return (
            <li key={index} className="flex gap-2 items-start mb-2">
                {type === 'todo' && <input type="checkbox" className="mt-1" />}
                <input
                    className="flex-1 bg-transparent outline-none"
                    value={item}
                    onChange={(e) => handleChange(index, e.target.value)}
                    style={{ color: currentTheme.fontColor }}
                />
            </li>
        )
    }

    const ListTag = type === 'number' ? 'ol' : 'ul'

    return (
        <ListTag className={cn("pl-4", type === 'number' ? 'list-decimal' : type === 'bullet' ? 'list-disc' : 'list-none', className)}>
            {itemsArray.map(renderItem)}
            <li>
                <button
                    onClick={() => onChange([...itemsArray, ''])}
                    className="text-sm opacity-50 hover:opacity-100 mt-2"
                    style={{ color: currentTheme.fontColor }}
                >
                    + Add item
                </button>
            </li>
        </ListTag>
    )
}

export const BulletList = (props: ListProps) => <ListBase {...props} type="bullet" />
export const NumberedList = (props: ListProps) => <ListBase {...props} type="number" />
export const TodoList = (props: ListProps) => <ListBase {...props} type="todo" />

export default NumberedList
