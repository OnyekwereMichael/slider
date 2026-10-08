import React from 'react'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/app/store/useSlideStore'

interface ParagraphProps {
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    isPreview?: boolean
}

const Paragraph = ({ placeholder, value, onChange, isPreview }: ParagraphProps) => {
    const { currentTheme } = useSlideStore()
    
    if (isPreview) {
        return <p className="whitespace-pre-wrap text-base" style={{ color: currentTheme.fontColor }}>{value || placeholder}</p>
    }
    
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none resize-none text-base overflow-hidden"
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

export default Paragraph
