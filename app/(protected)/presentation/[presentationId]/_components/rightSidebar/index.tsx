import { useSlideStore } from '@/app/store/useSlideStore'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LayoutTemplate, Palette, Type } from 'lucide-react'
import React from 'react'
import LayoutChooser from './tabs/LayoutChooser'
import { ScrollArea } from '@/components/ui/scroll-area'
import { component } from '@/lib/constants'
import ComponentCard from './tabs/components-tab/ComponentPreview'
import ThemeChooser from './tabs/ThemeChooser'

const EditorSidebar = () => {
    const { currentTheme } = useSlideStore()
    return (
        <div className='fixed top-1/2 right-8 transform -translate-y-1/2 z-10'>
            <div className='rounded-xl border-r-0 border-2 border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='ghost'
                            size="icon"
                            className='h-10 w-10 rounded-full'
                        >
                            <LayoutTemplate className='h-5 w-5' />
                            <span className='sr-only'>Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side='left'
                        align='center'
                        className='w-[480px] p-0 border-none shadow-none rounded-2xl bg-transparent'
                    >
                        {/* Light theme container with soft gray backdrop, subtle border & blur */}
                        <div className="w-full max-h-[70vh] flex flex-col rounded-2xl bg-slate-50/90 backdrop-blur-md border border-slate-200/80 shadow-xl overflow-hidden">
                            {/* Header section */}
                            <div className="px-5 py-3.5 border-b border-slate-200/80 bg-slate-100/70 flex items-center justify-between shrink-0">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Select Layout
                                </span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">
                                    Layouts
                                </span>
                            </div>

                            {/* Layout Chooser Content Container */}
                            <div className="flex-1 overflow-y-auto px-4">
                                <LayoutChooser />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Popover 2: Components */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='ghost'
                            size="icon"
                            className='h-10 w-10 rounded-full'
                        >
                            <Type className='h-5 w-5' />
                            <span className='sr-only'>Choose Component</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side='left'
                        align='center'
                        className='w-[480px] p-0 border-none bg-transparent rounded-2xl'
                    >
                        {/* Light theme container with soft gray backdrop, subtle border & blur */}
                        <div className="w-full max-h-[70vh] flex flex-col rounded-2xl bg-slate-50/90 backdrop-blur-md border border-slate-200/80 shadow-xl overflow-hidden">
                            {/* Header section */}
                            <div className="px-5 py-3.5 border-b border-slate-200/80 bg-slate-100/70 flex items-center justify-between shrink-0">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Select Component
                                </span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">
                                    {component.reduce((acc, g) => acc + g.components.length, 0)} Options
                                </span>
                            </div>

                            {/* Scrollable Components Area */}
                            <ScrollArea className="flex-1 p-4">
                                <div className="flex flex-col space-y-6">
                                    {component.map((group, idx) => (
                                        <div className="space-y-2.5" key={idx}>
                                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                                                {group.name}
                                            </h3>

                                            <div className="grid grid-cols-3 gap-3">
                                                {group.components.map((item) => (
                                                    <ComponentCard
                                                        key={item.componentType}
                                                        item={item}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </PopoverContent>
                </Popover>
                {/* Popover 3: Theme */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='ghost'
                            size="icon"
                            className='h-10 w-10 rounded-full'
                        >
                            <Palette className='h-5 w-5' />
                            <span className='sr-only'>Choose Style</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side='left'
                        align='center'
                        className='w-80 p-0 border-none! shadow-none rounded-2xl bg-transparent'
                    >
                        <ThemeChooser />
                    </PopoverContent>
                </Popover>
            </div>

        </div>
    )
}

export default EditorSidebar