'use client'
import { getProjectById } from '@/app/actions/project'
import { useSlideStore } from '@/app/store/useSlideStore'
import { themes } from '@/lib/constants'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Navbar from './_components/Navbar/Navbar'
import LayoutPreview from './_components/editor-sidebar/leftsidebar/LayoutPreview'
import Editor from './_components/editor/Editor'
import EditorSidebar from './_components/rightSidebar'
import ExportStage from './_components/editor/ExportStage'


const page = () => {
    const params = useParams()
    const { setTheme } = useTheme()
    const [isLoading, setIsLoading] = useState(true)
    const { setProject, setSlides, currentTheme, setCurrentTheme } = useSlideStore()

    useEffect(() => {
        (async () => {
            try {
                const res = await getProjectById(params.presentationId as string)
                if (res.status !== 200 || !res.data) {
                    toast.error('Error', { description: "Failed To fetch project" })
                    redirect('/dashboard')
                }
                const findTheme = themes.find(theme => theme.name === res.data.themeName)
                setCurrentTheme(findTheme || themes[0])
                setTheme(findTheme?.type === 'dark' ? 'dark' : 'light')
                setProject(res.data)
                setSlides(JSON.parse(JSON.stringify(res.data.slides)))
            } catch (error) {
                console.error(error)
                toast.error('Error', { description: "Failed To fetch project" })
                redirect('/dashboard')
            } finally {
                setIsLoading(false)
            }
        })()

    }, [])

    if (isLoading) {
        return <div className='flex items-center justify-center h-screen'>
            <Loader2 className='w-8 h-8 animate-spin text-primary' />
        </div>
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='min-h-screen flex flex-col'>
                <Navbar
                    presentationId={params.presentationId as string}
                />

                <div
                    className='flex-1 flex overflow-hidden pt-10'
                    style={{
                        color: currentTheme.accentColor,
                        fontFamily: currentTheme.fontFamily,
                        backgroundColor: currentTheme.backgroundColor
                    }}
                >
                    <LayoutPreview />

                    <div className='flex-1 '>
                        <Editor isEditable={true} />
                    </div>
                    <ExportStage />
                    <EditorSidebar />
                </div>
            </div>
        </DndProvider>
    )
}

export default page