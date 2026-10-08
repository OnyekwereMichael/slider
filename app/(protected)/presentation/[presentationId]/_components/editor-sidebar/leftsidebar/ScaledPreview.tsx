import { useSlideStore } from '@/app/store/useSlideStore'
import { Slide } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'
import { MasterRecursiveComponent } from '../../editor/MasterRecursiveComponent'

type Props = {
    slide: Slide
    isActive: boolean
    index: number
}
const ScaledPreview = ({ slide, isActive, index }: Props) => {
    const { currentTheme, updateContentItem } = useSlideStore()
    return (
        <div
            className={cn('w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-0 ring-offset-2')}

            style={{
                fontFamily: currentTheme.fontFamily,
                color: currentTheme.accentColor,
                border: isActive ? `2px solid ${currentTheme.accentColor}` : '2px solid #e2e8f0',
                backgroundColor: currentTheme.slideBackgroundColor,
                backgroundImage: currentTheme.gradientBackground
            }}
        >
            <div className='absolute inset-0 origin-top-left scale-[0.5] w-[200%] h-[200%] overflow-hidden pointer-events-none'>
                <MasterRecursiveComponent
                    slideId={slide.id}
                    content={slide.content}
                    onContentChange={(args) => {
                        updateContentItem(slide.id, args.contentId, args.newContent)
                    }}
                    isPreview={true}
                />
            </div>


        </div>
    )
}

export default ScaledPreview