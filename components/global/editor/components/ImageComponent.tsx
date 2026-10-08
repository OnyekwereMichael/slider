import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import UploadImage from './UploadImage'
type ImageProps = {
    src?: string
    alt: string
    contentId: string
    className?: string
    isPreview?: boolean
    fillHeight?: boolean
    onContentChange?: (args: {
        contentId: string
        newContent: string | string[][] | string[]
    }) => void
    isEditable?: boolean
}


const ImageComponent = ({ contentId, className, isPreview = false, isEditable = true, fillHeight, onContentChange, src, alt }: ImageProps) => {
    const sanitizedClassName = className
        ?.split(' ')
        .filter((cls) => !/^(p|px|py|pt|pr|pb|pl)-\d+$/.test(cls))
        .join(' ')

    const imageSrc = src || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop'

    // Preserve existing behavior everywhere this isn't explicitly overridden
    const shouldFillHeight = fillHeight ?? (!isEditable && !isPreview)

    return (
        <div className={cn(
            "relative group w-full h-full flex-1 overflow-hidden flex items-center justify-center bg-muted",
            shouldFillHeight ? "min-h-screen" : "min-h-[350px]",
            sanitizedClassName
        )}>
            {isPreview ? (
                <Image
                    src={imageSrc}
                    alt={alt || 'Image'}
                    className="object-cover w-full h-full"
                    fill
                    sizes="300px"
                />
            ) : (
                <Image
                    src={imageSrc}
                    alt={alt || 'Image'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                />
            )}
            {!isPreview && isEditable && (
                <div className='absolute top-2 left-2 hidden group-hover:block z-50'>
                    <UploadImage
                        contentId={contentId}
                        onContentChange={onContentChange}
                    />
                </div>
            )}
        </div>
    )
}

export default ImageComponent