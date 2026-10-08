import { useSlideStore } from '@/app/store/useSlideStore'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?: string
}

const Divider = ({ className }: Props) => {
    const { currentTheme } = useSlideStore()
    return (
        <hr
            className={cn('my-4', className)}
            style={{ borderColor: currentTheme.accentColor }}
        />
    )
}

export default Divider