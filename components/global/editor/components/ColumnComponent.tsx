'use client'
import React from 'react'
import { ContentItem } from '@/lib/types'
import { MasterRecursiveComponent } from '@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent'

interface ColumnComponentProps {
    content: ContentItem
    onContentChange: (args: { contentId: string; newContent: string | string[] | string[][] }) => void
    slideId: string
    isPreview: boolean
    isEditable: boolean
    isExportMode?: boolean
}

const ColumnComponent = ({ content, onContentChange, slideId, isPreview, isEditable, isExportMode }: ColumnComponentProps) => {
    const columns = Array.isArray(content.content) ? (content.content as ContentItem[]) : []

    if (columns.length === 0) return null

    return (
        <div className="flex w-full h-full" style={{ minHeight: 0 }}>
            {columns.map((col, idx) => (
                <div
                    key={col.id || `col-${idx}`}
                    className="flex-1 h-full relative overflow-hidden"
                    style={{ minWidth: 0 }}
                >
                    <MasterRecursiveComponent
                        content={col}
                        onContentChange={onContentChange}
                        slideId={slideId}
                        index={idx}
                        isEditable={isEditable}
                        isPreview={isPreview}
                        isExportMode={isExportMode}
                    />
                </div>
            ))}
        </div>
    )
}

export default ColumnComponent