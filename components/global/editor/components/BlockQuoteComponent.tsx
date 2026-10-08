import { useSlideStore } from '@/app/store/useSlideStore'
import { cn } from '@/lib/utils'
import React from 'react'
interface Props extends React.HTMLAttributes<HTMLQuoteElement> {
    children: React.ReactNode
    className?: string
}
const BlockQuoteComponent = ({ children, className, ...props }: Props) => {
    const { currentTheme } = useSlideStore()
    return (
        <blockquote
            className={cn(
                'pl-4 border-l-4 italic',
                'my-4 py-2',
                'text -gray-700 dark:text-gray-300'

            )}
            style={{
                borderLeftColor: currentTheme.accentColor
            }}
            {...props}
        >
            {children}
        </blockquote>
    )
}

export default BlockQuoteComponent