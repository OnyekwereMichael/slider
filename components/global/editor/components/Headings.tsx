import React from 'react'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/app/store/useSlideStore'

interface HeadingProps {
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    isPreview?: boolean
}

const HeadingBase = ({ placeholder, value, onChange, isPreview, className }: HeadingProps & { className?: string }) => {
    const { currentTheme } = useSlideStore()
    
    if (isPreview) {
        return <div className={cn("whitespace-pre-wrap font-bold", className)} style={{ color: currentTheme.fontColor }}>{value || placeholder}</div>
    }
    
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn('w-full bg-transparent outline-none resize-none font-bold overflow-hidden', className)}
            style={{ color: currentTheme.fontColor }}
            rows={1}
            onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
            }}
        />
    )
}

export const Title = (props: HeadingProps) => <HeadingBase {...props} className="text-6xl" />
export const Heading1 = (props: HeadingProps) => <HeadingBase {...props} className="text-5xl" />
export const Heading2 = (props: HeadingProps) => <HeadingBase {...props} className="text-4xl" />
export const Heading3 = (props: HeadingProps) => <HeadingBase {...props} className="text-3xl" />
export const Heading4 = (props: HeadingProps) => <HeadingBase {...props} className="text-2xl" />
