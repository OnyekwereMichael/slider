'use client'
import { ContentItem } from '@/lib/types'
import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Heading1, Heading2, Heading3, Heading4, Title } from '@/components/global/editor/components/Headings'
import { cn } from '@/lib/utils'
import DropZone from './DropZone'
import Paragraph from '@/components/global/editor/components/Paragraph'
import Table from '@/components/global/editor/components/Table'
import ColumnComponent from '@/components/global/editor/components/ColumnComponent'
import ImageComponent from '@/components/global/editor/components/ImageComponent'
import BlockQuoteComponent from '@/components/global/editor/components/BlockQuoteComponent'
import NumberedList, { BulletList, TodoList } from '@/components/global/editor/components/ListComponent'
import CalloutBox from '@/components/global/editor/components/CalloutBox'
import CodeBlock from '@/components/global/editor/components/CodeBlock'
import TableOfContents from '@/components/global/editor/components/TableOfContents'
import Divider from '@/components/global/editor/components/Divider'

type MasterRecursiveComponentProps = {
    content: ContentItem
    onContentChange: (args: { contentId: string; newContent: string | string[] | string[][] }) => void
    isPreview?: boolean
    isEditable?: boolean
    isExportMode?: boolean // NEW
    slideId: string
    index?: number
}
const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
    ({ content, onContentChange, slideId, index, isPreview, isEditable, isExportMode }) => {
        const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onContentChange({
                contentId: content.id,
                newContent: e.target.value
            });
        }, [content.id, onContentChange]);

        const commonProps = {
            placeholder: content.placeholder,
            value: content?.content as string,
            onChange: handleChange,
            isPreview: isPreview
        };

        const animationProps = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: {
                duration: 0.5,
            }
        }

        switch (content.type) {
            case 'heading1':
                return (
                    <motion.div className='w-full h-full'>
                        <Heading1
                            {...animationProps}
                            {...commonProps} />
                    </motion.div>
                )
            case 'heading2':
                return (
                    <motion.div className='w-full h-full'>
                        <Heading2
                            {...animationProps}
                            {...commonProps} />
                    </motion.div>
                )
            case 'heading3':
                return (
                    <motion.div className='w-full h-full'>
                        <Heading3
                            {...animationProps}
                            {...commonProps} />
                    </motion.div>
                )
            case 'heading4':
                return (
                    <motion.div className='w-full h-full'>
                        <Heading4
                            {...animationProps}
                            {...commonProps} />
                    </motion.div>
                )
            case 'title':
                return (
                    <motion.div className='w-full h-full'>
                        <Title
                            {...animationProps}
                            {...commonProps} />
                    </motion.div>
                )
            case 'paragraph':
                return (
                    <motion.div className='w-full h-full'>
                        <Paragraph

                            {...commonProps} />
                    </motion.div>
                )
            case 'column':
                if (Array.isArray(content.content)) {
                    return (
                        <motion.div
                            {...animationProps}
                            className={cn('w-full h-full flex flex-col flex-1',
                                content.className
                            )}
                        >
                            {content.content.length > 0 ? (content.content as ContentItem[]).map((subItem: ContentItem, subIndex: number) => (
                                <React.Fragment key={subItem.id || `item-${subIndex}`}>
                                    {!isPreview && !subItem.restrictToDrop && subIndex === 0 && <DropZone parentId={content.id} slideId={slideId}
                                        index={0} />}

                                    <MasterRecursiveComponent
                                        content={subItem}
                                        onContentChange={onContentChange}
                                        slideId={slideId}
                                        index={subIndex}
                                        isEditable={isEditable}
                                        isPreview={isPreview}
                                        isExportMode={isExportMode} // NEW
                                    />

                                    {!isPreview && !subItem.restrictToDrop && isEditable && (
                                        <DropZone parentId={content.id} slideId={slideId}
                                            index={subIndex + 1} />
                                    )}

                                </React.Fragment>
                            )) : isEditable && !isPreview ? (
                                <DropZone
                                    index={0}
                                    parentId={content.id}
                                    slideId={slideId}
                                />
                            ) : null}
                        </motion.div>
                    )
                }

                return null

            case 'table':
                return (
                    <motion.div
                        {...animationProps}
                        className={cn('w-full h-full')}>
                        <Table
                            content={content.content as string[][]}
                            onchange={(newContent) => {
                                onContentChange({
                                    contentId: content.id,
                                    newContent: newContent !== null ? newContent : content.content as string[][],
                                })
                            }}
                            isPreview={isPreview}
                            isEditable={isEditable ?? true}
                            initialColSize={content.initialsColumns}
                            initialRowSize={content.initialRows}

                        />
                    </motion.div>
                )

            case 'resizable-column':
                if (Array.isArray(content.content)) {
                    return (
                        <motion.div
                            {...animationProps}
                            className='w-full h-full flex-1'
                        >
                            <ColumnComponent
                                content={content}
                                onContentChange={onContentChange}
                                slideId={slideId}
                                isPreview={isPreview ?? false}
                                isEditable={isEditable ?? true}
                            />

                        </motion.div>
                    )
                }
                return null

            case 'image':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full flex-1'
                    >
                        <ImageComponent
                            src={content.content as string}
                            alt={content.alt || ''}
                            isPreview={isPreview ?? false}
                            isEditable={isEditable ?? true}
                            fillHeight={isExportMode ? false : undefined} // NEW
                            onContentChange={onContentChange}
                            className={content.className}
                            contentId={content.id}
                        />
                    </motion.div>
                )
            case 'blockquote':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <BlockQuoteComponent>
                            <Paragraph {...commonProps} />
                        </BlockQuoteComponent>
                    </motion.div>
                )

            case 'bulletList':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <BulletList
                            items={content.content as string[]}
                            onChange={(newItems) => {
                                onContentChange({ contentId: content.id, newContent: newItems })
                            }}
                            className={content.className}

                        />
                    </motion.div>
                )
            case 'todoList':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <TodoList
                            items={content.content as string[]}
                            onChange={(newItems) => {
                                onContentChange({ contentId: content.id, newContent: newItems })
                            }}
                            className={content.className}

                        />
                    </motion.div>
                )
            case 'codeBlock':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <CodeBlock
                            code={content.code} language={content.language}
                            onChange={() => { }}
                            className={content.className}

                        />

                    </motion.div>
                )
            case 'tableOfContents':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <TableOfContents
                            items={content.content as string[]}
                            onItemClick={(id) => {
                                console.log(`Navigate to section: ${id}`)
                            }}
                            className={content.className}

                        />

                    </motion.div>
                )
            case 'divider':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <Divider className={content.className as string} />
                    </motion.div>
                )
            case 'calloutBox':
                return (
                    <motion.div
                        {...animationProps}
                        className='w-full h-full'
                    >
                        <CalloutBox
                            type={content.callOutType || 'info'}

                            className={content.className}

                        >
                            <Paragraph {...commonProps} />
                        </CalloutBox>
                    </motion.div>
                )
            default:
                return null
        }
    }
)

ContentRenderer.displayName = 'ContentRenderer'

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> = React.memo(
    ({
        content,
        onContentChange,
        slideId,
        index,
        isPreview = false,
        isEditable = true,
        isExportMode = false,
    }) => {
        if (!isPreview) {
            return (
                <ContentRenderer
                    content={content}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    index={index}
                    isPreview={isPreview}
                    isEditable={isEditable}
                    isExportMode={isExportMode}
                />
            )
        }

        return (
            <React.Fragment>
                <ContentRenderer
                    content={content}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    index={index}
                    isPreview={isPreview}
                    isEditable={isEditable}
                    isExportMode={isExportMode}
                />
            </React.Fragment>
        )
    }
)

MasterRecursiveComponent.displayName = 'MasterRecursiveComponent'